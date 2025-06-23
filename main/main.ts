import { app, BrowserWindow } from "electron";
import { createServer } from "http";
import next from "next";
import path from "path";
import { spawn } from "child_process";

let mainWindow: BrowserWindow;

/* ---------- util ---------- */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: { nodeIntegration: false },
  });
  mainWindow.loadURL("http://localhost:3000");
}

/* ---------- dev ou produção? ---------- */
const isDev = !app.isPackaged; // true quando roda `electron .`, false dentro do .exe

/* ---------- fluxo DEV (hot-reload) ---------- */
if (isDev) {
  app.whenReady().then(() => {
    const dev = spawn("npm", ["run", "dev"], {
      cwd: path.join(__dirname, ".."), // raiz do projeto
      shell: true,
      env: { ...process.env, PORT: "3000" },
    });

    dev.stdout.on("data", (d) => {
      console.log("[next] " + d.toString());
      if (d.toString().includes("started server")) createWindow();
    });

    dev.stderr.on("data", (d) => console.error("[next:err]", d.toString()));
  });
}

/* ---------- fluxo PRODUÇÃO (app empacotado) ---------- */
else {
  app.whenReady().then(async () => {
    // pasta onde está o .exe/app.asar => …\resources
    const resources = process.resourcesPath;

    // Arquivos do Next gerados em build (use `next build && next export` ou standalone)
    const nextDir = path.join(resources, "app.asar"); // raiz do bundle
    const appNext = next({
      dev: false,
      dir: nextDir, // contém .next
      conf: {
        distDir: ".next",
        // opcional: outras configs
      },
    });

    const handle = appNext.getRequestHandler();
    await appNext.prepare();

    createServer((req, res) => handle(req, res)).listen(3000, () => {
      console.log("> Next ready on http://localhost:3000");
      createWindow();
    });
  });
}
