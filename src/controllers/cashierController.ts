import store from '../store';
import { Cupom, Item, Product, Sale } from '../types';

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
        updatedItem.total = updatedItem.quantity * updatedItem.value;
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

export async function addDiscontToCurrentSale(cupom: Cupom): Promise<void> {
    const currentDiscounts: Cupom[] = store.getters['sale/getDisconts'];

    if (cupom.acumulate) {
        if (currentDiscounts.length > 0) {
            throw new Error('Não é possível adicionar um cupom acumulativo quando já existe outro desconto.');
        }
    }

    store.commit('sale/addDiscont', cupom);
}

export async function clearDiscont():Promise<void>
{
    console.log('tring remove disconts');
    store.commit('sale/clearDiscont');
}


export async function getCupom(code: string):Promise<Cupom>
{   
    return await window.cupomService.getCupom(code);
}


// TOTALS 
export async function reprocessSale():Promise<void>
{
    const sale:Sale = await processSaleDisconts( store.getters['sale/getSale']); 
    await processProducts()
    
}

async function processProducts():Promise<void>
{
    console.log('trying processing product');
}

async function processSaleDisconts(sale:Sale):Promise<Sale>
{
    if(null === sale.discounts){
        return sale;
    }

    sale.discounts.forEach((saleDisconts) => {
        
    });
    
    return sale;
}