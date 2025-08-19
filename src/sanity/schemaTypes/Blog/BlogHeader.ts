import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
    name: "blogHeader",
    title: "Blog Header",
    type: "document",
    icon: DocumentIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localizedString",
          }),
          defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: {
              hotspot: true,
            },
            fields: [
              defineField({
                name: "alt",
                title: "Alternative Text",
                type: "string",
              }),
            ],
          }),
    ],
    preview: {
        select: {
            title: "title.en",
            media: "heroImage",
        },
    },
})
