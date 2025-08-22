import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
        name: "title",
        title: "Title",
        type: "localizedString",
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: "heroImage",
        title: "Hero Image",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: Rule => Rule.required(),
        fields: [
          defineField({
            name: "alt",
            title: "Alternative Text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "paragraph1",
        title: "Paragraph 1",
        type: "localizedBlock",
        validation: Rule => Rule.required(),
      }),
    ],
  preview: {
    select: {
      title: "title.en",
      media: "heroImage",
    },
  },
})