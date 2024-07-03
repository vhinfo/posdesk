<template>
  <div class="login-page">
    <div class="card">
      <div class="avatar">
        <img src="../assets/builderLogoLogin.png" alt="Logo">
      </div>
      <h2>Autenticação</h2>
      <form @submit.prevent="login" ref="form">
        <input
          v-model="userTemp.user"
          type="text"
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
import { login } from '../controllers/authController';
import router from '../router';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      passwordShow: false,
      userTemp: {
        user: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        let user = await login(this.userTemp.user, this.userTemp.password);
        if (user) {
          router.push('/store-selection');
        } else {
          console.error('Usuário ou senha inválidos');
        }
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
      }
    },
  },
});
</script>

<style scoped>
.login-page {
  background-color: #121212;
  color: #ffffff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  margin-bottom: 20px;
}

.avatar img {
  max-width: 100px; /* Ajusta a largura máxima da imagem */
  height: auto; /* Mantém a proporção da imagem */
}

h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 90%; /* Ajusta a largura dos inputs */
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  background-color: #555;
  color: #ffffff;
}

button {
  width: 90%; /* Ajusta a largura do botão */
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #a80092;
  color: #ffffff;
  cursor: pointer;
  margin-top: 10px; /* Adiciona margem acima do botão */
}

button:hover {
  background-color: rgb(248, 18, 210);
}
</style>
