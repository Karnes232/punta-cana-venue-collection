import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"

const BlogFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  locale,
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: any
  locale: string
}) => {
  const t = useTranslations("Blog")
  return (
    <div className="bg-white shadow-sm border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-gradient-to-br from-golden/70 to-golden/90  hover:bg-golden/90 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t("all")}
            </button>
            {categories.map((category: any) => (
              <button
                key={category.title[locale]}
                onClick={() => setSelectedCategory(category.title[locale])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.title[locale]
                    ? "bg-gradient-to-br from-golden/70 to-golden/90  hover:bg-golden/90 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.title[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFilters
