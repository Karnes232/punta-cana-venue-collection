"use client"
import { useTranslations } from 'next-intl';
import React from 'react'
import ReactStars from "react-stars";
import WriteReview from './WriteReview';
// import WriteReview from "./WriteReview";

const StarRating = ({page, overAllRating, pageName}: {page: string, overAllRating: number, pageName: string}) => {
    const t = useTranslations("individualVenueListing")
    let rating = 0;

  if (isNaN(overAllRating)) {
    rating = 4.8;
  } else {
    rating = overAllRating;
  }

  let ratingWord = "";
  if (rating > 4.5) {
    ratingWord = t("excellent");
  } else if (rating > 4) {
    ratingWord = t("veryGood");
  } else if (rating > 3.5) {
    ratingWord = t("aboveAverage");
  } else if (rating > 2.5) {
    ratingWord = t("average");
  } else if (rating > 1.5) {
    ratingWord = t("needsImprovement");
  } else {
    ratingWord = t("disappointing");
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center font-medium">
        <span className="text-3xl font-bold">{rating.toFixed(1)}</span>{" "}
        {ratingWord}
      </div>
      <div>
        <ReactStars
          count={5}
          value={rating}
          size={30}
          color2={"#ffd700"}
          edit={false}
          color1={"#e5e7eb"}
        />
      </div>
      <WriteReview page={page} pageName={pageName} />
    </div>
  )
}

export default StarRating