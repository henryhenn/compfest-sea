import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {MovieCard} from "@/Components/MovieCard.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Movies({movies}) {
    console.log(movies)

    return (
        <MainLayout>
            <Head title="All Movies"/>

            <div className="flex flex-col gap-6 mb-20">
                <h1 className="text-6xl md:text-7xl text-center bg-clip-text text-transparent border-none bg-gradient-to-r from-gray-100 to-gray-400 font-extrabold">
                    All Movies
                </h1>

                <form action="">
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value=""
                        className="mt-1 block w-full"
                        isFocused={false}
                        // onChange={(e) => setData('username', e.target.value)}
                    />
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {movies.data.map((movie) => (
                    <MovieCard movie={movie}/>
                ))}
            </div>

            <div className="text-md mt-12 flex justify-end">
                <div className="flex items-center gap-12" aria-label="Pagination">
                    <ul className="flex items-center gap-1">
                        {
                            movies.meta.links.map((item) => (
                                <li key={item.url ?? null}>
                                    {item.url ? (
                                        <Link href={item.url}
                                              className={`px-3 py-2 rounded-lg duration-150 hover:text-gray-100 hover:bg-red-600 ${item.active ? "bg-red-600 font-medium" : ""}`}>
                                            {item.label.replace("&laquo;", "").replace("&raquo;", "")}
                                        </Link>
                                    ) : (
                                        <span
                                              className="px-3 py-2 rounded-lg duration-15">
                                            {item.label.replace("&laquo;", "").replace("&raquo;", "")}
                                        </span>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </MainLayout>
    )

}

// import { useState } from "react"

// export default () => {
//
//     const [pages, setPages] = useState(["1", "2", "3", , "...", "8", "9", "10",])
//     const [currentPage, setCurrentPage] = useState("1")
//
//     return (
//         <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
//             <div className="hidden justify-between text-sm md:flex">
//                 <div>
//                     SHOWING 1-10 OF 120
//                 </div>
//                 <div className="flex items-center gap-12" aria-label="Pagination">
//                     <a href="javascript:void(0)" className="hover:text-indigo-600">
//                         Previous
//                     </a>
//                     <ul className="flex items-center gap-1">
//                         {
//                             pages.map((item, idx) => (
//                                 <li key={item}>
//                                     {
//                                         item == "..." ? (
//                                             <div>
//                                                 {item}
//                                             </div>
//                                         ) : (
//
//                                             <a href="javascript:void(0)" aria-current={currentPage == item ? "page" : false} className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${currentPage == item ? "bg-indigo-600 text-white font-medium" : ""}`}>
//                                                 {item}
//                                             </a>
//                                         )
//                                     }
//                                 </li>
//                             ))
//                         }
//                     </ul>
//                     <a href="javascript:void(0)" className="hover:text-indigo-600">
//                         Next
//                     </a>
//                 </div>
//             </div>
//             {/* On mobile version */}
//             <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
//                 <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</a>
//                 <div className="font-medium">
//                     SHOWING 1-10 OF 120
//                 </div>
//                 <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</a>
//             </div>
//         </div>
//     )
// }
