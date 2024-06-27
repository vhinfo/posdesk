<template>
  <div class="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
.app {
  background-color: #121212; /* Cor de fundo escura */
  color: #ffffff; /* Cor do texto */
  height: 100vh; /* Altura total da tela */
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  width: 100%;
  max-width: 600px; /* Largura máxima para conteúdo centralizado */
  padding: 20px;
  box-sizing: border-box;
}
</style>
