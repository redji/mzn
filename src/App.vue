<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useMzn } from './stores/mzn'
const {
  fetchSearchProperties
} = useMzn()

onMounted(() => {
  fetchSearchProperties()
})
</script>
