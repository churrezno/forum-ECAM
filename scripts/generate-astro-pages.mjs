import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const pagesDir = path.join(srcDir, 'pages');
const legacyDir = path.join(srcDir, 'legacy');
const legacyPageComponentPath = path.join(srcDir, 'components', 'LegacyPage.astro');

const pageConfigs = [
  { html: 'index.html', page: 'index.astro', pageId: 'home', footerLocale: 'es', componentSections: ['news', 'video', 'sponsors'] },
  { html: 'forum-2024.html', page: 'forum-2024.astro', pageId: 'forum-2024', footerLocale: 'es', componentSections: ['projects', 'video', 'sponsors'] },
  { html: 'forum-2025.html', page: 'forum-2025.astro', pageId: 'forum-2025', footerLocale: 'es', componentSections: ['projects', 'video', 'sponsors'] },
  { html: 'noticias.html', page: 'noticias.astro', pageId: 'news', footerLocale: 'es', componentSections: ['news'] },
  { html: 'actividades.html', page: 'actividades.astro', pageId: 'activities', footerLocale: 'es', componentSections: ['seminars'] },
  { html: 'politica-privacidad.html', page: 'politica-privacidad.astro', pageId: 'legal', footerLocale: 'es' },
  { html: 'politica-cookies.html', page: 'politica-cookies.astro', pageId: 'legal', footerLocale: 'es' },
  { html: 'en/index.html', page: 'en/index.astro', pageId: 'home', footerLocale: 'en', componentSections: ['news', 'video', 'sponsors'] },
  { html: 'en/forum-2024.html', page: 'en/forum-2024.astro', pageId: 'forum-2024', footerLocale: 'en', componentSections: ['projects', 'video', 'sponsors'] },
  { html: 'en/forum-2025.html', page: 'en/forum-2025.astro', pageId: 'forum-2025', footerLocale: 'en', componentSections: ['projects', 'video', 'sponsors'] },
  { html: 'en/news.html', page: 'en/news.astro', pageId: 'news', footerLocale: 'es', componentSections: ['news'] },
];

const routeByHtml = {
  'index.html': '/',
  'forum-2024.html': '/forum-2024',
  'forum-2025.html': '/forum-2025',
  'noticias.html': '/noticias',
  'actividades.html': '/actividades',
  'politica-privacidad.html': '/politica-privacidad',
  'politica-cookies.html': '/politica-cookies',
  'en/index.html': '/en/',
  'en/forum-2024.html': '/en/forum-2024',
  'en/forum-2025.html': '/en/forum-2025',
  'en/news.html': '/en/news',
};

const counterpartRouteByHtml = {
  'index.html': '/en/',
  'forum-2024.html': '/en/forum-2024',
  'forum-2025.html': '/en/forum-2025',
  'noticias.html': '/en/news',
  'actividades.html': '/en/',
  'politica-privacidad.html': '/en/',
  'politica-cookies.html': '/en/',
  'en/index.html': '/',
  'en/forum-2024.html': '/forum-2024',
  'en/forum-2025.html': '/forum-2025',
  'en/news.html': '/noticias',
};

const extract = (source, pattern, fallback = '') => {
  const match = source.match(pattern);
  return match?.[1]?.trim() ?? fallback;
};

const normalizeBody = (body) =>
  body
    .replace(/^\s+|\s+$/g, '')
    .replace(/≤>/g, '>');

const toAbsolutePath = (value) => {
  const normalized = value.replace(/^(\.\/|\.\.\/)+/, '');
  return `/${normalized}`.replace(/\/+/g, '/');
};

const resolveRelativeHref = (value, isEnglishPage) => {
  if (
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('//') ||
    value.startsWith('/')
  ) {
    return value;
  }

  if (value.startsWith('../')) {
    return toAbsolutePath(value);
  }

  if (value.startsWith('./')) {
    const rest = value.slice(2);
    const prefix = isEnglishPage ? '/en/' : '/';

    if (!rest || rest === 'index') {
      return prefix;
    }

    if (rest.startsWith('#')) {
      return `${prefix}${rest}`;
    }

    return `${prefix}${rest}`.replace(/\/+/g, '/');
  }

  return isEnglishPage ? `/en/${value}`.replace(/\/+/g, '/') : `/${value}`.replace(/\/+/g, '/');
};

