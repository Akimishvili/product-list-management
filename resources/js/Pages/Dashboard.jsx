import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import Create from "@/Pages/Product/Create.jsx";
import {useState} from "react";
import NavLink from "@/Components/NavLink.jsx";


export default function Dashboard() {

    return (
        <>
            <Head title={"Admin"}/>
            <div className="container-lg">
                <div className="row flex w-full p-7 justify-around">
                    {/* Example of dynamic content switching */}
                    <NavLink className={"text-sky-600"}
                             href={route("products.create")}
                    >
                        <span className="text-3xl">
                            Create Product
                        </span>

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                         </svg>
                         </span>
                    </NavLink>
                    <NavLink className={"text-sky-600"}
                             href={route("categories.create")}
                    >
                          <span className="text-3xl">
                             Create Category
                         </span>

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z"/>
                            </svg>
                        </span>
                    </NavLink>
                    <NavLink className={"text-4xl text-sky-600"}
                             href={route("products.index")}
                    >
                         <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
                            </svg>
                        </span>
                        <span className="text-3xl">
                             Back
                         </span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
