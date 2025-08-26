import { defineType, defineField } from "sanity"

export default defineType({
  name: "eventType",
  title: "Event Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      validation: r => r.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          "Heart",
          "PartyPopper",
          "Briefcase",
          "GraduationCap",
          "Gift",
          "Music",
          "Calendar",
          "Users",
          "Crown",
          "Cake",
          "Camera",
          "Star",
        ],
      },
      description: "Lucide icon name (optional)",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      icon: "icon",
    },
  },
})
