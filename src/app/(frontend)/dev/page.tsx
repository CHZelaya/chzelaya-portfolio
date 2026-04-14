import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { DEV_PROFILE_QUERY } from "@/sanity/lib/queries";
import DevProfileClient from "./_components/DevProfileClient";

export default async function DevProfile() {
    const [{ data: devProfile }, { data: projects }] = await Promise.all([
        sanityFetch({ query: DEV_PROFILE_QUERY }),
        sanityFetch({ query: PROJECTS_QUERY }),
    ]);

    return (
        <DevProfileClient devProfile={devProfile} projects={projects} />
    )
};
