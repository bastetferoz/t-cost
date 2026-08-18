import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Plus, Mic, ChevronLeft } from 'lucide-react';

function ActionButton({ icon: Icon, children, variant = 'ghost', onClick }) {
    const variants = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30',
        ghost: 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10',
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

function NuevoPresupuestoForm({ onVolver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        cliente: '',
        total: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('presupuestos.store'), { onSuccess: () => reset() });
    }

    return (
        <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
            <button
                type="button"
                onClick={onVolver}
                className="mb-4 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200"
            >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                Volver
            </button>

            <h2 className="mb-5 text-lg font-bold text-white">
                Nuevo presupuesto
            </h2>

            <form onSubmit={submit} className="max-w-md space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Nombre del presupuesto
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Torta cumpleaños x 30"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                    {errors.nombre && (
                        <p className="mt-1 text-xs text-rose-400">
                            {errors.nombre}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Cliente (opcional)
                    </label>
                    <input
                        type="text"
                        value={data.cliente}
                        onChange={(e) => setData('cliente', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Total ($)
                    </label>
                    <input
                        type="number"
                        value={data.total}
                        onChange={(e) => setData('total', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50"
                >
                    Guardar presupuesto
                </button>
            </form>
        </div>
    );
}

export default function Presupuestos({ presupuestos = [] }) {
    const [mostrarForm, setMostrarForm] = useState(false);

    if (mostrarForm) {
        return (
            <AppLayout current="Presupuestos">
                <Head title="Presupuestos" />
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Presupuestos
                </h1>
                <NuevoPresupuestoForm onVolver={() => setMostrarForm(false)} />
            </AppLayout>
        );
    }

    return (
        <AppLayout current="Presupuestos">
            <Head title="Presupuestos" />

            <h1 className="mb-6 text-2xl font-bold text-white">
                Presupuestos
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton
                    icon={Plus}
                    variant="primary"
                    onClick={() => setMostrarForm(true)}
                >
                    Nuevo presupuesto
                </ActionButton>
                <ActionButton icon={Mic} variant="ghost">
                    Dictar presupuesto
                </ActionButton>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {presupuestos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 text-5xl">💰</div>
                        <p className="text-lg font-semibold text-slate-200">
                            Todavía no tenés presupuestos.
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Armá un presupuesto para calcular el costo de un
                            evento o pedido.
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-500">
                                <th className="py-2 font-medium">Nombre</th>
                                <th className="py-2 font-medium">Cliente</th>
                                <th className="py-2 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presupuestos.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-white/5 last:border-0"
                                >
                                    <td className="py-3 text-slate-100">
                                        {p.nombre}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {p.cliente || '—'}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        ${p.total}
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
