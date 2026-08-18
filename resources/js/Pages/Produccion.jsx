import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Factory } from 'lucide-react';

export default function Produccion({ producciones = [] }) {
    return (
        <AppLayout current="Producción">
            <Head title="Producción" />

            <h1 className="mb-6 text-2xl font-bold text-white">
                Producción
            </h1>

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {producciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Factory
                            className="mb-4 h-12 w-12 text-slate-600"
                            strokeWidth={1.5}
                        />
                        <p className="text-lg font-semibold text-slate-200">
                            Todavía no tenés recetas
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Cuando tengas recetas armadas vas a poder
                            registrar tus tandas de producción acá.
                        </p>
                        <Link
                            href="/recetas"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                        >
                            Ver recetas
                        </Link>
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
