# JHON — Men's Wear

Sitio web estático con ocho páginas HTML, CSS y JavaScript. Compatible con GitHub Pages. No requiere Node, bases de datos ni compilación.

## Páginas
- index.html — Inicio
- coleccion.html — Colección (filtros funcionales)
- estilo.html — Guía de estilo
- nosotros.html — Nosotros
- valores.html — Valores
- experiencia.html — Experiencia
- ubicacion.html — Ubicación
- contacto.html — Contacto (formulario para preparar correo)

## Personaliza antes de publicar
1. Cambia la dirección de contacto `contacto@ejemplo.com` en `js/main.js` por un correo real de la marca; hasta entonces el formulario NO abrirá el cliente de correo para evitar usar un destinatario ficticio.
2. Completa los datos reales de localización y horarios en `ubicacion.html`.
3. Sustituye las fotografías editoriales externas de Unsplash por fotografías propias autorizadas cuando las tengas; las imágenes son referenciales, no catálogo real.
4. Modifica textos y nombres de categorías para que correspondan a tu negocio.

## Publica en GitHub Pages
1. Crea un repositorio (por ejemplo, `jhon-web`).
2. Sube TODO el contenido de esta carpeta a la raíz del repositorio, conservando `css/` y `js/`.
3. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Tu URL suele ser `https://USUARIO.github.io/jhon-web/` (dependiendo del nombre y configuración de tu repositorio).

Abre `index.html` en tu navegador para probar localmente. Todas las rutas son relativas y funcionan en GitHub Pages.

Colores editables al principio de `css/styles.css`: `--ink`, `--paper`, `--accent`.
Tipografías: Manrope + DM Sans (requieren internet para cargarse desde Google Fonts).
