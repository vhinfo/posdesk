<template>
  <!-- row -->
  <div class="cashier-page">
    <!-- product left column -->
    <div class="product-column">
      <ProductList />
    </div>
    
    <!-- item cart and sale info right column -->
    <div class="cart-column">
      <CartList />
      <div class="person-info"> 
        <PersonSet :customer="true" />
        <!-- TODO SALESMAN SELECT -->
        <!-- <PersonSet :customer="false" /> -->
      </div>
      <!-- <PersonSet /> -->
      <!-- sale resuming component -->
      <!-- 4 buttons: addObservation, change products, clear sale, select payment -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from './components/cashier/ProductsList.vue';
import CartList from './components/cashier/CartList.vue';
import PersonSet from './components/cashier/PersonSet.vue';

export default defineComponent({
  name: 'CashierPage',
  components: {
    ProductList,
    CartList,
    PersonSet
  },
});
</script>

<style scoped>
.person-info {
  padding-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
}


.cashier-page {
  display: flex;
  width: 100%;
  height: 100vh;
}

.product-column {
  flex: 1;
  padding: 10px;
}

.cart-column {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.cashier-title {
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
  padding: 0.5rem;
}
</style>
