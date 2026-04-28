const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// Limpiar dist anterior
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST);

// Copiar archivos del proyecto (excluir node_modules, .git, dist, scripts)
const EXCLUDE = new Set(["node_modules", ".git", "dist", "scripts"]);
for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (EXCLUDE.has(entry.name)) continue;
  const s = path.join(ROOT, entry.name);
  const d = path.join(DIST, entry.name);
  entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
}

// Copiar solo los paquetes necesarios de node_modules
const PACKAGES = ["bootstrap", "bootstrap-icons", "jquery", "@popperjs"];
for (const pkg of PACKAGES) {
  const src = path.join(ROOT, "node_modules", pkg);
  const dest = path.join(DIST, "node_modules", pkg);
  if (fs.existsSync(src)) {
    copyDir(src, dest);
    console.log(`  copiado: node_modules/${pkg}`);
  }
}

console.log("\nBuild listo en dist/");
