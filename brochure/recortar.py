"""Quita el fondo blanco de estudio a las fotos del Dr. Prado.

Uso: python3 brochure/recortar.py   (desde la raíz del repo clinic)
Genera PNG con transparencia en brochure/img/.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
FOTOS = [
    # (foto original, archivo de salida, recorte inferior en px de la original)
    ("public/doctor/IMG_0576rojo.jpg", "dr-prado-traje.png", 2000),
    ("public/doctor/IMG_0694rojo.jpg", "dr-prado-uniforme.png", None),
]
ESCALA = 3          # el relleno se calcula a 1/3 de resolución
ALTO_MAX = 1500     # alto final de la imagen recortada


def es_fondo(rgb):
    mn, mx = rgb.min(2), rgb.max(2)
    return (mn > 195) & ((mx - mn) < 30)


def rellenar_desde_bordes(cand):
    m = np.zeros_like(cand)
    m[0], m[-1], m[:, 0], m[:, -1] = cand[0], cand[-1], cand[:, 0], cand[:, -1]
    while True:
        d = m.copy()
        d[1:] |= m[:-1]; d[:-1] |= m[1:]; d[:, 1:] |= m[:, :-1]; d[:, :-1] |= m[:, 1:]
        d &= cand
        if (d == m).all():
            return m
        m = d


def huecos_claros(cand, fondo, rgb, umbral=240):
    """Huecos encerrados (entre brazo y torso) que son fondo blanco puro, no la camisa."""
    resto = cand & ~fondo
    visto = np.zeros_like(resto)
    salida = np.zeros_like(resto)
    alto, ancho = resto.shape
    for y0, x0 in zip(*np.nonzero(resto)):
        if visto[y0, x0]:
            continue
        pila, pts = [(y0, x0)], []
        visto[y0, x0] = True
        while pila:
            y, x = pila.pop()
            pts.append((y, x))
            for yy, xx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= yy < alto and 0 <= xx < ancho and resto[yy, xx] and not visto[yy, xx]:
                    visto[yy, xx] = True
                    pila.append((yy, xx))
        p = np.array(pts)
        if len(p) > 300 and rgb[p[:, 0], p[:, 1]].min(1).mean() > umbral:
            salida[p[:, 0], p[:, 1]] = True
    return salida


def dilatar(m, veces):
    m = m.copy()
    for _ in range(veces):
        d = m.copy()
        d[1:] |= m[:-1]; d[:-1] |= m[1:]; d[:, 1:] |= m[:, :-1]; d[:, :-1] |= m[:, 1:]
        m = d
    return m


def recortar(origen, destino, corte):
    im = Image.open(RAIZ / origen).convert("RGB")
    if corte:
        im = im.crop((0, 0, im.width, corte))
    ancho, alto = im.size
    peq = np.asarray(im.resize((ancho // ESCALA, alto // ESCALA), Image.BILINEAR)).astype(np.int16)
    cand = es_fondo(peq)
    fondo = rellenar_desde_bordes(cand)
    fondo |= huecos_claros(cand, fondo, peq)

    # a resolución completa: franja alrededor del borde con alfa por distancia al blanco
    fondo_full = np.asarray(Image.fromarray(fondo).resize((ancho, alto), Image.NEAREST))
    franja = dilatar(fondo_full, 6) & dilatar(~fondo_full, 6)
    c = np.asarray(im).astype(np.float32)
    claro = c.min(2)
    a = np.where(fondo_full, 0.0, 1.0)
    a_borde = np.clip((248 - claro) / 70, 0, 1)
    a = np.where(franja, a_borde, a)
    a = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))) / 255

    # separa el color del sujeto del blanco del fondo en los bordes
    seguro = np.maximum(a, 1e-3)[..., None]
    f = np.clip((c - (1 - a[..., None]) * 255) / seguro, 0, 255)
    f = np.where(a[..., None] > 0.98, c, f)

    rgba = np.dstack([f, a * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    out = out.crop(out.getbbox())
    if out.height > ALTO_MAX:
        out = out.resize((round(out.width * ALTO_MAX / out.height), ALTO_MAX), Image.LANCZOS)
    out.save(RAIZ / "brochure" / "img" / destino, optimize=True)
    print(destino, out.size)


if __name__ == "__main__":
    for origen, destino, corte in FOTOS:
        recortar(origen, destino, corte)
