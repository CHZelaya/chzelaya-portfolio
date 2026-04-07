import Image from "next/image";
import Link from "next/link";
import { FEATURED_MEDIA_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

interface MediaPanelProps {
    featuredMedia: FEATURED_MEDIA_QUERYResult;
}

type PhotoItem = FEATURED_MEDIA_QUERYResult[number] & {
    mediaType: "Photography";
};

interface MosaicCellProps {
    item: PhotoItem | undefined;
    className?: string;
}

function MosaicCell({ item, className = "" }: MosaicCellProps) {
    const photo = item?.photograghydetails?.photo;
    const label = item?.photograghydetails?.location ?? item?.title;
    const href = item?.slug?.current ? `/photography/${item.slug.current}` : null;

    const inner = (
        <div className={`group relative h-full overflow-hidden border border-(--color-border) transition-colors duration-300 hover:border-(--color-accent-border) ${className}`}>
            {photo ? (
                <Image
                    src={urlFor(photo).width(600).height(800).url()}
                    alt={item?.title ?? ""}
                    fill
                    sizes="(max-width: 860px) 50vw, 280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            ) : (
                /* Placeholder gradient when no image */
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, var(--color-bg-subtle) 0%, var(--color-bg-raise) 100%)" }}
                />
            )}

            {/* Scrim for legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

            {/* Location / title label */}
            {label && (
                <span className="absolute bottom-2 left-3 font-mono text-[0.5rem] font-light tracking-[0.18em] uppercase text-(--color-accent) opacity-60">
                    {label}
                </span>
            )}
        </div>
    );

    return href ? <Link href={href} className={`block h-full ${className}`}>{inner}</Link> : inner;
}

export default function MediaPanel({ featuredMedia }: MediaPanelProps) {
    const photos = (featuredMedia ?? []).filter(
        (item): item is PhotoItem =>
            item.mediaType === "Photography" && !!item.photograghydetails?.photo
    );

    const [main, second, third] = photos;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">


            {/* Ambient orb — bottom-right for this panel */}
            <div
                className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[80vh] w-[80vh] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.08) 0%, transparent 65%)" }}
            />

            {/* Panel label */}
            <span className="absolute left-8 top-8 font-mono text-[0.55rem] font-light tracking-[0.3em] uppercase text-(--color-text-dim)">
                Photography
            </span>

            {/* Inner content */}
            <div className="relative z-10 grid w-[min(860px,88vw)] grid-cols-2 items-center gap-[5vw]">

                {/* Left — text */}
                <div>
                    <div
                        className="mb-6 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-(--color-accent)"
                        style={{ opacity: 0.7 }}
                    >
                        Photography &amp; Film
                    </div>

                    <h1 className="mb-4 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text)">
                        The quiet<br />frame.
                    </h1>

                    <p className="max-w-[320px] font-serif italic font-light text-2xl leading-relaxed text-(--color-text-mid)">
                        Candid portraiture and environmental work. Shot on digital
                        and 35mm. Looking for the moment just before the moment.
                    </p>
                </div>

                {/* Right — photo mosaic */}
                <div
                    className="grid gap-1.25"
                    style={{
                        gridTemplateColumns: "1.2fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        height: "360px",
                    }}
                >
                    <MosaicCell item={main} className="row-span-2" />
                    <MosaicCell item={second} />
                    <MosaicCell item={third} />
                </div>
            </div>

            {/* Panel number */}
            <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text-dim)">
                03
            </span>
        </div>
    );
}
