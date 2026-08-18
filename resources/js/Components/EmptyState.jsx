export default function EmptyState({ icon: Icon, title, subtitle }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon className="mb-4 h-12 w-12 text-slate-600" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-slate-200">{title}</p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">{subtitle}</p>
        </div>
    );
}
