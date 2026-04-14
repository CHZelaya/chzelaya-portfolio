

export function BentoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-(--color-bg-raise) border border-(--color-border-mid) rounded-sm overflow-hidden relative transition-[border-color] duration-200 hover:border-white/20 ${className}`}>
            {children}
        </div>
    )
}


export function BentoLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[9.5px] tracking-[0.22em] uppercase text-(--color-accent) mb-3 font-mono">
            {children}
        </p>
    )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-(--color-accent) mb-5 font-mono after:content-[''] after:flex-1 after:h-px after:bg-(--color-accent-border)">
            {children}
        </p>
    )
}