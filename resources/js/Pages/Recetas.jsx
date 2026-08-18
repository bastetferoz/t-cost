import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import { ChefHat, Plus } from 'lucide-react';

export default function Recetas({ recetas = [] }) {
    return (
        <AppLayout current="Recetas">
            <Head title="Recetas" />

            <PageHeader
                title="Recetas"
                actionLabel="Crear receta"
                actionIcon={Plus}
            />

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {recetas.length === 0 ? (
                    <EmptyState
                        icon={ChefHat}
                        title="Sin recetas creadas"
                        subtitle="Armá tus recetas combinando ingredientes para conocer el costo real de cada producto que vendés."
                    />
                ) : null}
            </div>
        </AppLayout>
    );
}
