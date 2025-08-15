import Link from "next/link"
import React from "react"

const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">Quick Links</h3>
      <div className="space-y-3">
        <Link
          href="/venues"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          Browse Venues
        </Link>
        <Link
          href="/inspection"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          Venue Inspection
        </Link>
        <Link
          href="/blog"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          Planning Guides
        </Link>
        <Link
          href="/about"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}

export default QuickLinks
