import { FEATURED_MEDIA_QUERYResult } from "@/sanity/types";

interface MediaPanelProps {
    featuredMedia: FEATURED_MEDIA_QUERYResult;
}

export default function MediaPanel({ featuredMedia }: MediaPanelProps) {
    return (
        <p>Featured Media Component reporting in! I'm online!</p>
    );
}