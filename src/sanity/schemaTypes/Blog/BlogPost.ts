import { defineField, defineType } from "sanity"

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "venueName",
      title: "Venue Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "localizedText",
      validation: Rule => Rule.required(),
      description: "A short description of the post",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Set to true to mark this post as featured",
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Tags",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          validation: Rule => Rule.required().min(1).unique(),
        },
        {
          name: "es",
          title: "Spanish Tags",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          validation: Rule => Rule.required().min(1).unique(),
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "blogCategory" } }],
      validation: Rule => Rule.required().min(1).unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "object",
          fields: [
            {
              name: "en",
              title: "English Alt Text",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "es",
              title: "Spanish Alt Text",
              type: "string",
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title.en",
      venueName: "venueName",
      media: "mainImage",
    },
  },
})
