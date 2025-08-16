import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "mainPage",
  title: "Main Page",
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
    defineField({
      name: "venueOfTheDay",
      title: "Venue of the Day",
      type: "reference",
      to: [{ type: "individualVenue" }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "heroImage",
    },
  },
})
