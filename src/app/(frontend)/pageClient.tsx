import Image from "next/image";
import { ABOUT_QUERYResult, FEATURED_PROJECTS_QUERYResult, FEATURED_MEDIA_QUERYResult } from "@/sanity/types";

interface PageClientProps {
  about: ABOUT_QUERYResult;
  featuredProjects: FEATURED_PROJECTS_QUERYResult;
  featuredMedia: FEATURED_MEDIA_QUERYResult;
}


export default function PageClient({ about, featuredProjects, featuredMedia }: PageClientProps) {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="text-4xl font-bold mb-4">The start of this portfolio page</h1>
      </main>
    </div>
  );
}
