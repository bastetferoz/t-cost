import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Toast from '@/Components/Toast';
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
    Menu,
    X,
} from 'lucide-react';

const WHATSAPP_SHARE_URL =
    'https://wa.me/?text=' +
    encodeURIComponent(
        'Por fin sé cuánto me cuesta cada producto 🍞 Estoy usando InstaCost para calcular los costos de mi panadería. Nunca más pongo los precios a ojo. Probalo gratis → www.instacost.shop',
    );

const NAV_ITEMS = [
    { name: 'Inicio', href: '/dashboard', icon: LayoutGrid },
    { name: 'Facturas', href: '/facturas', icon: Receipt },
    { name: 'Ingredientes', href: '/ingredientes', icon: Package },
    { name: 'Recetas', href: '/recetas', icon: ChefHat },
    { name: 'Producción', href: '/produccion', icon: Factory },
    { name: 'Ventas', href: '/ventas', icon: ShoppingCart },
    { name: 'Presupuestos', href: '/presupuestos', icon: Building2 },
];

function NavItem({ item, active, onClick }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            onClick={onClick}
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

function SidebarContent({ current, initial, onNavClick }) {
    return (
        <>
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
                        onClick={onNavClick}
                    />
                ))}
            </nav>

            <div className="mt-6 flex flex-col gap-1 border-t border-white/5 pt-4">
                <a
                    href={WHATSAPP_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-400 hover:bg-white/5"
                >
                    <Share2 className="h-[18px] w-[18px]" strokeWidth={2} />
                    Compartir la app
                </a>
                <Link
                    href="/perfil"
                    onClick={onNavClick}
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
                <div className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
                        {initial}
                    </span>
                    Mi cuenta
                </div>
            </div>
        </>
    );
}

export default function AppLayout({ children, current }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?';
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#0b0b14] text-slate-200">
            {/* Mobile header */}
            <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0e0e1a] px-4 py-3 lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm">
                        📸
                    </div>
                    <span className="text-base font-bold text-white">
                        Insta<span className="text-indigo-400">Cost</span>
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white"
                    aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" strokeWidth={2} />
                    ) : (
                        <Menu className="h-5 w-5" strokeWidth={2} />
                    )}
                </button>
            </header>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile sidebar drawer */}
            <aside
                className={
                    'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 bg-[#0e0e1a] px-4 py-6 transition-transform duration-200 lg:hidden ' +
                    (mobileOpen ? 'translate-x-0' : '-translate-x-full')
                }
            >
                <SidebarContent
                    current={current}
                    initial={initial}
                    onNavClick={() => setMobileOpen(false)}
                />
            </aside>

            {/* Desktop sidebar */}
            <aside className="hidden w-72 flex-col border-r border-white/5 bg-[#0e0e1a] px-4 py-6 lg:flex">
                <SidebarContent
                    current={current}
                    initial={initial}
                    onNavClick={undefined}
                />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:py-8">
                {children}
            </main>

            <Toast />
        </div>
    );
}
