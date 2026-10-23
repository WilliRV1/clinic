# Presentación institucional C&P Smile Clinic

PDF horizontal 16:9 (11 diapositivas) para presentar la clínica, con la misma estructura del brochure de referencia y la identidad de C&P (azul `#0033CC`, crema `#F2EEE3`, Inter).

- `Presentacion_CP_Smile_Clinic.pdf`: versión con los textos actuales.
- `Presentacion_CP_Smile_Clinic_textos_nuevos.pdf`: versión con los textos reescritos (beneficios para el paciente, llamada a la acción y nota legal en los casos clínicos).
- Los PDF no se suben al repo (el `.gitignore` excluye `*.pdf`); se generan con `exportar.mjs`.
- `presentacion.html`: la fuente. Cada `<section class="slide">` es una diapositiva de 1920×1080. Las fotos salen de `../public/`.
  Los textos que cambian entre versiones están duplicados con las clases `solo-actual` y `solo-nuevo`; el atributo `data-version` de `<html>` decide cuál se muestra.
- `img/`: fotos del Dr. Prado sin fondo, generadas con `recortar.py`, y la foto de la Dra. Dayanna Díaz, extraída de su PDF de presentación con `pdfimages -j -f 2 -l 2`.
- `img/pagos/`: logos de los medios de pago. Mastercard viene de Wikimedia Commons, Visa del paquete `simple-icons` (con el azul actual de la marca, `#1434CB`), Meddipay y Welli de sus sitios web (al logo blanco de Welli se le cambió el color a negro y se le agregó la mascota), y Addi se capturó de los vectores de su página.
- `exportar.mjs`: convierte el HTML en los dos PDF con Playwright (Chromium).

## Regenerar el PDF

Desde la raíz del repo, con la fuente Inter instalada:

```bash
node brochure/exportar.mjs                       # los dos PDF
node brochure/exportar.mjs --capturas /tmp/caps  # además un PNG por diapositiva (en /tmp/caps/actual y /tmp/caps/nuevo)
python3 brochure/recortar.py                     # solo si cambian las fotos del doctor
```

Esta carpeta no forma parte del sitio web: no está en `public/` ni en las entradas de `vite.config.js`.
