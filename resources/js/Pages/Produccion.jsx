import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import { Factory, Plus } from 'lucide-react';

export default function Produccion({ producciones = [] }) {
    return (
        <AppLayout current="Producción">
            <Head title="Producción" />

            <PageHeader
                title="Producción"
                actionLabel="Registrar producción"
                actionIcon={Plus}
            />

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {producciones.length === 0 ? (
                    <EmptyState
                        icon={Factory}
                        title="Sin producción registrada"
                        subtitle="Registrá cuánto producís de cada receta para llevar el control de tu stock disponible para la venta."
                    />
                ) : null}
            </div>
        </AppLayout>
    );
}
