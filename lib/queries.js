const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const restaurantFields = `
  _id,
  "slug": slug.current,
  name,
  categories,
  restaurantImage,
  "products": products[]->{name, price, image, _id},
  description,
  rating,
  reviewCount,
`



export const restaurantSlugsQuery = `
*[_type == "restaurant" && defined(slug.current)][].slug.current
`
export const restaurantQuery = `
{
  "restaurant": *[_type == "restaurant" && slug.current == $slug][0] {
    ${restaurantFields}
  }
}
`


export const indexQuery = `
*[_type == "restaurant"] | order(date desc, _updatedAt desc) {
  ${restaurantFields}
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
