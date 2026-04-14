//TODO: This will be the individual project page, with case studies and details. 

import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PROJECT_ALL_SLUGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./CaseStudyClient";

interface ProjectPageProps {
    params: Promise<{ slug: string }>

}

// Generating all static paths for projects at build time
export async function generateStaticParams() {
    const slugs = await client.fetch(PROJECT_ALL_SLUGS_QUERY);
    return slugs.map((item) => ({
        slug: item.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const { data: project } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } });
    if (!project) {
        notFound();
    }
    return (<ProjectDetailClient project={project} />);
};
