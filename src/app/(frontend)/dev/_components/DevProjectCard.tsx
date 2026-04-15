import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PROJECTS_QUERYResult } from "@/sanity/types";
import Link from "next/dist/client/link";

interface DevProjectCardProps {
    project: PROJECTS_QUERYResult[number];
}



export function DevProjectCard({ project }: DevProjectCardProps) {
    const slug = project.slug?.current
    const statusLabel = project.status ?? null

    // Status color — only uses your existing accent palette
    const statusClass =
        project.status === 'frozen'
            ? 'text-(--color-black) border border-(--color-accent-border) bg-(--color-accent)'
            : project.status === 'in-progress'
                ? 'text-black border border-amber-400/25 bg-amber-400'
                : project.status === 'live'
                    ? 'text-green-400 border border-green-400/30 bg-green-400/8'
                    : 'text-(--color-text-dim) border border-(--color-border-mid)'

    if (slug) {
        return (
            <div className="bg-(--color-bg-raise) border border-(--color-border-mid) rounded-sm overflow-hidden transition-[border-color,transform] duration-200 hover:border-white/20 hover:-translate-y-0.5">
                <Link href={`/dev/${slug}`} className="block group">
                    {/* Cover */}
                    <div className="relative w-full h-72 bg-(--color-bg-subtle) overflow-hidden">
                        {project.coverImage ? (
                            <Image
                                src={urlFor(project.coverImage).width(600).height(360).url()}
                                alt=""
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                            />
                        ) : (
                            // Placeholder initials when no cover image
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="font-display text-[3.5rem] font-bold text-white/4 tracking-tight select-none" aria-hidden="true">
                                    {project.title?.split(' ').map(w => w[0]).join('').slice(0, 3)}
                                </span>
                            </div>
                        )}

                        {/* Status badge */}
                        {statusLabel && (
                            <span className={`absolute top-3 right-3 text-[9px] tracking-[0.12em] uppercase px-2 py-1 rounded-[1px] font-mono ${statusClass}`}>
                                {statusLabel}
                            </span>
                        )}

                        {/* Handwritten annotation — driven by `scribbleNote` field */}
                        {project.scribbleNote && (
                            <span className="absolute bottom-3 left-3 font-hand font-bold text-[1.50rem] text-(--color-base)/85 -rotate-2 pointer-events-none leading-snug">
                                {project.scribbleNote}
                            </span>
                        )}
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-5">
                        {project.year && (
                            <p className="text-[10px] tracking-[0.15em] text-(--color-text-dim) mb-1.5 font-mono">
                                {project.year}
                            </p>
                        )}
                        <h3 className="font-display text-[1.25rem] font-bold text-(--color-text) tracking-tight leading-[1.05] mb-2">
                            {project.title}
                        </h3>
                        {project.summary && (
                            <p className="text-[11.5px] text-(--color-text-mid) leading-[1.7] mb-4 font-mono">
                                {project.summary}
                            </p>
                        )}

                        {/* Tech tags */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.technologies.map(tech => (
                                    <span key={tech.name} className="text-[9.5px] tracking-[0.06em] px-2 py-0.5 border border-(--color-border) rounded-[1px] text-(--color-text-dim) font-mono">
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            </div>

        )
    }
}