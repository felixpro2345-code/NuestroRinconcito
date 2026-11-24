# Para ti 💛

Página interactiva con cartas, rompecabezas de fotos, memoria, acertijos, audios, videos y razones.
No necesita instalar nada: es HTML/CSS/JS puro, ideal para GitHub Pages.

## Personalizar
Edita **`config.js`** (nombre, fechas, mensajes, cartas, razones, premios) y **`acertijos.js`** (los 60 acertijos por temas), y coloca tus archivos:

```
media/fotos/foto1.jpeg ... foto45.jpeg
media/audios/mensaje1.mp3, cancion.mp3
media/videos/recuerdo.mp4
```
Si falta una foto, se muestra una imagen de relleno.

## Probar en tu PC
```
npx serve .
```
(o abre `index.html` con la extensión Live Server de VS Code).

## Publicar en GitHub Pages
1. Sube el proyecto a un repositorio (puede ser público; ojo con las fotos privadas).
2. En GitHub: **Settings → Pages → Deploy from a branch → main / (root)**.
3. Tu link será `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

## Videos con Remotion
Crea tus videos en tu proyecto Remotion (`my-video`) y renderízalos:
```
npx remotion render src/index.ts MiComposicion media/videos/recuerdo.mp4
```
Luego copia el `.mp4` a `media/videos/` y agrégalo en `config.js`.
Tip: mantén cada video bajo ~50 MB (GitHub rechaza archivos de más de 100 MB).

> Privacidad: el repo público expone las fotos. Si prefieres, hazlo privado y usa GitHub Pages con un plan que lo permita, o comparte solo fotos que no te incomoden públicas.