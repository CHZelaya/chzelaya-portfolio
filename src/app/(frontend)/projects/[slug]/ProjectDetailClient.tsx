import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity/types";

interface ProjectDetailClientProps {
    project: PROJECT_BY_SLUG_QUERYResult;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <div>
            <h1>{project?.title}</h1>
            {/* Render other project details here */}
        </div>
    );
}