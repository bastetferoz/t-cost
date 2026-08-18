import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Mic, Pencil, ChevronLeft } from 'lucide-react';

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

const UNIDADES_COMPRA = [
    { value: 'G', label: 'gramos (g)' },
    { value: 'KG', label: 'kilogramos (kg)' },
    { value: 'ML', label: 'mililitros (ml)' },
    { value: 'L', label: 'litros (L)' },
    { value: 'UNIDAD', label: 'unidades' },
    { value: 'DOCENA', label: 'docenas' },
    { value: 'PAQUETE', label: 'paquetes / bolsas / cajas' },
];

const UNIDADES_STOCK = [
    { value: 'G', label: 'gramos (g)' },
    { value: 'KG', label: 'kilogramos (kg)' },
    { value: 'ML', label: 'mililitros (ml)' },
    { value: 'L', label: 'litros (L)' },
    { value: 'UNIDAD', label: 'unidades' },
];

function NuevoIngredienteForm({ onVolver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        compra_cantidad: '',
        compra_unidad: '',
        precio_total_pagado: '',
        stock_cantidad: '',
        stock_unidad: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('ingredientes.store'), {
            onSuccess: () => reset(),
        });
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
                Nuevo ingrediente
            </h2>

            <form onSubmit={submit} className="max-w-xl space-y-5">
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Harina 000"
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

                <div className="border-t border-white/5 pt-5">
                    <p className="mb-3 text-sm text-slate-400">
                        Compra <span className="text-slate-600">(opcional)</span>
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                placeholder="Ej: 2"
                                value={data.compra_cantidad}
                                onChange={(e) =>
                                    setData('compra_cantidad', e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Unidad de compra
                            </label>
                            <select
                                value={data.compra_unidad}
                                onChange={(e) =>
                                    setData('compra_unidad', e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="">Seleccioná una medida</option>
                                {UNIDADES_COMPRA.map((u) => (
                                    <option key={u.value} value={u.value}>
                                        {u.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Precio total pagado ($)
                            </label>
                            <input
                                type="number"
                                placeholder="Ej: 32000"
                                value={data.precio_total_pagado}
                                onChange={(e) =>
                                    setData(
                                        'precio_total_pagado',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                    <p className="mb-3 text-sm text-slate-400">
                        Stock disponible ahora{' '}
                        <span className="text-slate-600">(opcional)</span>
                    </p>

                    <div className="flex gap-3">
                        <input
                            type="number"
                            placeholder="Ej: 50"
                            value={data.stock_cantidad}
                            onChange={(e) =>
                                setData('stock_cantidad', e.target.value)
                            }
                            className="flex-1 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                        />
                        <select
                            value={data.stock_unidad}
                            onChange={(e) =>
                                setData('stock_unidad', e.target.value)
                            }
                            className="rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="">gramos (g)</option>
                            {UNIDADES_STOCK.map((u) => (
                                <option key={u.value} value={u.value}>
                                    {u.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50"
                >
                    Guardar ingrediente
                </button>
            </form>
        </div>
    );
}

export default function Ingredientes({ ingredientes = [] }) {
    const [mostrarForm, setMostrarForm] = useState(false);

    if (mostrarForm) {
        return (
            <AppLayout current="Ingredientes">
                <Head title="Ingredientes" />
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Ingredientes
                </h1>
                <NuevoIngredienteForm onVolver={() => setMostrarForm(false)} />
            </AppLayout>
        );
    }

    return (
        <AppLayout current="Ingredientes">
            <Head title="Ingredientes" />

            <h1 className="mb-6 text-2xl font-bold text-white">
                Ingredientes
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Mic} variant="primary">
                    Dictar compra
                </ActionButton>
                <ActionButton
                    icon={Pencil}
                    variant="ghost"
                    onClick={() => setMostrarForm(true)}
                >
                    Cargar manualmente
                </ActionButton>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {ingredientes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 text-5xl">🧂</div>
                        <p className="text-lg font-semibold text-slate-200">
                            Todavía no tenés ingredientes
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Escaneá una factura de proveedor y los cargamos
                            automáticamente, o agregá uno a mano con el botón
                            de arriba.
                        </p>
                        <Link
                            href="/facturas"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                        >
                            Escanear factura
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-500">
                                <th className="py-2 font-medium">Nombre</th>
                                <th className="py-2 font-medium">Compra</th>
                                <th className="py-2 font-medium">
                                    Costo unitario
                                </th>
                                <th className="py-2 font-medium">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientes.map((ing) => (
                                <tr
                                    key={ing.id}
                                    className="border-b border-white/5 last:border-0"
                                >
                                    <td className="py-3 text-slate-100">
                                        {ing.nombre}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {ing.compra_cantidad
                                            ? `${ing.compra_cantidad} ${ing.compra_unidad ?? ''} · $${ing.precio_total_pagado}`
                                            : '—'}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {ing.costo_unitario
                                            ? `$${ing.costo_unitario}`
                                            : '—'}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {ing.stock_cantidad
                                            ? `${ing.stock_cantidad} ${ing.stock_unidad ?? ''}`
                                            : '—'}
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
