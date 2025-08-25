import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "aboutCards",
  title: "About Cards",
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
      name: "description",
      title: "Description",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: ["map-pin", "camera", "file-text"],
      },
      description: "Lucide icon name",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "icon",
    },
  },
})
