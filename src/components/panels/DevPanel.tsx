import { FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";

interface DevPanelProps {
    featuredProjects: FEATURED_PROJECTS_QUERYResult;
}

export default function DevPanel({ featuredProjects }: DevPanelProps) {
    return (
        <p></p>
    );
}
