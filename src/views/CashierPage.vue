<template>
    <div class="card">
      <div class="avatar">
        <img src="../assets/PDV.svg" alt="Logo">
      </div>
      <h2>Autenticação</h2>
      <form @submit.prevent="" ref="form">
       
        
        <button type="submit" class="button">
          <span>Logar-se!</span>
        </button>
      </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
    name: 'CashierPage',

    components: {

    },
    });
</script>
  