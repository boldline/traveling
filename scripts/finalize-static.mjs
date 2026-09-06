import { copyFile, mkdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Vinext beta.5 prerenders /japan only with its default slash policy.
// Keep its flat HTML/RSC files, and add the directory entry for static hosts.
const root = new URL('../dist/client/', import.meta.url);
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
console.log(`Static pages ready: / and /japan/ (${Object.keys(photos).length} place photos)`);
console.log(fileURLToPath(root));
