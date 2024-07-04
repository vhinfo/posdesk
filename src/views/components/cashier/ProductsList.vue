<template>
    <div class="product-list">
    <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Buscar por SKU..." />
        <button @click="searchProducts" class="search-button">Buscar</button>
    </div>
    <div v-if="products.length === 0" class="no-products">
        <SvgIcon type="mdi" :path="mdiPackageVariantClosed" class="no-products-icon" width="500" height="500" />
        <p>Sem produtos no momento</p>
    </div>
    <div v-else class="product-cards">
        <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
            <img v-if="product.image" :src="product.image" :alt="product.description" />
            <SvgIcon type="mdi" v-else :path="mdiPackageVariantClosed" class="default-icon" width="100" height="100"/>
        </div>
        <div class="product-details">
            <h3><b>{{ product.sku }}</b></h3>
            <h3>{{ product.description }}</h3>
            <p>{{ product.brand }}</p>
            <p>{{ formatPrice(product.price) }}</p>
        </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { getProducts } from '../../../controllers/productController';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiPackageVariantClosed } from '@mdi/js';
    import { useStore } from 'vuex';

    interface Product {
        id: number;
        description: string;
        sku: string;
        categoryName: string;
        image: string;
        brand: string;
        price: number;
    }

    export default defineComponent({
        name: 'ProductList',
        components: {
        SvgIcon,
        },
        setup() {
            const products = ref<Product[]>([]);
            const searchQuery = ref<number | null>(null);
            const store = useStore();

            const fetchProducts = async () => {
                try {
                store.dispatch('messageHandle/alert', {
                    message: 'Baixando produtos!',
                    type: 'info',
                });
                const result = await getProducts(null, null);
                console.log('PRODUTOS RETORNADOS ', result?.length, 'todos: ', result);
                store.dispatch('messageHandle/alert', {
                    message: 'Produtos Atualizados!',
                    type: 'success',
                });
                if (result) {
                    products.value = result as Product[];
                }
                } catch (error) {
                console.error('Erro ao obter produtos:', error);
                store.dispatch('messageHandle/alert', {
                    message: 'Erro ao obter os produtos!',
                    type: 'Erro',
                });
                }
            };

            const searchProducts = async () => {
                try {
                const result = await getProducts(null, searchQuery.value);
                console.log(result);
                if (result) {
                    products.value = result as Product[];
                }
                } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                }
            };
            
            const formatPrice = (price: number): string => {
                return price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                };

            onMounted(() => {
                fetchProducts();
            });

            return {
                products,
                searchQuery,
                mdiPackageVariantClosed,
                formatPrice,
                searchProducts,
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
        border: #a80092, 2px;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
    }

    .no-products {
        text-align: center;
        color: gray;
    }

    .no-products-icon {
        font-size: 15rem;
    }

    .product-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        width: 100%;
        overflow-y: auto;
    }

    .product-card {
        background-color: #333;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
    }

    .product-image {
        height: 150px;
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
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .default-icon {
        font-size: 100%;
        color: rgb(255, 255, 255);
    }
</style>
