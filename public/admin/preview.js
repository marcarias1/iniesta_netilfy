/* global CMS, h */
(() => {
  const dateFormat = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? '' : dateFormat.format(date);
  }

  function ArticlePreview({ entry, getAsset, widgetFor }) {
    const field = (name) => entry.getIn(['data', name]);
    const title = field('title');
    const description = field('description');
    const category = field('category');
    const author = field('author');
    const date = formatDate(field('date'));
    const thumbnail = field('thumbnail');
    const image = thumbnail ? getAsset(thumbnail).toString() : '';
    const body = field('body') || '';
    const minutes = Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
    const links = field('externalLinks')?.toJS() || [];

    return h('div', {},
      h('aside', { className: 'preview-notice' },
        h('strong', {}, 'Vista previa en directo'),
        'Así se verá tu artículo. Los cambios de esta pantalla no se publican hasta que pulses «Publicar».',
      ),
      h('div', { className: 'container preview-brand', 'aria-hidden': true }, 'PedaGoGo.'),
      h('article', { className: 'reading container' },
        h('span', { className: 'back-link' }, '← Todos los artículos'),
        h('header', { className: 'reading-header' },
          category && h('span', { className: 'category' }, category),
          h('h1', {}, title || 'Escribe el título para verlo aquí'),
          description && h('p', { className: 'standfirst' }, description),
          h('div', { className: 'reading-meta' },
            author && h('span', {}, 'Por ', h('strong', {}, author)),
            author && date && h('span', { 'aria-hidden': true }, '·'),
            date && h('time', {}, date),
            body.trim() && h('span', {}, `${minutes} min de lectura`),
          ),
        ),
        image && h('img', { className: 'reading-cover', src: image, alt: '', width: 900, height: 500 }),
        h('div', { className: 'reading-content' },
          body.trim()
            ? h('div', { className: 'prose prose-slate' }, widgetFor('body'))
            : h('p', { className: 'preview-guidance' }, 'Empieza a escribir en «Contenido». Aquí verás el texto con sus títulos, listas, imágenes y enlaces.'),
          links.length > 0 && h('aside', { className: 'external-resources' },
            h('p', { className: 'eyebrow' }, 'Lluminositat · Para seguir explorando'),
            h('h2', {}, 'Recursos y fuentes'),
            h('p', { className: 'resource-note' }, 'La fecha indica cuándo consultamos el recurso, no garantiza que siga disponible ni que su contenido no haya cambiado. Los enlaces se abren en una pestaña nueva.'),
            h('ul', {}, links.map((link, index) => h('li', { key: index },
              h('a', {}, link.title || 'Escribe el título del recurso', ' ↗'),
              h('span', { className: 'resource-url' }, link.url),
              h('small', {}, 'Consultado el ', formatDate(link.fechaConsulta) || 'elige una fecha de consulta'),
            ))),
          ),
          h('aside', { className: 'reading-contact' },
            h('div', {},
              h('h2', {}, 'Seguimos aprendiendo contigo'),
              h('p', {}, '¿Tienes una pregunta o una aportación sobre este artículo?'),
              h('span', { className: 'text-link' }, 'Escríbenos →'),
            ),
          ),
          h('span', { className: 'text-link' }, '← Seguir explorando artículos'),
        ),
      ),
    );
  }

  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewTemplate('articulos', ArticlePreview);
})();
