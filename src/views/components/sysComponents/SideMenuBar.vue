<template>
  <div class="sidemenubar">
    <!-- Informações do Usuário -->
    <div class="user-info">
      <!-- Exemplo de ícone de usuário -->
      <SvgIcon type="mdi" :path="mdiAccount" class="user-icon" />
      <!-- Nome do Usuário -->
      <div class="user-name">{{ userName }}</div>
      <!-- Nome da Loja e Caixa -->
      <div class="store-info">{{ storeName }} - Caixa: {{ cashierName }}</div>
    </div>

    <!-- Menu de Navegação -->
    <ul>
      <li>
        <router-link to="/">
          <!-- Ícone para Frente de Caixa -->
          <SvgIcon type="mdi" :path="mdiCashRegister" class="menu-icon" />
          Frente de Caixa
        </router-link>
      </li>
      <li>
        <router-link to="/sales">
          <!-- Ícone para Vendas -->
          <SvgIcon type="mdi" :path="mdiCart" class="menu-icon" />
          Vendas
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <!-- Ícone para Sobre -->
          <SvgIcon type="mdi" :path="mdiInformation" class="menu-icon" />
          Sobre
        </router-link>
      </li>
      <!-- Adicione outros links conforme necessário -->
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiCashRegister, mdiCart, mdiInformation } from '@mdi/js';

export default defineComponent({
  name: 'SideMenuBar',
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
  computed: {
    mdiAccount() {
      return mdiAccount;
    },
    mdiCashRegister() {
      return mdiCashRegister;
    },
    mdiCart() {
      return mdiCart;
    },
    mdiInformation() {
      return mdiInformation;
    },
  },
});
</script>

<style scoped>
.sidemenubar {
  background-color: #333;
  width: 20%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
}

.user-info {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-icon {
  font-size: 36px;
  color: #ffffff;
}

.user-name {
  margin-top: 10px;
  font-size: 14px;
  color: #ffffff;
}

.store-info {
  margin-top: 5px;
  font-size: 12px;
  color: #cccccc;
  text-align: center;
}

.sidemenubar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidemenubar ul li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.sidemenubar ul li a {
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 10px;
  font-size: 20px;
  color: #ffffff;
}
</style>
