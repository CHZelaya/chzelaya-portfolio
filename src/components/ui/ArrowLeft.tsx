'use client';

import ArrowRight from "./ArrowRight";

export default function ArrowLeft() {
    return (
        <div style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
            <ArrowRight />

        </div>
    );
}
