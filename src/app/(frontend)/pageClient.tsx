'use client';
import { ABOUT_QUERYResult, FEATURED_PROJECTS_QUERYResult, FEATURED_MEDIA_QUERYResult } from "@/sanity/types";
import { CenterPanel } from "@/components/panels";
import { DevPanel } from "@/components/panels";
import { MediaPanel } from "@/components/panels";



interface PageClientProps {
  about: ABOUT_QUERYResult;
  featuredProjects: FEATURED_PROJECTS_QUERYResult;
  featuredMedia: FEATURED_MEDIA_QUERYResult;
}


export default function PageClient({ about, featuredProjects, featuredMedia }: PageClientProps) {

  return (
    <>
      <CenterPanel about={about} />
      <DevPanel featuredProjects={featuredProjects} />
      <MediaPanel featuredMedia={featuredMedia} />
    </>
  );
}
