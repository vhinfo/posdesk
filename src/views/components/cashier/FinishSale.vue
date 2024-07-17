<template>
    <div>
      <button @click="openModal" class="open-modal-button">
        <SvgIcon type="mdi" :path="mdiCheck" class="icon" width="80" height="80" />
      </button>
  
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <div class="modal-header">
              <h3>Finalizar Venda</h3>
              <SvgIcon type="mdi" :path="mdiCloseBox" class="user-icon" width="35" height="35" @click="closeModal"/>
            </div>
            <div class="modal-body">
                <!-- paymetod select -->
                <div v-for="method in paymentMethods" :key="method.id" class="payment-method">
                    <label>
                        <input type="radio" :value="method" v-model="selectedPaymentMethod" />
                        {{ method.description }}
                    </label>
                </div>
                 <!-- done -->
                <div class='set-sale-payment'>
                    <label for="total-sale-input">Total da Venda:</label>
                    <input type="number" id="total-sale-input" v-model="totalSaleValue" />
                    <button @click="useTotalSaleValue">valor da venda</button>
                </div>
                <div class="summary-section">
                    <h3>Resumo da Venda</h3>
                    <SaleTotals :finished="true" />
                </div>
            </div>
            <div class="modal-footer">
                <button @click="finishSale" class="finish-sale-button">Finalizar Venda</button>
            </div>
        </div>

        
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiCheck, mdiCloseBox } from '@mdi/js';
  import SaleTotals from './SaleTotals.vue';
  
  export default defineComponent({
    name: 'FinishSale',
    components: {
      SaleTotals,
      SvgIcon,
    },
    setup() {
      const store = useStore();
      const isModalOpen = ref(false);
      const selectedPaymentMethod = ref(null);
      const paymentMethods = computed(() => store.getters['auth/paymentMethods']);
      const totalSaleValue = ref(0);
  
      const openModal = () => {
        isModalOpen.value = true;
      };
  
      const closeModal = () => {
        isModalOpen.value = false;
      };
  
      const finishSale = () => {
        if (selectedPaymentMethod.value) {
          // Lógica para finalizar a venda
          console.log('Venda finalizada com a forma de pagamento:', selectedPaymentMethod.value);
          closeModal();
        } else {
          alert('Por favor, selecione uma forma de pagamento.');
        }
      };
  
      const useTotalSaleValue = () => {
        totalSaleValue.value = store.getters['sale/totalSale']; // Assumindo que há um getter para o valor total da venda
      };
  
      return {
        isModalOpen,
        selectedPaymentMethod,
        paymentMethods,
        totalSaleValue,
        openModal,
        closeModal,
        finishSale,
        useTotalSaleValue,
        mdiCheck,
        mdiCloseBox
      };
    },
  });
  </script>
  
  <style scoped>
  .open-modal-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #3aaa2b;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    height: 180px;
    width: 180px;
    margin: 10px;
  }
  .set-sale-payment{
    padding-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 16px;
    align-items: center;
  }
  
  .open-modal-button:hover {
    background-color: #45a049;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: #333;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .payment-section, .summary-section {
    margin-bottom: 20px;
  }
  
  .payment-method {
    margin: 10px 0;
  }
  
  .finish-sale-button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .finish-sale-button:hover {
    background-color: #45a049;
  }
  
  .close-modal-button {
    margin-top: 10px;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .modal-header,
    .modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
  .close-modal-button:hover {
    background-color: #e53935;
  }
  </style>
  