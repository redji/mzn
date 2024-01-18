<template>
    <q-item>
      <q-item-section>
        <q-item-label>{{ property.id }}</q-item-label>
        <q-item-label caption>{{ property.locationShort }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchProperty',
  props: {
    property: {
      type: Object,
      required: true
    }
  }
})
</script>
