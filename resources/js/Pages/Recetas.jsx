import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Mic, Pencil } from 'lucide-react';

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

export default function Recetas({ recetas = [] }) {
    return (
        <AppLayout current="Recetas">
            <Head title="Recetas" />

            <h1 className="mb-6 text-2xl font-bold text-white">Recetas</h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <ActionButton icon={Mic} variant="primary">
                    Dictar receta
                </ActionButton>
                <ActionButton icon={Pencil} variant="ghost">
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
                ) : null}
            </div>
        </AppLayout>
    );
}
