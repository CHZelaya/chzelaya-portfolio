import { FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";
import ProjectCard from "@/components/cards/ProjectCard";

interface DevPanelProps {
    featuredProjects: FEATURED_PROJECTS_QUERYResult;
}

export default function DevPanel({ featuredProjects }: DevPanelProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">

            {/* Ambient red orb */}
            <div
                className="pointer-events-none absolute -left-[20%] -top-[30%] h-[80vh] w-[80vh] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 65%)" }}
            />

            {/* Panel label */}
            <span className="absolute left-8 top-8 font-mono text-[0.55rem] font-light tracking-[0.3em] uppercase text-(--color-text-dim)">
                Software
            </span>

            {/* Inner content */}
            <div className="relative z-10 w-[min(820px,88vw)]">

                {/* Eyebrow */}
                <div className="mb-8 flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-(--color-accent)">
                    Software Engineering
                    <span
                        className="h-px w-16 shrink-0 bg-(--color-accent)"
                        style={{ opacity: 0.4 }}
                    />
                </div>

                {/* Headline */}
                <h1 className="mb-4 font-display text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text)">
                    Systems built<br />with intention.
                </h1>

                {/* Tagline */}
                <p className="mb-10 max-w-105 font-serif italic font-light text-2xl leading-relaxed text-(--color-text-mid)">
                    Full-stack solutions focused on clean code, thoughtful APIs,
                    and interfaces that don&apos;t get in the way.
                </p>

                {/* Project grid */}
                <div className="grid grid-cols-3 overflow-hidden border border-(--color-border)">
                    {featuredProjects?.map((project, i) => (
                        <div
                            key={project.slug?.current}
                            className={i < featuredProjects.length - 1 ? "border-r border-(--color-border)" : ""}
                        >
                            <ProjectCard project={project} index={i} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel number */}
            <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text-dim)">
                01
            </span>
        </div>
    );
}
