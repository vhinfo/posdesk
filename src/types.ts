// src/types.ts
export interface Person {
    id: number|null, 
    document: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    store_partiner_id: string;
    store_partiner_name: string;
  }
  export interface PaymentMethod {
    id: number;
    description: string;
    alias: string;
    issue: boolean;
    icon: string | null;
  }  
  export interface Payment {
    id: number;
    description: string;
    alias: string;
    issue: boolean;
    icon: string | null;
    value:number
  }  
  export interface Cupom {
    label: string;
    code: string;
    value: number;
    active: boolean;
    default: boolean;
    description: string;
    allProducts: boolean;
    percent: boolean;
    acumulate: boolean;
    quantity: number | null;
    with_validity: boolean;
    start_date: string | null;
    end_date: string | null;
    customer_id: number | null;
  }
  export interface Item {
    id: number;
    description: string;
    price: number;
    quantity: number;
    sku: string;
    total: number;
    value: number;
    discounts: Cupom[];
  }
  export interface Sale {
    id: number | null;
    paymentMethod: string|null;
    number: string | null;
    saleDate: Date| null;
    store: Store|null;
    cashier: Cashier|null;
    employeeCashier: { id: number, name: string }|null;
    employeeSale: boolean;
    obs: string|null;
    sysObs: string|null;
    changeValue: number;
    productsValue: number;
    paymentsValue: number;
    discountValue: number;
    totalValue: number;
    customer: Person|null;
    salesman: Person|null;
    status: string;
    payments: Payment[]|null;
    items: Item[]|null;
    discounts: Cupom[]|null;
    invoice: boolean;
    invoiceSerie: string | null;
    invoiceNumber: string | null;
    invoiceCoupon: string | null;
    invoiceXml: string | null;
  }
  export interface Store {
    id: number;
    name: string;
    type: string;
    abbreviation: string;
    groupId: number;
    groupName: string;
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
    paymentMethods: PaymentMethod[] | boolean;
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
  