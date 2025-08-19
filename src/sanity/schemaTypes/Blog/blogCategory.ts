import { defineField, defineType } from "sanity"

export default defineType({
    name: "blogCategory",
    title: "Blog Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localizedString",
        }),
    ],
    preview: {
        select: {
            title: "title.en",
        },
    },
})