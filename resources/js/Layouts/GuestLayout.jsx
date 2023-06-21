import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-neutral-900">
            <div>
                <Link href="/">
                    <span className="text-4xl font-bold text-gray-100">SEA Cinema</span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-10 px-6 py-4 bg-neutral-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
