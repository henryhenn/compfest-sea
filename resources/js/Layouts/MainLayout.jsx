import {Navbar} from "@/Components/Navbar.jsx";

export default function MainLayout({children}) {
    return (
        <div className="bg-neutral-900 text-gray-100 pb-20">
            <Navbar/>

            <div className="container">
                {children}
            </div>
        </div>
    )
}
