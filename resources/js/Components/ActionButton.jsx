const VARIANTS = {
    primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30',
    ghost: 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10',
    dangerOutline:
        'bg-transparent text-rose-400 border border-rose-500/40 hover:bg-rose-500/10',
    danger: 'bg-rose-950/60 text-rose-400 border border-rose-500/30 hover:bg-rose-900/60',
};

export default function ActionButton({ icon: Icon, children, variant = 'ghost', onClick, type = 'button', disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ' +
                (VARIANTS[variant] || VARIANTS.ghost)
            }
        >
            {Icon && <Icon className="h-4 w-4" strokeWidth={2.25} />}
            {children}
        </button>
    );
}
