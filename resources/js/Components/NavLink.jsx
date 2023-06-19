import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 ' +
                (active
                    ? 'bg-red-600 '
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
