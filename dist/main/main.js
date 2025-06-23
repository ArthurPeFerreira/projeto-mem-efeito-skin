"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const http_1 = require("http");
const next_1 = __importDefault(require("next"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
let mainWindow;
/* ---------- util ---------- */
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: { nodeIntegration: false },
    });
    mainWindow.loadURL("http://localhost:3000");
}
/* ---------- dev ou produção? ---------- */
const isDev = !electron_1.app.isPackaged; // true quando roda `electron .`, false dentro do .exe
/* ---------- fluxo DEV (hot-reload) ---------- */
if (isDev) {
    electron_1.app.whenReady().then(() => {
        const dev = (0, child_process_1.spawn)("npm", ["run", "dev"], {
            cwd: path_1.default.join(__dirname, ".."), // raiz do projeto
            shell: true,
            env: { ...process.env, PORT: "3000" },
        });
        dev.stdout.on("data", (d) => {
            console.log("[next] " + d.toString());
            if (d.toString().includes("started server"))
                createWindow();
        });
        dev.stderr.on("data", (d) => console.error("[next:err]", d.toString()));
    });
}
/* ---------- fluxo PRODUÇÃO (app empacotado) ---------- */
else {
    electron_1.app.whenReady().then(async () => {
        // pasta onde está o .exe/app.asar => …\resources
        const resources = process.resourcesPath;
        // Arquivos do Next gerados em build (use `next build && next export` ou standalone)
        const nextDir = path_1.default.join(resources, "app.asar"); // raiz do bundle
        const appNext = (0, next_1.default)({
            dev: false,
            dir: nextDir, // contém .next
            conf: {
                distDir: ".next",
                // opcional: outras configs
            },
        });
        const handle = appNext.getRequestHandler();
        await appNext.prepare();
        (0, http_1.createServer)((req, res) => handle(req, res)).listen(3000, () => {
            console.log("> Next ready on http://localhost:3000");
            createWindow();
        });
    });
}
