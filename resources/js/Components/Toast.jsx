import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
            <div
                className={
                    'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ' +
                    (isSuccess
                        ? 'border-emerald-500/20 bg-emerald-950/90 text-emerald-200'
                        : 'border-rose-500/20 bg-rose-950/90 text-rose-200')
                }
            >
                {isSuccess ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" strokeWidth={2} />
                ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-400" strokeWidth={2} />
                )}
                <span className="text-sm font-medium">{message}</span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="ml-2 text-slate-400 hover:text-slate-200"
                >
                    <X className="h-4 w-4" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}
