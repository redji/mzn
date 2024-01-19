import { gql } from '@apollo/client/core'

export const SEARCH_PROPERTIES_QUERY = gql`
query getSearchProperties($priceFrom: String, $priceTo: String, $numberOfRoomsFrom: Int, $numberOfRoomsTo: Int) {
  searchProperties(
    searchFilters: {
      priceFrom: $priceFrom
      priceTo: $priceTo
      numberOfRoomsFrom: $numberOfRoomsFrom
      numberOfRoomsTo: $numberOfRoomsTo
    } searchOrder: {} numberOfResults: 32 pageNumber: 1) {
    nodes {
      id
      locationShort
      price {
        amount
        currency
      }
      numberOfRooms
      totalArea
    }
  }
}`
