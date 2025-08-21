import React from "react"
import BlockContent from "@/components/BlockContent/BlockContent"

const BlogPostContent = ({ body, locale }: { body: any; locale: string }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg prose-slate max-w-none">
        <BlockContent content={body} language={locale as "en" | "es"} />
      </div>
    </div>
  )
}

export default BlogPostContent
