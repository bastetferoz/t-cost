import { useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ActionButton from '@/Components/ActionButton';
import { Camera, Mic } from 'lucide-react';

function OpcionEscaneo({ icon: Icon, title, subtitle, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                'flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition ' +
                (active
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-[#0e0e1a] text-slate-200 hover:bg-white/5')
            }
        >
            <div
                className={
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ' +
                    (active ? 'bg-white/15' : 'bg-white/5')
                }
            >
                {Icon}
            </div>
            <div>
                <div className="font-semibold">{title}</div>
                <div
                    className={
                        'text-sm ' + (active ? 'text-white/80' : 'text-slate-500')
                    }
                >
                    {subtitle}
                </div>
            </div>
        </button>
    );
}

export default function Facturas({ facturas = [] }) {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const camaraInputRef = useRef(null);
    const galeriaInputRef = useRef(null);

    return (
        <AppLayout current="Facturas">
            <Head title="Facturas" />

            <h1 className="mb-6 text-2xl font-bold text-white">Facturas</h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton
                    icon={Camera}
                    variant="primary"
                    onClick={() => setMostrarOpciones(true)}
                >
                    Escanear factura
                </ActionButton>
                <ActionButton icon={Mic} variant="ghost">
                    Dictar compra
                </ActionButton>
            </div>

            {mostrarOpciones && (
                <div className="mb-6 rounded-3xl border border-white/5 bg-[#12121f] p-6">
                    <h2 className="mb-4 text-lg font-bold text-white">
                        Escanear factura
                    </h2>
                    <div className="space-y-3">
                        <OpcionEscaneo
                            icon="📷"
                            title="Sacar foto ahora"
                            subtitle="Abrí la cámara del celular"
                            active
                            onClick={() => camaraInputRef.current?.click()}
                        />
                        <OpcionEscaneo
                            icon="🖼️"
                            title="Elegir de la galería"
                            subtitle="Seleccioná una foto existente"
                            onClick={() => galeriaInputRef.current?.click()}
                        />
                    </div>
                    <input
                        ref={camaraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                    />
                    <input
                        ref={galeriaInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            )}

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
                            onClick={() => setMostrarOpciones(true)}
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
