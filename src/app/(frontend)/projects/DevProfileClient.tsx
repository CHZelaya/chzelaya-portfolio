import { PROJECTS_QUERYResult } from "@/sanity/types";
import { DEV_PROFILE_QUERYResult } from "@/sanity/types";

interface DevProfileClientProps {
    projects: PROJECTS_QUERYResult;
    devProfile: DEV_PROFILE_QUERYResult;
}

export default function DevProfileClient({ devProfile, projects }: DevProfileClientProps) {
    console.log("DevProfileClient", { devProfile, projects });
    return (
        <div>
            <h1>Dev Profile</h1>

        </div>
    );
}