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
    defineField({
      name: "aboutCards",
      title: "About Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aboutCards" }] }],
      validation: Rule => Rule.max(3).required(),
    }),
    defineField({
      name: "flatRateText",
      title: "Flat Rate Text",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "flatRate",
      title: "Flat Rate",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "flatRateButtonText",
      title: "Flat Rate Button Text",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "ClientAdvantages",
      title: "Client Advantages",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: Rule => Rule.max(3).required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      validation: Rule => Rule.optional(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "heroImage",
    },
  },
})
