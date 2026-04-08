'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Persists across remounts (key changes), resets on full page load.
// Lets the first-ever mount use a longer delay (sequenced after the arrow
// draw-in), while panel-change remounts start almost immediately.
let hasMountedOnce = false;

export default function HelperText({ text }: { text: string }) {
    const [startDelay] = useState(() => hasMountedOnce ? 0.1 : 1.8);

    useEffect(() => {
        hasMountedOnce = true;
    }, []);

    return (
        <span className="font-hand text-sm text-white/80">
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: startDelay + i * 0.04 }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}
