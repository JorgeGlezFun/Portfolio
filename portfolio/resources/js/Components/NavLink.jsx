import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <div className="contenedorNavLink">
            <Link
                {...props}
                className={
                    '' +
                    (active
                        ? 'headerActivado'
                        : 'headerSinActivar') +
                    className
                }
            >
                {children}
            </Link>
        </div>
    );
}
