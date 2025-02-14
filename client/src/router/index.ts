import { createWebHistory, createRouter } from 'vue-router'
import { WebSocketClient } from '../utils/websocket';
import { useAuthStore } from '../stores/auth';

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

function redirectToBackendLogin() {
  const returnUrl = encodeURIComponent(window.location.pathname);
  window.location.href = `/auth/login?redirect=${returnUrl}`;
}

// Create a authentification guard 
router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  // Fetch user if not already checked (for page refreshes)
  if (authStore.user === null) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    redirectToBackendLogin();
    //Prevent Vue Router to continue
    return false;
  }
})

// Create a WebSocket client to have Vue Router observability
const wsClient = new WebSocketClient(`${window.location.origin.replace(/^http/, 'ws')}/ws/observability`);
router.afterEach((to, from) => {
  wsClient.send({
    path: to.path,
    from: from.path || null,
    timestamp: new Date().toISOString(),
  });
});