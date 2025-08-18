import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"


export default defineType({
    name: "legalDocuments",
    title: "Legal Documents",
    type: "document",
    icon: DocumentIcon,
    fields: [
        defineField({
            name: "pageName",
            title: "Page Name",
            type: "string",
            options: {
                list: [
                { title: "Privacy Policy", value: "privacy-policy" },
                { title: "Terms of Service", value: "terms-of-service" },
                { title: "Cookie Policy", value: "cookie-policy" },
                ],
            },
            validation: Rule => Rule.required()
        }),
        defineField({ name: "body", type: "localizedBlock" }),
    ]
})