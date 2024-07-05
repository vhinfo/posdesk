import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { Item, Sale } from '../../types';

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
    document: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    store_partiner_id: '',
    store_partiner_name: ''
  },
  salesman: {
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
    }
};

const mutations: MutationTree<Sale> = 
{
    addItem(state:Sale, product: Item) {
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
