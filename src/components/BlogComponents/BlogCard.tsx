import { BlogPostMainPage } from "@/sanity/queries/Blog/BlogPost"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const BlogCard = ({
  post,
  locale,
}: {
  post: BlogPostMainPage
  locale: "en" | "es"
}) => {
  const t = useTranslations("Blog")
  const {
    title,
    description,
    tags,
    readTime,
    mainImage,
    slug,
    categories,
    venueName,
    publishedAt,
  } = post

  return (
    <Link href={`/blog/${slug.current}`}>
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <Image
            src={mainImage.asset.url}
            alt={mainImage.alt}
            width={500}
            height={500}
            className="w-full h-48 object-cover"
          />
          {post.categories[0] && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
                {categories[0].title[locale]}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
            {title[locale]}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-slate-500">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-slate-500">
              <Clock className="h-4 w-4 mr-2" />
              {readTime} {t("minRead")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags &&
                tags[locale]?.slice(0, 2).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <Link
              href={`/blog/${slug.current}`}
              className="text-golden hover:text-turquoise font-medium flex items-center transition-colors"
            >
              {t("readMore")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard
