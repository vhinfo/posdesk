<template>
  <div class="topmenubar">
    <!-- Informações do Usuário -->
    <div class="user-info">
      <img src="../../../assets/favicon.png" alt="Loja Logo" class="store-logo" />
      <div class="store-info">
        <div class="store-name">Loja Miss Amora</div>
        <div class="user-info-text">administrador - caixa1</div>
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
      <li class="nav-item" @click="logout" title='Desconectar'>
        <SvgIcon type="mdi" :path="mdiLogout" class="menu-icon" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHome, mdiHistory, mdiLogout } from '@mdi/js';
import { logout } from '../../controllers/authController';

export default defineComponent({
  name: 'TopMenuBar',
  components: {
    SvgIcon,
  },
  data() {
    return {
      userName: 'Nome do Usuário',
      storeName: 'Nome da Loja',
      cashierName: 'Nome do Caixa',
    };
  },
  methods: {
    logout() {
      
    },
  },
  computed: {
    mdiHome() {
      return mdiHome;
    },
    mdiHistory() {
      return mdiHistory;
    },
    mdiLogout() {
      return mdiLogout;
    },
  },
});
</script>

<style scoped>
.topmenubar {
  width: 100%;
  height: 60px;
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
