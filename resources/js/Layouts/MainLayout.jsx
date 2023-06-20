import {Navbar} from "@/Components/Navbar.jsx";
import {Alert} from "@/Components/Alert.jsx";

export default function MainLayout({children}) {
    return (
        <div className="min-h-screen bg-neutral-900 text-gray-100">
            <Navbar/>

            <div className="container">
                <Alert />

                {children}
            </div>
        </div>
    )
}
