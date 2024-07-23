import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { Cupom, Item, Payment, Person, Sale } from '../../types';

const state: Sale = 
{
  change_value: 0,
  qtdItems: 0,
  qtdPayments: 0,
  forceCustomer: false,
  paymentMethod: '',
  validSale: false,
  number: '',
  saleDate: '',
  store: '',
  cashier: '',
  employeeCashier: '',
  employeeSale: false,
  obs: '',
  sysObs: '',
  productsValue: 0,
  paymentsValue: 0,
  discountValue: 0,
  totalValue: 0,
  invoice: false,
  invoiceSerie: '',
  invoiceNumber: '',
  invoiceCoupon: '',
  invoiceXml: '',
  customer: {
    id: null,
    document: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    store_partiner_id: '',
    store_partiner_name: ''
  },
  salesman: {
    id: null,
    document: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    store_partiner_id: '',
    store_partiner_name: ''
  },
  payments: [],
  items: [],
  discounts: []
};

const getters: GetterTree<Sale, any> = 
{
  getItems(state): Item[] {
    return state.items;
  },
  getProductBySkuOrId: (state) => (skuOrId: string | number): Item | undefined => {
    return state.items.find(item => item.sku === skuOrId || item.id === skuOrId);
  },
  getTotalProductsValue(state): number {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getTotalDiscountValue(state): number {
    return state.items.reduce((total, item) => total + item.discounts.reduce((subtotal, discount) => subtotal + discount.value, 0), 0);
  },
  getTotalPaymentsValue(state): number {
    return state.payments.reduce((total, payment) => total + payment.value, 0);
  },
  getTotalSaleValue(state): number {
    return state.totalValue;
  },
  getSale(state): Sale {
    return state;
  },
  getDiscounts:(state) => (code: string | null): Cupom[] =>
  {
    if (code === null) {
      return state.discounts;
    }
  
    return state.discounts.filter(discount => discount.code === code);
  },
  getPaymentByMethod: (state) => (methodId: number): Payment | undefined => {
    return state.payments.find(payment => payment.id === methodId);
  },
  getPayments: (state) => state.payments
};

const mutations: MutationTree<Sale> = 
{
  addItem(state: Sale, product: Item) {
    state.items.push(product);
  },
  removeItem(state, productId: number) {
    state.items = state.items.filter(item => item.id !== productId);
  },
  updateItem(state, updatedItem: Item) {
    const index = state.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      state.items.splice(index, 1, updatedItem);
    }
  },
  updateTotals(state) {
    state.productsValue = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    state.productsValue = state.payments.reduce((total, payment) => total + payment.value, 0);
    state.productsValue = state.items.reduce((total, item) => total + item.discounts.reduce((subtotal, discount) => subtotal + discount.value, 0), 0);
    state.totalValue = state.productsValue - state.discountValue;
  },
  clearItems(state) {
    state.items = [];
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
    state.change_value = 0;
    state.qtdItems = 0;
    state.qtdPayments = 0;
    state.forceCustomer = false;
    state.paymentMethod = '';
    state.validSale = false;
    state.number = '';
    state.saleDate = '';
    state.store = '';
    state.cashier = '';
    state.employeeCashier = '';
    state.employeeSale = false;
    state.obs = '';
    state.sysObs = '';
    state.productsValue = 0;
    state.paymentsValue = 0;
    state.discountValue = 0;
    state.totalValue = 0;
    state.invoice = false;
    state.invoiceSerie = '';
    state.invoiceNumber = '';
    state.invoiceCoupon = '';
    state.invoiceXml = '';
    state.customer = {
      id: null,
      document: '',
      name: '',
      email: '',
      phone: '',
      type: '',
      store_partiner_id: '',
      store_partiner_name: ''
    };
    state.salesman = {
      id: null,
      document: '',
      name: '',
      email: '',
      phone: '',
      type: '',
      store_partiner_id: '',
      store_partiner_name: ''
    };
    state.payments = [];
    state.items = [];
    state.discounts = [];
  },
  addDiscont(state, cupom: Cupom) {
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
    state.payments.push(payment);
  },
  updatePayment(state, updatedPayment: Payment) {
    const paymentIndex = state.payments.findIndex(payment => payment.id === updatedPayment.id);
    if (paymentIndex !== -1) {
      state.payments[paymentIndex].value = updatedPayment.value;
    }
  },
  setPaymentTotal(state, value){
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
