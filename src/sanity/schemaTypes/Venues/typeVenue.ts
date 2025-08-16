import { defineType, defineField } from "sanity"

export default defineType({
  name: "typeVenue",
  title: "Type Venue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      validation: r => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [{ name: "alt", type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
    },
  },
})
