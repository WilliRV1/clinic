const fs = require('fs');
const path = require('path');

const scriptToInsert = `<script>function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"fcfc55463be8c8678a6e3e1788030993"})});</script>`;

const filesToProcess = [
  "casos-clinicos.html",
  "contacto.html",
  "el-doctor.html",
  "index.html",
  "la-doctora.html",
  "pacientes-internacionales.html",
  "primera-consulta.html",
  "privacidad.html",
  "servicios.html",
  "terminos.html",
  "testimonios.html",
  "en/casos-clinicos.html",
  "en/contacto.html",
  "en/el-doctor.html",
  "en/index.html",
  "en/la-doctora.html",
  "en/pacientes-internacionales.html",
  "en/primera-consulta.html",
  "en/servicios.html",
  "en/testimonios.html"
];

const basePath = __dirname;

let updated = 0;

for (const file of filesToProcess) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the script is already there to avoid duplicates
    if (!content.includes('tracker.metricool.com/resources/be.js')) {
      content = content.replace('</head>', `  ${scriptToInsert}\n</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
      updated++;
    } else {
      console.log(`Skipped (already exists): ${file}`);
    }
  } else {
    console.log(`Not found: ${file}`);
  }
}

console.log(`Total files updated: ${updated}`);
