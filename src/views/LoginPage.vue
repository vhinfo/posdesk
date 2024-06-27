<template>
  <div class="login-page">
    <div class="card">
      <div class="avatar">
        <img src="../assets/PDV.svg" alt="Logo">
      </div>
      <h2>Autenticação</h2>
      <form @submit.prevent="login" ref="form">
        <input
          v-model="userTemp.email"
          type="email"
          placeholder="Usuário"
          required
        />
        <input
          v-model="userTemp.password"
          :type="passwordShow ? 'text' : 'password'"
          placeholder="Senha"
          required
        />
        <button type="submit" class="button">
          <span>Logar-se!</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      passwordShow: false,
      userTemp: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        // Aqui você pode implementar a lógica de autenticação
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
      }
    },
  },
});
</script>

<style scoped>
.login-page {
  background-color: #121212; /* Cor de fundo escura */
  color: #ffffff; /* Cor do texto */
  height: 100vh; /* Altura total da tela */
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: #333; /* Cor de fundo do card */
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px; /* Largura máxima do card */
  text-align: center;
}

.avatar {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #555; /* Cor de fundo do input */
  color: #ffffff; /* Cor do texto do input */
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff; /* Cor de fundo do botão */
  color: #ffffff; /* Cor do texto do botão */
  cursor: pointer;
}

button:hover {
  background-color: blueviolet; /* Cor de fundo do botão ao passar o mouse */
}
</style>
