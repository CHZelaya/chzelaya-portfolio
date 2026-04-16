import { defineType, defineField, defineArrayMember } from "sanity";

export const projectsType = defineType({
    name: 'Project',
    title: 'Project',
    type: 'document',
    icon: () => '📁',
    description: 'A project represents a case study of a software development project, including the problem, constraints, approach, execution, outcome, and reflection.',
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
                maxLength: 96,
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            type: 'string',
            name: 'status',
            title: 'Status',
            options: {
                list: [
                    { title: 'Live', value: 'live' },
                    { title: 'Frozen', value: 'frozen' },
                    { title: 'In Progress', value: 'in-progress' },
                    { title: 'Archived', value: 'archived' },
                ],
            },
        }),
        defineField({
            type: 'string',
            name: 'scribbleNote',
            title: 'Scribble Note',
            description: 'The string that will be used to describe why the status is what it is.'
        }),
        //Case Study Body
        defineField({
            name: 'caseStudyBody',
            title: 'Case Study Body',
            type: 'object',
            fields: [
                defineField({
                    name: 'problem',
                    title: 'Problem',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
                defineField({
                    name: 'constraints',
                    title: 'Constraints',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
                defineField({
                    name: 'approach',
                    title: 'Approach',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
                defineField({
                    name: 'execution',
                    title: 'Execution',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
                defineField({
                    name: 'outcome',
                    title: 'Outcome',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
                defineField({
                    name: 'reflection',
                    title: 'Reflection',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'block',
                    })]
                }),
            ]
        }),
        defineField({
            name: 'caseStudyImages',
            title: 'Case Study Images',
            type: 'object',
            fields: [
                defineField({
                    name: 'images',
                    title: 'Images',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'image',
                        options: {
                            hotspot: true,
                        },
                        fields: [
                            defineField({
                                name: 'caption',
                                title: 'Caption',
                                type: 'string',
                            }),
                            defineField({
                                name: 'alt',
                                title: 'Alt Text',
                                type: 'string',
                            }),
                            defineField({
                                name: 'imageType',
                                title: 'Image Type',
                                type: 'array',
                                of: [defineArrayMember({
                                    type: 'string',
                                    options: {
                                        list: ['screenshot', 'diagram', 'ui', 'before/after']
                                    }
                                })],
                            }),
                        ]

                    })],
                }),
            ]
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [defineArrayMember({
                type: 'reference',
                to: [{ type: 'Technology' }],
            })],
        }),
        defineField({
            name: 'githubLink1',
            title: 'GitHub Link 1',
            type: 'url',
        }),
        defineField({
            name: 'githubLink2',
            title: 'GitHub Link 2',
            type: 'url',
        }),
        defineField({
            name: 'liveLink',
            title: 'Live Link',
            type: 'url',
        }),
        defineField({
            name: 'estimatedReadingTime',
            title: 'Estimated Reading Time (minutes)',
            type: 'number',
        })
    ],
})