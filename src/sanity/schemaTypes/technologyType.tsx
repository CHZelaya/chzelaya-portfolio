import { defineArrayMember, defineField, defineType } from "sanity";

export const technologyType = defineType({
    name: 'Technology',
    title: 'Technology',
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
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [defineArrayMember({
                type: 'string',
                options: {
                    list: ['Language',
                        'Framework',
                        'DevOps',
                        'Database',
                        'Devops',
                        'Tool',

                    ]
                }
            })],
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
        })
    ]
})