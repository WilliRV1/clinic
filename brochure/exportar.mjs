// Genera Presentacion_CP_Smile_Clinic.pdf a partir de presentacion.html.
// Uso (desde la raíz del repo clinic):
//   node brochure/exportar.mjs                 -> solo el PDF
//   node brochure/exportar.mjs --capturas DIR  -> además un PNG por diapositiva en DIR
// Requiere Playwright (local o global) y la fuente Inter instalada en el sistema.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
}

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(path.join(dir, 'presentacion.html')).href;
const pdf = path.join(dir, 'Presentacion_CP_Smile_Clinic.pdf');
const i = process.argv.indexOf('--capturas');
const capturas = i > -1 ? path.resolve(process.argv[i + 1]) : null;

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const rotas = await page.evaluate(() => [...document.images].filter((im) => !im.naturalWidth).map((im) => im.src));
if (rotas.length) {
  console.error('Imágenes que no cargaron:\n' + rotas.join('\n'));
  process.exit(1);
}

await page.pdf({ path: pdf, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
console.log('PDF:', pdf);

if (capturas) {
  mkdirSync(capturas, { recursive: true });
  const slides = await page.locator('.slide').all();
  for (const [n, slide] of slides.entries()) {
    const out = path.join(capturas, String(n + 1).padStart(2, '0') + '.png');
    await slide.screenshot({ path: out });
  }
  console.log(`${slides.length} capturas en`, capturas);
}
await browser.close();
