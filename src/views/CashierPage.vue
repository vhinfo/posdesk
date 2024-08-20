<template>
  <!-- row -->
  <div class="cashier-page">
    <!-- product left column -->
    <div class="product-column">
      <ProductList />
    </div>
    
    <!-- item cart and sale info right column -->
    <div class="cart-column">
      <div class="person-info"> 
        <PersonSet :customer="true" />
        <!-- TODO SALESMAN SELECT -->
        <!-- <PersonSet :customer="false" /> -->
      </div>
      <CartList />
      <DiscontsSale />
      <SaleTotals />
      <div class='sale-actions'>
        <SaleComment />
        <ClearSale />
        <FinishSale />
        <!-- next, or select payment -->
        <!-- change product, do in v2 version -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ProductList from './components/cashier/ProductsList.vue';
  import CartList from './components/cashier/CartList.vue';
  import PersonSet from './components/cashier/PersonSet.vue';
  import SaleTotals from './components/cashier/SaleTotals.vue';
  import SaleComment from './components/cashier/SaleComment.vue';
  import ClearSale from './components/cashier/ClearSale.vue';
  import FinishSale from './components/cashier/FinishSale.vue';
  import DiscontsSale from './components/cashier/DiscontsSale.vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose } from '@mdi/js';

  export default defineComponent({
    name: 'CashierPage',
    components: {
      ProductList,
      CartList,
      PersonSet,
      SaleTotals,
      SaleComment,
      SvgIcon,
      ClearSale,
      FinishSale,
      DiscontsSale
    },
    setup() {
      return {
        mdiClose
      };
    },
  });
</script>

<style scoped>

  .sale-info {
    margin-top: 20px;
  }

  .person-info {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }

  .cashier-page {
    display: flex;
    width: 100%;
    height: 95vh;
  }
  
  .sale-actions {
    padding-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 16px;
  }

  .product-column {
    flex: 2;
    padding: 10px;
  }

  .cart-column {
    flex: 1;
    padding: 10px;
  }

  .cashier-title {
    text-align: center;
    font-size: 2rem;
    color: #ffffff;
    padding: 0.5rem;
  }
  
  .icon {
    width: 80px;
    height: 80px;
  }
</style>
