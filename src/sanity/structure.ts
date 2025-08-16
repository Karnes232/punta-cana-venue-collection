import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("General Layout")
        .child(
          S.document()
            .schemaType("generalLayout")
            .title("General Layout")
            .documentId("generalLayout"),
        ),
      S.listItem()
        .title("Page SEO")
        .child(
          S.documentList()
            .schemaType("pageSeo")
            .title("Page SEO")
            .filter("_type == 'pageSeo'")
        ),
      S.listItem()
        .title("Main Page")
        .child(
          S.document()
            .schemaType("mainPage")
            .title("Main Page")
            .documentId("mainPage"),
        ),
      S.listItem()
        .title("Individual Venue")
        .child(
          S.list()
          .title("Individual Venue")
          .items([
            S.listItem()
            .title("Amenity")
            .child(
              S.documentList()
              .title("Amenity")
              .filter("_type == 'amenity'")
            ),
            S.listItem()
            .title("Individual Venue")
            .child(
              S.documentList()
              .title("Venue")
              .filter("_type == 'individualVenue'")
            )
            
          ])
        )

    ])
