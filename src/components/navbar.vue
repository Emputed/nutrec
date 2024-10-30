<template>
  <nav class="navbar custom-navbar">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand">PLANIFY WELL</router-link>
      <div v-if="isLoggedIn" class="d-flex align-items-center">
        <span class="me-3">Hola, {{ username }}</span>
        <button @click="logout" class="btn btn-outline-light">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'navbar',
  setup() {
    const authStore = useAuthStore();

    const username = computed(() => authStore.username);
    const isLoggedIn = computed(() => !!authStore.token);

    const router = useRouter()

    const logout = () => {
      authStore.logout();
      router.push({name:'login'});
    };

    return {
      username,
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style>
.custom-navbar {
  background-color: #70AE6E; 
}

.btn-outline-light {
  color: #fff;
  border-color: #fff;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
