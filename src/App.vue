<template>
  <div class="app">
    <MenuBar v-if="showSidebar" />
    <MessageAlert />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateAuth } from './controllers/authController';
import { useStore } from 'vuex';
import MenuBar from './views/components/sysComponents/MenuBar.vue';
import MessageAlert from './views/components/sysComponents/MessageAlert.vue';

export default defineComponent({
  name: 'App',
  components: {
    MenuBar,
    MessageAlert
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
        store.commit('auth/setUser', user);
      } catch (error:any) {
        console.error('Erro ao validar o token:', error);
        if (error.message && error.message.includes("usuario sem caixa definido")) {
          store.dispatch('messageHandle/alert', {
            message: 'Usuário sem loja e caixa definidos!',
            type: 'info',
          });
          router.push('/store-selection');
        } else {
          store.dispatch('messageHandle/alert', {
            message: 'Tempo de login expirado, entre novamente!',
            type: 'info',
          });
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
