/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@jamescoyle/vue-icon' {
  import { DefineComponent } from 'vue';

  const SvgIcon: DefineComponent<{
    type: string;
    path: string;
  }>;

  export default SvgIcon;
}

interface Window {
  // Expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer,
  authService: {
    validateAuthentication: () => Promise<{ name:string, storeName:string, cashierName: string, isManager:boolean }>,
    makeLogout: () => Promise<boolean>,
    getStoreCashiers: () => Promise<any>,
    authenticate: (user: string, password: string) => Promise<boolean>,
    setCashier: (cashierId:number) => Promise<boolean>,
  },
  productService: {
    getProducts: (page: number|null, sku:number|null) => Promise<{
      id: number,
      description: string,
      sku: string,
      categoryId: number|null,
      categoryName: string,
      image: string,
      brand: string,
      price: number
    }[]|undefined>
  }
}
