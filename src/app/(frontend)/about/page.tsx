import { ABOUT_QUERY, TIMELINE_ENTRIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import AboutProfileClient from "./_components/AboutProfileClient";

export default async function DevProfile() {
    const [{ data: about }, { data: timeline }] = await Promise.all([
        sanityFetch({ query: ABOUT_QUERY }),
        sanityFetch({ query: TIMELINE_ENTRIES_QUERY }),
    ]);

    return (
        <AboutProfileClient about={about} timeline={timeline} />
    )
};