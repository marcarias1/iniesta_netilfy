# PedaGoGo

Web estática en español de una asociación independiente y sin ánimo de lucro de profesionales de la pedagogía. Astro 7, Tailwind CSS 4 y Decap CMS. Sin publicidad ni analítica. Fuentes e ilustraciones servidas localmente.

## Desarrollo

Requiere Node.js 22.22 o posterior compatible con Astro.

```sh
npm ci
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run check
npm run build
npm run preview
```

Astro genera cinco páginas informativas en `dist/`, además de las páginas de los artículos que se publiquen desde el CMS. No se incluyen artículos de ejemplo. El catálogo muestra un aviso cuando aún no hay publicaciones y la portada muestra los últimos artículos solo si existen. El buscador usa JavaScript nativo; los artículos y las FAQ pueden leerse sin JavaScript.

## Contenido y edición

- Artículos Markdown: `src/content/articulos/`.
- Esquema Zod: `src/content/config.ts`; registro moderno de Astro: `src/content.config.ts`.
- Imágenes: `public/uploads/`, accesibles en `/uploads/`.
- Editor: `/admin/` en Netlify; en desarrollo, abre `/admin/index.html`.

El título se puede cambiar libremente en Decap. Las rutas se basan en el nombre del archivo: cambiar un título no rompe un enlace existente. La fecha principal debe ser una fecha YAML sin comillas (`date: 2026-10-19`); `externalLinks.fechaConsulta` es una cadena entre comillas (`fechaConsulta: "2026-10-19"`). El formateador del editor preserva esta distinción al guardar. Los recursos externos muestran su URL, descripción y fecha de consulta; esta última no garantiza disponibilidad futura. Actualízala solo tras revisar el recurso.

## Publicar en Netlify

1. En Netlify, selecciona **Add new project → Import an existing project → GitHub** y autoriza el repositorio `marcarias1/iniesta_netilfy`.
2. Selecciona la rama `main`, comando `npm run build` y directorio de publicación `dist`. `netlify.toml` ya configura estos valores y Node; no necesitas subir `dist` a Git ni habilitar Forms.
3. Publica el sitio y comprueba Inicio, Contacto, FAQ y `/admin/`.

### Dar acceso al CMS por invitación

La configuración actual usa Decap con `git-gateway`. Las personas editoras no necesitan cuenta de GitHub ni pertenecer al equipo de Netlify.

1. En el proyecto de Netlify, abre **Integrations → Identity → Netlify Identity**, habilita el servicio y entra en su configuración. Según la versión del panel, puede aparecer directamente como **Identity**.
2. En **Identity → Registration → Registration preferences**, selecciona **Invite only**. No uses **Open**: con la configuración actual cualquier usuario registrado tendría acceso editorial.
3. En **Identity → Services → Git Gateway**, pulsa **Enable Git Gateway** y autoriza el repositorio. Deja **Roles** vacío para que todas las personas invitadas puedan editar, publicar y eliminar artículos.
4. En **Identity → Users**, selecciona **Invite users** e introduce el correo de cada persona a la que quieras dar acceso, incluido el tuyo.
5. Cada persona abre su invitación, establece su contraseña y accede a `https://TU-SITIO.netlify.app/admin/`. La web incluye el widget necesario para aceptar invitaciones y redirigir al editor.
6. Publica un primer artículo desde el editor y comprueba que aparece en GitHub y se completa el nuevo despliegue de Netlify. Si Netlify lo marca como un despliegue de una persona no autorizada, el propietario del equipo debe aprobarlo y revisar la política de despliegues.

No compartas cuentas, contraseñas ni tokens. Para retirar el acceso a alguien, elimina su usuario en Identity.

**Estado del servicio:** Netlify marca [Git Gateway como obsoleto](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/) y desaconseja configuraciones nuevas. La documentación todavía describe cómo habilitarlo; los sitios que ya lo tienen activo siguen funcionando. Si tu panel no permite habilitarlo, no basta con invitar usuarios: será necesario cambiar el backend de Decap antes de poder publicar. No se ha cambiado el sistema de autenticación de este proyecto.

Documentación: [registro e invitaciones de Identity](https://docs.netlify.com/manage/security/secure-access-to-sites/identity/registration-login/) y [configuración de Decap en Netlify](https://decapcms.org/docs/choosing-a-backend/).

Contacto muestra únicamente enlaces directos al correo electrónico, Instagram y teléfono de la asociación. No hay formulario, chatbot ni recogida de consultas dentro de la web.

La administración carga Decap CMS y js-yaml desde CDN, además de Netlify Identity. La web pública carga el widget de Identity para gestionar invitaciones y recuperación de acceso. El acceso editorial real y la publicación Git requieren configurar el sitio de Netlify: no se simulan localmente.
