import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutType = defineType({
    name: 'About',
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
            type: 'text',
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