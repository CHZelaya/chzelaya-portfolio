import { defineField, defineType } from 'sanity'

export const timeLineEntryType = defineType({
    name: 'timeLineEntry',
    title: 'Timeline Entry',
    type: 'object',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
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
        }),
        defineField({
            name: 'iconType',
            title: 'Icon Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Work/Career', value: 'work' },
                    { title: 'Formal Education Start', value: 'formal-education-start' },
                    { title: 'Formal Education End', value: 'formal-education-end' },
                    { title: 'Self-Directed Learning', value: 'self-directed-learning' },
                    { title: 'Project', value: 'project' },
                    { title: 'Life Event Start', value: 'life-event-start' },
                    { title: 'Life Event End', value: 'life-event-end' },
                    { title: 'Emergency Start', value: 'emergency-start' },
                    { title: 'Emergency End', value: 'emergency-end' },
                ]
            }
        })
    ],
    preview: {
        select: {
            date: 'date',
            description: 'description',
            title: 'title',
        },
        prepare({ title, date }) {
            return {
                title: date,
                subtitle: title,
            }
        }
    },
});