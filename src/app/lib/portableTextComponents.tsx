import {
    type PortableTextComponentProps,
    type PortableTextListComponent,
    type PortableTextListItemComponent,
    type PortableTextBlockComponent,
    type PortableTextBlock,
} from "@portabletext/react"

// PortableText Helper
export const portableTextComponents = {
    block: {
        normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
            <p className="mb-4 last:mb-0">{children}</p>
        ),
    } satisfies Record<string, PortableTextBlockComponent>,
    list: {
        bullet: (({ children }) => (
            <ul className="mb-4 ml-4 space-y-2 list-disc marker:text-(--color-accent)">
                {children}
            </ul>
        )) satisfies PortableTextListComponent,
        number: (({ children }) => (
            <ol className="mb-4 ml-4 space-y-2 list-decimal marker:text-(--color-accent)">
                {children}
            </ol>
        )) satisfies PortableTextListComponent,
    },
    listItem: {
        bullet: (({ children }) => (
            <li className="pl-1">{children}</li>
        )) satisfies PortableTextListItemComponent,
        number: (({ children }) => (
            <li className="pl-1">{children}</li>
        )) satisfies PortableTextListItemComponent,
    },
}