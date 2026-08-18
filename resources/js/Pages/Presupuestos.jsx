import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import { Building2, Plus } from 'lucide-react';

export default function Presupuestos({ presupuestos = [] }) {
    return (
        <AppLayout current="Presupuestos">
            <Head title="Presupuestos" />

            <PageHeader
                title="Presupuestos"
                actionLabel="Nuevo presupuesto"
                actionIcon={Plus}
            />

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {presupuestos.length === 0 ? (
                    <EmptyState
                        icon={Building2}
                        title="Sin presupuestos creados"
                        subtitle="Armá presupuestos para tus clientes en base a tus recetas y costos reales."
                    />
                ) : null}
            </div>
        </AppLayout>
    );
}
