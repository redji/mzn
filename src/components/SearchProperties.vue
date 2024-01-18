<template>
<q-list bordered separator>
  <div v-if="!viewProps.isReadySearchProperties">Loading...</div>
  <div v-else>
      <q-item v-for="(property) in viewProps.searchProperties" :key="property.id" clickable v-ripple>
        <q-item-section><SearchProperty
          :property="property"
          /></q-item-section>
      </q-item>
    </div>
  </q-list>
</template>
<script setup>
import { computed } from 'vue'
import SearchProperty from './SearchProperty.vue'
import { useMznStore } from '../stores/mzn-store'
const store = useMznStore()

const viewProps = computed(() => {
  console.log(store.searchProperties)
  return {
    searchProperties: store.searchProperties,
    isReadySearchProperties: store.isReadySearchProperties
  }
})
</script>
