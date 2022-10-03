import React from 'react'
import { Circle } from 'phosphor-react'




 // replace template tags with values
 export function replaceTemplateTags(string, templateTags = []) {
   let newString = string
 
   templateTags.map(v => {
     newString = newString?.replace(new RegExp(v.tag, 'g'), v.value)
   })
   return newString
 }
 
 
 
export const assemblePageUrl = ({ document, domain }) => {
 const { slug } = document
 
 if (!domain) {
   console.warn('Missing domain', { slug, domain })
   return ''
 }
 
 return domain + (slug ? `/${slug.current}` : '')
}
 
export const decodeAssetUrl = id => {
 const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/
 const [, assetId, dimensions, format] = pattern.exec(id)
 
 const [width, height] = dimensions
   ? dimensions.split('x').map(v => parseInt(v, 10))
   : []
 
 return {
   assetId,
   dimensions: { width, height },
   format
 }
}
 
export const excludeCurrentReferences = ({ parent }) => {
 const addedRefs = parent?.map(ref => ref._ref).filter(Boolean)
 
 return {
   filter: '!(_id in $ids)',
   params: {
     ids: addedRefs
   }
 }
}
 
