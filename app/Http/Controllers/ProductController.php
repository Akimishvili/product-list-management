<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Termwind\Components\Dd;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Start a query on the Product model
        $query = Product::query();

        // Apply a filter if the 'name' request parameter is present
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        // Apply a filter if the 'description' request parameter is present
        if (request("description")) {
            $query->where("description", "like", "%" . request("description") . "%");
        }
        // Apply a filter if the 'price_from' or 'price_to' request parameters are present
        if (request("price_from") && request("price_to")) {
            $query->whereBetween('price', [request("price_from"), request("price_to")]);
        } elseif (request("price_from")) {
            $query->where('price', '>=', request("price_from"));
        } elseif (request("price_to")) {
            $query->where('price', '<=', request("price_to"));
        }

        if ($categories = request("categories")) {
            $query->whereHas('categories', function($q) use ($categories) {
                $q->whereIn('categories.id', $categories);
            });
        }
        // Load related categories and images for the filtered products
        $products = $query->with(['categories', 'images'])->get();

        // Return the view with the products and all categories
        return inertia('Product/Index', [
            'products' => $products,
            'queryParams' => request()->query() ?: null,
            'categories' => Category::all(),
            'success' => session('success'),
        ]);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Product/Create', [
            'categories' => Category::all(),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        // Create the product

        $product = Product::create([
            'name' => $data["name"],
            'description' => $data["description"],
            'price' => $data["price"]
        ]);
        if($product){
            // Attach categories
            $product->categories()->attach($data["categories"]);
            // Save images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $fileName = uniqid() . '-' . time() .'.'. $file->getClientOriginalExtension();
                    $filePath = $file->store('images/products', 'public'); // Save file to storage

                    Image::create([
                        'src' => $filePath,
                        'product_id' => $product->id
                    ]);
                }
            }
        } else return redirect() -> back() -> with('error', 'Could not add product');






        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = $product->load(['categories', 'images']);
        return inertia('Product/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
