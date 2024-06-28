<template>
  <div class="app">
    <nav>
      <ul>
        <li><router-link to="/login">Login Page</router-link></li>
        <li><router-link to="/about">About Page</router-link></li>
      </ul>
    </nav>
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
  background-color: #df0eb1; /* Cor de fundo */
  color: #ffffff; /* Cor do texto */
  height: 100vh; /* Altura total da tela */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

nav {
  background-color: #333;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  color: #ffffff;
  text-decoration: none;
}

main {
  width: 100%;
  max-width: 600px; /* Largura máxima para conteúdo centralizado */
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}
</style>
