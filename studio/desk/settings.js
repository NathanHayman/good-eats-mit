import S from '@sanity/desk-tool/structure-builder'
 
import {
 Gear,
 FlagBanner,
 GlobeSimple,
} from 'phosphor-react'

import { standardViews } from './previews/standard';

 
export const settingsMenu = S.listItem()
 .title('Settings')
 .child(
   S.list()
     .title('Settings')
     .items([
       S.listItem()
         .title('General')
         .child(
           S.editor()
             .id('generalSettings')
             .schemaType('generalSettings')
             .documentId('generalSettings')
             .views(standardViews)
         )
         .icon(Gear),
       S.divider(),
       S.listItem()
         .title('Promo Bar')
         .child(
           S.editor()
             .id('promoSettings')
             .schemaType('promoSettings')
             .documentId('promoSettings')
         )
         .icon(FlagBanner),
       S.divider(),
       S.listItem()
         .title('Default SEO / Share')
         .child(
           S.editor()
             .id('seoSettings')
             .schemaType('seoSettings')
             .documentId('seoSettings')
             .views(standardViews)
         )
         .icon(GlobeSimple),
     ])
 )
 .icon(Gear)
 
