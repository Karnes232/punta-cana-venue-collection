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
            .filter("_type == 'pageSeo'"),
        ),
      S.listItem()
        .title("Legal Documents")
        .child(
          S.documentList()
            .schemaType("legalDocuments")
            .title("Legal Documents")
            .filter("_type == 'legalDocuments'"),
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
        .title("Venue Page")
        .child(
          S.document()
            .schemaType("venuePage")
            .title("Venue Page")
            .documentId("venuePage"),
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
                    .filter("_type == 'amenity'"),
                ),
              S.listItem()
                .title("Type Venue")
                .child(
                  S.documentList()
                    .title("Type Venue")
                    .filter("_type == 'typeVenue'"),
                ),
              S.listItem()
                .title("Individual Venue")
                .child(
                  S.documentList()
                    .title("Venue")
                    .filter("_type == 'individualVenue'"),
                ),
            ]),
        ),
      S.listItem()
        .title("About Page")
        .child(
          S.document()
            .schemaType("aboutPage")
            .title("About Page")
            .documentId("aboutPage"),
        ),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("Blog Category")
                .child(
                  S.documentList()
                    .title("Blog Category")
                    .filter("_type == 'blogCategory'"),
                ),
              S.listItem()
                .title("Blog Header")
                .child(
                  S.documentList()
                    .title("Blog Header")
                    .filter("_type == 'blogHeader'"),
                ),
              S.listItem()
                .title("Blog Post")
                .child(
                  S.documentList()
                    .title("Blog Post")
                    .filter("_type == 'blogPost'"),
                ),
            ]),
        ),
    ])
