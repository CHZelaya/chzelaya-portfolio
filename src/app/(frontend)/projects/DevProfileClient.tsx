import { PROJECTS_QUERYResult } from "@/sanity/types";

interface DevProfileClientProps {
    data: PROJECTS_QUERYResult;
}

export default function DevProfileClient({ data }: DevProfileClientProps) {
    return (
        <div>
            <h1>Dev Profile</h1>
        </div>
    );
}