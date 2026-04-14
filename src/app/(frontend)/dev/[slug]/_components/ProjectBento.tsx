import Image from "next/image";
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import HandWrittenText from "@/components/ui/HandWrittenText";




type Project = NonNullable<PROJECT_BY_SLUG_QUERYResult>;

interface ProjectBentoProps {
    technologies: Project["technologies"];
    year: Project["year"];
    status: Project["status"];
    scribbleNote: Project["scribbleNote"];
}

const statusConfig = {
    live: {
        label: "Live",
        dotClass: "bg-(--color-accent)",
        borderClass: "border-(--color-accent)",
        textClass: "text-(--color-accent)",
    },
    frozen: {
        label: "Frozen",
        dotClass: "bg-(--color-text-dim)",
        borderClass: "border-(--color-border)",
        textClass: "text-(--color-text-dim)",
    },
    "in-progress": {
        label: "In Progress",
        dotClass: "bg-amber-400",
        borderClass: "border-amber-400",
        textClass: "text-amber-400",
    },
    archived: {
        label: "Archived",
        dotClass: "bg-(--color-text-dim)",
        borderClass: "border-(--color-border)",
        textClass: "text-(--color-text-dim)",
    },
} as const;

export default function ProjectBento({ technologies, year, status, scribbleNote }: ProjectBentoProps) {
    const config = status ? statusConfig[status as keyof typeof statusConfig] : statusConfig.archived;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px_140px] gap-px bg-(--color-border)">

            {/* Stack */}
            <div className="bg-(--color-bg) p-3 lg:p-4">
                <span className="block font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-text-dim) mb-3">
                    Stack
                </span>
                <div className="flex flex-wrap items-center gap-3">
                    {technologies?.map((tech) => (
                        tech.icon && (
                            <div key={tech.name} className="relative w-5 h-5 md:w-8 md:h-8 opacity-80 hover:opacity-100 transition-opacity duration-200" title={tech.name ?? ""}>
                                <Image
                                    src={urlFor(tech.icon).url()}
                                    alt={tech.name ?? ""}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Year */}
            <div className="bg-(--color-bg) p-4 lg:p-5">
                <span className="block font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-text-dim) mb-3">
                    Year
                </span>
                <span className="font-mono text-xl font-light text-(--color-text)">
                    {year}
                </span>
                <span className="block font-mono text-[0.55rem] tracking-[0.2em] uppercase text-(--color-text-dim) mt-1">
                    Started
                </span>
            </div>

            {/* Status */}
            <div className="bg-(--color-bg) p-4 lg:p-5">
                <span className="block font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-text-dim) mb-3">
                    Status
                </span>
                <div className={`inline-flex items-center gap-2 border px-2.5 py-1.5 ${config.borderClass}`}>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dotClass}`} />
                    <span className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase ${config.textClass}`}>
                        {config.label}
                    </span>
                </div>
                {scribbleNote && (
                    <span className="block whitespace-nowrap font-hand text-sm tracking-[0.15em] text-(--color-text) mt-2">
                        <HandWrittenText
                            text={scribbleNote}
                            className="text-base"
                        />
                    </span>
                )}
            </div>

        </div>
    );
}