import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/client/', import.meta.url));
const port = Number(process.env.PORT || 4173);
try {
  await stat(path.join(root, 'index.html'));
} catch {
  console.error('Run npm run build before npm run preview.');
  process.exit(1);
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.rsc': 'text/x-component',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      res.end();
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, 'http://localhost').pathname,
      );
      let file = path.resolve(root, '.' + pathname);
      if (
        file !== path.resolve(root) &&
        !file.startsWith(path.resolve(root) + path.sep)
      ) {
        res.writeHead(403);
        res.end();
        return;
      }
      if ((await stat(file)).isDirectory())
        file = path.join(file, 'index.html');
      const body = await readFile(file);
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Content-Length': body.length,
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Preview: http://127.0.0.1:${port}/`),
  );
