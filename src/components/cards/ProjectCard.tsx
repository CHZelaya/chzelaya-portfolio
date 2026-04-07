import Link from "next/link";
import { FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";

type ProjectCardProps = {
    project: FEATURED_PROJECTS_QUERYResult[number];
    index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const { title, summary, slug } = project;
    const href = `/projects/${slug?.current ?? "#"}`;
    const num = String(index + 1).padStart(2, "0");

    return (
        <Link href={href} className="group block h-full">
            <article className="relative h-full overflow-hidden bg-(--color-bg-raise) p-5 transition-colors duration-300 hover:bg-(--color-bg-subtle)">

                {/* Top accent bar */}
                <div
                    className="absolute left-0 top-0 h-0.5 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
                />

                {/* Number label */}
                <span className="font-mono text-[0.5rem] font-light tracking-[0.2em] uppercase text-(--color-accent) opacity-50">
                    {num} / Case Study
                </span>

                {/* Title */}
                <h3 className="mt-3 font-display text-xl leading-[0.9] tracking-[0.06em] text-(--color-text)">
                    {title}
                </h3>

                {/* Summary */}
                {summary && (
                    <p className="mt-2 font-serif italic font-light text-[0.72rem] leading-relaxed text-(--color-text-mid) line-clamp-3">
                        {summary}
                    </p>
                )}
            </article>
        </Link>
    );
}
