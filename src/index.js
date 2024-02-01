const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const reload = require('electron-reload')
const _ = require('lodash')

let mainWindow;
let newProductWindow;

if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}

const templateMenu = [{
    label: 'File',
            submenu: [{
            label: 'New Product',
            accelerator: 'Ctrl+n',
            click() {
                _newProductWindow();
            }
        },
        {
            label: 'Remove all products',
            click(){
              mainWindow.webContents.send('product:deleteAll','')
            }
        }
    ]
}]

if(process.env.NODE_ENV !=='production') {
    templateMenu.push({
        label:'Dev Tools',
        submenu:[
        {
            label:'Show/Hide Dev Tools',
            click(menuItem,browserWindow){
                browserWindow.toggleDevTools()
            },
            accelerator:'Ctrl+D'
        },
        {
            label:'Exit',
            click(){
                app.quit()
            },
            accelerator:'Ctrl+q'
        }
        ]
    })
}

const newWindow = (windowSettings, urlFormat) => {
    const nodeEnableObj = {
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    }
     const nw = new BrowserWindow(_.assign(nodeEnableObj,windowSettings))
     nw.loadURL(url.format(urlFormat))
     return nw
}
const _newProductWindow = () => {
    var windowSettings = {
        width: 400,
        height: 350,
        title: 'Add new Product'
    }
    var urlFormat = {
        pathname: path.join(__dirname, 'views', 'new product.html'),
        protocolo: 'file',
        slashes: true
    }
    newProductWindow = newWindow(windowSettings, urlFormat)
}

app.on('ready', () => {
    const mainWindowUrlFormat = {
        pathname: path.join(__dirname, 'views', 'index.html'),
        protocol: 'file',
        slashes: true
    }
    mainWindow = newWindow({},mainWindowUrlFormat)
    const mainMenu = Menu.buildFromTemplate(templateMenu)
    
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed', () => {
        app.quit();
    })
})

ipcMain.on('product:new',(event,product) => {
    mainWindow.webContents.send('product:new',product)
    newProductWindow.close()
})