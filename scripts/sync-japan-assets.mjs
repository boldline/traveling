import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const source = fileURLToPath(new URL('../japan/public/', import.meta.url));
const target = fileURLToPath(new URL('../public/japan/', import.meta.url));
await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
console.log('Japan assets ready at /japan/.');
