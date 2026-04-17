'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { FEATURED_MEDIA_QUERYResult } from '@/sanity/types';

type PhotoItem = FEATURED_MEDIA_QUERYResult[number] & {
    mediaType: 'Photography';
};

interface PhotoStackProps {
    photos: PhotoItem[];
}

// Stack positions for each card — front to back
const STACK_CONFIG = [
    { rotate: 0, x: 0, y: 0, scale: 1.00, z: 30, opacity: 1.0 },  // front
    { rotate: -5, x: -18, y: 14, scale: 0.97, z: 20, opacity: 0.85 }, // middle
    { rotate: 8, x: 22, y: 24, scale: 0.93, z: 10, opacity: 0.7 }, // back
];

// Fan out further on hover
const HOVER_CONFIG = [
    { rotate: 0, x: 0, y: 0, scale: 1.00 },
    { rotate: -9, x: -28, y: 20, scale: 0.97 },
    { rotate: 14, x: 36, y: 34, scale: 0.93 },
];

export default function PhotoStack({ photos }: PhotoStackProps) {
    // stackOrder[0] = index of card currently at front
    const [stackOrder, setStackOrder] = useState([0, 1, 2]);
    const [isHovered, setIsHovered] = useState(false);
    const [isCycling, setIsCycling] = useState(false);

    const displayPhotos = photos.slice(0, 3);

    function cycleStack() {
        if (isCycling) return;
        setIsCycling(true);
        // Rotate order: front goes to back
        setStackOrder(prev => [...prev.slice(1), prev[0]]);
        setTimeout(() => setIsCycling(false), 500);
    }

    return (
        <div
            className="relative cursor-pointer w-55 h-80 md:w-65 md:h-95 lg:w-75 lg:h-110"

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={cycleStack}
        >
            {displayPhotos.map((photo, cardIndex) => {
                const positionInStack = stackOrder.indexOf(cardIndex);
                const config = isHovered ? HOVER_CONFIG[positionInStack] : STACK_CONFIG[positionInStack];
                const photoAsset = photo?.photograghydetails?.photo;
                const location = photo?.photograghydetails?.location ?? photo?.title;
                const href = photo?.slug?.current ? `/photography/${photo.slug.current}` : null;

                return (
                    <motion.div
                        key={cardIndex}
                        className="absolute inset-0 overflow-hidden"
                        style={{ zIndex: STACK_CONFIG[positionInStack].z }}
                        animate={{
                            rotate: config.rotate,
                            x: config.x,
                            y: config.y,
                            scale: config.scale,
                            opacity: STACK_CONFIG[positionInStack].opacity,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                        }}
                    >
                        {/* Card */}
                        <div className="relative h-full w-full overflow-hidden border border-(--color-border)">
                            {photoAsset ? (
                                <Image
                                    src={urlFor(photoAsset).width(520).height(760).url()}
                                    alt={photo?.title ?? ''}
                                    fill
                                    sizes="260px"
                                    className="object-cover"
                                    draggable={false}
                                />
                            ) : (
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(160deg, var(--color-bg-subtle) 0%, var(--color-bg-raise) 100%)'
                                    }}
                                />
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                            {/* Location label */}
                            {location && positionInStack === 0 && (
                                <motion.span
                                    className="absolute bottom-3 left-3 font-mono text-[0.5rem] tracking-[0.18em] uppercase text-(--color-accent) opacity-60"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {location}
                                </motion.span>
                            )}

                            {/* Front card — link to detail page */}
                            {positionInStack === 0 && href && (
                                <Link
                                    href={href}
                                    onClick={e => e.stopPropagation()}
                                    className="absolute bottom-3 right-3 font-mono text-[0.5rem] tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors duration-200"
                                >
                                    View →
                                </Link>
                            )}
                        </div>
                    </motion.div>
                );
            })}

            {/* Click hint */}
            <motion.p
                className="absolute -bottom-7 left-0 right-0 text-center font-mono text-[0.5rem] tracking-[0.15em] uppercase text-(--color-text-dim) opacity-0"
                animate={{ opacity: isHovered ? 0.5 : 0 }}
                transition={{ duration: 0.2 }}
            >
                click to cycle
            </motion.p>
        </div>
    );
}