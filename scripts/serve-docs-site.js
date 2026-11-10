import { access } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';

import serveHandler from 'serve-handler';

import { SITE_BASE_URL, SITE_OUTPUT_DIRECTORY } from './docs-config.js';

const host = '127.0.0.1';
const port = Number(process.env.DOCS_PREVIEW_PORT ?? 3000);

await access(join(SITE_OUTPUT_DIRECTORY, 'index.html')).catch(() => {
  throw new Error('Build the documentation with npm run build:docs before previewing it.');
});

const server = createServer((request, response) => {
  if (!request.url?.startsWith(SITE_BASE_URL)) {
    response.writeHead(302, { Location: SITE_BASE_URL }).end();
    return;
  }

  const url = new URL(request.url, `http://${host}`);
  const path = url.pathname.slice(SITE_BASE_URL.length - 1);
  const file = path.endsWith('/') ? `${path}index.html` : path;

  request.url = `${file}${url.search}`;

  void serveHandler(request, response, {
    public: SITE_OUTPUT_DIRECTORY,
    cleanUrls: false,
    directoryListing: false,
  });
});

server.listen(port, host, () =>
  console.log(`Documentation preview at http://${host}:${port}${SITE_BASE_URL}`),
);
