import { defineQuery } from "next-sanity";

//* About Section Query
export const ABOUT_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0]{
    name,
    shortBio,
    
}`);

export const TIMELINE_ENTRIES_QUERY = defineQuery(`*[_type == "timeLineDocument" && _id == "timeline"][0].entries[] | order(date asc){
    date, 
    title,
    description,
    scribblenote,

    }
`);


//* Dev Profile Query
export const DEV_PROFILE_QUERY = defineQuery(`*[_type == "devProfile" && _id == "devProfile"][0]{
    availability,
    availabilityNote,
    approachBody,
    currentFocus,
    showCurrentFocus,
    scribbleNote,
    technologies[]-> {
        name,
        category,
        icon 
    },

}`);


//* Projects
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "Project" && featured == true]{
    title,
    coverImage,
    summary,
    year,
    slug,
}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "Project"]{
    title,
    coverImage,
    summary,
    year,
    slug,
    status,
    scribbleNote,
    githubLink,
    liveLink,
    technologies[]-> {
        name,
        category,
        icon 
    },
}`);

export const PROJECT_ALL_SLUGS_QUERY = defineQuery(`*[_type == "Project"]{ 'slug': slug.current }`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "Project" && slug.current == $slug][0]{
    title,
    coverImage,
    year,
    summary,
    status, 
    scribbleNote,
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
        icon 
    },
    githubLink1,
    githubLink2,
    liveLink,
    estimatedReadingTime,
}`)

//* Media 
export const FEATURED_MEDIA_QUERY = defineQuery(`*[_type == "Media" && featured == true]`);

export const MEDIA_QUERY = defineQuery(`*[_type == "Media"]`);