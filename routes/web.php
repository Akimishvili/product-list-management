<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use Inertia\Inertia;

Route::redirect('/', 'products');
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard', []);
    });
    Route::resource('products', ProductController::class)->only('create', 'store');
    Route::resource('categories', CategoryController::class)->only('create', 'store');
});

Route::resource('products', ProductController::class)->except('create', 'store');
Route::resource('categories', CategoryController::class)->except('create', 'store');


require __DIR__.'/auth.php';
