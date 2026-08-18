import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Camera, Mic } from 'lucide-react';

function ActionButton({ icon: Icon, children, variant = 'ghost' }) {
    const variants = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30',
        ghost: 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10',
    };

    return (
        <button
            type="button"
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

export default function Facturas({ facturas = [] }) {
    return (
        <AppLayout current="Facturas">
            <Head title="Facturas" />

            <h1 className="mb-6 text-2xl font-bold text-white">Facturas</h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Camera} variant="primary">
                    Escanear factura
                </ActionButton>
                <ActionButton icon={Mic} variant="ghost">
                    Dictar compra
                </ActionButton>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {facturas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 text-5xl">📷</div>
                        <p className="text-lg font-semibold text-slate-200">
                            Escaneá tu primera factura
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Sacá una foto a la factura de tu proveedor y la IA
                            extrae los productos y precios automáticamente.
                            Sin escribir nada.
                        </p>
                        <button
                            type="button"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                        >
                            <Camera className="h-4 w-4" strokeWidth={2.25} />
                            Escanear factura
                        </button>
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
