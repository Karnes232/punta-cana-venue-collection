import { type SchemaTypeDefinition } from "sanity"
import generalLayout from "./GeneralLayout/GeneralLayout"
import mainPage from "./MainPage/MainPage"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalLayout, mainPage],
}
