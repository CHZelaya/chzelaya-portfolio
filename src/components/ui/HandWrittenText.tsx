'use client';

import { cn } from '@/app/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Persists across remounts (key changes), resets on full page load.
// Lets the first-ever mount use a longer delay (sequenced after the arrow
// draw-in), while panel-change remounts start almost immediately.
let hasMountedOnce = false;

interface HandWrittenTextProps {
    text: string;
    rotation?: number; // degrees, clockwise
    className?: string;
}


export default function HandWrittenText({ text, rotation = -8, className }: HandWrittenTextProps) {
    const [startDelay] = useState(() => hasMountedOnce ? 0.1 : 1.8);

    useEffect(() => {
        hasMountedOnce = true;
    }, []);

    return (
        <span>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className={cn('font-hand text-white/80 text-2xl', className)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: startDelay + i * 0.04 }}
                    style={{ display: 'inline-block', whiteSpace: 'pre', transform: `rotate(${rotation}deg)` }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}
