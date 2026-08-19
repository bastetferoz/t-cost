import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links, meta }) {
    if (!meta || meta.last_page <= 1) return null;

    return (
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <p className="text-sm text-slate-500">
                {meta.from}–{meta.to} de {meta.total}
            </p>
            <div className="flex items-center gap-1">
                {links.map((link, i) => {
                    if (!link.url) {
                        return (
                            <span
                                key={i}
                                className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-sm text-slate-600"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={
                                'inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-sm transition ' +
                                (link.active
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200')
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
