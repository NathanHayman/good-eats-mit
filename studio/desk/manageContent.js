import S from '@sanity/desk-tool/structure-builder'
import { ChartLineUp, GlobeHemisphereWest, Handshake, FolderLock, FolderOpen, IdentificationCard, MapPinLine, Medal, Newspaper, NewspaperClipping, Wrench } from "phosphor-react";
import { standardViews } from './previews/standard';

const locationMenu = S.listItem()
  .title('Restaurants')
  .icon(MapPinLine)
  .child(
    S.documentTypeList('restaurant')
      .title('Restaurant')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .views(standardViews)
          .schemaType('restaurant')
    )
)







export const contentMenu = S.listItem()
  .title('Manage Content')
  .id('content')
  .child(
    S.list()
      .title('Content')
      .items([
        locationMenu,
        S.divider(),
      ])
  )

