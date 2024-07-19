<template>
    <div>
      <div class="discount-header">
        <div class="title">
          <SvgIcon type="mdi" :path="mdiTagMultiple" class="default-icon" width="20" height="20"/>
          <h3> Descontos </h3>
        </div>
        <SvgIcon type="mdi" :path="mdiPlusCircle" class="default-icon" width="25" height="25" @click="showAddDiscountModal"/>
      </div>
      <div v-if="discounts.length === 0" class="no-discounts">
        <SvgIcon type="mdi" :path="mdiTagOff" class="no-discounts-icon" width="150" height="150" />
        <p>Nenhum desconto aplicado</p>
      </div>
      <div v-else class="discount-table">
        <table class="discount-list">
          <tbody>
            <tr v-for="discount in discounts" :key="discount.id" class="discount-item">
              <td class="description-column">
                <b><span>{{ discount.code }}</span><br></b>
                <span>{{ discount.description }}</span>
              </td>
              <td class="value-column">
                <b>{{ formatValue(discount.value, discount.percent) }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-if="isModalVisible" class="modal">
        <div class="modal-content">
                <div class="modal-header">
                    <h3>{{ modalTitle }}</h3>
                    <SvgIcon type="mdi" :path="mdiCloseBox" class="user-icon" width="35" height="35" @click="hideAddDiscountModal"/>
                </div>
                <div class="modal-body" >
                    <input v-model="searchQuery" placeholder="Pesquisar desconto">
                    <button @click="addDiscount">Buscar Desconto</button>
                    <div v-if="isCustomer ">
                        <h4>Cadastro de Cliente</h4>
                        <form @submit.prevent="registerPerson">
                            <!-- exibir aqui apenas para visualizar caso exista o cupom de desconto -->
                        </form>
                    </div>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiTagMultiple, mdiTagOff, mdiPlusCircle } from '@mdi/js';
  import { Discount } from '../../../types';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'DiscountList',
    components: {
      SvgIcon,
    },
    setup() {
        const store = useStore();
      const discounts = computed(() => store.state.sale.discounts);
      const isModalVisible = ref(false);
      const discountCode = ref('');
  
      const showAddDiscountModal = () => {
        isModalVisible.value = true;
      };
  
      const hideAddDiscountModal = () => {
        isModalVisible.value = false;
      };
  
      const addDiscount = () => {
        console.log(`Buscar desconto com o código: ${discountCode.value}`);
        hideAddDiscountModal();
      };
  
      const formatValue = (value: number, percent: boolean): string => {
        return percent ? `${value}%` : value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      };
  
      return {
        discounts,
        isModalVisible,
        discountCode,
        mdiTagMultiple,
        mdiTagOff,
        mdiPlusCircle,
        showAddDiscountModal,
        hideAddDiscountModal,
        addDiscount,
        formatValue,
      };
    },
  });
  </script>
  
  <style scoped>
  .discount-list {
    width: 100%;
    border-radius: 16px;
  }
  
  .no-discounts {
    text-align: center;
    color: gray;
    background-color: #333;
    border-radius: 16px;
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .no-discounts-icon {
    font-size: 5rem;
  }
  
  .discount-table {
    width: 100%;
    background-color: #333;
    border-radius: 16px;
    height: 10vh;
    overflow-y: auto;
  }
  
  .discount-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .discount-table th,
  .discount-table td {
    text-align: left;
    align-self: center;
  }
  
  .discount-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; 
    padding: 10px;
    border-bottom: 1px solid #00000098;
    word-break: break-word;
  }
  
  .default-icon {
    cursor: pointer;
    color: rgb(255, 255, 255);
  }
  
  .default-icon-red {
    cursor: pointer;
    color: rgb(192, 4, 4);
  }
  
  .discount-table::-webkit-scrollbar {
    width: 3px;
  }
  
  .discount-table::-webkit-scrollbar-thumb {
    background-color: #a8009233;
    border-radius: 16px;
  }
  
  .discount-table::-webkit-scrollbar-track {
    border-radius: 16px;
  }
  
  .discount-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .title {
    display: flex;
    align-items: center;
  }
  
  .title h3 {
    margin-left: 10px;
  }
  
  .description-column {
    width: 70%;
  }
  
  .value-column {
    width: 30%;
    text-align: right;
  }
  
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #333;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 16px;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  