<template>
  <div class="background d-flex justify-center align-center mt-5">
    <!-- <LoadComponent :overlay="loading" /> -->
    <v-card width="80%" elevation="24" class="pa-4 text-center">
      <v-avatar size="90">
        <v-img src="../assets/PDV.svg" />
      </v-avatar>
      <h2>Autenticação</h2>
      <v-form @submit.prevent="login" ref="form">
        <v-text-field
          v-model="userTemp.email"
          :rules="rules.email"
          type="email"
          label="Usuário"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="userTemp.password"
          :rules="rules.password"
          :type="passwordShow ? 'text' : 'password'"
          label="Senha"
          prepend-inner-icon="mdi-key"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow=!passwordShow"
          class="pb-0 mb-0"
        />
        <v-card-actions class="justify-end mt-5">
          <v-btn type="submit" class="mr-2 primary">
            <v-icon color="primary">mdi mdi-connection</v-icon>
            <span class="pl-3">Logar-se!</span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import { authenticateUser } from '../../electron/controllers/authController'
  
  export default defineComponent({
    name: 'LoginPage',
    data() {
      return {
        loading: false,
        passwordShow: false,
        rules: {
          password: [(v: string) => !!v || 'Informe a senha'],
          email: [(v: string) => !!v || 'Informe o e-mail'],
        },
        userTemp: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        // this.loading = true;
        try {
          // const response = await Authenticate(this.userTemp.email, this.userTemp.password);
          // console.log('Response from main process:', response);
          // Aqui você pode tratar a resposta como necessário
          // Por exemplo, redirecionar para outra página após o login
          // router.push('/start');
        } catch (e) {
          console.error('Error during authentication:', e);
          // Trate o erro como necessário
          // Exemplo: exibir uma mensagem de erro na interface
        }
        // this.loading = false;
      },
    },
  });
</script>

