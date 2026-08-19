import { useState } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Camera,
    ChevronRight,
    Package,
    ChefHat,
    Calculator,
    Plus,
    ShoppingCart,
    Thermometer,
    RefreshCw,
    Eye,
    EyeOff,
} from 'lucide-react';

const DIAS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];
const MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function fechaLarga(date) {
    const dia = DIAS[date.getDay()];
    return `${dia}, ${date.getDate()} de ${MESES[date.getMonth()]}`;
}

function StatTile({ icon: Icon, iconClass, value, label, href }) {
    return (
        <Link
            href={href}
            className="rounded-2xl border border-white/5 bg-[#12121f] p-5 transition hover:bg-white/[0.03]"
        >
            <div
                className={
                    'mb-3 flex h-9 w-9 items-center justify-center rounded-xl ' +
                    iconClass
                }
            >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
        </Link>
    );
}

function QuickAccessRow({ icon: Icon, iconClass, title, subtitle, href, onClick }) {
    const content = (
        <>
            <div
                className={
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ' +
                    iconClass
                }
            >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
            <div className="flex-1">
                <div className="text-sm font-semibold text-white">
                    {title}
                </div>
                <div className="text-sm text-slate-500">{subtitle}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-600" />
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center gap-4 border-b border-white/5 px-5 py-4 text-left last:border-0 hover:bg-white/[0.03]"
            >
                {content}
            </button>
        );
    }

    return (
        <Link
            href={href}
            className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/[0.03]"
        >
            {content}
        </Link>
    );
}

