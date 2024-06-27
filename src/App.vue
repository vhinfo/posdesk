<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authController } from './controllers/authController';

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      const returnAuth = await authController.checkAuth();
      console.log(returnAuth);
    },
  },
});
</script>
