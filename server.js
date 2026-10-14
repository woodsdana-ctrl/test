import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Explicit public files keep repository metadata, tests, and server code private.
const assets = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/style.css', ['style.css', 'text/css']],
  ['/app.js', ['app.js', 'text/javascript']],
  ['/engine.js', ['engine.js', 'text/javascript']],
  ['/PLAY.html', ['PLAY.html', 'text/html']],
]);

export function createGameServer() {
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-cache');
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Method not allowed');
      return;
    }
    const pathname = (req.url || '/').split('?')[0];
    const asset = assets.get(pathname);
    if (!asset && pathname !== '/health') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : 'Not found');
      return;
    }
    try {
      const body = pathname === '/health'
        ? Buffer.from('{"status":"ok"}\n')
        : await readFile(new URL(asset[0], import.meta.url));
      res.writeHead(200, {
        'Content-Type': (pathname === '/health' ? 'application/json' : asset[1]) + '; charset=utf-8',
        'Content-Length': body.length,
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      console.error('Unable to serve game asset:', error.code || 'unknown error');
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : 'Unable to load game');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 8000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error('PORT must be an integer between 0 and 65535.');
    process.exit(1);
  }
  const server = createGameServer();
  server.on('error', error => {
    console.error(`Could not start game server: ${error.code || error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '0.0.0.0', () => console.log(`TICKET server listening on port ${server.address().port}`));
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, () => {
      server.close();
      setTimeout(() => process.exit(0), 5000).unref();
    });
  }
}
