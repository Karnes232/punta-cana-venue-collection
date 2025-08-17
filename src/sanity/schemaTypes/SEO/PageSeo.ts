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
          { title: "Venues", value: "venues" },
          { title: "Inspection", value: "inspection" },
          { title: "Blog", value: "blog" },
          { title: "Contact", value: "contact" },
          { title: "About", value: "about" },
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
          { title: "Cookie Policy", value: "cookie-policy" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
})
