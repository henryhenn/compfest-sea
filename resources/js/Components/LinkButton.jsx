import {Link} from "@inertiajs/react";

export const LinkButton = ({classname, children, ...props}) => {
    return (
        <Link {...props}
              className={"block py-2.5 px-4 text-center text-gray-100 border hover-transition 600 rounded-lg shadow md:inline " + classname}>
            {children}
        </Link>
    )
}
