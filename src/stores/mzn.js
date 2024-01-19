import { defineStore } from 'pinia'

import { GraphQLClient } from 'graphql-request'
import { SEARCH_PROPERTIES_QUERY } from '../constants/graphql'

const endpoint = process.env.GRAPHQL_URI,
  graphQLClient = new GraphQLClient(endpoint, {
    method: 'GET',
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify
    }
  })

export const useMzn = defineStore('mzn', {
  state: () => ({
    searchProperties: [],
    priceFrom: null,
    priceTo: null,
    roomsFrom: null,
    roomsTo: null
  }),
  getters: {
    isReadySearchProperties: (state) => !!state.searchProperties.length
  },
  actions: {
    async fetchSearchProperties () {
      const variables = {
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        numberOfRoomsFrom: parseInt(this.roomsFrom),
        numberOfRoomsTo: parseInt(this.roomsTo)
      }
      console.log(variables)
      const result = await graphQLClient.request(SEARCH_PROPERTIES_QUERY, variables)
      this.searchProperties = result.searchProperties.nodes
    }
  }
})
