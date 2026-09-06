import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
const source = new URL('../japan/', import.meta.url);
const target = new URL('../public/japan/', import.meta.url);
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const assets = new URL(entry.name + '/public/', source);
  try {
    await stat(assets);
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  await cp(assets, new URL(entry.name + '/', target), { recursive: true });
}
console.log('Japan destination assets synchronized.');
