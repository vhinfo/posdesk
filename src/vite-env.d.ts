/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@jamescoyle/vue-icon' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Definir interface de janela global para exposições específicas do Electron
interface Window {
  ipcRenderer: import('electron').IpcRenderer;
  authService: {
    validateAuthentication: () => Promise<{ name: string; storeName: string; cashierName: string; isManager: boolean }>;
    makeLogout: () => Promise<boolean>;
    getStoreCashiers: () => Promise<any>;
    authenticate: (user: string, password: string) => Promise<boolean>;
    setCashier: (cashierId: number) => Promise<boolean>;
  };
  productService: {
    getProducts: (page: number | null, sku: number | null, force: boolean) => Promise<Product[] | undefined>;
  };
  personService: {
    getPerson: (document: string) => Promise<Person>;
    createCustomer: (customer: Person) => Promise<number>;
  };
}

declare global {
  import { Product, Person } from './types';
}
