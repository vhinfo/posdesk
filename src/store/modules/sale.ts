import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { Cupom, Item, Payment, Person, Sale } from '../../types';

const state: Sale = {
  id:null,
  paymentMethod: null,
  number: null,
  saleDate: null,
  store: null,
  cashier: null,
  employeeCashier: null,
  employeeSale: false,
  obs: null,
  sysObs: null,
  productsValue: 0,
  paymentsValue: 0,
  discountValue: 0,
  totalValue: 0,
  changeValue:0,
  invoice: false,
  invoiceSerie: null,
  invoiceNumber: null,
  invoiceCoupon: null,
  invoiceXml: null,
  customer: null,
  salesman: null,
  payments: null,
  items: null,
  discounts: null,
  status: 'em edição',
};


const getters: GetterTree<Sale, any> = 
{
  getItems(state): Item[]|null {
    return state.items;
  },
  getProductBySkuOrId: (state) => (skuOrId: string | number): Item|null => {
    if(null === state.items){
      return null;
    }

    return state.items.find(item => item.sku === skuOrId || item.id === skuOrId) ?? null;
  },
  getTotalProductsValue(state): number {
    if(null === state.items){
      return 0;
    }

    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getTotalDiscountValue(state): number {
    if(null === state.items){
      return 0;
    }

    return state.items.reduce((total, item) => total + item.discounts.reduce((subtotal, discount) => subtotal + discount.value, 0), 0);
  },
  getTotalPaymentsValue(state): number {
    if(null === state.payments){
      return 0;
    }

    return state.payments.reduce((total, payment) => total + payment.value, 0);
  },
  getTotalSaleValue(state): number {
    return state.totalValue;
  },
  getSale(state): Sale {
    return state;
  },
  getDiscounts:(state) => (code: string | null): Cupom[]|null =>
  {
    if (code === null) {
      return state.discounts;
    }
    
    if(null === state.discounts){
      return null;
    }

    return state.discounts.filter(discount => discount.code === code);
  },
  getPaymentByMethod: (state) => (methodId: number): Payment | null => {
    if(null === state.payments){
      return null;
    }

    return state.payments.find(payment => payment.id === methodId) ?? null;
  },
  getPayments: (state) => state.payments
};

const mutations: MutationTree<Sale> = 
{
  addItem(state: Sale, product: Item) {
    if(null === state.items){
      state.items = [product];
    }

    state.items.push(product);
  },
  removeItem(state, productId: number) {
    if(null === state.items){
      return;
    }

    state.items = state.items.filter(item => item.id !== productId);
  },
  updateItem(state, updatedItem: Item) {
    if(null === state.items){
      return;
    }

    const index = state.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      state.items.splice(index, 1, updatedItem);
    }
  },
  clearItems(state) {
    state.items = null;
    state.productsValue = 0;
    state.paymentsValue = 0;
    state.discountValue = 0;
    state.totalValue = 0;
  },
  clearCustomer(state) {
    state.customer = null;
  },
  addCustomer(state, customer: Person) {
    state.customer = customer;
  },
  setObservation(state, obs: string) {
    state.obs = obs;
  },
  clearSale(state) {
    state.paymentMethod = null;
    state.number = null;
    state.saleDate = null;
    state.store = null;
    state.cashier = null;
    state.employeeCashier = null;
    state.employeeSale = false;
    state.obs = null;
    state.sysObs = null;
    state.productsValue = 0;
    state.paymentsValue = 0;
    state.discountValue = 0;
    state.totalValue = 0;
    state.changeValue = 0;
    state.invoice = false;
    state.invoiceSerie = null;
    state.invoiceNumber = null;
    state.invoiceCoupon = null;
    state.invoiceXml = null;
    state.customer = null;
    state.salesman = null;
    state.payments = null;
    state.items = null;
    state.discounts = null;
    state.status = 'em edicão';
  },
  addDiscont(state, cupom: Cupom) {
    if(null === state.discounts){
      state.discounts = [cupom];
      return;
    }

    state.discounts.push(cupom);
  },
  clearDiscont(state){
    state.discounts = []
  },
  setProductTotal(state,value){
    state.productsValue = value;
  },
  updateSale(state,stateUpdated){
    state = stateUpdated;
  },
  addPayment(state, payment: Payment) {
    if(null === state.payments){
      state.payments = [payment];
      return;
    }

    state.payments.push(payment);
  },
  updatePayment(state, updatedPayment: Payment) {
    if(null === state.payments){
      return;
    }

    const paymentIndex = state.payments.findIndex(payment => payment.id === updatedPayment.id);
    if (paymentIndex !== -1) {
      state.payments[paymentIndex].value = updatedPayment.value;
    }
  },
  setPaymentTotal(state, value:number){
    state.paymentsValue = value;
  }
};

export const sale: Module<Sale, any> = 
{
  namespaced: true,
  state,
  mutations,
  // actions,
  getters
};

export default sale;
