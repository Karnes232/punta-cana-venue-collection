import BlogPostContent from "@/components/BlogComponents/BlogPostContent"
import BlogPostHeader from "@/components/BlogComponents/BlogPostHeader"
import BlogPostContactForm from "@/components/ContactForms/BlogPostContactForm"
import { getBlogPostBySlug } from "@/sanity/queries/Blog/BlogPost"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function BlogPost({ params }: PageProps) {
  const { locale, slug } = await params

  const post = await getBlogPostBySlug(slug)
  console.log(post)

  return (
    <section>
      <BlogPostHeader post={post} locale={locale as "en" | "es"} />

      <div className="max-w-7xl mx-auto flex flex-col 2xl:grid 2xl:grid-cols-[1fr_24rem] 2xl:items-start gap-8">
        <div>
          <BlogPostContent body={post.body} locale={locale as "en" | "es"} />
        </div>
        <div className="2xl:sticky 2xl:top-24 h-fit">
          <BlogPostContactForm
            venueName={post.venueName}
            locale={locale as "en" | "es"}
          />
        </div>
      </div>
    </section>
  )
}
