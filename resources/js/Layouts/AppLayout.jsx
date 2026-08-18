import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Receipt,
    Package,
    ChefHat,
    Factory,
    ShoppingCart,
    Building2,
    Share2,
    CircleUser,
} from 'lucide-react';

const NAV_ITEMS = [
    { name: 'Inicio', href: '/inicio', icon: LayoutGrid },
    { name: 'Facturas', href: '/facturas', icon: Receipt },
    { name: 'Ingredientes', href: '/ingredientes', icon: Package },
    { name: 'Recetas', href: '/recetas', icon: ChefHat },
    { name: 'Producción', href: '/produccion', icon: Factory },
    { name: 'Ventas', href: '/ventas', icon: ShoppingCart },
    { name: 'Presupuestos', href: '/presupuestos', icon: Building2 },
];

function NavItem({ item, active }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className={
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ' +
                (active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200')
            }
        >
            <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            {item.name}
        </Link>
    );
}

export default function AppLayout({ children, current }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className="flex min-h-screen bg-[#0b0b14] text-slate-200">
            {/* Sidebar */}
            <aside className="flex w-72 flex-col border-r border-white/5 bg-[#0e0e1a] px-4 py-6">
                <div className="mb-8 flex items-center gap-3 px-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg">
                        📸
                    </div>
                    <div>
                        <div className="text-lg font-bold leading-tight text-white">
                            Insta<span className="text-indigo-400">Cost</span>
                        </div>
                        <div className="text-[11px] leading-tight text-slate-500">
                            Sacá la foto. Tenés el costo.
                        </div>
                    </div>
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                        <NavItem
                            key={item.name}
                            item={item}
                            active={current === item.name}
                        />
                    ))}
                </nav>

                <div className="mt-6 flex flex-col gap-1 border-t border-white/5 pt-4">
                    <Link
                        href="/compartir"
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-400 hover:bg-white/5"
                    >
                        <Share2 className="h-[18px] w-[18px]" strokeWidth={2} />
                        Compartir la app
                    </Link>
                    <Link
                        href="/perfil"
                        className={
                            'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ' +
                            (current === 'Mi perfil'
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200')
                        }
                    >
                        <CircleUser className="h-[18px] w-[18px]" strokeWidth={2} />
                        Mi perfil
                    </Link>
                    <Link
                        href="/perfil"
                        className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
                            {initial}
                        </span>
                        Mi cuenta
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
        </div>
    );
}
