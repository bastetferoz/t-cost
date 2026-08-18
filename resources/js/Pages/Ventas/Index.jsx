import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Mic,
    Pencil,
    TriangleAlert,
    ShoppingCart,
    BookOpen,
    ChevronLeft,
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
        emoji: '✅',
        title: 'Sin merma registrada',
        subtitle:
            'Si perdiste o desechaste algún producto, registralo acá para tener el dato real.',
    },
    cierres: {
        icon: BookOpen,
        title: 'Sin cierres registrados',
        subtitle:
            'Cada vez que cerrás el día desde el dashboard, el registro aparece acá.',
    },
};

function PanelVolver({ onVolver }) {
    return (
        <button
            type="button"
            onClick={onVolver}
            className="mb-4 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200"
        >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            Volver
        </button>
    );
}

function GateSinRecetas({ mensaje, onVolver }) {
    return (
        <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
            <PanelVolver onVolver={onVolver} />
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="max-w-sm text-sm text-slate-400">{mensaje}</p>
                <div className="mt-5 flex items-center gap-4">
                    <Link
                        href="/recetas"
                        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                        Ir a recetas →
                    </Link>
                    <button
                        type="button"
                        onClick={onVolver}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

function EscribirVentaForm({ recetas, onVolver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        receta_id: '',
        cantidad: '1',
        precio_unitario: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('ventas.store'), { onSuccess: () => reset() });
    }

    return (
        <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
            <PanelVolver onVolver={onVolver} />
            <h2 className="mb-5 text-lg font-bold text-white">
                Registrar venta
            </h2>
            <form onSubmit={submit} className="max-w-md space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Receta
                    </label>
                    <select
                        value={data.receta_id}
                        onChange={(e) => setData('receta_id', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    >
                        <option value="">Seleccioná una receta</option>
                        {recetas.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.receta_id && (
                        <p className="mt-1 text-xs text-rose-400">
                            {errors.receta_id}
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            value={data.cantidad}
                            onChange={(e) =>
                                setData('cantidad', e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Precio unitario ($)
                        </label>
                        <input
                            type="number"
                            value={data.precio_unitario}
                            onChange={(e) =>
                                setData('precio_unitario', e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50"
                >
                    Guardar venta
                </button>
            </form>
        </div>
    );
}

function RegistrarMermaForm({ recetas, onVolver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        receta_id: '',
        cantidad: '1',
        motivo: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('ventas.merma.store'), { onSuccess: () => reset() });
    }

    return (
        <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
            <PanelVolver onVolver={onVolver} />
            <h2 className="mb-5 text-lg font-bold text-white">
                Registrar merma
            </h2>
            <form onSubmit={submit} className="max-w-md space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Receta / producto
                    </label>
                    <select
                        value={data.receta_id}
                        onChange={(e) => setData('receta_id', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    >
                        <option value="">Seleccioná una receta</option>
                        {recetas.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.receta_id && (
                        <p className="mt-1 text-xs text-rose-400">
                            {errors.receta_id}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Cantidad perdida
                    </label>
                    <input
                        type="number"
                        value={data.cantidad}
                        onChange={(e) => setData('cantidad', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Motivo (opcional)
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: se quemó, venció, se rompió"
                        value={data.motivo}
                        onChange={(e) => setData('motivo', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 disabled:opacity-50"
                >
                    Guardar merma
                </button>
            </form>
        </div>
    );
}

export default function Ventas({
    ventas = [],
    mermas = [],
    cierres = [],
    recetasDisponibles = [],
}) {
    const [tab, setTab] = useState('ventas');
    const [panel, setPanel] = useState('lista');

    const sinRecetas = recetasDisponibles.length === 0;

    const dataByTab = { ventas, merma: mermas, cierres };
    const rows = dataByTab[tab] ?? [];
    const empty = EMPTY_STATES[tab];
    const EmptyIcon = empty.icon;
    const emptyEmoji = empty.emoji;

    if (panel === 'venta') {
        return (
            <AppLayout current="Ventas">
                <Head title="Ventas" />
                {sinRecetas ? (
                    <GateSinRecetas
                        mensaje="Para registrar una venta necesitás tener recetas. Creá tu primera receta y volvé acá."
                        onVolver={() => setPanel('lista')}
                    />
                ) : (
                    <EscribirVentaForm
                        recetas={recetasDisponibles}
                        onVolver={() => setPanel('lista')}
                    />
                )}
            </AppLayout>
        );
    }

    if (panel === 'merma') {
        return (
            <AppLayout current="Ventas">
                <Head title="Ventas" />
                {sinRecetas ? (
                    <GateSinRecetas
                        mensaje="Primero creá recetas para poder registrar merma."
                        onVolver={() => setPanel('lista')}
                    />
                ) : (
                    <RegistrarMermaForm
                        recetas={recetasDisponibles}
                        onVolver={() => setPanel('lista')}
                    />
                )}
            </AppLayout>
        );
    }

    return (
        <AppLayout current="Ventas">
            <Head title="Ventas" />

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Mic} variant="primary">
                    Dictar venta
                </ActionButton>
                <ActionButton
                    icon={Pencil}
                    variant="ghost"
                    onClick={() => setPanel('venta')}
                >
                    Escribir venta
                </ActionButton>
                <ActionButton icon={Mic} variant="dangerOutline">
                    Dictar merma
                </ActionButton>
                <ActionButton
                    icon={TriangleAlert}
                    variant="danger"
                    onClick={() => setPanel('merma')}
                >
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
                        {emptyEmoji ? (
                            <div className="mb-4 text-5xl">{emptyEmoji}</div>
                        ) : (
                            <EmptyIcon
                                className="mb-4 h-12 w-12 text-slate-600"
                                strokeWidth={1.5}
                            />
                        )}
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
