<template>
  <div>
    <button @click="openModal" class="open-modal-button">
      <SvgIcon type="mdi" :path="mdiCheck" class="icon" width="80" height="80" />
    </button>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">

        <div class="modal-header">
          <h3>Resumo da venda</h3>
          <SvgIcon type="mdi" :path="mdiCloseBox" class="close-icon" width="35" height="35" @click="closeModal"/>
        </div>

        <div class="modal-body">
          <div class="summary-section">
            <SaleTotals :finished="true" />
          </div>
          
          <div class="payment-methods">
            <label for="payment-methods-select"> Método: </label><br>
            <label for="payment-amount-input">R$: </label>
            <input type="number" id="payment-amount-input" v-model="paymentAmount" />
            <label for="payment-methods-select"> Método: </label>
            <select id="payment-methods-select" v-model="selectedPaymentMethod">
              <option v-for="method in paymentMethods" :key="method.id" :value="method">
                {{ method.description }}
              </option>
            </select>
            <button class="set-payment-button" @click="addPayment">Adicionar Pagamento</button>
          </div>

          <!-- List of payments -->
          <div class="payment-list">
            <h4>Pagamentos Adicionados:</h4>
            <table>
              <tbody>
                <tr v-for="(payment, index) in payments" :key="index" class="description-column">
                  <td>
                    <SvgIcon type="mdi" :path="mdiCloseBox" class="remove-icon" width="20" height="20" @click="removePayment(index)" />
                  </td>
                  <td > {{ payment.description }} </td>
                  <td> R$ {{ payment.value.toFixed(2) }} </td>
                </tr>
              </tbody>
            </table>
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
import { PaymentMethod } from '../../../types';
import { addPaymentSale, forgeNewSale } from '../../../controllers/cashierController'

export default defineComponent({
  name: 'FinishSale',
  components: {
    SaleTotals,
    SvgIcon,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const selectedPaymentMethod = ref<PaymentMethod | null>(null);
    const paymentMethods = computed(() => store.getters['auth/paymentMethods']);
    const paymentAmount = ref(0);
    const payments = computed(() => store.getters['sale/getPayments']);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const addPayment = async () => {
      if (paymentAmount.value <= 0) {
        alert('Por favor, insira um valor de pagamento válido.');
        return;
      }
      if (!selectedPaymentMethod.value) {
        alert('Por favor, selecione um método de pagamento.');
        return;
      }

      await addPaymentSale(selectedPaymentMethod.value, paymentAmount.value)
      paymentAmount.value = 0;
    };

    const removePayment = (index: number) => {
      console.log(`Pagamento removido:`, payments.value[index]);
      payments.value.splice(index, 1);
    };

    const finishSale = async () => {
      try{
        if (payments.value.length === 0) {
          alert('Por favor, adicione pelo menos um pagamento.');
          return;
        }
        await forgeNewSale();
        // Lógica para finalizar a venda
        console.log('Venda finalizada com os seguintes pagamentos:', payments.value);
        closeModal();
      }catch(e){
        console.error('falha ao processar venda: ', e);
        store.dispatch('messageHandle/alert', {
          message: 'não foi possível salvar a venda',
          type: 'error',
        }); 
      }
    };

    return {
      isModalOpen,
      selectedPaymentMethod,
      paymentMethods,
      paymentAmount,
      payments,
      openModal,
      closeModal,
      addPayment,
      removePayment,
      finishSale,
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

.description-column{
    width: 45%;
}

.modal-header, .modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-methods {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-sizing: border-box;
}

.set-payment-details {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px, #fff;
}

.set-payment-details div {
  height: 100%;
}

.payment-list {
  width: 100%;
  border: 1px solid #fff;
  border-radius: 16px;
  background-color: #333;
  height: 20vh;
  overflow-y: auto;
  margin-top:20px;
  margin-bottom: 20px;
}

.payment-list table {
  width: 100%;
}

.payment-list tbody {
  padding-left: 10px;
  width: 100%;
}

.payment-list td {
  padding: 8px;
  border-bottom: 1px solid #fff;
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

.close-icon{
  cursor: pointer;
}

.remove-icon {
  cursor: pointer;
  color: red;
}

.set-payment-button {
  margin-top: 20px;
  padding: 10px;
  background-color:#255328;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.set-payment-button:hover {
  background-color: #45a049;
}
</style>
