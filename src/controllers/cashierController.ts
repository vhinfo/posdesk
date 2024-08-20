import store from '../store';
import { Cupom, Item, Payment, PaymentMethod, Product, Sale } from '../types';

export async function addProductToCart(product: Product): Promise<boolean> 
{
    const item: Item|null = store.getters['sale/getProductBySkuOrId'](product.id);
    if (null !== item) {
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
        await store.commit('sale/addItem', newItem);
    }
    await processProducts();
    return false;
}

export async function quantityProductHandler(product: Product|null, value: number, item:Item|null = null): Promise<boolean> 
{
    if(null === item && null !== product){
        const item: Item|null = store.getters['sale/getProductBySkuOrId'](product.id);
    }
    if (null === item) {
        throw new Error('Product not found in cart.');
    }

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
    await processProducts();
    
    return true;
}

export async function clearSaleCart():Promise<boolean>
{
    store.commit('sale/clearItems');
    return true;
}

export async function addDiscontToCurrentSale(cupom: Cupom, selectedProducts: number[]): Promise<void | null> {
    const currentDiscounts: Cupom[]|null = store.getters['sale/getDiscounts'](null);

    if (!cupom.acumulate && null !== currentDiscounts && currentDiscounts.length !== 0) {
        throw new Error('Não é possível adicionar um cupom acumulativo quando já existe outro desconto.');
    }

    if (selectedProducts.length > 0) {
        selectedProducts.forEach((selected) => {
            const item: Item|null = store.getters['sale/getProductBySkuOrId'](selected);
            if (null !== item) {
                const hasSameCodeDiscount = item.discounts.some(discount => discount.code === cupom.code);
                
                if (hasSameCodeDiscount) {
                    throw new Error('o produto já possui este desconto');
                }

                item.discounts.push(cupom);
                store.commit('sale/updateItem', item);
            }
        });
        await processProducts();
        return null;
    }
    
    store.commit('sale/addDiscont', cupom);
    await processProducts();
    return null;
}

export async function clearDiscont():Promise<void>
{
    const items: Item[]|null = store.getters['sale/getItems'];
    if (null === items) {
        return ;
    }

    items.forEach((item) => {
        if(item.discounts.length > 0){
            item.discounts = [];
            item.total = item.quantity * item.value
            store.commit('sale/updateItem', item);
        }
    });

    store.commit('sale/clearDiscont');
}

export async function getCupom(code: string):Promise<Cupom>
{   
    return await window.cupomService.getCupom(code);
}

async function processProducts(): Promise<void> {
    const items: Item[]|null = store.getters['sale/getItems'];
    if (null === items) {
        return;
    }

    let totalProduct = 0;

    items.forEach((item) => {
        item.total = item.quantity * item.value;

        if (item.discounts.length > 0) {
        let totalDiscountPercent = 0;
        let totalDiscountValue = 0;

        item.discounts.forEach((discount) => {

            if (discount.percent) {
                totalDiscountPercent += discount.value;
            } else {
                totalDiscountValue += discount.value;
            }
        });

        const percentDiscount = (item.total * totalDiscountPercent) / 100;
        item.total -= parseFloat((percentDiscount + totalDiscountValue).toFixed(2));
        }

        totalProduct += item.total;
        store.commit('sale/updateItem', item);
    });

    store.commit('sale/setProductTotal', totalProduct.toFixed(2));
    await processSaleDisconts();
}

async function processSaleDisconts(): Promise<void> {
    const sale: Sale = store.getters['sale/getSale'];
    const discounts: Cupom[]|null = sale.discounts;
    if(null === discounts){
        return;
    }

    let totalSaleDiscount = 0;

    totalSaleDiscount = discounts
        .filter(discount => discount.allProducts)
        .reduce((acc, discount) => {
            if (discount.percent) {
                return acc + (sale.productsValue * discount.value) / 100;
            } else {
                return acc + discount.value;
            }
        }, 0);

    // Atualiza o valor total da venda
    sale.discountValue = parseFloat(totalSaleDiscount.toFixed(2));
    sale.totalValue = parseFloat((sale.productsValue - sale.discountValue).toFixed(2));

    // Atualiza o estado da venda no Vuex
    store.commit('sale/updateSale', sale);
}

export async function addPaymentSale(paymentMethod: PaymentMethod, value: number): Promise<void> {
    const existingPayment: Payment|null = store.getters['sale/getPaymentByMethod'](paymentMethod.id);
  
    if (existingPayment) {
      // Somar o valor ao pagamento existente
      const updatedAmount = existingPayment.value + value;
      store.commit('sale/updatePayment', { method: paymentMethod, amount: updatedAmount });
    } else {
      const newPayment: Payment = {
        ...paymentMethod,
        value: value
      };
      store.commit('sale/addPayment', newPayment);
    }
    await processPayment();
}

async function processPayment():Promise<void>
{
    const payments: Payment[]|null = store.getters['sale/getPayments'];
    if(null === payments){
        return;
    }

    let paymentTotal = 0;
    payments.forEach((payment)=>{
        paymentTotal += payment.value;
    })

    store.commit('sale/setPaymentTotal', paymentTotal);
}

export async function forgeNewSale()//:Promise<void>
{
    const sale: Sale = store.getters['sale/getSale'];
    if(!sale){
        throw new Error('não foi possível localizar a venda no vuex');
    }

    const saleClone = JSON.parse(JSON.stringify(sale));

    await window.saleService.sendSale(saleClone);
    // store.commit('sale/clearSale');
}


