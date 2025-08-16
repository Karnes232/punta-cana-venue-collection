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
    ],
    preview: {
      select: {
        title: "title.en",
      },
    },
  })
  