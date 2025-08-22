import { type SchemaTypeDefinition } from "sanity"
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"
import seo from "./SEO/seo"
import generalLayout from "./GeneralLayout/GeneralLayout"
import pageSeo from "./SEO/PageSeo"
// Legal Documents
import legalDocuments from "./LegalDocuments/LegalDocuments"
// Main Page
import mainPage from "./MainPage/MainPage"

// About Page
import aboutPage from "./AboutPage/AboutPage"

// Venue Page
import venuePage from "./VenuePage/VenuePage"

// Venues
import individualVenue from "./Venues/IndividualVenue"
import amenity from "./Venues/amenity"
import location from "./Venues/location"
import typeVenue from "./Venues/typeVenue"

// Blog
import blogHeader from "./Blog/BlogHeader"
import blogCategory from "./Blog/BlogCategory"
import blogPost from "./Blog/BlogPost"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Localized
    localizedString,
    localizedText,
    localizedBlock,
    // General
    pageSeo,
    seo,
    generalLayout,
    // Legal Documents
    legalDocuments,

    // Main Page
    mainPage,
    // Venue Page
    venuePage,
    // Venues
    individualVenue,
    amenity,
    location,
    typeVenue,

    // About Page
    aboutPage,

    // Blog
    blogHeader,
    blogCategory,
    blogPost,
  ],
}
