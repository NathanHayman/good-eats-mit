import S from '@sanity/desk-tool/structure-builder'
 
const singletons = [
 'generalSettings',
 'promoSettings',
 'seoSettings',
 'media.tag'
]
 
export default [
 ...S.defaultInitialValueTemplateItems().filter(
   doc => !singletons.includes(doc.spec.id)
 )
]
 
