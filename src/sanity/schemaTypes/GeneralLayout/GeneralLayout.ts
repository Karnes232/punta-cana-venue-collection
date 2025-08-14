// schemas/generalLayout.ts
import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
    name: "generalLayout",
    title: "General Layout",
    type: "document",
    icon: DocumentIcon,
    fields: [defineField({
        name: "companyName",
        title: "Company Name",
        type: "string",
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: "email",
        title: "Email",
        type: "string",
        validation: Rule => Rule.required().email(),
      }),
      defineField({
        name: "telephone",
        title: "Telephone",
        type: "string",
      }),
      defineField({
        name: "socialLinks",
        title: "Social Links",
        type: "object",
        description: "Add your social media links:",
        fields: [
          {
            name: "facebook",
            title: "Facebook URL",
            type: "url",
            initialValue: "https://facebook.com/",
          },
          {
            name: "instagram",
            title: "Instagram URL",
            type: "url",
            initialValue: "https://instagram.com/",
          },
        ],
        options: {
          collapsed: false,
          collapsible: true,
          columns: 2,
        },
      }),
      defineField({
        name: "logo",
        title: "Logo",
        type: "image",
        options: {
          hotspot: true, // Enables the hotspot functionality for image cropping
        },
        fields: [
          defineField({
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description: "Important for SEO and accessibility",
            validation: Rule => Rule.required(),
          }),
        ],
      }),],
    preview: {
      select: {
        title: "companyName",
        media: "logo",
      },
    },
  })
  