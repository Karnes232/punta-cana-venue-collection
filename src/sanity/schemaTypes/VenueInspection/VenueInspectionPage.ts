import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "venueInspectionPage",
  title: "Venue Inspection Page",
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
      name: "servicesTitle",
      title: "Services Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Description",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "servicesItems",
      title: "Services Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localizedString" },
            { name: "description", type: "localizedText" },
          ],
        },
      ],
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
