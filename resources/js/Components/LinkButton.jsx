import {Link} from "@inertiajs/react";

export const LinkButton = ({classname, children, ...props}) => {
    return (
        <Link {...props}
              className={"block py-3 px-4 text-center text-white border hover-transition 600 rounded-lg shadow md:inline " + classname}>
            {children}
        </Link>
    )
}
