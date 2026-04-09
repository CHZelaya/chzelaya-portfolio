'use client';

import { useEffect, useRef } from 'react';

const SPACING = 28;
const DOT_R = 1;
const GLOW_R = 110;

export default function DotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -999, y: -999 });
    const rafRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const isMobile = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        isMobile.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMove);

        const draw = (timestamp: number) => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / SPACING) + 1;
            const rows = Math.ceil(height / SPACING) + 1;

            // Multiple ripple origins
            const ripples = [
                { x: width * 0.25, y: height * 0.5, offset: 0 },
                { x: width * 0.75, y: height * 0.5, offset: 800 },
                { x: width * 0.5, y: height * 0.3, offset: 400 },
            ];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * SPACING;
                    const y = r * SPACING;

                    let glow = 0;

                    if (isMobile.current) {
                        // Pick the strongest ripple influence on this dot
                        for (const ripple of ripples) {
                            const dx = x - ripple.x;
                            const dy = y - ripple.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            // Ripple ring — expands outward over time
                            const rippleRadius = ((timestamp + ripple.offset) * 0.08) % (Math.max(width, height));
                            const ringWidth = 80;
                            const distFromRing = Math.abs(dist - rippleRadius);
                            const rippleGlow = Math.max(0, 1 - distFromRing / ringWidth) * 0.8;

                            glow = Math.max(glow, rippleGlow);
                        }
                    } else {
                        // Mouse proximity — unchanged
                        const { x: mx, y: my } = mouse.current;
                        const dx = x - mx;
                        const dy = y - my;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        glow = Math.max(0, 1 - dist / GLOW_R);
                    }

                    const rv = Math.round(200 * glow + 255 * (1 - glow));
                    const gv = Math.round(16 * glow);
                    const bv = Math.round(46 * glow);
                    const alpha = 0.1 + glow * 0.55;

                    ctx.beginPath();
                    ctx.arc(x, y, DOT_R + glow * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${rv},${gv},${bv},${alpha})`;
                    ctx.fill();
                }
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
        />
    );
}