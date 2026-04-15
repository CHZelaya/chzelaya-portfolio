'use client';
import { DottedMap, type Marker } from "@/components/ui/dotted-map"
import { BentoCard } from "./BentoBoxes"
import { DEV_PROFILE_QUERYResult } from "@/sanity/types";

interface LocationCardProps {
    devProfile: DEV_PROFILE_QUERYResult;
}

type MyMarker = Marker & {
    overlay: {
        countryCode: string
        label: string
    }
}

const markers: MyMarker[] = [
    {
        lat: 51.0447,
        lng: -114.0719,
        size: 1,
        overlay: { countryCode: "ca", label: "YYC" },
    },
]



export function LocationCard({ devProfile }: LocationCardProps) {
    const isAvailable = devProfile?.availability ?? false

    return (
        <BentoCard className="overflow-hidden relative min-h-35">
            {/* Map background */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
                <DottedMap<MyMarker>
                    dotRadius={0.1}
                    markers={markers}
                    dotColor="rgb(255, 255, 255)"
                    className="w-full h-full"
                    markerColor="#c8102e"
                    pulse={true}
                    style={{
                        transform: 'scale(2.8) translate(3%, 15%)',
                        transformOrigin: 'left',
                    }}
                />
            </div>
            {/* Content */}
            <div className="flex relative z-10 flex-col justify-between p-5 min-h-35">

                <div className="absolute inset-0 opacity-30 pointer-events-none">
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="relative shrink-0">
                            {isAvailable ? (
                                <>
                                    <span className="w-2 h-2 rounded-full block bg-green-400" />
                                    <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
                                </>
                            ) : (
                                <span className="w-2 h-2 rounded-full block bg-red-400" />
                            )}
                        </span>
                        <span className="text-[11px] text-(--color-text-mid) font-mono tracking-[0.04em]">
                            {isAvailable ? 'Available for work' : 'Not available for work'}
                        </span>
                    </div>
                    <p className="font-display font-light text-[1.05rem]  text-(--color-text) tracking-tight mb-1.5">
                        {isAvailable ? 'Open To Roles' : 'Not Currently Available'}
                    </p>
                    <p className="text-[11px] text-(--color-text-dim) leading-[1.65] font-mono">
                        Full-time or contract. Remote preferred. Calgary-based.
                    </p>
                </div>
                {isAvailable ? (
                    <span className="inline-block mt-4 text-[9px] tracking-[0.12em] uppercase text-green-400 border border-green-400/22 rounded-xs px-2 py-1 bg-green-400/6 font-mono w-fit">
                        {devProfile?.availabilityNote || 'Open to opportunities'}
                    </span>
                ) : (
                    <span className="inline-block mt-4 text-[9px] tracking-[0.12em] uppercase text-red-400 border border-red-400/22 rounded-xs px-2 py-1 bg-red-400/6 font-mono w-fit">
                        Currently Engaged
                    </span>
                )}
            </div>
        </BentoCard>
    )
}