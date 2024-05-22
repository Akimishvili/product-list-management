import {Head, useForm} from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create(){
    const { data, setData, post, errors, reset } = useForm({
        name: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("categories.store"));
    };
    return(
        <>
            <Head title={"Create Category"} />
            <div className="containe-lg p-10 ">
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
                        <h1 className="text-5xl font-bold mb-7">Create Category</h1>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <TextInput
                                    placeholder="Category Name"
                                    className="w-2/4 border-violet-700"
                                    name="name"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <button
                                className="py-2 px-5 mt-7 items-center bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                                Store Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
