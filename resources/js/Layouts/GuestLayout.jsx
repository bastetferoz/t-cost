import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#0b0b14] pt-6 sm:justify-center sm:pt-0">
            <Link href="/" className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl">
                    📸
                </div>
                <span className="text-2xl font-bold text-white">
                    Insta<span className="text-indigo-400">Cost</span>
                </span>
            </Link>

            <div className="mt-6 w-full overflow-hidden rounded-3xl border border-white/5 bg-[#12121f] px-6 py-4 text-slate-200 shadow-md sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
