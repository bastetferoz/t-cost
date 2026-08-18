export default function PageHeader({ title, actionLabel, actionIcon: Icon, onAction }) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {actionLabel && (
                <button
                    type="button"
                    onClick={onAction}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                >
                    {Icon && <Icon className="h-4 w-4" strokeWidth={2.25} />}
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
