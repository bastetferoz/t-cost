import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Mic, Pencil, ChevronLeft, Plus, X } from 'lucide-react';

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

const UNIDADES_CONSUMO = [
    { value: 'G', label: 'gramos (g)' },
    { value: 'KG', label: 'kilogramos (kg)' },
    { value: 'ML', label: 'mililitros (ml)' },
    { value: 'L', label: 'litros (L)' },
    { value: 'UNIDAD', label: 'unidades' },
];

function nuevaLinea() {
    return { ingrediente_id: '', cantidad: '', unidad: '' };
}

function NuevaRecetaForm({ ingredientesDisponibles, onVolver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        rendimiento_cantidad: 1,
        rendimiento_unidad: 'unidad',
        vida_util_dias: '',
        ingredientes: [nuevaLinea()],
    });

    function actualizarLinea(index, campo, valor) {
        const lineas = [...data.ingredientes];
        lineas[index] = { ...lineas[index], [campo]: valor };
        setData('ingredientes', lineas);
    }

    function agregarLinea() {
        setData('ingredientes', [...data.ingredientes, nuevaLinea()]);
    }

    function quitarLinea(index) {
        setData(
            'ingredientes',
            data.ingredientes.filter((_, i) => i !== index),
        );
    }

    function submit(e) {
        e.preventDefault();
        post(route('recetas.store'), {
            onSuccess: () => reset(),
            // Los items vacíos (sin ingrediente seleccionado) no se envían.
            transform: (formData) => ({
                ...formData,
                ingredientes: formData.ingredientes.filter(
                    (l) => l.ingrediente_id,
                ),
            }),
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
                Nueva receta
            </h2>

            <form onSubmit={submit} className="max-w-xl space-y-5">
                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Medialunas de manteca"
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
                        Rinde
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={data.rendimiento_cantidad}
                            onChange={(e) =>
                                setData('rendimiento_cantidad', e.target.value)
                            }
                            className="w-24 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            value={data.rendimiento_unidad}
                            onChange={(e) =>
                                setData('rendimiento_unidad', e.target.value)
                            }
                            className="flex-1 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm text-slate-400">
                        Vida útil{' '}
                        <span className="text-slate-600">(opcional)</span>
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            placeholder="Ej: 3"
                            value={data.vida_util_dias}
                            onChange={(e) =>
                                setData('vida_util_dias', e.target.value)
                            }
                            className="w-24 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                        />
                        <span className="text-sm text-slate-500">
                            días desde la producción
                        </span>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                    <p className="mb-3 text-sm text-slate-400">
                        Ingredientes{' '}
                        <span className="text-slate-600">
                            (opcional si usás sub-recetas)
                        </span>
                    </p>

                    <div className="space-y-3">
                        {data.ingredientes.map((linea, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/5 bg-[#0e0e1a] p-4"
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    <select
                                        value={linea.ingrediente_id}
                                        onChange={(e) =>
                                            actualizarLinea(
                                                index,
                                                'ingrediente_id',
                                                e.target.value,
                                            )
                                        }
                                        className="flex-1 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="">
                                            Seleccioná un ingrediente
                                        </option>
                                        {ingredientesDisponibles.map((ing) => (
                                            <option key={ing.id} value={ing.id}>
                                                {ing.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {data.ingredientes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => quitarLinea(index)}
                                            className="text-slate-500 hover:text-rose-400"
                                        >
                                            <X className="h-4 w-4" strokeWidth={2} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                            Cantidad
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Cantidad"
                                            value={linea.cantidad}
                                            onChange={(e) =>
                                                actualizarLinea(
                                                    index,
                                                    'cantidad',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                            Unidad
                                        </label>
                                        <select
                                            value={linea.unidad}
                                            onChange={(e) =>
                                                actualizarLinea(
                                                    index,
                                                    'unidad',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                                        >
                                            <option value="">
                                                Seleccioná una medida
                                            </option>
                                            {UNIDADES_CONSUMO.map((u) => (
                                                <option
                                                    key={u.value}
                                                    value={u.value}
                                                >
                                                    {u.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={agregarLinea}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2.25} />
                        Agregar ingrediente
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50"
                >
                    Guardar receta
                </button>
            </form>
        </div>
    );
}

export default function Recetas({ recetas = [], ingredientesDisponibles = [] }) {
    const [mostrarForm, setMostrarForm] = useState(false);
    const sinIngredientes = ingredientesDisponibles.length === 0;

    if (mostrarForm && !sinIngredientes) {
        return (
            <AppLayout current="Recetas">
                <Head title="Recetas" />
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Recetas
                </h1>
                <NuevaRecetaForm
                    ingredientesDisponibles={ingredientesDisponibles}
                    onVolver={() => setMostrarForm(false)}
                />
            </AppLayout>
        );
    }

    return (
        <AppLayout current="Recetas">
            <Head title="Recetas" />

            <h1 className="mb-6 text-2xl font-bold text-white">Recetas</h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Mic} variant="primary">
                    Dictar receta
                </ActionButton>
                <ActionButton
                    icon={Pencil}
                    variant="ghost"
                    onClick={() => setMostrarForm(true)}
                >
                    Escribir receta
                </ActionButton>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {recetas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 text-5xl">👨‍🍳</div>
                        <p className="text-lg font-semibold text-slate-200">
                            Todavía no tenés recetas
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Para armar una receta primero necesitás
                            ingredientes. Podés cargarlos escaneando una
                            factura o a mano.
                        </p>
                        <Link
                            href="/ingredientes"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                        >
                            Ir a ingredientes
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-500">
                                <th className="py-2 font-medium">Nombre</th>
                                <th className="py-2 font-medium">
                                    Rendimiento
                                </th>
                                <th className="py-2 font-medium">
                                    Costo total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recetas.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b border-white/5 last:border-0"
                                >
                                    <td className="py-3 text-slate-100">
                                        {r.nombre}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {r.rendimiento_cantidad}{' '}
                                        {r.rendimiento_unidad}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        ${r.costo_total?.toFixed?.(2) ?? r.costo_total}
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
