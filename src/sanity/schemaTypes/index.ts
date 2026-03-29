
import { type SchemaTypeDefinition } from 'sanity'
import { technologyType } from './technologyType'
import { projectsType } from './projectsType'
import { mediaType } from './mediaType'
import { aboutType } from './aboutType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutType, technologyType, projectsType, mediaType,],
}
