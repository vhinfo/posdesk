<template>
  <div>
    <div class="cart-header">
      <div class="title">
        <SvgIcon type="mdi" :path="mdiCart" class="default-icon" width="20" height="20"/>
        <h3> Carrinho </h3>
      </div>
      <SvgIcon type="mdi" :path="mdiDelete" class="default-icon-red" width="20" height="20" @click="clearCart"/>
    </div>
    <div v-if="products.length === 0" class="no-cart">
      <SvgIcon type="mdi" :path="mdiCartOff" class="no-products-icon" width="150" height="150" />
      <p>Carrinho vazio</p>
    </div>
    <div v-else class="cart-table">
      <table class="cart-list">
        <tbody>
          <tr v-for="product in products" :key="product.id" class="cart-item">
            <td>
              <SvgIcon type="mdi" :path="mdiCartMinus" class="default-icon-red" width="20" height="20" @click="removeProduct(product)" />
            </td>
            <td>
              <b><span>{{ product.sku }}</span><br></b>
              <span>{{ product.description }}</span>
            </td>
            <td>
              <div class="quantity-control">
                <SvgIcon type="mdi" :path="mdiMinusCircle" class="default-icon" width="20" height="20" @click="decreaseQuantity(product)" />
                <span>{{ product.quantity }}</span>
                <SvgIcon type="mdi" :path="mdiPlusCircle" class="default-icon" width="20" height="20" @click="increaseQuantity(product)" />
              </div>
            </td>
            <td>
              <b>{{ formatPrice(product.price) }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCartOff, mdiCartMinus, mdiMinusCircle, mdiPlusCircle, mdiCart, mdiDelete } from '@mdi/js';
import { Item } from '../../../types';
import { useStore } from 'vuex';
import { quantityProductHandler, clearSaleCart } from '../../../controllers/cashierController';

export default defineComponent({
  name: 'CartList',
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();
    const products = computed(() => store.state.sale.items);
    const removeProduct = async (product: Item) => {
      try {
        await quantityProductHandler(null, -product.quantity, product);
      } catch (error) {
        console.error('Erro ao remover produto do carrinho:', error);
      }
    };

    const decreaseQuantity = async (product: Item) => {
      try {
        await quantityProductHandler(null, -1, product);
      } catch (error) {
        console.error('Erro ao diminuir quantidade do produto:', error);
      }
    };
    
    const clearCart = async () => {
      try {
        await clearSaleCart();
      } catch (error) {
        console.error('Erro ao limpar o carrinho:', error);
      }
    }

    const increaseQuantity = async (product: Item) => {
      try {
        await quantityProductHandler(null, +1, product);
      } catch (error) {
        console.error('Erro ao aumentar quantidade do produto:', error);
      }
    };

    const formatPrice = (price: number): string => {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    };

    return {
      products,
      mdiCartOff,
      mdiCartMinus,
      mdiMinusCircle,
      mdiPlusCircle,
      mdiCart,
      mdiDelete,
      formatPrice,
      removeProduct,
      decreaseQuantity,
      increaseQuantity,
      clearCart
    };
  },
});
</script>

<style scoped>
.cart-list {
  width: 100%;
  border-radius: 16px;
}

.no-cart {
  text-align: center;
  color: gray;
  background-color: #333;
  border-radius: 16px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-products-icon {
  font-size: 5rem;
}

.cart-table {
  width: 100%;
  background-color: #333;
  border-radius: 16px;
  height: 40vh;
  overflow-y: auto;
}

.cart-table table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 10px;
  text-align: left;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Ajuste para alinhar o conteúdo ao topo */
  padding: 10px;
  border-bottom: 1px solid #00000098;
  word-break: break-word; /* Quebra de palavra para textos longos */
}

.quantity-control {
  display: flex;
  align-items: center;
}

.default-icon {
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.default-icon-red {
  cursor: pointer;
  color: rgb(129, 9, 9);
}

/* Custom scrollbar styles */
.cart-table::-webkit-scrollbar {
  width: 3px; /* Largura da barra de rolagem */
}

.cart-table::-webkit-scrollbar-thumb {
  background-color: #a8009233;
  border-radius: 16px;
}

.cart-table::-webkit-scrollbar-track {
  border-radius: 16px;
}

.cart-header {
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
</style>