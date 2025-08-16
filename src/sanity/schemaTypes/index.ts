import { type SchemaTypeDefinition } from "sanity"
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"
import seo from "./SEO/seo"
import generalLayout from "./GeneralLayout/GeneralLayout"
import mainPage from "./MainPage/MainPage"
import pageSeo from "./SEO/PageSeo"

// Venues
import individualVenue from "./Venues/IndividualVenue"
import amenity from "./Venues/amenity"
import location from "./Venues/location"

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
    // Main Page
    mainPage,
    // Venues
    individualVenue,
    amenity,
    location,
  ],
}
