import React from "react"

const TextComponentParagraph = ({
  paragraph,
  ParagraphClassName,
}: {
  paragraph: string
  ParagraphClassName: string
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-5xl xl:mx-auto">
        <p className={`lg:text-lg text-gray-700 ${ParagraphClassName}`}>
          {paragraph}
        </p>
      </div>
    </div>
  )
}

export default TextComponentParagraph
