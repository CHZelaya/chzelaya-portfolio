import test from 'node:test'
import { type SchemaTypeDefinition } from 'sanity'
import { technologyType } from './technologyType'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technologyType],
}
