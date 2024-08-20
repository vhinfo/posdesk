<template>
    <div class="product-list">
        <div class="search-bar">
            <input v-model.number="searchQuery" type="number" placeholder="Buscar por SKU ou código de barras..." autofocus/>
            <button @keypress="searchProducts" @click="searchProducts" class="search-button">Buscar</button>
            <button @click="forceUpdateProducts" class="update-button">
            <SvgIcon type="mdi" :path="mdiRefresh" />
            </button>
        </div>
        <div v-if="loading" class="loading-indicator">
            <SvgIcon type="mdi" :path="mdiLoading" class="loading-icon"  width="50" height="50" />
            <p>Baixando produtos...</p>
        </div>
        <div v-else-if="products.length === 0" class="no-products">
            <SvgIcon type="mdi" :path="mdiPackageVariantClosed" class="no-products-icon" width="250" height="250" />
            <p>Sem produtos no momento</p>
        </div>
        <div v-else class="product-cards"  >
            <div v-for="product in products" :key="product.id" class="product-card" @click="sendToCart(product)">
            <div class="product-image">
                <img v-if="product.image" :src="product.image" :alt="product.description" />
                <SvgIcon type="mdi" v-else :path="mdiPackageVariantClosed" class="default-icon" width="80" height="80" />
            </div>
            <div class="product-details">
                <b>{{ product.sku }}</b><br>
                {{ product.description }}<br>
                {{ product.brand }}<br>
                <b> {{ formatPrice(product.price) }}</b>
                <!-- report wrong price feature -->
                <!-- <SvgIcon type="mdi" :path="mdiAlert" class="report-icon" width="20" height="20" /></b> -->
            </div>
            </div>
        </div>
        <div class="pagination">
            <SvgIcon type="mdi" :path="mdiChevronLeft" @click="previusPage()" width="100"> Anterior</SvgIcon>
            <p>Páginas</p>
            <SvgIcon type="mdi" :path="mdiChevronRight" @click="nextPage()" width="100"> Próxima</SvgIcon>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted  } from 'vue';
import { getProducts } from '../../../controllers/productController';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPackageVariantClosed, mdiRefresh, mdiLoading, mdiChevronRight, mdiChevronLeft, mdiAlert  } from '@mdi/js';
import { useStore } from 'vuex';
import { addProductToCart } from '../../../controllers/cashierController';
import { Product } from '../../../types';

export default defineComponent({
    name: 'ProductList',
    components: {
        SvgIcon,
    },
    setup() {
        const products = ref<Product[]>([]);
        const searchQuery = ref<number | null>(null);
        const loading = ref<boolean>(false);
        const currentPage = ref<number>(1);
        const store = useStore();
        const user = computed(() => store.state.auth.user);

        const fetchProducts = async (page:number, forceUpdate: boolean = false) => {
            try {
                loading.value = true;
                store.dispatch('messageHandle/alert', {
                    message: 'Baixando produtos...',
                    type: 'info',
                });
                const result = await getProducts(page, null, forceUpdate);
                store.dispatch('messageHandle/alert', {
                    message: 'Produtos Atualizados!',
                    type: 'success',
                });
                products.value = result || [];
            } catch (error) {
                console.error('Erro ao obter produtos:', error);
                store.dispatch('messageHandle/alert', {
                    message: 'error ao obter os produtos!',
                    type: 'error',
                });
            } finally {
                loading.value = false;
            }
        };

        const nextPage = async () => {
            try{
                currentPage.value++;
                await fetchProducts(currentPage.value,false);
            }catch (error) {
                console.error(error)
                store.dispatch('messageHandle/alert', {
                    message: 'Falha ao avançar a página',
                    type: 'error',
                });
            }
        };

        const previusPage = async () => {
            try{
                if(currentPage.value > 0){
                    currentPage.value--;
                }
                await fetchProducts(currentPage.value,false);
            }catch (error) {
                console.error(error)
                store.dispatch('messageHandle/alert', {
                    message: 'Falha ao voltar a página',
                    type: 'error',
                });
            }
        };

        const searchProducts = async () => {
            try {
                let search: number | null = searchQuery.value;

                if (null !== searchQuery.value && searchQuery.value < 10) {
                    search = null;
                }
                const result = await getProducts(null, search, false);
                if (result) {
                    products.value = result as Product[];
                }
            } catch (error) {
                console.error(error)
                store.dispatch('messageHandle/alert', {
                    message: 'error ao obter os produtos!',
                    type: 'error',
                });
            }
        };

        const sendToCart = async (product:Product) => {
            try{
                await addProductToCart(product);
                store.dispatch('messageHandle/alert', {
                    message: `Produto ${product.sku} adicionado ao carrinho!`,
                    type: 'success',
                });
            }catch (error) {
                console.error(error)
                store.dispatch('messageHandle/alert', {
                    message: 'error ao enviar produto ao carrinho!',
                    type: 'error',
                });
            }
        }

        const forceUpdateProducts = async () => {
            await fetchProducts(currentPage.value,true);
        };

        const formatPrice = (price: number): string => {
            return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            });
        };

        onMounted(() => {
            if (user.value) {
                fetchProducts(currentPage.value);
            }
        });

        return {
            products,
            searchQuery,
            loading,
            mdiPackageVariantClosed,
            mdiRefresh,
            mdiLoading,
            mdiChevronRight,
            mdiChevronLeft,
            mdiAlert,
            formatPrice,
            searchProducts,
            forceUpdateProducts,
            previusPage,
            nextPage,
            sendToCart
        };
    },
});
</script>

<style scoped>
.product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 93vh;
    margin-right: 10px;
}

.search-bar {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
}

.search-bar input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
}

.search-bar button {
    padding: 10px;
    background-color: #a80092;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.update-button {
    padding: 10px;
    background-color: #a80092;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 93vh;
    font-size: 1.2em;
}

.loading-icon {
    margin-bottom: 10px;
    animation: spin 1s linear infinite; 
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.no-products {
    text-align: center;
    color: gray;
    height: 93vh;
}

.no-products-icon {
    font-size: 15rem;
}

.product-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 5px;
    width: 100%;
    height: 90vh;
    overflow-y: auto;
    padding: 8px
}

.product-cards::-webkit-scrollbar {
    width: 3px;
}

.product-cards::-webkit-scrollbar-thumb {
    background-color: #a8009233;
    border-radius: 4px;
    
}

.product-cards::-webkit-scrollbar-track {
    border-radius: 4px;
}

.product-card {
    background-color: #333;
    padding: 10px;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    height: 12.5rem; 
}

.product-image {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.product-details {
    line-height: 100%;
}

.default-icon {
    font-size: 100%;
    color: rgb(255, 255, 255);
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
}

.report-icon{
    padding-left: 10px;
    color: red;
}
</style>
