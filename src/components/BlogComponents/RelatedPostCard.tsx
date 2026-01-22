import { BlogPostMainPage } from "@/sanity/queries/Blog/BlogPost"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const RelatedPostCard = ({
  post,
  locale,
}: {
  post: BlogPostMainPage
  locale: "en" | "es"
}) => {
  const { title, mainImage, slug } = post

  return (
    <Link href={`/blog/${slug.current}`} className="block h-full">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={mainImage.asset.url}
            alt={mainImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="p-5 flex-1 flex items-center">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-golden transition-colors">
            {title[locale]}
          </h3>
        </div>
      </article>
    </Link>
  )
}

export default RelatedPostCard
