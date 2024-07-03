<template>
  <div class="app">
    <MenuBar v-if="showSidebar" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MenuBar from './views/components/sysComponents/MenuBar.vue';
import { validateAuth } from './controllers/authController';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    MenuBar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const checkLogin = async () => {
      try {
        const user = await validateAuth();
        if (!user && route.path !== '/login' && route.path !== '/store-selection') {
          router.replace('/login');
        }
        console.log(user)
        store.commit('auth/setUser', user);
      } catch (error:any) {
        console.error('Erro ao validar o token:', error);
        if (error.message && error.message.includes("usuario sem caixa definido")) {
          router.push('/store-selection');
        } else {
          router.replace('/login');
        }
      }
    };

    onMounted(() => {
      checkLogin();
    });

    watch(() => route.path, () => {
      checkLogin();
    });

    const showSidebar = computed(() => {
      return route.path !== '/login' && route.path !== '/store-selection';
    });

    return {
      showSidebar
    };
  }
});
</script>
