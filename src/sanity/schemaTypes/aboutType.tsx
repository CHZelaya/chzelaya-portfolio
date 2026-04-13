import { defineType, defineField } from "sanity";

//TODO: Create two singletons for DevProfile and PhotoProfile. DevProfile will contain specifics to myself and the dev paradigm while PhotoProfile will contain specificst to my photography paradigm. This way I can have a more flexible and extensible schema for the future, and also avoid having to update the about page every time I want to add a new field to the profile.


export const aboutType = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'shortBio',
            title: 'Short Bio',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'resumeFile',
            title: 'Resume File',
            type: 'file',
        }),
        defineField({
            name: 'socials',
            title: 'Socials',
            type: 'object',
            fields: [
                defineField({
                    name: 'github',
                    title: 'GitHub',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'url',
                            title: 'GitHub URL',
                            type: 'url',
                        }),
                    ]
                }),
                defineField({
                    name: 'linkedin',
                    title: 'LinkedIn',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'url',
                            title: 'LinkedIn URL',
                            type: 'url',
                        })
                    ]
                }),
                defineField({
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'url',
                            title: 'Instagram URL',
                            type: 'url',
                        })
                    ]
                })
            ],
        })
    ]
})