import {Navbar} from "@/Components/Navbar.jsx";

export default function MainLayout({children}) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar/>

            <div className="container">
                {children}
            </div>
        </div>
    )
}
