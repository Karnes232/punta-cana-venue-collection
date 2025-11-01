import { defineType, defineField } from "sanity"

export default defineType({
  name: "locationType",
  title: "Location Type",
  type: "document",
  fields: [
    defineField({
      name: "location",
      type: "string",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "location",
    },
  },
})
