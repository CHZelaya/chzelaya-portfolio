export default function DotGrid() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            {/* Dot grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '35px 35px',
                }}
            />
            {/* Static red glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 80% 20%, rgba(200,16,46,0.07) 0%, transparent 60%)',
                }}
            />
        </div>
    );
}