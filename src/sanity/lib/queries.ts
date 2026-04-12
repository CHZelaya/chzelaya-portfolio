import { defineQuery } from "next-sanity";

//* About Section Query
export const ABOUT_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0]`);

//* Projects
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "Project" && featured == true]{
    title,
    coverImage,
    summary,
    year,
    slug,
}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "Project"]`);

export const PROJECT_ALL_SLUGS_QUERY = defineQuery(`*[_type == "Project"]{ 'slug': slug.current }`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "Project" && slug.current == $slug][0]{
    title,
    coverImage,
    year,
    summary,
    caseStudyBody {
        problem,
        constraints,
        approach,
        execution,
        outcome,
        reflection,
    },
    caseStudyImages {
        images[] {
            caption,
            alt,
            imageType,
            asset,
            hotspot,
            crop
        }
    },
    technologies[]-> {
        name,
        category,
        icon {
            name,
            title,
            hotspot,
        }
    },
    githubLink,
    liveLink,
}`)

//* Media 
export const FEATURED_MEDIA_QUERY = defineQuery(`*[_type == "Media" && featured == true]`);

export const MEDIA_QUERY = defineQuery(`*[_type == "Media"]`);