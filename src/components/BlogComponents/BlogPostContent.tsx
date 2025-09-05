import React from "react"
import BlockContent from "@/components/BlockContent/BlockContent"

const BlogPostContent = ({ body, locale, displayForm }: { body: any; locale: string; displayForm: boolean }) => {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${displayForm ? "max-w-4xl" : "max-w-7xl"}`}>
      <div className="prose prose-lg prose-slate max-w-none">
        <BlockContent content={body} language={locale as "en" | "es"} />
      </div>
    </div>
  )
}

export default BlogPostContent
