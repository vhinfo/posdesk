  <template>
      <div>
        <button @click="openModal" class="open-modal-button">
          <SvgIcon type="mdi" :path="mdiCommentEdit" class="icon" width="180" height="180" />
        </button>
    
        <div v-if="isModalOpen" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Observação da Venda</h3>
              <SvgIcon type="mdi" :path="mdiCloseBox" class="user-icon" width="35" height="35" @click="closeModal"/>
            </div>
            <div class="modal-body">
              <textarea v-model="observation" placeholder="Digite a observação..." rows="5"></textarea>
            </div>
            <div class="modal-footer">
              <button @click="saveObservation" class="save-button">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    
  <script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiCommentEdit, mdiCloseBox } from '@mdi/js';
    
    export default defineComponent({
      name: 'SaleObservation',
      components: {
      SvgIcon,
      },
      setup() {
        const store = useStore();
        const isModalOpen = ref(false);
        const observation = ref(store.state.sale.obs || '');
    
        const openModal = () => {
          isModalOpen.value = true;
        };
    
        const closeModal = () => {
          isModalOpen.value = false;
        };
    
        const saveObservation = () => {
          store.commit('sale/setObservation', observation.value);
          closeModal();
        };
    
        return {  
          isModalOpen,
          observation,
          openModal,
          closeModal,
          saveObservation,
          mdiCommentEdit,
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
      background-color: #474747;
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
      width: 90%;
      max-width: 500px;
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
    .save-button {
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .close-button {
      background-color: #f44336;
    }

    .modal-body {
      /* margin: 20px ; */
    }

    textarea {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      resize: none;
    }
  </style>