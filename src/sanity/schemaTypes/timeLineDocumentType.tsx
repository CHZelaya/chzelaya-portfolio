import { defineArrayMember, defineField, defineType } from "sanity";


export const timeLineDocumentType = defineType({
    name: 'timeline',
    title: 'Timeline',
    type: 'document',
    icon: () => '🕰️',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'entries',
            title: 'Entries',
            type: 'array',
            of: [defineArrayMember({
                type: 'timeLineEntry',
            })],
        }),
    ],
});