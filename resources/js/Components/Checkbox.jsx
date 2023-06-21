export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded bg-neutral-900 border-gray-700 text-red-600 shadow-sm focus:ring-red-600 focus:ring-offset-red-800 ' +
                className
            }
        />
    );
}
