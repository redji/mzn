import { useMznStore } from '../stores/mzn-store'

export function useMzn () {
  const mznStore = useMznStore()

  const fetchSearchProperties = () => {
    mznStore.fetchSearchProperties()
  }

  return {
    searchProperties: mznStore.searchProperties,
    isReadySearchProperties: mznStore.isReadySearchProperties,
    fetchSearchProperties
  }
}
