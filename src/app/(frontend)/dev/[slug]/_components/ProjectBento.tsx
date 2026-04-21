import Image from "next/image";
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import HandWrittenText from "@/components/ui/HandWrittenText";
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { Button } from "@/components/ui/Button";

type Project = NonNullable<PROJECT_BY_SLUG_QUERYResult>;

interface ProjectBentoProps {
    technologies: Project["technologies"];
    year: Project["year"];
    status: Project["status"];
    scribbleNote: Project["scribbleNote"];
    githubLink1: Project["githubLink1"];
    githubLink2: Project["githubLink2"];
    liveLink: Project["liveLink"];
    readingTime: Project["estimatedReadingTime"];
}

interface dialogProps {
    liveLink?: string | null;
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


// WIP Dialog component.
const WipDialog = ({ liveLink }: dialogProps) => {
    if (!liveLink) return null;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="mt-4 pt-3 text-left">
                    <span className="block font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-text-dim) mb-2">
                        Live Link
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-accent) hover:underline">
                        Visit →
                    </span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-(--color-bg) border border-(--color-border-mid) text-(--color-text)">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-(--color-text) font-display">Heads up</AlertDialogTitle>
                    <AlertDialogDescription className="text-(--color-text-mid) font-mono text-sm">
                        This one's still in progress. You might run into rough edges, placeholder content, or features that aren't quite there yet. That's intentional, it's a live build, not a finished product.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border border-(--color-border-mid) text-(--color-text-dim) font-mono text-[0.6rem] tracking-[0.2em] uppercase hover:bg-(--color-bg-subtle) hover:text-(--color-text) transition-colors" variant="outline" size="sm">Go back</AlertDialogCancel>
                    <AlertDialogAction
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(liveLink, '_blank', 'noopener,noreferrer')}
                        className="bg-transparent border border-(--color-border-mid) text-(--color-text-dim) font-mono text-[0.6rem] tracking-[0.2em] uppercase hover:bg-(--color-bg-subtle) hover:text-(--color-text) transition-colors"
                    >
                        Understood, lets go →
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}



export default function ProjectBento({ technologies, year, status, scribbleNote, githubLink1, githubLink2, readingTime, liveLink }: ProjectBentoProps) {
    const config = status ? statusConfig[status as keyof typeof statusConfig] : statusConfig.archived;
    console.log("Status:", status);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px_140px_140px] gap-px bg-(--color-border)">

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
                                    sizes="(max-width: 768px) 20px, 32px"
                                    className="object-contain"
                                    loading="eager"
                                />
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Year */}
            <div className="bg-(--color-bg) p-4 lg:p-5">
                <div className="z-10">

                </div>
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

            <div className="bg-(--color-bg) p-4 lg:p-5">
                {/* Live Link */}
                <div className="z-10">
                    {status === 'in-progress' ? <WipDialog liveLink={liveLink} /> : (
                        liveLink && (
                            <div className="mb-4">
                                <span className="block font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-text-dim) mb-2">
                                    Live Link
                                </span>
                                <Link href={liveLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-accent) hover:underline">
                                    Visit →
                                </Link>
                            </div>
                        )
                    )}
                </div>
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