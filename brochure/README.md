# Presentación institucional C&P Smile Clinic

PDF horizontal 16:9 (10 diapositivas) para presentar la clínica, con la misma estructura del brochure de referencia y la identidad de C&P (azul `#0033CC`, crema `#F2EEE3`, Inter).

- `Presentacion_CP_Smile_Clinic.pdf`: el archivo final. No se sube al repo (el `.gitignore` excluye `*.pdf`); se genera con `exportar.mjs`.
- `presentacion.html`: la fuente. Cada `<section class="slide">` es una diapositiva de 1920×1080. Las fotos salen de `../public/`.
- `img/`: fotos del Dr. Prado sin fondo, generadas con `recortar.py`, y la foto de la Dra. Dayanna Díaz, extraída de su PDF de presentación con `pdfimages -j -f 2 -l 2`.
- `exportar.mjs`: convierte el HTML en PDF con Playwright (Chromium).

## Regenerar el PDF

Desde la raíz del repo, con la fuente Inter instalada:

```bash
node brochure/exportar.mjs                       # solo el PDF
node brochure/exportar.mjs --capturas /tmp/caps  # además un PNG por diapositiva
python3 brochure/recortar.py                     # solo si cambian las fotos del doctor
```

Esta carpeta no forma parte del sitio web: no está en `public/` ni en las entradas de `vite.config.js`.
