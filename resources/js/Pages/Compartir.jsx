import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Share2, Copy } from 'lucide-react';

export default function Compartir() {
    const { url } = usePage().props;
    const link = typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <AppLayout current="Compartir">
            <Head title="Compartir la app" />

            <h1 className="mb-6 text-2xl font-bold text-white">
                Compartir la app
            </h1>

            <div className="max-w-xl rounded-3xl border border-white/5 bg-[#12121f] p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Share2 className="h-7 w-7" strokeWidth={2} />
                </div>
                <p className="text-lg font-semibold text-slate-100">
                    Invitá a otros a usar InstaCost
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Compartí el enlace con tu equipo o con otros
                    emprendedores para que también controlen sus costos.
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
                    <span className="flex-1 truncate text-left">{link}</span>
                    <button
                        type="button"
                        onClick={() =>
                            navigator.clipboard?.writeText(link)
                        }
                        className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                        <Copy className="h-3.5 w-3.5" strokeWidth={2.25} />
                        Copiar
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
