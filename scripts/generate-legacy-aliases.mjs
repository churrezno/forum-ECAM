import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const pagesDir = path.join(rootDir, 'src', 'pages');

const aliases = [
  { output: 'forum-2024.html.astro', to: '/forum-2024' },
  { output: 'forum-2025.html.astro', to: '/forum-2025' },
  { output: 'noticias.html.astro', to: '/noticias' },
  { output: 'actividades.html.astro', to: '/actividades' },
  { output: 'politica-cookies.html.astro', to: '/politica-cookies' },
  { output: 'politica-privacidad.html.astro', to: '/politica-privacidad' },
  { output: path.join('en', 'forum-2024.html.astro'), to: '/en/forum-2024' },
  { output: path.join('en', 'forum-2025.html.astro'), to: '/en/forum-2025' },
  { output: path.join('en', 'news.html.astro'), to: '/en/news' },
];

for (const alias of aliases) {
  const outputPath = path.join(pagesDir, alias.output);
  const relativeComponent = path
    .relative(path.dirname(outputPath), path.join(rootDir, 'src', 'components', 'LegacyRedirect.astro'))
    .replace(/\\/g, '/');

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `---
import LegacyRedirect from '${relativeComponent}';
---

<LegacyRedirect to=${JSON.stringify(alias.to)} />
`,
  );
}
