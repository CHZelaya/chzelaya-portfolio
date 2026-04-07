import { defineQuery } from "next-sanity";

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

//* Media 
export const FEATURED_MEDIA_QUERY = defineQuery(`*[_type == "Media" && featured == true]`);

export const MEDIA_QUERY = defineQuery(`*[_type == "Media"]`);