import React from "react"
import { Playfair_Display } from "next/font/google"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})

interface TextComponentListProps {
  items: React.ReactNode[]
  listType: "bullet" | "number"
  ListClassName?: string
}

const TextComponentList: React.FC<TextComponentListProps> = ({
  items,
  listType,
  ListClassName = "",
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-5xl mx-5 lg:p-2 xl:mx-auto">
        {listType === "bullet" ? (
          <ul className={`list-disc pl-6 space-y-2 ${ListClassName}`}>
            {items.map((item, index) => (
              <li
                key={index}
                className={`${playfairDisplay.className} text-gray-700 dark:text-white`}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <ol className={`list-decimal pl-6 space-y-2 ${ListClassName}`}>
            {items.map((item, index) => (
              <li
                key={index}
                className={`${playfairDisplay.className} text-gray-700 dark:text-white`}
              >
                {item}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export default TextComponentList
