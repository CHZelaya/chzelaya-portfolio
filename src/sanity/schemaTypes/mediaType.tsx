import { defineField, defineType, defineArrayMember } from "sanity";

export const mediaType = defineType({
    name: 'Media',
    title: 'Media',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
                list: ['Photography', 'Video']
            },
        }),
        defineField({
            name: 'photograghydetails',
            title: 'Photography Details',
            type: 'object',
            hidden: ({ document }) => document?.mediaType !== 'Photography',
            fields: [
                defineField({
                    name: 'camera',
                    title: 'Camera',
                    type: 'string',
                }),
                defineField({
                    name: 'lens',
                    title: 'Lens',
                    type: 'string',
                }),
                defineField({
                    name: 'focalLength',
                    title: 'Focal Length',
                    type: 'string',
                }),
                defineField({
                    name: 'aperture',
                    title: 'Aperture',
                    type: 'string',
                }),
                defineField({
                    name: 'shutterSpeed',
                    title: 'Shutter Speed',
                    type: 'string',
                }),
                defineField({
                    name: 'iso',
                    title: 'ISO',
                    type: 'string',
                }),
                defineField({
                    name: 'location',
                    title: 'Location',
                    type: 'string',
                }),
                defineField({
                    name: 'editingSoftware',
                    title: 'Editing Software',
                    type: 'string',
                }),
                defineField({
                    name: 'shootingMode',
                    title: 'Shooting Mode',
                    type: 'string',
                }),
                defineField({
                    name: 'lightingConditions',
                    title: 'Lighting Conditions',
                    type: 'string',
                    options: {
                        list: ['Natural Light', 'Studio Lighting', 'Low Light', 'High Contrast', 'Backlit', 'Golden Hour', 'Blue Hour', 'Night', 'Twilight Hour']
                    },
                })
            ],
        }),
        defineField({
            name: 'videoDetails',
            title: 'Video Details',
            type: 'object',
            hidden: ({ document }) => document?.mediaType !== 'Video',
            fields: [
                defineField({
                    name: 'videoUrl',
                    title: 'Video URL',
                    type: 'url',
                }),
                defineField({
                    name: 'duration',
                    title: 'Duration',
                    type: 'string',
                }),
                defineField({
                    name: 'location',
                    title: 'Location',
                    type: 'string',
                }),
                defineField({
                    name: 'year',
                    title: 'Year',
                    type: 'string',
                }),
                defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                }),
            ]

        })
    ],
})
