<template>
  <div class="topmenubar">
    <!-- Informações do Usuário -->
    <div class="user-info">
      <img src="../../../assets/favicon.png" alt="Loja Logo" class="store-logo" />
      <div class="store-info">
        <div class="store-name">{{ storeName }}</div>
        <div class="user-info-text">{{ userInfo }}</div>
      </div>
    </div>

    <!-- Menu de Navegação -->
    <ul class="nav-icons">
      <li class="nav-item" title='Frente de caixa'>
        <router-link to="/">
          <SvgIcon type="mdi" :path="mdiHome" class="menu-icon" />
        </router-link>
      </li>
      <li class="nav-item" title='Histórico de vendas'>
        <router-link to="/sales">
          <SvgIcon type="mdi" :path="mdiHistory" class="menu-icon" />
        </router-link>
      </li>
      <li class="nav-item" @click="logoutAction" title='Desconectar'>
        <SvgIcon type="mdi" :path="mdiLogout" class="menu-icon" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiHome, mdiHistory, mdiLogout } from '@mdi/js';
  import { logout } from '../../../controllers/authController';
  import router from '../../../router';

  export default defineComponent({
    name: 'MenuBar',
    components: {
      SvgIcon,
    },
    setup() {
      const store = useStore();
      const user = computed(() => store.state.auth.user);

      const userName = computed(() => user.value ? user.value.name : 'Nome do Usuário');
      const storeName = computed(() => user.value ? user.value.storeName : 'Nome da Loja');
      const cashierName = computed(() => user.value ? user.value.cashierName : 'Nome do Caixa');
      const userInfo = computed(() => user.value ? `${user.value.isManager ? 'Administrador' : 'Usuário'} - ${cashierName.value}` : 'Informações do Usuário');

      const logoutAction = async () => {
        const logouted = await logout();
        if (logouted) {
          router.push('/login');
        }
      };

      return {
        mdiHome,
        mdiHistory,
        mdiLogout,
        userName,
        storeName,
        userInfo,
        logoutAction
      };
    },
  });
</script>

<style scoped>
  .topmenubar {
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background-color: rgba(51, 51, 51); 
    box-sizing: border-box;
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 8px;
    margin-right: 1rem;
  }

  .store-logo {
    width: 3rem;
    height: auto;
  }

  .store-info {
    margin-left: 10px;
  }

  .store-name {
    font-size: 16px;
    color: #ffffff;
  }

  .user-info-text {
    font-size: 12px;
    color: #cccccc;
  }

  .nav-icons {
    list-style: none;
    display: flex;
    padding: 0.5rem;
    margin: 0;
    margin-left: auto;
  }

  .nav-item {
    margin-left: 1rem;
    text-align: center;
  }

  .menu-icon {
    font-size: 24px;
    color: #ffffff;
    transition: color 0.3s ease;
    background-color: #333; 
    padding: 0.5rem;
    border-radius: 50%;
  }

  .nav-item:hover .menu-icon {
    color: #a80092;
  }
</style>
