import Link from "next/link";
import { FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";
import { motion } from "motion/react";

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
            <motion.article
                className="relative h-full overflow-hidden bg-(--color-bg-raise) p-6 lg:p-8 transition-all duration-300 hover:bg-(--color-bg-subtle)"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >

                {/* Top accent bar */}
                <div
                    className="absolute left-0 top-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
                />

                {/* Number label */}
                <span className="font-mono text-[0.65rem] font-light tracking-[0.2em] uppercase text-(--color-accent) opacity-50">
                    {num} / Case Study
                </span>

                {/* Title */}
                <h3 className="mt-3 font-display text-2xl lg:text-3xl leading-[0.9] tracking-[0.06em] text-(--color-text) transition-colors duration-300 group-hover:text-white">
                    {title}
                </h3>

                {/* Summary */}
                {summary && (
                    <p className="mt-3 font-serif italic font-light text-sm lg:text-base leading-relaxed text-(--color-text-mid) transition-colors duration-300 group-hover:text-(--color-text)">
                        {summary}
                    </p>
                )}

                {/* Read more — appears on hover */}
                <div className="mt-4 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-accent)">
                        Read case study
                    </span>
                    <span className="text-(--color-accent) text-xs">→</span>
                </div>

            </motion.article>
        </Link>
    );
}
