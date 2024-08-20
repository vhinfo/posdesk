import { ipcRenderer, contextBridge } from 'electron';
import { Person } from '../models/Person';
import { Sale } from '../models/Sale';
// import { authService } from '../services/authService';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);

// FUNCTIONS RULES ------------------------------------------------------

// AUTH
contextBridge.exposeInMainWorld('authService', {
  validateAuthentication: () => {
    return ipcRenderer.invoke('auth-validate');
  },
  getStoreCashiers: () => {
    return ipcRenderer.invoke('get-store-cashiers');
  },
  makeLogout: () => {
    return ipcRenderer.invoke('make-logout');
  },
  authenticate: (user: string, password: string) => {
    return ipcRenderer.invoke('auth-login', user, password);
  },
  setCashier: (cashierid:number) => {
    return ipcRenderer.invoke('set-cashier',cashierid);
  },
});

// PRODUCTS
contextBridge.exposeInMainWorld('productService', {
  getProducts: (page:number|null, sku:number|null, force:boolean) => {
    return ipcRenderer.invoke('get-products',page, sku, force);
  },
});

// PERSON
contextBridge.exposeInMainWorld('personService', {
  getPerson: (document:number) => {
    return ipcRenderer.invoke('get-person',document);
  },
  createCustomer: (customer:Person) => {
    return ipcRenderer.invoke('create-customer',customer);
  },
});

// DISCONTS
contextBridge.exposeInMainWorld('cupomService', {
  getCupom: (code:string) => {
    return ipcRenderer.invoke('get-cupom',code);
  },
});

// SALE
contextBridge.exposeInMainWorld('saleService',{
  sendSale: (sale:Sale) => {
    return ipcRenderer.invoke('send-sale',sale);
  }
})
