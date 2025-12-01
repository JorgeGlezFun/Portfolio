import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <div className="contenedorNavLinkCRUD">
            <Link
                {...props}
                className={
                    '' +
                    (active
                        ? 'headerActivadoCRUD'
                        : 'headerSinActivarCRUD') +
                    className
                }
            >
                {children}
            </Link>
        </div>
    );
}
