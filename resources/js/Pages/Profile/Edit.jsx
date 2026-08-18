import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout current="Mi perfil">
            <Head title="Mi perfil" />

            <h1 className="mb-6 text-2xl font-bold text-white">Mi perfil</h1>

            <div className="max-w-2xl space-y-6">
                <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6 text-slate-200">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6 text-slate-200">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#12121f] p-6 text-slate-200">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AppLayout>
    );
}
