<template>
  <div class="login-page">
    <div class="card">
      <div class="avatar">
        <img src="../assets/PDV.svg" alt="Logo">
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
        const user = await login(this.userTemp.user, this.userTemp.password);
        console.log(user);
        if (user) {
          router.push('/');
        } else {
          console.error('Erro durante a autenticação: Usuário ou senha inválidos');
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
  background-color: #555;
  color: #ffffff;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
}

button:hover {
  background-color: blueviolet;
}
</style>
