<template>
  <div v-if="alert.active" :class="['message-alert', alertTypeClass]">
    <div class="message-content">
      <div class="alert-icon">
        <SvgIcon :type="'mdi'" :path="alertIcon" class="alert-icon" />
      </div>
      <span>{{ alert.message }}</span>
      <button class="close-button" @click="closeAlert">&times;</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { mdiAlertCircleOutline, mdiCheckCircleOutline, mdiInformationOutline, mdiAlertOctagonOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';


export default defineComponent({
  name: 'MessageAlert',
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();
    const alert = computed(() => store.getters['messageHandle/getAlert']);

    const alertTypeClass = computed(() => {
      switch (alert.value.type) {
        case 'success':
          return 'alert-success';
        case 'error':
          return 'alert-error';
        case 'info':
          return 'alert-info';
        case 'warning':
          return 'alert-warning';
        default:
          return '';
      }
    });

    const alertIcon = computed(() => {
      switch (alert.value.type) {
        case 'success':
          return mdiCheckCircleOutline;
        case 'error':
          return mdiAlertOctagonOutline;
        case 'info':
          return mdiInformationOutline;
        case 'warning':
          return mdiAlertCircleOutline;
        default:
          return mdiAlertCircleOutline;
      }
    });

    const closeAlert = () => {
      store.dispatch('messageHandle/removeAlert');
    };
    
    return {
      alert,
      alertTypeClass,
      alertIcon,
      closeAlert
    };
  }
});
</script>

<style scoped>
  .message-alert {
    position: fixed;
    top: 5px;
    right: 30%;
    background-color: #a80092;
    color: #fff;
    padding-left: 1em;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid;
    z-index: 1000;
  }

  .message-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .alert-icon {
    font-size: 24px; 
    margin-right: 10px; 
    color: inherit; 
  }


  .close-button {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2em;
    cursor: pointer;
  }

  .alert-success {
    background-color: green;
  }

  .alert-error {
    background-color: red;
  }

  .alert-info {
    background-color: rgb(65, 94, 223);
  }

  .alert-warning {
    background-color: orange;
  }
</style>
