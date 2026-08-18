import { useMemo, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Plus, Mic, X, ChefHat, Tag } from 'lucide-react';

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

function money(n) {
    const value = Number(n) || 0;
    return (
        '$' +
        value.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    );
}

function nuevoItemReceta() {
    return { tipo: 'receta', receta_id: '', cantidad: '', precio_venta_total: '' };
}

function nuevoItemLibre() {
    return {
        tipo: 'libre',
        descripcion: '',
        cantidad: 1,
        unidad: '',
        costo_unitario: '',
        precio_venta_total: '',
    };
}

function calcularItem(item, recetasDisponibles) {
    const cantidad = Number(item.cantidad) || 0;
    const precioVenta = Number(item.precio_venta_total) || 0;

    if (item.tipo === 'receta') {
        const receta = recetasDisponibles.find(
            (r) => String(r.id) === String(item.receta_id),
        );
        const costoUnitario = receta?.costo_por_unidad ?? 0;
        return { costo: costoUnitario * cantidad, venta: precioVenta };
    }

    const costoUnitario = Number(item.costo_unitario) || 0;
    return { costo: costoUnitario * (cantidad || 1), venta: precioVenta };
}

function ItemSummary({ costo, venta }) {
    if (!costo && !venta) return null;
    const margen = costo > 0 ? Math.round(((venta - costo) / costo) * 1000) / 10 : 0;
    return (
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
            <span>
                Costo: <span className="text-slate-300">{money(costo)}</span>
            </span>
            <span>
                Venta: <span className="text-slate-300">{money(venta)}</span>
            </span>
            {costo > 0 && (
                <span
                    className={margen >= 0 ? 'text-emerald-400' : 'text-rose-400'}
                >
                    {margen >= 0 ? '+' : ''}
                    {margen}% margen
                </span>
            )}
        </div>
    );
}

function ItemRow({ item, index, recetasDisponibles, onChange, onRemove }) {
    const { costo, venta } = calcularItem(item, recetasDisponibles);

    function set(campo, valor) {
        onChange(index, { ...item, [campo]: valor });
    }

    return (
        <div className="rounded-2xl border border-white/5 bg-[#0e0e1a] p-4">
            <div className="mb-3 flex items-center justify-between">
                <span
                    className={
                        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ' +
                        (item.tipo === 'receta'
                            ? 'bg-indigo-500/15 text-indigo-300'
                            : 'bg-amber-500/15 text-amber-300')
                    }
                >
                    {item.tipo === 'receta' ? (
                        <ChefHat className="h-3.5 w-3.5" strokeWidth={2.25} />
                    ) : (
                        <Tag className="h-3.5 w-3.5" strokeWidth={2.25} />
                    )}
                    {item.tipo === 'receta' ? 'Receta' : 'Ítem libre'}
                </span>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-slate-500 hover:text-rose-400"
                >
                    <X className="h-4 w-4" strokeWidth={2} />
                </button>
            </div>

            {item.tipo === 'receta' ? (
                <>
                    <select
                        value={item.receta_id}
                        onChange={(e) => set('receta_id', e.target.value)}
                        className="mb-3 w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    >
                        <option value="">Seleccioná una receta</option>
                        {recetasDisponibles.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.nombre}
                            </option>
                        ))}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                placeholder="Ej: 50"
                                value={item.cantidad}
                                onChange={(e) => set('cantidad', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                Precio de venta total
                            </label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b14] px-3">
                                <span className="text-sm text-slate-500">$</span>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={item.precio_venta_total}
                                    onChange={(e) =>
                                        set('precio_venta_total', e.target.value)
                                    }
                                    className="w-full bg-transparent px-2 py-2.5 text-sm text-slate-100 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Ej: Mozo, Alquiler de silla, Decoración"
                        value={item.descripcion}
                        onChange={(e) => set('descripcion', e.target.value)}
                        className="mb-3 w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                    <div className="mb-3 grid grid-cols-[1fr_1fr_1.4fr] gap-3">
                        <div>
                            <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                value={item.cantidad}
                                onChange={(e) => set('cantidad', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-[11px] uppercase tracking-wide text-transparent">
                                Unidad
                            </label>
                            <input
                                type="text"
                                placeholder="hora, día"
                                value={item.unidad}
                                onChange={(e) => set('unidad', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                                Costo / U
                            </label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b14] px-3">
                                <span className="text-sm text-slate-500">$</span>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={item.costo_unitario}
                                    onChange={(e) =>
                                        set('costo_unitario', e.target.value)
                                    }
                                    className="w-full bg-transparent px-2 py-2.5 text-sm text-slate-100 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">
                            Precio de venta total
                        </label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b14] px-3">
                            <span className="text-sm text-slate-500">$</span>
                            <input
                                type="number"
                                placeholder="0"
                                value={item.precio_venta_total}
                                onChange={(e) =>
                                    set('precio_venta_total', e.target.value)
                                }
                                className="w-full bg-transparent px-2 py-2.5 text-sm text-slate-100 focus:outline-none"
                            />
                        </div>
                    </div>
                </>
            )}

            <ItemSummary costo={costo} venta={venta} />
        </div>
    );
}

