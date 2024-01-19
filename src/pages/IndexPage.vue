<template>
  <q-page>
   <SearchProperties />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SearchProperties from '../components/SearchProperties.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    SearchProperties
  }
})
</script>
