import { readFileSync, existsSync, cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const PORT = process.env.PORT || '4173';
const BASE = process.env.BASE || '/wiki-holocron-template';
const OUT_DIR = join(root, 'out');
const CLIENT_DIR = join(root, 'dist', 'client');
const RSC_SERVER = join(root, 'dist', 'rsc', 'index.js');

// Read docs.jsonc to find known page slugs
const configRaw = readFileSync(join(root, 'docs.jsonc'), 'utf-8');
const config = JSON.parse(configRaw);
const slugs = [];

function extractPages(nav) {
  if (!nav) return;
  if (Array.isArray(nav.tabs)) {
    for (const tab of nav.tabs) {
      if (tab.pages) {
        for (const page of tab.pages) {
          if (typeof page === 'string') slugs.push(page);
          else if (page.pages) extractPages({ tabs: [{ pages: page.pages }] });
        }
      }
      if (tab.groups) {
        for (const group of tab.groups) {
          for (const page of group.pages) {
            if (typeof page === 'string') slugs.push(page);
          }
        }
      }
    }
  }
  if (nav.groups) extractPages({ tabs: [{ groups: nav.groups }] });
}

extractPages(config.navigation);

// Start the RSC production server
console.log(`Starting server on port ${PORT}...`);
const server = spawn('node', [RSC_SERVER], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'pipe'],
  cwd: root,
});

let serverUrl = `http://localhost:${PORT}`;
let started = false;

server.stdout.on('data', (data) => {
  const text = data.toString();
  console.log('[server]', text.trim());
  if (text.includes('Listening') || text.includes('listening') || text.includes('localhost') || text.includes(`:${PORT}`)) {
    started = true;
  }
});

server.stderr.on('data', (data) => {
  const text = data.toString();
  console.error('[server:err]', text.trim());
  if (text.includes('Listening') || text.includes('listening') || text.includes('localhost') || text.includes(`:${PORT}`)) {
    started = true;
  }
});

// Wait for server to be ready
await new Promise((resolve) => {
  const check = async () => {
    try {
      const res = await fetch(serverUrl);
      if (res.ok || res.status === 404) {
        started = true;
        resolve();
        return;
      }
    } catch {}
    setTimeout(check, 500);
  };
  setTimeout(check, 1000);
  // Timeout after 30 seconds
  setTimeout(() => { if (!started) { console.warn('Server start timeout, continuing...'); resolve(); } }, 30000);
});

console.log('Server ready. Crawling pages...');

// Crawl each page
const visited = new Set();
const pagesToVisit = ['/', ...slugs.map(s => `/${s}`)];

mkdirSync(OUT_DIR, { recursive: true });

for (const path of pagesToVisit) {
  if (visited.has(path)) continue;
  visited.add(path);

  const url = `${serverUrl}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'text/html,application/xhtml+xml' },
    });

    if (res.ok) {
      const html = await res.text();
      const slug = path === '/' ? 'index' : path.slice(1);
      const dir = path === '/' ? OUT_DIR : join(OUT_DIR, slug);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), html);
      console.log(`✓ ${path} → out/${slug}/index.html`);
    } else {
      console.warn(`✗ ${path} → ${res.status}`);
    }
  } catch (err) {
    console.error(`✗ ${path} → ${err.message}`);
  }
}

// Copy client assets
if (existsSync(CLIENT_DIR)) {
  cpSync(CLIENT_DIR, OUT_DIR, { recursive: true, force: true });
  console.log(`✓ Copied ${CLIENT_DIR} → ${OUT_DIR}`);
} else {
  console.warn(`⚠ dist/client not found at ${CLIENT_DIR}`);
}

// Stop server
server.kill('SIGTERM');
console.log('Server stopped. Export complete.');
