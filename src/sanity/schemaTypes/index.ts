import test from 'node:test'
import { type SchemaTypeDefinition } from 'sanity'
import { technologyType } from './technologyType'
import { projectsType } from './projectsType'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technologyType, projectsType],
}
