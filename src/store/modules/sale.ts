import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { Cupom, Item, Person, Sale } from '../../types';

const state: Sale = 
{
  change_value: 0,
  qtd_items: 0,
  qtd_payments: 0,
  forceCustomer: false,
  payment_method: '',
  valid_sale: false,
  number: '',
  sale_date: '',
  store: '',
  cashier: '',
  employee_cashier: '',
  employee_sale: false,
  obs: '',
  sys_obs: '',
  products_value: 0,
  payments_value: 0,
  discount_value: 0,
  total_value: 0,
  invoice: false,
  invoice_serie: '',
  invoice_number: '',
  invoice_coupon: '',
  invoice_xml: '',
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
    return state.total_value;
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
  }
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
    state.products_value = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    state.payments_value = state.payments.reduce((total, payment) => total + payment.value, 0);
    state.discount_value = state.items.reduce((total, item) => total + item.discounts.reduce((subtotal, discount) => subtotal + discount.value, 0), 0);
    state.total_value = state.products_value - state.discount_value;
  },
  clearItems(state) {
    state.items = [];
    state.products_value = 0;
    state.payments_value = 0;
    state.discount_value = 0;
    state.total_value = 0;
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
    state.qtd_items = 0;
    state.qtd_payments = 0;
    state.forceCustomer = false;
    state.payment_method = '';
    state.valid_sale = false;
    state.number = '';
    state.sale_date = '';
    state.store = '';
    state.cashier = '';
    state.employee_cashier = '';
    state.employee_sale = false;
    state.obs = '';
    state.sys_obs = '';
    state.products_value = 0;
    state.payments_value = 0;
    state.discount_value = 0;
    state.total_value = 0;
    state.invoice = false;
    state.invoice_serie = '';
    state.invoice_number = '';
    state.invoice_coupon = '';
    state.invoice_xml = '';
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
    state.products_value = value;
  },
  updateSale(state,stateUpdated){
    state = stateUpdated;
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
