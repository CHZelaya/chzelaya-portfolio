import { defineQuery } from "next-sanity";

export const ABOUT_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0]`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "Project" && featured == true]{
    title,
    technologies[]->{
        name,
        category,
        icon
    }
}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "Project"]`);