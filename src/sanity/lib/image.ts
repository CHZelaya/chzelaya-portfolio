import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { client } from './client' // adjust path as needed

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}