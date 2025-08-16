import { defineType, defineField } from "sanity"

export default defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    // defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: "region",
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
  ],
})
