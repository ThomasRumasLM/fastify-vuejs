import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserResponse } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  // User state
  const user = ref<UserResponse | null>(null);
  const expiresAt = ref<number | null>(null);

  // Computed property: Check if the user is authenticated
  const isAuthenticated = computed(() => {
    if (!expiresAt.value) return false;
    return Date.now() < expiresAt.value;
  });

  // Fetch user data from the backend
  async function fetchUser() {
    try {
      const response = await fetch('/auth/user');
      const data = await response.json() as UserResponse;
      user.value = data;
      expiresAt.value = data.exp;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      user.value = null;
      expiresAt.value = null;
    }
  }

  // Logout function
  function logout() {
    user.value = null;
    expiresAt.value = null;
  }

  return { user, isAuthenticated, fetchUser, logout };
});