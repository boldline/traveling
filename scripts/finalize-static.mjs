import { copyFile, cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

// Vinext beta.5 prerenders /japan only with its default slash policy.
// Keep its flat HTML/RSC files, and add the directory entry for static hosts.
const root = new URL('../dist/client/', import.meta.url);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
if (basePath) {
  // Vinext emits assets under the URL prefix. Pages mounts the artifact there
  // already, so the artifact itself needs _next/ at its root.
  const nestedAssets = new URL(basePath.slice(1) + '/_next/', root);
  if (existsSync(nestedAssets)) {
    await cp(nestedAssets, new URL('_next/', root), { recursive: true });
    await rm(nestedAssets, { recursive: true });
  }
  await stat(new URL('_next/', root));
}
const manifest = JSON.parse(
  await readFile(new URL('../dist/server/vinext-prerender.json', import.meta.url), 'utf8'),
);
for (const route of ['/', '/japan']) {
  if (!manifest.routes.some((entry) => entry.route === route && entry.status === 'rendered')) {
    throw new Error(`Static page was not rendered: ${route}`);
  }
}
await mkdir(new URL('japan/', root), { recursive: true });
await copyFile(new URL('japan.html', root), new URL('japan/index.html', root));
const photos = JSON.parse(
  await readFile(new URL('../japan/lib/place-photos.json', import.meta.url), 'utf8'),
);
for (const photo of Object.values(photos)) {
  await stat(new URL(photo.src.replace(/^\//, ''), root));
}
for (const page of ['index.html', 'japan/index.html']) {
  const html = await readFile(new URL(page, root), 'utf8');
  for (const [, href] of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    const pathname = new URL(href, 'https://local.invalid').pathname;
    if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) {
      throw new Error(`URL missing basePath in ${page}: ${href}`);
    }
    const local = pathname.slice(basePath.length).replace(/^\//, '');
    let target = new URL(local, root);
    if ((await stat(target)).isDirectory()) {
      target = new URL((local ? local.replace(/\/?$/, '/') : '') + 'index.html', root);
    }
    await stat(target);
  }
}
console.log(`Static pages ready: / and /japan/ (${Object.keys(photos).length} place photos)`);
console.log(fileURLToPath(root));
