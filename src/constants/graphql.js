import { gql } from '@apollo/client/core'

export const SEARCH_PROPERTIES_QUERY = gql`
query getSearchProperties {
  searchProperties(searchFilters: {} searchOrder: {} numberOfResults: 32 pageNumber: 1) {
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
