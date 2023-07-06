import {Link} from '@inertiajs/react';

export default function NavLink({active = false, className = '', children, ...props}) {
    return (
        <Link
            {...props}
            className={
                'block py-2 pl-3 pr-4 text-gray-100 rounded hover-transition hover:bg-red-600 md:hover:bg-transparent md:hover:text-red-600 md:bg-transparent md:p-0 ' +
                (active
                    ? 'md:text-red-600 bg-red-600 '
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
