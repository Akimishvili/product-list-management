import TextInput from "@/Components/TextInput.jsx";
import NavLink from "@/Components/NavLink.jsx";
import { Head, Link, router } from "@inertiajs/react";
import {useState} from "react";
export default function Index({categories, products, queryParams = null, success}){
    const [selectedCategory, setSelectedCategory] = useState(null);
    queryParams = queryParams || {};
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("products.index"), queryParams);
    };


    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        const isSelected = selectedCategory === categoryId;

        const updatedCategory = isSelected ? null : categoryId;
        setSelectedCategory(updatedCategory);
        searchFieldChanged("categories", updatedCategory ? [updatedCategory] : []);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
        handleCategoryChange(e.target.value)
    };


    const resetQueryParams = () => {
        for (const key in queryParams) {
            delete queryParams[key];
        }
        router.get(route("products.index"), queryParams);
    };

    const deleteProduct = (product) => {
        if (!window.confirm("Are you sure you want to delete the product?")) {
            return;
        }
        router.delete(route("products.destroy", product.id));
    };

    const showProduct = (product) => {
        router.get(route("products.show", product.id));
    }

    return (
        <>
            <Head title={"Products"}/>
            <div className="container-lg  pt-7 bg-slite-50">
                {success && (
                    <div role="alert" className="alert alert-success flex  justify-center">
                        <div className="w-2/4 bg-emerald-800 flex justify-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span> {success}</span>
                        </div>
                    </div>
                )
                }
                <div className="row pb-5 flex justify-end px-4">
                    <div className="col">
                        <NavLink className={"text-2xl text-sky-600 "}
                                 href={"/admin"}
                        >
                        <span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                              stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </span>
                            Admin Dashboard
                        </NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <TextInput placeholder={"Search By Name"} className={"h-8"}
                                               defaultValue={queryParams.name}
                                               onBlur={(e) =>
                                                   searchFieldChanged("name", e.target.value)
                                               }
                                               onKeyPress={(e) => onKeyPress("name", e)}
                                    />
                                </th>
                                <th>
                                    <TextInput placeholder={"Search By Description"} className={"h-8"}
                                               defaultValue={queryParams.description}
                                               onBlur={(e) =>
                                                   searchFieldChanged("description", e.target.value)
                                               }
                                               onKeyPress={(e) => onKeyPress("description", e)}
                                    /></th>
                                <th>
                                    <div className="flex gap-3 justify-center">
                                        <div>
                                            From: <TextInput className={"w-20 h-7"}
                                                             defaultValue={queryParams.price_from}
                                                             onKeyPress={(e) => onKeyPress("price_from", e)}
                                        />
                                        </div>
                                        <div>
                                            To: <TextInput className={"w-20 h-7"}
                                                           defaultValue={queryParams.price_to}
                                                           onKeyPress={(e) => onKeyPress("price_to", e)}
                                        />
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="dropdown ">
                                        <div tabIndex={0} role="button"
                                             className="btn m-1 relative p-1 border rounded-md"
                                             onClick={toggleVisibility}>Choose Categories
                                        </div>
                                        <ul tabIndex={0}
                                            className={`dropdown-content menu p-2 shadow bg-slate-50 rounded-box w-52 absolute z-40  ${isVisible ? '' : 'invisible'}`}>
                                            {categories.map((category) => (
                                                <li key={category.id}>
                                                    <label className="flex items-center space-x-3">
                                                        <input type="checkbox" className="form-checkbox"
                                                               value={category.id}
                                                               onKeyPress={handleCategoryChange}/>
                                                        <span>{category.name}</span>
                                                    </label>
                                                </li>

                                            ))}
                                        </ul>
                                    </div>
                                </th>
                                <th>
                                    <button onClick={resetQueryParams}
                                            className="py-2 px-5 bg-teal-700 text-sm text-white font-semibold rounded-full shadow-md hover:bg-teal-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            </tbody>
                            <tfoot>
                            {products.map((product) => (
                                <tr key={product.id}
                                    className="border-b-2"> {/* Ensure to use a unique key for each element in the list */}
                                    <td>
                                        {product.images.length > 0 ? (
                                            <div className="flex items-center justify-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={"/storage/" + product.images[0].src}
                                                             alt="Product Image"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="/storage/images/products/default-product-image.jpg"
                                                             alt="Default Product Image"/>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <span className="badge badge-ghost badge-sm text-center">{product.name}</span>
                                    </td>
                                    <td className="text-center">
                                    <span className="badge badge-ghost badge-sm">
                                        {[product.description.trim().substring(0, 30), '...'].join("")}
                                    </span>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge badge-ghost badge-sm">{product.price}$</span>
                                    </td>
                                    <td className="text-center">
                                        {product.categories.map((category, index) => (
                                            <div key={index}>
                                                <span className="badge badge-ghost badge-sm">{category.name}</span>
                                                <br/>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="text-center">
                                        <button onClick={(e) => showProduct(product)}
                                                className="py-2 px-5 bg-lime-700 mr-1 text-sm text-white font-semibold rounded-full shadow-md hover:bg-lime-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                        </button>
                                        <button onClick={(e) => deleteProduct(product)}
                                                className="py-2 px-5 bg-red-700 text-sm text-white font-semibold rounded-full shadow-md hover:bg-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tfoot>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
