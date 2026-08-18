import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Sparkles, Building2, Palette, MapPin, Users } from 'lucide-react';

const BUSINESS_TYPES = [
    'Panadería',
    'Pastelería / Repostería',
    'Rotisería',
    'Cafetería / Bar',
    'Hamburguesería',
    'Restaurante',
    'Catering',
    'Negocio casero',
    'Otro',
];

function Section({ icon: Icon, title, hint, children }) {
    return (
        <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Icon className="h-4 w-4 text-indigo-400" strokeWidth={2} />
                    {title}
                </div>
                {hint && <span className="text-xs text-slate-500">{hint}</span>}
            </div>
            {children}
        </div>
    );
}

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, patch, processing, errors } = useForm({
        business_name: user.business_name || '',
        business_type: user.business_type || '',
        brand_color: user.brand_color || '',
        city: user.city || '',
        logo: null,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('profile.update'), { forceFormData: true });
    }

    return (
        <AppLayout current="Mi perfil">
            <Head title="Mi perfil" />

            <h1 className="text-2xl font-bold text-white">Mi perfil</h1>
            <p className="mb-6 text-sm text-slate-500">
                Datos de tu negocio y cuenta
            </p>

            <form onSubmit={submit} className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between rounded-3xl border border-white/5 bg-[#12121f] p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                            <Sparkles className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500">
                                Plan actual
                            </div>
                            <div className="font-semibold text-white">
                                InstaCost Free
                            </div>
                        </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                        Free
                    </span>
                </div>

                <Section icon={Building2} title="Datos del negocio">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Nombre del negocio{' '}
                                <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.business_name}
                                onChange={(e) =>
                                    setData('business_name', e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                            />
                            {errors.business_name && (
                                <p className="mt-1 text-xs text-rose-400">
                                    {errors.business_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Tipo de negocio
                            </label>
                            <select
                                value={data.business_type}
                                onChange={(e) =>
                                    setData('business_type', e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="">
                                    Seleccioná el tipo de negocio
                                </option>
                                {BUSINESS_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Section>

                <Section
                    icon={Palette}
                    title="Marca del negocio"
                    hint="Aparece en los PDFs de presupuestos"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Logo
                            </label>
                            <label className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
                                Subir logo
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData(
                                            'logo',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                            </label>
                            <p className="mt-1 text-xs text-slate-500">
                                PNG o JPG · máx 2MB
                            </p>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-slate-400">
                                Color de marca
                            </label>
                            <input
                                type="color"
                                value={data.brand_color || '#6366f1'}
                                onChange={(e) =>
                                    setData('brand_color', e.target.value)
                                }
                                className="h-10 w-16 rounded-lg border border-white/10 bg-[#0b0b14]"
                            />
                        </div>
                    </div>
                </Section>

                <Section icon={MapPin} title="Ubicación">
                    <div>
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#0b0b14] px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Usada para las alertas de clima en el dashboard
                        </p>
                    </div>
                </Section>

                <Section icon={Users} title="Cuenta">
                    <div>
                        <label className="mb-1.5 block text-sm text-slate-400">
                            Email
                        </label>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-400">
                            {user.email}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            El email se gestiona desde tu cuenta de Google
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                    >
                        Guardar cambios
                    </button>
                </Section>

                <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6">
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-200">
                        <Users className="h-4 w-4 text-indigo-400" strokeWidth={2} />
                        Equipo
                        <span className="ml-2 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
                            Plan PRO
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Invitá colaboradores (cajeros, panaderos, encargados
                        de insumos) con el plan PRO.
                    </p>
                </div>
            </form>
        </AppLayout>
    );
}
