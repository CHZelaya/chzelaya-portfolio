//TODO: This will be the projects library page, with filters and all projects. DevPanel will become a "featured projects" section on the homepage.
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { PROJECTS_QUERYResult } from "@/sanity/types";

import DevProfileClient from "./DevProfileClient";

interface DevProfileProps {
    params: PROJECTS_QUERYResult
}



export default async function DevProfile({ params }: DevProfileProps) {
    const { data: devProfileParams } = await sanityFetch({ query: PROJECTS_QUERY });

    return (<DevProfileClient data={devProfileParams} />);
}