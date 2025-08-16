import { defineType, defineField } from "sanity"

export default defineType({
  name: "individualVenue",
  title: "Individual Venue",
  type: "document",
  fields: [
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

    // defineField({ name: 'teaser', type: 'localizedText' }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "localizedString", title: "Alt text" }],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "localizedString", title: "Alt text" },
            { name: "caption", type: "localizedString", title: "Caption" },
          ],
        },
      ],
    }),

    defineField({ name: "description", type: "localizedBlock" }),

    defineField({
      name: "location",
      type: "string",
      options: {
        list: [
          "Punta Cana",
          "Cap Cana",
          "Bávaro",
          "Uvero Alto",
          "La Romana",
          "Bayahíbe",
        ],
      },
    }),
    // defineField({ name: 'location', type: 'reference', to: [{ type: 'location' }], validation: r => r.required() }),
    // defineField({ name: 'geo', type: 'geopoint' }),

    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          "Resort",
          "Beach Club",
          "Garden",
          "Chapel",
          "Ballroom",
          "Villa",
          "Rooftop",
        ],
      },
    }),
    defineField({ name: "capacitySeated", type: "number" }),
    defineField({ name: "capacityCocktail", type: "number" }),

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
    }),
    // defineField({ name: 'collections', type: 'array', of: [{ type: 'reference', to: [{ type: 'collection' }] }] }),

    // defineField({ name: 'downloadables', type: 'array', of: [{ type: 'file' }] }),
    //defineField({ name: 'availabilityNote', type: 'localizedText' }),

    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "heroImage",
    },
  },
})
