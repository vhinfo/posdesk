// src/types.ts

export interface Customer {
    document: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    store_partiner_id: string;
    store_partiner_name: string;
  }
  
  export interface Salesman {
    document: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    store_partiner_id: string;
    store_partiner_name: string;
  }
  
  export interface Payment {
    value: number;
    payment_method_id: number;
    payment_date: string;
  }
  
  export interface Discount {
    id: string;
    with_client: string;
    code: string;
    description: string;
    value: number;
    all_products: boolean;
    accumulate: boolean;
    percent: boolean;
    quantity: number;
  }
  
  export interface Item {
    id: number;
    description: string;
    price: number;
    quantity: number;
    sku: string;
    total: number;
    value: number;
    discounts: Discount[];
  }
  
  export interface Sale {
    change_value: number;
    qtd_items: number;
    qtd_payments: number;
    forceCustomer: boolean | string;
    payment_method: string;
    valid_sale: boolean;
    number: string;
    sale_date: string;
    store: string;
    cashier: string;
    employee_cashier: string;
    employee_sale: boolean;
    obs: string;
    sys_obs: string;
    products_value: number;
    payments_value: number;
    discount_value: number;
    total_value: number;
    invoice: boolean;
    invoice_serie: string;
    invoice_number: string;
    invoice_coupon: string;
    invoice_xml: string;
    customer: Customer;
    salesman: Salesman;
    payments: Payment[];
    items: Item[];
    discounts: Discount[];
  }
  
  export interface Product {
    id: number;
    description: string;
    sku: string;
    categoryName: string;
    image: string;
    brand: string;
    price: number;
  }
  
  export interface User {
    name: string;
    storeName: string;
    cashierName: string;
    isManager: boolean;
  }
  
  export interface AuthState {
    user: User | null;
  }
  
  export interface Alert {
    message: string;
    type: 'error' | 'success' | 'info' | 'warning';
    active: boolean;
  }
  
  export interface MessageState {
    alert: Alert;
    timeoutId: NodeJS.Timeout | null;
  }
  
  export interface Cashier {
    id: number;
    name: string;
  }
  