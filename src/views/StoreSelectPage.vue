<template>
  <div class="select-page">
    <div class="card">
      <div class="avatar">
        <img src="../assets/builderLogoLogin.png" alt="Logo">
      </div>
      <form @submit.prevent="submitSelection" ref="form">
        <select v-model="selectedStoreId" required>
          <option :value="store.id" v-if="store.id">{{ store.name }}</option>
        </select>
        <select v-model="selectedCashier" required>
          <option value="" disabled selected>Escolha o caixa</option>
          <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
            {{ cashier.name }}
          </option>
        </select>
        <button type="submit" class="button">
          <span>Confirmar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getStoreCashiers, setCashier } from '../controllers/authController';
import router from '../router';

interface Cashier {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'StoreSelectPage',
  data() {
    return {
      store: {
        id: null,
        name: 'Carregando...'
      },
      cashiers: [] as Cashier[],
      selectedStoreId: null,
      selectedCashier: null
    };
  },
  methods: {
    async updateStoreCashierAvailable() {
      try {
        let storeCashier = await getStoreCashiers();
        if (!storeCashier.store || !storeCashier.cashiers) {
          throw Error('Não foi possível obter loja e caixas');
        }
        this.store = storeCashier.store;
        this.cashiers = storeCashier.cashiers;
        this.selectedStoreId = this.store.id;
      } catch (error) {
        console.error('Erro ao configurar loja:', error);
      }
    },
    async submitSelection() {
      try {
        if (this.selectedStoreId && this.selectedCashier) {
          await setCashier(this.selectedCashier);
          router.push('/');
        } else {
          console.error('caixa não selecionado');
        }
      } catch (error) {
        console.error('Erro ao definir caixa:', error);
      }
    },
  },
  mounted() {
    this.updateStoreCashierAvailable();
  },
});
</script>

<style scoped>
.select-page {
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

.store-info {
  width: 90%;
  margin-bottom: 10px;
  text-align: left;
  background-color: #555;
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
}

select {
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
  background-color: rgb(248, 18, 171);
}
</style>
