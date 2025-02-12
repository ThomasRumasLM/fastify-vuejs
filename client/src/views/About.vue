<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = ref(null)

onMounted(async () => {
  console.log('HelloWorld mounted')
  try {
    const response = await fetch('/api/config')
    if(response.status !== 200) {
      console.log('Not logged in')
    } else {
      const data = await response.json()
      config.value = data
    }
  } catch (error) {
    console.error(error);
  }
})

</script>

<template>
  <h1>About page</h1>
  <ul>
    <li v-for="(item, index) in config" :key="index">
      {{ index }} - {{ item }}
    </li>
  </ul>
</template>

<style scoped>
</style>