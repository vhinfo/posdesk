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
    validateAuthentication: () => Promise<boolean>,
    makeLogout: () => Promise<boolean>,
    getStoreCashiers: () => Promise<any>,
    authenticate: (user: string, password: string) => Promise<boolean>,
    setCashier: (cashierId:number) => Promise<boolean>,
  }
}
