import Link from "next/link"
import React from "react"

const BottomBar = () => {
  return (
    <div className="border-t border-ivory/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-ivory/60 text-sm">
            © 2025 Punta Cana Venue Collection. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
