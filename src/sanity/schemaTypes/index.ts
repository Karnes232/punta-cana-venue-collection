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
// Venue Inspection Page
import venueInspectionPage from "./VenueInspection/VenueInspectionPage"

// About Page
import aboutPage from "./AboutPage/AboutPage"
import aboutCards from "./AboutPage/AboutCards"

// Venue Page
import venuePage from "./VenuePage/VenuePage"

// Add Venue
import addVenue from "./AddVenue/AddVenue"

// Venues
import individualVenue from "./Venues/IndividualVenue"
import amenity from "./Venues/amenity"
import location from "./Venues/location"
import typeVenue from "./Venues/typeVenue"
import eventType from "./Venues/EventType"
// Blog
import blogHeader from "./Blog/BlogHeader"
import blogCategory from "./Blog/BlogCategory"
import blogPost from "./Blog/BlogPost"

// Contact Page
import contactPage from "./ContactPage/ContactPage"

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
    eventType,
    // Add Venue
    addVenue,
    //Venue Inspection
    venueInspectionPage,

    // About Page
    aboutPage,
    aboutCards,

    // Blog
    blogHeader,
    blogCategory,
    blogPost,

    // Contact Page
    contactPage,
  ],
}
