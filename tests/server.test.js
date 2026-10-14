import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createGameServer } from '../server.js';

test('Node server serves the complete game and isolates private files', async t => {
  const server = createGameServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [path, file, type] of [
    ['/', 'index.html', 'text/html'], ['/index.html', 'index.html', 'text/html'],
    ['/app.js', 'app.js', 'text/javascript'], ['/engine.js', 'engine.js', 'text/javascript'],
    ['/style.css', 'style.css', 'text/css'], ['/PLAY.html', 'PLAY.html', 'text/html'],
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), new RegExp(type));
    assert.equal(await response.text(), await readFile(new URL('../' + file, import.meta.url), 'utf8'));
    const head = await fetch(base + path, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
    assert.equal(head.headers.get('content-length'), response.headers.get('content-length'));
  }
  assert.deepEqual(await (await fetch(base + '/health')).json(), { status: 'ok' });
  assert.equal((await fetch(base + '/?fresh=1')).status, 200);
  for (const path of ['/.git/config', '/server.js', '/package.json', '/tests/engine.test.js', '/%2e%2e/server.js', '/missing']) {
    assert.equal((await fetch(base + path)).status, 404, path);
  }
  const post = await fetch(base, { method: 'POST', body: 'not a game command' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET, HEAD');
});
