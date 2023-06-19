import {Navbar} from "@/Components/Navbar";

export const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar/>

            {children}
        </div>
    )
}
