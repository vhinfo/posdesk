/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // Expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer,
  authService: {
    validateAuthentication: () => Promise<boolean>,
    authenticate: (user: string, password: string) => Promise<boolean>
    getStoreCashiers: () => Promise<any>
    setCashier: (cashierId:number) => Promise<boolean>
  }
}
