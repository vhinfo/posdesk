<template>
  <div class="login-page">
    <div class="card">
      <div class="avatar">
        <img src="../assets/builderLogoLogin.png" alt="Logo">
      </div>
      <form @submit.prevent="handleLogin">
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
import { defineComponent, ref } from 'vue';
import { login } from '../controllers/authController';
import router from '../router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useStore();
    const passwordShow = ref(false);
    const userTemp = ref({
      user: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        let user = await login(userTemp.value.user, userTemp.value.password);
        if (user) {
          router.push('/store-selection');
        } else {
          console.error('Usuário ou senha inválidos');
          store.dispatch('messageHandle/alert', {
            message: 'Usuário ou senha inválidos',
            type: 'error',
          });
        }
      } catch (error:any) {
        console.error('Erro durante a autenticação:', error   );
        store.dispatch('messageHandle/alert', {
          message: error.message || 'Erro durante a autenticação',
          type: 'error',
        });
      }
    };

    return {
      passwordShow,
      userTemp,
      handleLogin
    };
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
  max-width: 300px;
  height: auto;
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
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  background-color: #555;
  color: #ffffff;
}

button {
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #a80092;
  color: #ffffff;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: rgb(248, 18, 210);
}
</style>