const rewriteBodyPaths = (body, isEnglishPage) => {
  let nextBody = body.replace(
    /\b(src|href)=(["'])((?:\.\/|\.\.\/)+(?:images|pdf|vendor|fonts|fontawesome)\/[^"']+)\2/g,
    (_match, attr, quote, value) => `${attr}=${quote}${toAbsolutePath(value)}${quote}`,
  );

  nextBody = nextBody.replace(
    /\bhref=(["'])(\/?\.{0,2}\/?[^"'?#]*?)\.html((?:[?#][^"']*)?)\1/g,
    (match, quote, hrefBase, suffix) => {
      if (/\.pdf$/i.test(hrefBase) || /^https?:/i.test(hrefBase) || hrefBase.startsWith('//')) {
        return match;
      }

      let nextHref = `${hrefBase}${suffix}`;

      if (nextHref === '/index') nextHref = '/';
      else if (nextHref === '/en') nextHref = '/en/';
      else nextHref = resolveRelativeHref(nextHref, isEnglishPage);

      return `href=${quote}${nextHref}${quote}`;
    },
  );

  nextBody = nextBody.replace(
    /\bhref=(["'])(?:\.\/|\.\.\/)+(#(?:finde|proyectos))\1/g,
    (_match, quote, hash) => `href=${quote}${isEnglishPage ? `/en/${hash}` : `/${hash}`}${quote}`,
  );
  nextBody = nextBody.replace(/\bhref=(["'])\.\/\1/g, (_match, quote) => `href=${quote}${isEnglishPage ? '/en/' : '/'}${quote}`);
  nextBody = nextBody.replace(/\bhref=(["'])\.\.\/\1/g, (_match, quote) => `href=${quote}/${quote}`);
  nextBody = nextBody.replace(/\bhref=(["'])\/en\1/g, 'href="/en/"');
  nextBody = nextBody.replace(/\bhref=(["'])\/en#([^"']+)\1/g, 'href="/en/#$2"');
  nextBody = nextBody.replace(
    /\bhref=(["'])((?:\.\/|\.\.\/)+[^"'#][^"']*)\1/g,
    (match, quote, value) => {
      return `href=${quote}${resolveRelativeHref(value, isEnglishPage)}${quote}`;
    },
  );

  return nextBody;
};

const splitBodyChrome = (body) => {
  const withoutHeader = body.replace(/^\s*<header>[\s\S]*?<\/header>\s*/i, '');
  const footerMatch = withoutHeader.match(/([\s\S]*?)<footer>[\s\S]*?<\/footer>([\s\S]*)$/i);

  if (!footerMatch) {
    return {
      bodyHtml: withoutHeader.trim(),
      afterFooterHtml: '',
    };
  }

  return {
    bodyHtml: footerMatch[1].trim(),
    afterFooterHtml: footerMatch[2].trim(),
  };
};

const escapeHtmlAttribute = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const replaceYouTubeEmbeds = (html, lang) =>
  html.replace(
    /<iframe\b([^>]*?)\bsrc=(["'])(https:\/\/www\.youtube-nocookie\.com\/embed\/[^"']+)\2([^>]*)><\/iframe>/gi,
    (_match, beforeSrc, _quote, src, afterSrc) => {
      const titleMatch = `${beforeSrc} ${afterSrc}`.match(/\btitle=(["'])([^"']*)\1/i);
      const allowMatch = `${beforeSrc} ${afterSrc}`.match(/\ballow=(["'])([^"']*)\1/i);
      const referrerPolicyMatch = `${beforeSrc} ${afterSrc}`.match(/\breferrerpolicy=(["'])([^"']*)\1/i);
      const title = titleMatch?.[2] ?? (lang === 'en' ? 'YouTube video player' : 'Reproductor de YouTube');
      const allow = allowMatch?.[2] ?? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      const referrerPolicy = referrerPolicyMatch?.[2] ?? 'strict-origin-when-cross-origin';
      const message =
        lang === 'en'
          ? 'To watch this video, accept marketing cookies and then click "Load video".'
          : 'Para ver este vídeo, acepta las cookies de marketing y después pulsa "Cargar vídeo".';
      const pendingMessage =
        lang === 'en'
          ? 'Accept marketing cookies in the banner to continue loading this video.'
          : 'Acepta las cookies de marketing en el banner para terminar de cargar este vídeo.';
      const loadLabel = lang === 'en' ? 'Load video' : 'Cargar vídeo';
      const settingsLabel = lang === 'en' ? 'Cookie settings' : 'Configurar cookies';

      return `<div class="youtube-consent-embed" data-youtube-embed data-src="${escapeHtmlAttribute(src)}" data-title="${escapeHtmlAttribute(title)}" data-allow="${escapeHtmlAttribute(allow)}" data-referrerpolicy="${escapeHtmlAttribute(referrerPolicy)}" data-message="${escapeHtmlAttribute(message)}" data-pending-message="${escapeHtmlAttribute(pendingMessage)}">
  <div class="youtube-consent-card">
    <div class="youtube-consent-poster" aria-hidden="true">
      <span class="youtube-consent-play"></span>
    </div>
    <p class="youtube-consent-message">${message}</p>
    <div class="youtube-consent-actions">
      <button type="button" class="btn btn-border btn-border-azul youtube-consent-load">${loadLabel}</button>
      <button type="button" class="btn btn-border btn-border-azul youtube-consent-settings">${settingsLabel}</button>
    </div>
  </div>
</div>`;
    },
  );

const removeBlockBetween = (source, startMarker, endMarkers) => {
  const startIndex = source.indexOf(startMarker);

  if (startIndex === -1) {
    return source;
  }

  const endIndex = endMarkers
    .map((marker) => source.indexOf(marker, startIndex + startMarker.length))
    .filter((index) => index !== -1)
    .sort((left, right) => left - right)[0] ?? source.length;

  return `${source.slice(0, startIndex)}${source.slice(endIndex)}`.trim();
};

const sanitizeAfterFooterHtml = (html) => {
  let sanitized = html;

  sanitized = removeBlockBetween(
    sanitized,
    '<div class="modal fade" id="modalProyecto"',
    [
      '<div class="modal fade" id="modalSeminario"',
      '<div class="modal fade" id="modalNoticia"',
      '<script src="https://code.jquery.com/jquery-3.6.0.min.js"',
    ],
  );

  sanitized = removeBlockBetween(
    sanitized,
    '<div class="modal fade" id="modalNoticia"',
    [
      '<div class="modal fade" id="modalSeminario"',
      '<script src="https://code.jquery.com/jquery-3.6.0.min.js"',
    ],
  );

  sanitized = removeBlockBetween(
    sanitized,
    '<div class="modal fade" id="modalSeminario"',
    [
      '<script src="https://code.jquery.com/jquery-3.6.0.min.js"',
    ],
  );

  sanitized = sanitized.replace(/\s*<!-- Modals -->/gi, '').trim();
  sanitized = sanitized.replace(/\s*<script src="https:\/\/code\.jquery\.com\/jquery-3\.6\.0\.min\.js"[\s\S]*?<\/script>/i, '').trim();

  return sanitized;
};

const sectionPatternByName = {
  news: /<section id="news"[\s\S]*?<\/section>/i,
  projects: /<section id="proyectos"[\s\S]*?<\/section>/i,
  video: /<section id="video"[\s\S]*?<\/section>/i,
  sponsors: /<section id="patrocinadores"[\s\S]*?<\/section>/i,
  seminars: /<section id="seminarios"[\s\S]*?<\/section>/i,
};

const splitContentSegments = (bodyHtml, componentSections = []) => {
  const matches = componentSections
    .map((sectionName) => {
      const pattern = sectionPatternByName[sectionName];
      const match = pattern ? bodyHtml.match(pattern) : null;

      if (!pattern || !match || match.index === undefined) {
        return null;
      }

      return {
        type: 'section',
        name: sectionName,
        start: match.index,
        end: match.index + match[0].length,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.start - right.start);

  const segments = [];
  let cursor = 0;

  for (const match of matches) {
    const rawHtml = bodyHtml.slice(cursor, match.start).trim();
    if (rawHtml) {
      segments.push({ type: 'html', html: rawHtml });
    }

    segments.push({ type: 'section', name: match.name });
    cursor = match.end;
  }

  const tailHtml = bodyHtml.slice(cursor).trim();
  if (tailHtml) {
    segments.push({ type: 'html', html: tailHtml });
  }

  if (!segments.length && bodyHtml.trim()) {
    segments.push({ type: 'html', html: bodyHtml.trim() });
  }

  return segments;
};

const componentConfigBySection = {
  projects: {
    name: 'ProjectsSection',
    path: path.join(srcDir, 'components', 'ProjectsSection.astro'),
    render: ({ lang, pageId }) => `<ProjectsSection lang={${JSON.stringify(lang)}} pageId={${JSON.stringify(pageId)}} />`,
  },
  news: {
    name: 'NewsSection',
    path: path.join(srcDir, 'components', 'NewsSection.astro'),
    render: ({ lang, pageId }) => `<NewsSection lang={${JSON.stringify(lang)}} pageId={${JSON.stringify(pageId)}} />`,
  },
  video: {
    name: 'VideoSection',
    path: path.join(srcDir, 'components', 'VideoSection.astro'),
    render: ({ lang, pageId }) => `<VideoSection lang={${JSON.stringify(lang)}} pageId={${JSON.stringify(pageId)}} />`,
  },
  sponsors: {
    name: 'SponsorsSection',
    path: path.join(srcDir, 'components', 'SponsorsSection.astro'),
    render: ({ lang }) => `<SponsorsSection lang={${JSON.stringify(lang)}} />`,
  },
  seminars: {
    name: 'SeminarsSection',
    path: path.join(srcDir, 'components', 'SeminarsSection.astro'),
    render: ({ lang }) => `<SeminarsSection lang={${JSON.stringify(lang)}} />`,
  },
};

const toAstroTemplateLiteral = (value) =>
  `\`${value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')}\``;

await fs.mkdir(pagesDir, { recursive: true });
await fs.rm(legacyDir, { recursive: true, force: true });

for (const config of pageConfigs) {
  const inputPath = path.join(srcDir, config.html);
  const source = await fs.readFile(inputPath, 'utf8');

  const title = extract(source, /<title>\s*([\s\S]*?)\s*<\/title>/i, 'ECAM Forum 2025');
  const lang = config.html.startsWith('en/') ? 'en' : extract(source, /<html lang="([^"]+)"/i, 'es');
  const description = extract(source, /<meta name="description" content="([^"]*)"/i, 'Forum 2025');
  const ogTitle = extract(source, /<meta property="og:title" content="([^"]*)"/i, 'ECAM Forum');
  const ogDescription = extract(source, /<meta property="og:description" content="([^"]*)"/i, '2025');
  const ogUrl = extract(source, /<meta property="og:url" content="([^"]*)"/i, 'https://ecamforum.es/');
  const ogImage = extract(source, /<meta property="og:image" content="([^"]*)"/i, 'https://ecamforum.es/images/forum-share.jpg');
  const isEnglishPage = config.html.startsWith('en/');
  const currentRoute = routeByHtml[config.html];
  const counterpartRoute = counterpartRouteByHtml[config.html];
  const rewrittenBody = rewriteBodyPaths(normalizeBody(extract(source, /<body>([\s\S]*?)<\/body>/i)), isEnglishPage);
  const bodyWithProtectedYouTube = replaceYouTubeEmbeds(rewrittenBody, lang);
  const { bodyHtml, afterFooterHtml } = splitBodyChrome(bodyWithProtectedYouTube);
  const contentSegments = splitContentSegments(bodyHtml, config.componentSections);
  const modalFlags = {
    hasLegacyProjectModal: config.pageId === 'forum-2024',
    hasProject2025Modal: config.pageId === 'forum-2025',
    hasNewsModal: config.pageId === 'home' || config.pageId === 'news',
    hasSeminarModal: /data-seminar=/.test(bodyWithProtectedYouTube),
  };
  const sanitizedAfterFooterHtml = sanitizeAfterFooterHtml(afterFooterHtml);
  const loadLegacyInteractive = /data-project=|data-seminar=/.test(bodyWithProtectedYouTube);
  const loadModernInteractive = /data-project-2025=|data-news=/.test(bodyWithProtectedYouTube);

  const astroPagePath = path.join(pagesDir, config.page);
  const relativeComponent = path
    .relative(path.dirname(astroPagePath), legacyPageComponentPath)
    .replace(/\\/g, '/');

  await fs.mkdir(path.dirname(astroPagePath), { recursive: true });
  const htmlConstants = [];
  const contentPartMarkup = [];
  const componentImports = new Map();
  let htmlSegmentIndex = 0;

  for (const segment of contentSegments) {
    if (segment.type === 'html') {
      const bindingName = `segment${htmlSegmentIndex}Html`;

      htmlConstants.push(`const ${bindingName} = ${toAstroTemplateLiteral(segment.html)};`);
      contentPartMarkup.push(`  <Fragment set:html={${bindingName}} />`);
      htmlSegmentIndex += 1;
      continue;
    }

    const componentConfig = componentConfigBySection[segment.name];
    if (!componentConfig) {
      continue;
    }

    componentImports.set(componentConfig.name, componentConfig.path);
    contentPartMarkup.push(`  ${componentConfig.render({ lang, pageId: config.pageId })}`);
  }

  const componentImportLines = [...componentImports.entries()].map(([componentName, componentPath]) => {
    const relativeImport = path
      .relative(path.dirname(astroPagePath), componentPath)
      .replace(/\\/g, '/');
    return `import ${componentName} from '${relativeImport}';`;
  });

  const astroSource = `---
import LegacyPage from '${relativeComponent}';
${componentImportLines.join('\n')}

${htmlConstants.join('\n\n')}
const afterFooterHtml = ${toAstroTemplateLiteral(sanitizedAfterFooterHtml)};
---

<LegacyPage
  title=${JSON.stringify(title)}
  lang=${JSON.stringify(lang)}
  description=${JSON.stringify(description)}
  ogTitle=${JSON.stringify(ogTitle)}
  ogDescription=${JSON.stringify(ogDescription)}
  ogUrl=${JSON.stringify(ogUrl)}
  ogImage=${JSON.stringify(ogImage)}
  loadLegacyInteractive={${loadLegacyInteractive}}
  loadModernInteractive={${loadModernInteractive}}
  pageId=${JSON.stringify(config.pageId)}
  currentRoute=${JSON.stringify(currentRoute)}
  counterpartRoute=${JSON.stringify(counterpartRoute)}
  footerLocale=${JSON.stringify(config.footerLocale)}
  hasLegacyProjectModal={${modalFlags.hasLegacyProjectModal}}
  hasProject2025Modal={${modalFlags.hasProject2025Modal}}
  hasNewsModal={${modalFlags.hasNewsModal}}
  hasSeminarModal={${modalFlags.hasSeminarModal}}
  afterFooterHtml={afterFooterHtml}
>
${contentPartMarkup.join('\n')}
</LegacyPage>
`;

  await fs.writeFile(astroPagePath, astroSource);
}
