import { UserIcon } from 'lucide-react';
import { PiBracketsCurlyBold } from "react-icons/pi";
import type { StructureBuilder, StructureResolver, } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const myStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio Content')
    .items([
      S.listItem()
        .title('About')
        .schemaType('about')
        .icon(UserIcon)
        .child(
          S.editor()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Dev Profile')
        .schemaType('devProfile')
        .icon(PiBracketsCurlyBold)
        .child(
          S.editor()
            .schemaType('devProfile')
            .documentId('devProfile')
        ),
      // Remove about and devProfile from the auto-generated list
      ...S.documentTypeListItems().filter(
        listItem => {
          const id = listItem.getId();
          return id && !['about', 'devProfile'].includes(id);
        }
      )
    ])