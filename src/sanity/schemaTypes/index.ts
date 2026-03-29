
import { type SchemaTypeDefinition } from 'sanity'
import { technologyType } from './technologyType'
import { projectsType } from './projectsType'
import { mediaType } from './mediaType'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technologyType, projectsType, mediaType,],
}
