import type { StructureBuilder, StructureResolver, } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const myStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio Content')
    .items([
      S.listItem()
        .title('About')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      // Remove about from the auto-generated list
      ...S.documentTypeListItems().filter(
        listItem => {
          const id = listItem.getId();
          return id && !['about'].includes(id);
        }
      )
    ])