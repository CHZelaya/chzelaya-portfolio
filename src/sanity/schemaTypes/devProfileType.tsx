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
            name: 'showCurrentFocus',
            title: 'Show Current Focus?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'currentFocus',
            title: 'Current Focus Note',
            type: 'string',
            hidden: ({ parent }) => !parent?.showCurrentFocus,
        }),
        defineField({
            name: 'scribbleNote',
            title: 'Scribble Note',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'buildingSince',
            title: 'Building Since',
            type: 'date',
        }),
        defineField({
            name: 'technologyStack',
            title: 'Technology Stack',
            type: 'reference',
            to: [{ type: 'Technology' }],
        })

    ]
});