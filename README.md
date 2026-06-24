<div align='center'>
    <br/>
    <br/>
    <h3>holocron-template</h3>
    <p>Documentation site template powered by Holocron</p>
    <br/>
    <br/>
</div>

## Quick Start

```bash
bun install     # or: pnpm install / npm install
bun dev         # or: pnpm dev / npm run dev
```

Edit MDX pages in `src/`, configure navigation and theming in `docs.jsonc`.

## Deploy

This template is pre-configured for Vercel. Connect your GitHub repo to Vercel and it Just Works.

### Deploy to Vercel (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo
3. Vercel auto-detects the config — no manual settings needed
4. Click **Deploy**

The `vercel.json` and `api/index.js` in this repo handle everything: the RSC server runs as a serverless function, and all routes are forwarded to it.

### Manual deploy (CLI)

```bash
npm run build
npx vercel --prod
```

## Learn More

- [Holocron docs](https://holocron.so) — full documentation
- [Vercel docs](https://vercel.com/docs) — deployment platform

# My Wiki

A semantic markdown knowledge base powered by the Wiki CLI.

## Wiki layout

- `wiki.yml` — Wiki configuration, namespace prefixes, and `fmt` defaults.
- `src/` — Contains markdown files with semantic frontmatter (shared with Holocron).
  - `Person_Shape.md` — SHACL shape for Person documents.
  - `Ethan_Davidson.md` — An example Person document.

## Commands

- **Check** (integrity: SHACL, JSON Schema, route safety, layout frontmatter):
  ```bash
  wiki check
  ```
- **Lint** (conventions: broken links, filename pattern, heading style):
  ```bash
  wiki lint
  ```
- **Preview** (starts a local dev server with auto-reload):
  ```bash
  wiki serve --watch
  ```
- **Build** (compiles to static HTML site):
  ```bash
  wiki build
  ```

---

## First-time setup (from scratch)

If you're cloning this repo fresh to start your own wiki + docs site:

```bash
git clone <your-repo-url>
cd wiki-holocron-template
bun install
```

Then follow the Deploy steps above to authenticate, create a project, and set up CI.

