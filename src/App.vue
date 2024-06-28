<template>
  <div class="app">
    <SideMenuBar v-if="showSidebar" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideMenuBar from './views/components/sysComponents/SideMenuBar.vue';
import { validateAuth } from './controllers/authController'; // Importe sua função de validação de autenticação aqui

export default defineComponent({
  name: 'App',
  components: {
    SideMenuBar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(route.path);

    // Função para verificar o status de autenticação
    const checkLogin = async () => {
      const isAuthenticated = await validateAuth(); // Chama a função de validação de autenticação
      if (isAuthenticated) {
        router.replace('/'); // Redireciona para a rota principal se autenticado
      } else {
        router.replace('/login'); // Redireciona para a página de login se não autenticado
      }
    };

    // Executa a verificação ao montar o componente
    onMounted(() => {
      checkLogin();
    });

    // Computação para exibir ou não o sidebar com base na rota
    const showSidebar = computed(() => {
      return route.path !== '/login' && route.path !== '/store-selection';
    });

    return {
      showSidebar
    };
  }
});
</script>

<style scoped>
/* Estilos específicos do componente App.vue */
main {
  background-color: antiquewhite;
}
</style>
