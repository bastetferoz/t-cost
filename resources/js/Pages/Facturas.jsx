import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import { Receipt, Plus } from 'lucide-react';

export default function Facturas({ facturas = [] }) {
    return (
        <AppLayout current="Facturas">
            <Head title="Facturas" />

            <PageHeader
                title="Facturas"
                actionLabel="Cargar factura"
                actionIcon={Plus}
            />

            <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                {facturas.length === 0 ? (
                    <EmptyState
                        icon={Receipt}
                        title="Sin facturas cargadas"
                        subtitle="Subí las facturas de tus proveedores para calcular el costo real de tus ingredientes."
                    />
                ) : null}
            </div>
        </AppLayout>
    );
}