export default function Dashboard({ stats = {} }) {
    const { auth } = usePage().props;
    const businessName = auth?.user?.business_name || auth?.user?.name || '';
    const [city, setCity] = useState('');
    const [montoOculto, setMontoOculto] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const s = {
        gastoComprasMes: 0,
        ingredientes: 0,
        recetas: 0,
        presupuestos: 0,
        ...stats,
    };

    function actualizar() {
        setRefreshing(true);
        router.reload({ onFinish: () => setRefreshing(false) });
    }

    function cerrarElDia() {
        if (s.recetas === 0) {
            router.visit('/recetas');
            return;
        }
        if (confirm('¿Cerrar el día de hoy? Se registrarán las ventas y merma acumuladas.')) {
            router.post(route('cierres.store'));
        }
    }

    return (
        <AppLayout current="Inicio">
            <Head title="Inicio" />

            <div className="mb-1 flex items-start justify-between">
                <h1 className="text-2xl font-bold text-white">
                    Hola{businessName ? `, ${businessName}` : ''}
                </h1>
                <button
                    type="button"
                    onClick={actualizar}
                    aria-label="Actualizar"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#12121f] text-slate-400 hover:text-slate-200"
                >
                    <RefreshCw
                        className={
                            'h-4 w-4' + (refreshing ? ' animate-spin' : '')
                        }
                        strokeWidth={2}
                    />
                </button>
            </div>
            <p className="mb-6 text-sm text-slate-500">
                {fechaLarga(new Date())}
            </p>

            <Link
                href="/facturas"
                className="mb-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <Camera className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1">
                    <div className="font-semibold">Escanear factura</div>
                    <div className="text-sm text-white/80">
                        Sacá una foto y conocé tu costo
                    </div>
                </div>
                <ChevronRight className="h-5 w-5" />
            </Link>

            <div className="mb-6 rounded-3xl border border-white/5 bg-[#12121f] p-6">
                <div className="mb-4">
                    <div className="font-semibold text-white">
                        Primeros pasos
                    </div>
                    <p className="text-sm text-slate-500">
                        En minutos vas a saber cuánto te cuesta cada producto
                        que hacés
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            title: 'Subí tu primera factura',
                            subtitle:
                                'La IA carga tus ingredientes automáticamente',
                            active: true,
                        },
                        {
                            title: 'Revisá lo que detectó la IA',
                            subtitle:
                                'Corregí si algo salió mal y confirmá los items',
                            active: false,
                        },
                        {
                            title: 'Armá tu primera receta',
                            subtitle:
                                'Ya podés calcular cuánto te cuesta cada producto',
                            active: false,
                        },
                    ].map((step, i) => (
                        <div
                            key={step.title}
                            className={
                                'flex items-center gap-4 ' +
                                (step.active ? '' : 'opacity-40')
                            }
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                                {i + 1}
                            </span>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-slate-100">
                                    {step.title}
                                </div>
                                <div className="text-sm text-slate-500">
                                    {step.subtitle}
                                </div>
                            </div>
                            {step.active && (
                                <ChevronRight className="h-4 w-4 text-slate-500" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6 rounded-3xl border border-white/5 bg-[#12121f] p-6">
                <div className="mb-1 flex items-center gap-2">
                    <div className="text-3xl font-bold text-white">
                        {montoOculto
                            ? '••••••'
                            : '$' +
                              s.gastoComprasMes.toLocaleString('es-AR', {
                                  minimumFractionDigits: 2,
                              })}
                    </div>
                    <button
                        type="button"
                        onClick={() => setMontoOculto((v) => !v)}
                        aria-label={
                            montoOculto ? 'Mostrar monto' : 'Ocultar monto'
                        }
                        className="ml-auto text-slate-500 hover:text-slate-300"
                    >
                        {montoOculto ? (
                            <Eye className="h-4 w-4" strokeWidth={2} />
                        ) : (
                            <EyeOff className="h-4 w-4" strokeWidth={2} />
                        )}
                    </button>
                </div>
                <div className="text-sm text-slate-500">
                    Gasto en compras este mes
                </div>
                <div className="text-sm text-slate-600">
                    Sin facturas confirmadas este mes
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatTile
                    icon={Package}
                    iconClass="bg-emerald-500/10 text-emerald-400"
                    value={s.ingredientes}
                    label="Ingredientes"
                    href="/ingredientes"
                />
                <StatTile
                    icon={ChefHat}
                    iconClass="bg-indigo-500/10 text-indigo-400"
                    value={s.recetas}
                    label="Recetas"
                    href="/recetas"
                />
                <StatTile
                    icon={Calculator}
                    iconClass="bg-sky-500/10 text-sky-400"
                    value={s.presupuestos}
                    label="Presupuestos"
                    href="/presupuestos"
                />
            </div>

            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Acceso rápido
            </div>
            <div className="mb-6 overflow-hidden rounded-3xl border border-white/5 bg-[#12121f]">
                <QuickAccessRow
                    icon={Package}
                    iconClass="bg-indigo-500/10 text-indigo-400"
                    title="Cerrar el día"
                    subtitle="Producido vs vendido · merma · ganancia"
                    onClick={cerrarElDia}
                />
                <QuickAccessRow
                    icon={Plus}
                    iconClass="bg-emerald-500/10 text-emerald-400"
                    title="Nueva receta"
                    subtitle="Calculá el costo de lo que producís"
                    href="/recetas"
                />
                <QuickAccessRow
                    icon={ShoppingCart}
                    iconClass="bg-indigo-500/10 text-indigo-300"
                    title="Registrar venta"
                    subtitle="Llevá el control de tus ganancias"
                    href="/ventas"
                />
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                <div className="mb-1 flex items-center gap-2 font-semibold text-white">
                    <Thermometer className="h-4 w-4 text-indigo-400" strokeWidth={2} />
                    Activar consejos de clima
                </div>
                <p className="mb-4 text-sm text-slate-500">
                    Ingresá tu ciudad para recibir alertas de temperatura y
                    humedad que afectan a tus masas, leudados y laminados.
                </p>
                <div className="flex max-w-md gap-2">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej: Palermo, Buenos Aires"
                        className="flex-1 rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                        type="button"
                        disabled={!city.trim()}
                        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"
                    >
                        Activar
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
