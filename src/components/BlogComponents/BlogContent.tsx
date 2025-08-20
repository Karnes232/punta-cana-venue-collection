'use client'
import { BlogCategory } from '@/sanity/queries/Blog/BlogCategory'
import React, { useState } from 'react'
import BlogFilters from './BlogFilters'
import { BlogPostMainPage } from '@/sanity/queries/Blog/BlogPost'
import FeaturedPost from './FeaturedPost'

const BlogContent = ({ categories, blogPosts, locale }: { categories: BlogCategory[], blogPosts: BlogPostMainPage[], locale: string }) => {
    const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const featuredPost =
  blogPosts.find((post: any) => post.featured === true) || blogPosts[0]


  return (
    <section id="blog-content"   className="min-h-screen">
        <BlogFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        locale={locale}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchTerm === "" &&
          selectedCategory === "All" &&
          // currentPage === 1 &&
          featuredPost && <FeaturedPost post={featuredPost} locale={locale as 'en' | 'es'} />}

        </div>
    </section>
  )
}

export default BlogContent