function NuevoPresupuestoModal({ recetasDisponibles, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        fecha_servicio: '',
        descripcion: '',
        items: [nuevoItemReceta()],
    });

    function actualizarItem(index, item) {
        const items = [...data.items];
        items[index] = item;
        setData('items', items);
    }

    function agregarItem(tipo) {
        setData('items', [
            ...data.items,
            tipo === 'receta' ? nuevoItemReceta() : nuevoItemLibre(),
        ]);
    }

    function quitarItem(index) {
        setData('items', data.items.filter((_, i) => i !== index));
    }

    const totales = useMemo(() => {
        return data.items.reduce(
            (acc, item) => {
                const { costo, venta } = calcularItem(item, recetasDisponibles);
                acc.costo += costo;
                acc.venta += venta;
                return acc;
            },
            { costo: 0, venta: 0 },
        );
    }, [data.items, recetasDisponibles]);

    const margen =
        totales.costo > 0
            ? Math.round(((totales.venta - totales.costo) / totales.costo) * 1000) / 10
            : 0;

    function submit(e) {
        e.preventDefault();
        post(route('presupuestos.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl border border-white/10 bg-[#12121f] shadow-2xl">
                <div className="flex items-start justify-between border-b border-white/5 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Nuevo presupuesto
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Recetas + ítems libres (mozos, alquiler, etc.)
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-200"
                    >
                        <X className="h-5 w-5" strokeWidth={2} />
                    </button>
                </div>

                <form
                    id="form-presupuesto"
                    onSubmit={submit}
                    className="flex-1 space-y-5 overflow-y-auto px-6 py-5"
                >
                    <div>
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Nombre del presupuesto
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Casamiento García – 150 personas"
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
                            Fecha del servicio{' '}
                            <span className="text-slate-600">(opcional)</span>
                        </label>
                        <input
                            type="date"
                            value={data.fecha_servicio}
                            onChange={(e) =>
                                setData('fecha_servicio', e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Descripción{' '}
                            <span className="text-slate-600">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Casamiento García, 150 personas"
                            value={data.descripcion}
                            onChange={(e) =>
                                setData('descripcion', e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <p className="mb-3 text-sm text-slate-400">Ítems</p>
                        <div className="space-y-3">
                            {data.items.map((item, index) => (
                                <ItemRow
                                    key={index}
                                    item={item}
                                    index={index}
                                    recetasDisponibles={recetasDisponibles}
                                    onChange={actualizarItem}
                                    onRemove={quitarItem}
                                />
                            ))}
                        </div>

                        <div className="mt-3 flex gap-4">
                            <button
                                type="button"
                                onClick={() => agregarItem('receta')}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                <ChefHat className="h-4 w-4" strokeWidth={2.25} />
                                + Receta
                            </button>
                            <button
                                type="button"
                                onClick={() => agregarItem('libre')}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300"
                            >
                                <Tag className="h-4 w-4" strokeWidth={2.25} />
                                + Ítem libre
                            </button>
                        </div>
                    </div>
                </form>

                <div className="border-t border-white/5 px-6 py-5">
                    <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Costo total</span>
                        <span className="text-slate-300">
                            {money(totales.costo)}
                        </span>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Precio de venta
                        </span>
                        <span className="text-lg font-bold text-white">
                            {money(totales.venta)}
                        </span>
                    </div>
                    {totales.costo > 0 && (
                        <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Margen</span>
                            <span
                                className={
                                    margen >= 0
                                        ? 'font-semibold text-emerald-400'
                                        : 'font-semibold text-rose-400'
                                }
                            >
                                {margen >= 0 ? '+' : ''}
                                {margen}%
                            </span>
                        </div>
                    )}
                    <button
                        type="submit"
                        form="form-presupuesto"
                        disabled={processing}
                        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50"
                    >
                        Crear presupuesto ✓
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full text-center text-sm text-slate-500 hover:text-slate-300"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Presupuestos({
    presupuestos = [],
    recetasDisponibles = [],
}) {
    const [mostrarModal, setMostrarModal] = useState(false);

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
                    onClick={() => setMostrarModal(true)}
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
                                <th className="py-2 font-medium">
                                    Fecha del servicio
                                </th>
                                <th className="py-2 font-medium">
                                    Costo total
                                </th>
                                <th className="py-2 font-medium">
                                    Precio de venta
                                </th>
                                <th className="py-2 font-medium">Margen</th>
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
                                        {p.fecha_servicio || '—'}
                                    </td>
                                    <td className="py-3 text-slate-400">
                                        {money(p.costo_total)}
                                    </td>
                                    <td className="py-3 font-semibold text-slate-100">
                                        {money(p.precio_venta)}
                                    </td>
                                    <td
                                        className={
                                            p.margen >= 0
                                                ? 'py-3 text-emerald-400'
                                                : 'py-3 text-rose-400'
                                        }
                                    >
                                        {p.margen >= 0 ? '+' : ''}
                                        {p.margen}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {mostrarModal && (
                <NuevoPresupuestoModal
                    recetasDisponibles={recetasDisponibles}
                    onClose={() => setMostrarModal(false)}
                />
            )}
        </AppLayout>
    );
}
