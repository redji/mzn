<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useMzn } from './composables/useMzn'
const {
  fetchSearchProperties
} = useMzn()

onMounted(() => {
  fetchSearchProperties()
})
</script>
