'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function DevSideText({ text }: { text: string }) {
    const isFirstMount = useRef(true);
    useEffect(() => { isFirstMount.current = false; }, []);
    const startDelay = isFirstMount.current ? 1.8 : 0.1;

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
