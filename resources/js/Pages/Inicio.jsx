import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { TrendingUp, DollarSign, Star } from 'lucide-react';

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-[#12121f] p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
        </div>
    );
}

export default function Inicio() {
    const { auth } = usePage().props;
    const name = auth?.user?.name?.split(' ')[0] ?? '';

    return (
        <AppLayout current="Inicio">
            <Head title="Inicio" />

            <h1 className="mb-1 text-2xl font-bold text-white">
                Hola{name ? `, ${name}` : ''} 👋
            </h1>
            <p className="mb-8 text-sm text-slate-500">
                Este es el resumen de tu negocio. Cargá tus facturas y ventas
                para empezar a ver tus números acá.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={DollarSign} label="Ventas de hoy" value="—" />
                <StatCard icon={TrendingUp} label="Costo promedio" value="—" />
                <StatCard
                    icon={Star}
                    label="Producto más vendido"
                    value="—"
                />
            </div>
        </AppLayout>
    );
}
