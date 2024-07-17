import store from '../store';
import { Item, Product } from '../types';

export async function addProductToCart(product: Product): Promise<boolean> 
{
    const item: Item | undefined = store.getters['sale/getProductBySkuOrId'](product.id);
    if (item) {
        await quantityProductHandler(product, 1, item);
    } else {
        const newItem: Item = {
            id: product.id,
            description: product.description,
            sku: product.sku,
            quantity: 1,
            value: product.price,
            price: product.price,
            discounts: [],
            total: product.price,
        };
        store.commit('sale/addItem', newItem);
    }
    return false;
}

export async function quantityProductHandler(product: Product|null, value: number, item:Item|null = null): Promise<boolean> 
{
    if(item === null && product !== null){
        const item: Item | undefined = store.getters['sale/getProductBySkuOrId'](product.id);
    }
    if (item) {
        const updatedQuantity = item.quantity + value;
        const updatedItem: Item = {
            ...item,
            quantity: updatedQuantity,
        };
        if(updatedItem.quantity <= 0){
            store.commit('sale/removeItem', updatedItem.id);
        }else{
            store.commit('sale/updateItem', updatedItem);
        }
    } else {
        throw new Error('Product not found in cart.');
    }
    return true;
}

export async function clearSaleCart():Promise<boolean>
{
    store.commit('sale/clearItems');
    return true;
}

