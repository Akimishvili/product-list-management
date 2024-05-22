import NavLink from "@/Components/NavLink.jsx";

export default function Show({product}){
    return(
        <div className="container-lg p-5">
            <div className="row">
                <div className="col">
                    <NavLink className={"text-4xl text-sky-600"}
                             href={"/"}
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
            <div className="row flex justify-center">
                <div className="col">
                    <div className="card w-96 bg-base-100 shadow-xl pb-8">
                        <figure className="px-10 pt-10">
                            {product.images.length > 0 ? (
                                <div className="flex items-center justify-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle">
                                            <img src={"/storage/" + product.images[0].src} alt="Product Image"/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle">
                                            <img src="/storage/images/products/default-product-image.jpg" alt="Default Product Image"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title pb-2">
                                <span className="font-bold"> Name:</span> {product.name}
                            </h2>
                            <p className="pb-2">
                                <span className="font-bold">Description:</span> {product.description}
                            </p>
                            <p className="pb-2">
                                <span className="font-bold">Price:</span> {product.price}
                            </p>
                        </div>
                        <div className="card-footer items-center text-center">
                            <div className="flex justify-center">
                                <span className="font-bold">Categories:</span>
                                {product.categories.map((category, index) => (
                                    <span className="mr-4" key={index}>
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
