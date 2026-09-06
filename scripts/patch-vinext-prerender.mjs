import { readFile, writeFile } from 'node:fs/promises';

// beta.5 omits next.config.basePath from App Router prerender requests.
// This makes valid project-site routes get silently skipped as dynamic.
// Keep this narrowly scoped compatibility patch until upgrading Vinext.
const pkg = new URL('../node_modules/vinext/package.json', import.meta.url);
if (JSON.parse(await readFile(pkg, 'utf8')).version !== '1.0.0-beta.5') {
  throw new Error('Review the basePath prerender patch for this Vinext version.');
}
const file = new URL('../node_modules/vinext/dist/build/prerender.js', import.meta.url);
let source = await readFile(file, 'utf8');
for (const headers of ['htmlHeaders', 'rscHeaders']) {
  const before = 'new Request(`http://localhost${urlPath}`, { headers: ' + headers + ' })';
  const after = 'new Request(`http://localhost${config.basePath || ""}${urlPath}`, { headers: ' + headers + ' })';
  if (source.includes(after)) continue;
  if (source.split(before).length !== 2) {
    throw new Error('Vinext prerender source changed; review the compatibility patch.');
  }
  source = source.replace(before, after);
}
await writeFile(file, source);
console.log('Vinext basePath prerender compatibility patch ready.');
