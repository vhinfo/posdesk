import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'module'; 
import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';
import log from 'electron-log';
import { authService } from '../services/authService';
import { DatabaseService } from '../services/databaseService'; 


log.initialize();
const appDirectory = path.dirname(app.getPath('exe'));
log.transports.file.resolvePathFn = () => path.join(appDirectory, 'logs/main.log');
log.info('Log from the main process');
log.catchErrors();

log.info('ERP TOKEN:', process.env.ERP_TOKEN);

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')
const { autoUpdater } = require('electron-updater');

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
    },
    autoHideMenuBar: true 
  })

  win.maximize(); 

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

// app.whenReady().then(createWindow)
app.whenReady().then(() => {
  log.info('verificando atualizações...')
  checkForUpdates()

  log.info('iniciando database...')
  DatabaseService.initialize().then(() => {
    log.info('Database pronto, criando janela...');
    createWindow();
  }).catch(err => {
    log.error('Erro ao inicializar o banco de dados:', err);
  });
});

setInterval(() => {
  log.info('Verificando atualizações...');
  checkForUpdates()
}, 600000);


autoUpdater.on('update-available', () => {
  log.info('Atualização disponível');
});


autoUpdater.on('update-downloaded', () => {
  log.info('Atualização baixada, aplicando...');
  autoUpdater.quitAndInstall();
});


app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

function checkForUpdates() {
  try {
    log.info('tentando atualizar');
    autoUpdater.checkForUpdates();
  } catch (e) {

    log.info('Falha ao recuperar atualizações', e);
  }
}

// AUTH
ipcMain.handle('auth-validate', async (event, args) => {
  const isAuthenticated = await authService.validateAuthentication(args);
  return isAuthenticated;
});
ipcMain.handle('auth-login', async (event, user, password) => {
  const isAuthenticated = await authService.authenticate(user, password);
  return isAuthenticated;
});


