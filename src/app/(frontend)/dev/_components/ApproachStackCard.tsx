import { Marquee } from "@/components/ui/Marquee";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { BentoCard, BentoLabel } from "./BentoBoxes";
import { DEV_PROFILE_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";

type Technology = NonNullable<NonNullable<DEV_PROFILE_QUERYResult>["technologies"]>[number];
type ApproachBody = NonNullable<DEV_PROFILE_QUERYResult>["approachBody"];



interface ApproachStackCardProps {
    approachBody?: ApproachBody;
    stack?: Technology[];
}

// ── Approach + Stack card ──────────────────────────────────────



export function ApproachStackCard({ approachBody, stack }: ApproachStackCardProps) {
    return (
        <BentoCard className="flex flex-col justify-between p-0 overflow-hidden min-h-35">

            {/* Approach copy */}
            <div className="p-5">
                <BentoLabel>Approach & Stack</BentoLabel>
                {approachBody ? (
                    <PortableText value={approachBody} />
                ) : (
                    <p className="text-[12px] text-(--color-text-dim) font-mono">—</p>
                )}
            </div>

            {/* Divider */}
            <div className="h-px bg-(--color-border) mx-5" />

            {/* Marquee strip — renders even if stack is empty, just quietly */}
            {stack && stack.length > 0 && (
                <Marquee pauseOnHover className="py-4 [--duration:30s] [--gap:1.5rem]">
                    {stack.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex items-center gap-2 text-[11px] text-(--color-text-dim) font-mono tracking-[0.08em] hover:text-(--color-text) transition-colors duration-200 shrink-0"
                        >
                            {tech.icon && (
                                <Image
                                    src={urlFor(tech.icon).width(28).height(28).url()}
                                    alt=""
                                    aria-hidden
                                    width={14}
                                    height={14}
                                    className="opacity-60"
                                />
                            )}
                            {tech.name}
                        </div>
                    ))}
                </Marquee>
            )}
        </BentoCard>
    )
}