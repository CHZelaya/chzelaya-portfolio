import { defineField, defineType } from 'sanity'

export const timeLineEntryType = defineType({
    name: 'timeLineEntry',
    title: 'Timeline Entry',
    type: 'object',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'scribbleNote',
            title: 'Scribble Note',
            type: 'string',
        })
    ],
    preview: {
        select: {
            date: 'date',
            description: 'description',

        },
        prepare({ description, date }) {
            return {
                title: date,
                subtitle: description,
            }
        }
    },
});