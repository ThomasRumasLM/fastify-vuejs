<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { onMounted, ref } from 'vue';

const loading = ref(true);
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.fetchUser();
  loading.value = false;// Fetch user info when app loads
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <nav>
    <ul>
      <li><RouterLink to="/">Go to Home</RouterLink></li>
      <li><RouterLink to="/about">Go to About</RouterLink></li>
    </ul>
  </nav>
  <main>
    <div v-if="loading" class="loading">🔄 Checking authentication...</div>
    <RouterView v-else/>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
