import { defineField, defineType } from "sanity"

export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Venue", value: "venue" },
          { title: "Location", value: "location" },
          { title: "Contact", value: "contact" },
          { title: "About", value: "about" },
          { title: "Privacy Policy", value: "privacy-policy" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
})
