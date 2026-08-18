import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Mic,
    Pencil,
    TriangleAlert,
    ShoppingCart,
    PackageX,
    FileBarChart2,
} from 'lucide-react';

function ActionButton({ icon: Icon, children, variant = 'ghost', onClick }) {
    const variants = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30',
        ghost: 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10',
        dangerOutline:
            'bg-transparent text-rose-400 border border-rose-500/40 hover:bg-rose-500/10',
        danger: 'bg-rose-950/60 text-rose-400 border border-rose-500/30 hover:bg-rose-900/60',
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ' +
                variants[variant]
            }
        >
            <Icon className="h-4 w-4" strokeWidth={2.25} />
            {children}
        </button>
    );
}

function Tab({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                'rounded-xl px-6 py-2.5 text-sm font-semibold transition ' +
                (active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200')
            }
        >
            {children}
        </button>
    );
}

const EMPTY_STATES = {
    ventas: {
        icon: ShoppingCart,
        title: 'Sin ventas registradas',
        subtitle:
            'Registrá tus ventas para ver tus ingresos y saber qué producto vendés más.',
    },
    merma: {
        icon: PackageX,
        title: 'Sin merma registrada',
        subtitle:
            'Registrá la merma de tus ingredientes o productos para llevar un control real de tus costos.',
    },
    cierres: {
        icon: FileBarChart2,
        title: 'Sin cierres registrados',
        subtitle:
            'Cerrá tu jornada o tu caja para ver un resumen de ventas, merma e ingresos por período.',
    },
};

export default function Ventas({ ventas = [], mermas = [], cierres = [] }) {
    const [tab, setTab] = useState('ventas');

    const dataByTab = { ventas, merma: mermas, cierres };
    const rows = dataByTab[tab] ?? [];
    const empty = EMPTY_STATES[tab];
    const EmptyIcon = empty.icon;

    return (
        <AppLayout current="Ventas">
            <Head title="Ventas" />

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Mic} variant="primary">
                    Dictar venta
                </ActionButton>
                <ActionButton icon={Pencil} variant="ghost">
                    Escribir venta
                </ActionButton>
                <ActionButton icon={Mic} variant="dangerOutline">
                    Dictar merma
                </ActionButton>
                <ActionButton icon={TriangleAlert} variant="danger">
                    Registrar merma
                </ActionButton>
            </div>

            <div className="mb-6 inline-flex rounded-2xl bg-white/[0.03] p-1">
                <Tab active={tab === 'ventas'} onClick={() => setTab('ventas')}>
                    Ventas
                </Tab>
                <Tab active={tab === 'merma'} onClick={() => setTab('merma')}>
                    Merma
                </Tab>
                <Tab active={tab === 'cierres'} onClick={() => setTab('cierres')}>
                    Cierres
                </Tab>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {rows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <EmptyIcon
                            className="mb-4 h-12 w-12 text-slate-600"
                            strokeWidth={1.5}
                        />
                        <p className="text-lg font-semibold text-slate-200">
                            {empty.title}
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            {empty.subtitle}
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-500">
                                <th className="py-2 font-medium">Producto</th>
                                <th className="py-2 font-medium">Cantidad</th>
                                <th className="py-2 font-medium">Total</th>
                                <th className="py-2 font-medium">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-white/5 last:border-0"
                                >
                                    <td className="py-3">{row.producto}</td>
                                    <td className="py-3">{row.cantidad}</td>
                                    <td className="py-3">
                                        {row.total !== undefined
                                            ? `$${row.total}`
                                            : '—'}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {row.fecha}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AppLayout>
    );
}
