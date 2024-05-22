import React, { useState } from 'react';
import TextInput from "@/Components/TextInput.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";
import InputError from "@/Components/InputError.jsx";
export default function Create({categories}) {
    const [imageUploadInputs, setImageUploadInputs] = useState([0]);
    const { data, setData, post, errors, reset } = useForm({
        images: [],
        name: "",
        description: "",
        price: "",
        categories: []
    });
    const addImageUploadInput = (e) => {
        e.preventDefault();
        setImageUploadInputs([...imageUploadInputs, imageUploadInputs.length]);
    };

    const removeImageUploadInput = (index) => {
        setImageUploadInputs(imageUploadInputs.filter((_, i) => i !== index));
    };
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...data.images];
            updatedImages[index] = file;
            setData('images', updatedImages);
        }
    };
    const setCategories = (e) => {
        const categoryId = e.target.value;
        const updatedCategories = [...data.categories]; // Make a copy of the existing categories array
        if (e.target.checked) {
            updatedCategories.push(categoryId); // Add the selected Category ID
        } else {
            const indexToRemove = updatedCategories.indexOf(categoryId);
            if (indexToRemove !== -1) {
                updatedCategories.splice(indexToRemove, 1); // Remove the Category ID if unchecked
            }
        }
        setData('categories', updatedCategories); // Update the state with the modified array
    }
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("products.store"));
    };


    return (
        <>
            <Head title={"Create Product"}/>
            <div className="container-lg p-10 w-full">
                <div className="row">
                    <div className="col">
                        <NavLink className={"text-4xl text-sky-600"}
                                 href={"/admin"}
                        >
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
                            </svg>

                        </span>
                            Back
                        </NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h1 className="text-5xl font-bold mb-7">Create Product</h1>
                        <form onSubmit={onSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <TextInput
                                    placeholder="Product Name"
                                    className="w-2/4 border-violet-700"
                                    name="name"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <TextInput
                                    placeholder="Product Description"
                                    className="w-2/4 border-violet-700"
                                    name="description"
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.description} className="mt-2" />
                            <div className="mb-3">
                                <TextInput type="number"
                                           placeholder="Product Price"
                                           className="w-2/4 border-violet-700"
                                           name="price"
                                           onChange={(e) => setData("price", e.target.value)}
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div className="mb-3" id="upload-image-row">
                                {imageUploadInputs.map((input, index) => (
                                    <div key={index} className="flex justify-between items-center w-2/4 mb-3">
                                        <label className="block">
                                            <input type="file" name="images" className="block w-full text-sm text-slate-500 n
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-violet-50 file:text-violet-700
                                          hover:file:bg-violet-100"
                                                   onChange={(e) => handleImageChange(e, index)}
                                            />
                                        </label>
                                        {index !== 0 && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeImageUploadInput(index);
                                                }}
                                                className="ml-2 py-2 px-5 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-75"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={addImageUploadInput}
                                    className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-3">
                                <h2 className="text-2xl font-bold">Category</h2>
                                <div className="flex mt-5 gap-4 w-2/4 flex-wrap">
                                    {categories.map((category) => (
                                        <div className="form-control" key={category.id}>
                                            <label
                                                className="flex gap-2 label items-center cursor-pointer py-2 px-5 bg-violet-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700">
                                                <span className="label-text">{category.name}</span>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="categories[]"
                                                    value={category.id}
                                                    onChange={setCategories}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <InputError message={errors.categories} className="mt-2" />
                                </div>
                            </div>
                            <button
                                className="py-2 px-5 mt-7 items-center bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                                Store Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
