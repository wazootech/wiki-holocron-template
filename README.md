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

This template ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to Holocron on every push to `master`. To set it up for your own repo:

### 1. Authenticate the Holocron CLI

```bash
npx -y @holocron.so/cli login
```

Opens a browser to log into your Holocron account.

### 2. Create a project

```bash
npx -y @holocron.so/cli projects create --name "Your Docs"
```

### 3. Create an API key for CI

```bash
npx -y @holocron.so/cli keys create --name github-actions
```

Select your project when prompted. Copy the key value (starts with `holo_`).

### 4. Add the key to GitHub Actions secrets

```bash
# replace the key value with yours
gh secret set HOLOCRON_KEY --repo your-org/your-repo
```

**Or** add it in the repo's Settings → Secrets and variables → Actions → New repository secret.

### 5. Push to deploy

Push to `master` — the workflow will build and deploy. Your site URL is printed in the CI logs (e.g. `https://<branch>-<hash>-<project-id>-site.holocron.so`).

### Manual deploy

```bash
HOLOCRON_KEY=holo_xxx npx -y @holocron.so/cli deploy
```

## Learn More

Full documentation at [holocron.so](https://holocron.so).

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

