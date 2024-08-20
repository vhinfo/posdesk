<template>
    <div>
      <button @click="openModal" class="open-modal-button">
        <SvgIcon type="mdi" :path="mdiClose" class="icon" width="180" height="180" />
      </button>
  
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Confirmar Limpeza</h3>
            <button @click="closeModal" class="close-button">X</button>
          </div>
          <div class="modal-body">
            <p>Você realmente deseja limpar a venda?</p>
          </div>
          <div class="modal-footer">
            <button @click="clearSale" class="confirm-button">Sim</button>
            <button @click="closeModal" class="cancel-button">Não</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiClose } from '@mdi/js';
  
    export default defineComponent({
      name: 'ClearSale',
      components: {
        SvgIcon
      },
      setup() {
        const store = useStore();
        const showModal = ref(false);
  
        const openModal = () => {
          showModal.value = true;
        };
  
        const closeModal = () => {
          showModal.value = false;
        };
  
        const clearSale = () => {
          store.commit('sale/clearSale');
          closeModal();
        };
  
        return {
          mdiClose,
          showModal,
          openModal,
          closeModal,
          clearSale
        };
      }
    });
  </script>
  
  <style scoped>
  .open-modal-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #c21e1e;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    height: 180px;
    width: 180px;
    margin: 10px;
  }
  
  .icon {
    width: 80px;
    height: 80px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
  }
  
  .modal-header,
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h3 {
    margin: 0;
  }
  
  .close-button,
  .confirm-button,
  .cancel-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
  }
  
  .close-button {
    background-color: #f44336;
  }
  
  .confirm-button {
    background-color: #4caf50;
  }
  
  .cancel-button {
    background-color: #9e9e9e;
  }
  </style>
  