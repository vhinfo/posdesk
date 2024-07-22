<template>
  <div>
    <div class="discount-header">
      <div class="title">
        <SvgIcon type="mdi" :path="mdiTagMultiple" class="default-icon" width="20" height="20"/>
        <h3> Descontos </h3>
      </div>
      <div>
        <SvgIcon type="mdi" :path="mdiDelete" class="default-icon-red" width="25" height="25" @click="clearDiscontSale"/>
        <SvgIcon type="mdi" :path="mdiPlusCircle" class="default-icon" width="25" height="25" @click="showAddDiscountModal"/>
      </div>
    </div>
    <div v-if="discounts.length === 0 && !hasProductDiscounts" class="no-discounts">
      <SvgIcon type="mdi" :path="mdiTagOff" class="no-discounts-icon" width="150" height="150" />
      <p>Nenhum desconto aplicado</p>
    </div>
    <div v-else class="discount-table">
      <table class="discount-list">
        <tbody>
          <tr v-for="discount in discounts" :key="discount.id" class="discount-item">
            <td class="description-column">
              <b><span>{{ discount.code }}</span><br></b>
              <span>{{ discount.description }}</span>
            </td>
            <td class="value-column">
              <b>{{ formatValue(discount.value, discount.percent) }}</b>
            </td>
          </tr>
          <tr v-for="product in productsWithDiscounts" :key="product.id" class="discount-item">
            <td class="description-column">
              <span v-for="discount in product.discounts" :key="discount.id">
                <b><span>{{ discount.code }} - </span></b>
                <span>{{ product.sku }}</span><br>
                <span>{{ discount.description }}</span><br>
              </span>
            </td>
            <td class="value-column">
              <span v-for="discount in product.discounts" :key="discount.id">
                <b>{{ formatValue(discount.value, discount.percent) }}</b><br>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Adicionar Desconto</h3>
          <SvgIcon type="mdi" :path="mdiCloseBox" class="close-icon" width="35" height="35" @click="hideAddDiscountModal"/>
        </div>
        <div class="modal-body">
          <input v-model="discountCode" placeholder="Código do Desconto" />
          <button @click="searchDiscount">Buscar Desconto</button>
          <div v-if="foundDiscount">
            <h4>Desconto Encontrado</h4>
            <p><b>Código:</b> {{ foundDiscount.code }}</p>
            <p><b>Descrição:</b> {{ foundDiscount.description }}</p>
            <p><b>Valor:</b> {{ foundDiscount.value }}</p>
            <div v-if="!foundDiscount.allProducts">
              <h4>Selecione os produtos para aplicar o desconto:</h4>
              <ul>
                <li v-for="product in products" :key="product.id">
                  <input type="checkbox" :value="product.id" v-model="selectedProducts"> 
                  {{ product.sku +' - R$ '+product.value+ ' - '+product.description }}
                </li>
              </ul>
            </div>
            <button @click="addDiscountToSale">Adicionar à Venda</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTagMultiple, mdiTagOff, mdiPlusCircle, mdiCloseBox, mdiDelete } from '@mdi/js';
import { Cupom, Item } from '../../../types';
import { useStore } from 'vuex';
import { getCupom, addDiscontToCurrentSale, clearDiscont } from '../../../controllers/cashierController';

export default defineComponent({
  name: 'DiscontsSale',
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();
    const discounts = computed(() => store.state.sale.discounts);
    const products = computed(() => store.state.sale.items);
    const isModalVisible = ref(false);
    const discountCode = ref('');
    const foundDiscount = ref<Cupom | null>(null);
    const selectedProducts = ref<number[]>([]);

    const showAddDiscountModal = () => {
      isModalVisible.value = true;
    };

    const hideAddDiscountModal = () => {
      isModalVisible.value = false;
      discountCode.value = '';
      foundDiscount.value = null;
      selectedProducts.value = [];
    };

    const searchDiscount = async () => {
      foundDiscount.value = await getCupom(discountCode.value);
      console.log('returned  cupom', foundDiscount.value)
    };

    const clearDiscontSale = async () => {
      await clearDiscont();
    };

    const addDiscountToSale = async () => {
      if (foundDiscount.value) {
        if (!foundDiscount.value.allProducts && selectedProducts.value.length === 0) {
          alert('Selecione pelo menos um produto para aplicar o desconto.');
          return;
        }
        await addDiscontToCurrentSale(foundDiscount.value, selectedProducts.value);
        hideAddDiscountModal();
      }
    };

    const formatValue = (value: number, percent: boolean): string => {
      return percent ? `${value}%` : value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    };

    const hasProductDiscounts = computed(() => {
      return products.value.some((product: Item) => product.discounts && product.discounts.length > 0);
    });

    const productsWithDiscounts = computed(() => {
      return products.value.filter((product: Item) => product.discounts && product.discounts.length > 0);
    });

    return {
      discounts,
      isModalVisible,
      discountCode,
      foundDiscount,
      selectedProducts,
      products,
      hasProductDiscounts,
      productsWithDiscounts,
      mdiTagMultiple,
      mdiTagOff,
      mdiPlusCircle,
      mdiCloseBox,
      mdiDelete,
      showAddDiscountModal,
      hideAddDiscountModal,
      searchDiscount,
      addDiscountToSale,
      formatValue,
      clearDiscontSale
    };
  },
});
</script>

<style scoped>
.discount-list {
  width: 100%;
  border-radius: 16px;
}

.no-discounts {
  text-align: center;
  color: gray;
  background-color: #333;
  border-radius: 16px;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-discounts-icon {
  font-size: 5rem;
}

.discount-table {
  width: 100%;
  background-color: #333;
  border-radius: 16px;
  height: 10vh;
  overflow-y: auto;
}

.discount-table table {
  width: 100%;
  border-collapse: collapse;
}

.discount-table th,
.discount-table td {
  text-align: left;
  align-self: center;
}

.discount-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #00000098;
  word-break: break-word;
}

.default-icon {
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.default-icon-red {
  cursor: pointer;
  color: rgb(192, 4, 4);
}

.discount-table::-webkit-scrollbar {
  width: 3px;
}

.discount-table::-webkit-scrollbar-thumb {
  background-color: #a8009233;
  border-radius: 16px;
}

.discount-table::-webkit-scrollbar-track {
  border-radius: 16px;
}

.discount-header {
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

.description-column {
  width: 70%;
}

.value-column {
  width: 30%;
  text-align: right;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.603);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  width: 40%;
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 10px;
}

.close-icon {
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
