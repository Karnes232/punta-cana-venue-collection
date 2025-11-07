import { defineType, defineField } from "sanity"

export default defineType({
  name: "individualVenue",
  title: "Individual Venue",
  type: "document",
  fields: [
    defineField({
      name: "venueName",
      title: "Venue Name",
      type: "string",
      validation: r => r.required(),
    }),
    defineField({
      name: "title",
      type: "localizedString",
      validation: r => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: (doc: any) => doc?.title?.en || "" },
      validation: r => r.required(),
    }),

    defineField({ name: "teaser", type: "localizedText" }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "localizedString", title: "Alt text" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "localizedString",
              title: "Alt text",
              validation: Rule => Rule.required(),
            },
            { name: "caption", type: "localizedString", title: "Caption" },
          ],
        },
      ],
      description: "The gallery of images of the venue. Minimum 5 images.",
      validation: Rule => Rule.required().min(5),
    }),
    defineField({
      name: "videoGallery",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "location",
      type: "reference",
      to: [{ type: "locationType" }],
      options: {
        disableNew: true,
      },
      validation: Rule => Rule.required(),
    }),
    // defineField({
    //   name: "location",
    //   type: "string",
    //   options: {
    //     list: [
    //       "Punta Cana",
    //       "Cap Cana",
    //       "Bávaro",
    //       "Uvero Alto",
    //       "La Romana",
    //       "Bayahíbe",
    //     ],
    //   },
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: "map",
      type: "object",
      fields: [
        defineField({ name: "latitude", type: "number" }),
        defineField({ name: "longitude", type: "number" }),
      ],
      description: "The map coordinates of the venue. https://www.latlong.net/",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "description",
      type: "localizedBlock",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description2",
      type: "localizedBlock",
    }),

    // defineField({ name: 'location', type: 'reference', to: [{ type: 'location' }], validation: r => r.required() }),
    // defineField({ name: 'geo', type: 'geopoint' }),

    defineField({
      name: "type",
      type: "array",
      of: [{ type: "reference", to: [{ type: "typeVenue" }] }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "totalSpace",
      type: "number",
      description: "Total space in square meters",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "capacitySeated",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "capacityCocktail",
      type: "number",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "startingFrom",
      type: "number",
      description: "Starting price (USD)",
    }),
    //defineField({ name: 'currency', type: 'string', initialValue: 'USD' }),

    defineField({
      name: "amenities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "eventTypes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "eventType" }] }],
      validation: Rule => Rule.required(),
    }),

    // defineField({ name: 'collections', type: 'array', of: [{ type: 'reference', to: [{ type: 'collection' }] }] }),

    // defineField({ name: 'downloadables', type: 'array', of: [{ type: 'file' }] }),
    //defineField({ name: 'availabilityNote', type: 'localizedText' }),

    defineField({
      name: "seo",
      type: "seo",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "displayed",
      type: "boolean",
      initialValue: true,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "venueName",
      media: "heroImage",
    },
  },
})
