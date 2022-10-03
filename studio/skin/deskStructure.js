import S from '@sanity/desk-tool/structure-builder'
import SocialPreview from 'part:social-preview/component'

 
import { contentMenu } from '../desk/manageContent'
import { settingsMenu } from '../desk/settings'


const hiddenDocTypes = listItem =>
 ![
    'siteSettings',
    'media.tag',
    'post',
    'member',
    'location',
    'insurance',
    'generalSettings',
    'promoSettings',
    'seoSettings',
    'menuItems',
    'restaurant',
    'author',
    'product',

     // for media plugin
 ].includes(listItem.getId())
 
export default () =>
 S.list()
   .title('Good Eats')
   .items([
     contentMenu,
     S.divider(),
     settingsMenu,
 
     // Filter out docs already defined above
     ...S.documentTypeListItems().filter(hiddenDocTypes)
   ])
