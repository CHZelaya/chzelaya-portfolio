import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_QUERY,
  FEATURED_MEDIA_QUERY,
  FEATURED_PROJECTS_QUERY,
} from "@/sanity/lib/queries";
import PageClient from "./pageClient";


export default async function Home() {

  const [
    { data: aboutData },
    { data: featuredProjectsData },
    { data: featuredMediaData },
  ] = await Promise.all([
    sanityFetch({ query: ABOUT_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
    sanityFetch({ query: FEATURED_MEDIA_QUERY }),
  ]);

  return (
    <PageClient
      about={aboutData}
      featuredProjects={featuredProjectsData}
      featuredMedia={featuredMediaData}
    />
  );
}
