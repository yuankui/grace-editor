const path = require('path');
const {app, BrowserWindow, Menu} = require('electron');
const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {

    const options = {
        //https://electronjs.org/docs/api/frameless-window#%E5%8F%AF%E6%8B%96%E6%8B%BD%E5%8C%BA
        titleBarStyle: "hidden",
        minWidth: 1200,
        width: 1200,
        height: 700,
        minHeight: 700,
        icon: path.join(app.getAppPath(), '/asserts/256x256.png'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
        frame: false,
    };

    console.log('__dirname', __dirname);
    console.log('__dirname', app.getAppPath());
    console.log(JSON.stringify(options));

    const window = new BrowserWindow(options);
    const isMac = true;
    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: app.name,
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        }] : []),
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
    ];

    const menu = Menu.buildFromTemplate(template);
//    Menu.setApplicationMenu(menu);

    if (isDevelopment) {
        window.loadURL(`http://localhost:8089`);
    } else {
        window.loadFile("build/index.html");
    }

    window.on('closed', () => {
        mainWindow = null
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus()
        })
    });

    return window
}


// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    if (isDevelopment && require('os').platform() != 'win32') {
        installPlugins();
    }
    mainWindow = createMainWindow();
});

/**
 * refer: https://electronjs.org/docs/tutorial/devtools-extension
 */
function installPlugins() {
    const plugins = [
        'fmkadmapgofadopljbjfkapdkoienihi', // react
        'lmhkpmbekcpmknklioeibfkpmmfibljd', // redux
    ];

    const paths = plugins.map(id => {
        const home = process.env['HOME'];
        return childLatest(`${home}/Library/Application Support/Google/Chrome/Default/Extensions/${id}`);
    })
        .filter(p => p != null);

    console.log(paths);
    for (let plugin of paths) {
        BrowserWindow.addDevToolsExtension(plugin);
    }
}

function childLatest(dir) {
    const fs = require('fs');
    const path = require('path');
    try {
        const children = fs.readdirSync(dir);
        const latest = children.sort().reverse()[0];
        return path.join(dir, latest);
    } catch (e) {
        return null;
    }
}
