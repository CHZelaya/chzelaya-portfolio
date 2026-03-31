import { defineQuery } from "next-sanity";

export const ABOUT_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0]`);
