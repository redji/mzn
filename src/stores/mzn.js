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
    searchProperties: []
  }),
  getters: {
    isReadySearchProperties: (state) => !!state.searchProperties.length
  },
  actions: {
    async fetchSearchProperties () {
      const result = await graphQLClient.request(SEARCH_PROPERTIES_QUERY)
      this.searchProperties = result.searchProperties.nodes
    }
  }
})
