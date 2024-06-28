<!-- SideMenuBar.vue -->
<template>
    <div class="sidemenubar">
      <ul>
        <li>
          <router-link to="/">
            <i class="mdi mdi-home"></i>
            Frente de caixa
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <i class="mdi mdi-information"></i>
            About Page
          </router-link>
        </li>
      
        <!-- Adicione outros links conforme necessário -->
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'SideMenuBar'
  });
  </script>
  
  <style scoped>
  
  .sidemenubar {
    background-color: #333;
    width: 20%;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .sidemenubar ul {
    list-style: none;
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
    align-items: left;
  }
  
  .sidemenubar ul li a i {
    margin-right: 10px;
    font-size: 24px;
  }
  </style>
  