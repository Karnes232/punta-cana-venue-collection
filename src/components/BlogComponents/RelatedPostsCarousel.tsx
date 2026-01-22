"use client"

import { BlogPostMainPage } from "@/sanity/queries/Blog/BlogPost"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import RelatedPostCard from "./RelatedPostCard"
import { useRef } from "react"

interface RelatedPostsCarouselProps {
  posts: BlogPostMainPage[]
  locale: "en" | "es"
}

const RelatedPostsCarousel = ({ posts, locale }: RelatedPostsCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null)

  if (posts.length === 0) return null

  return (
    <div className="relative">
      <style jsx global>{`
        .related-posts-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
          bottom: 0;
        }
        .related-posts-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .related-posts-swiper .swiper-pagination-bullet-active {
          background: #d4af37;
          width: 32px;
          border-radius: 6px;
        }
        .related-posts-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="related-posts-swiper !pb-16"
        loop={posts.length > 4}
      >
        {posts.map(post => (
          <SwiperSlide key={post._id}>
            <div className="h-full">
              <RelatedPostCard post={post} locale={locale} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedPostsCarousel
