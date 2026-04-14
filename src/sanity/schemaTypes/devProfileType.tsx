import { defineType } from "sanity";
import { defineField } from "sanity";

export const devProfileType = defineType({
    name: 'devProfile',
    title: 'Dev Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'availability',
            title: 'Availability',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'availabilityNote',
            title: 'Availability Note',
            type: 'string',
            hidden: ({ parent }) => !parent?.availability,
        }),
        defineField({
            name: 'approachBody',
            title: 'Approach',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'currentProject',
            title: 'Current Project',
            type: 'object',
            fields: [
                defineField({
                    name: 'name',
                    title: 'Project Name',
                    type: 'string',
                }),
                defineField({
                    name: 'description',
                    title: 'Project Description',
                    type: 'array',
                    of: [{ type: 'block' }],
                }),
                defineField({
                    name: 'stack',
                    title: 'Tech Stack',
                    type: 'reference',
                    to: [{ type: 'Technology' }],
                }),
                defineField({
                    name: 'status',
                    title: 'Project Status',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'annotation',
            title: 'Annotation',
            type: 'string',
        }),
        defineField({
            name: 'buildingSince',
            title: 'Building Since',
            type: 'date',
        })

    ]
});