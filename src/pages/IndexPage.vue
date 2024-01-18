<template>
  <q-page class="flex flex-center">
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
