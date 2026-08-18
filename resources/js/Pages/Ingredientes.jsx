import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import { Package, Plus } from 'lucide-react';

export default function Ingredientes({ ingredientes = [] }) {
    return (
        <AppLayout current="Ingredientes">
            <Head title="Ingredientes" />

            <PageHeader
                title="Ingredientes"
                actionLabel="Agregar ingrediente"
                actionIcon={Plus}
            />

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {ingredientes.length === 0 ? (
                    <EmptyState
                        icon={Package}
                        title="Sin ingredientes cargados"
                        subtitle="Agregá tus ingredientes con su precio y unidad de medida para poder calcular el costo de tus recetas."
                    />
                ) : null}
            </div>
        </AppLayout>
    );
}
