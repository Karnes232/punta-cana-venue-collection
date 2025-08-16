import { defineType, defineField } from "sanity"

export default defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      validation: r => r.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon name (optional)",
    }),
  ],
})
