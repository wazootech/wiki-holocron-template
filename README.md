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
pnpm install
pnpm dev
```

Edit MDX pages in `src/`, configure navigation and theming in `docs.jsonc`.

## Deploy

```bash
npx -y @holocron.so/cli deploy
```

A GitHub Actions workflow is included at `.github/workflows/deploy.yml` for automatic deploys on every push.

## Learn More

Full documentation at [holocron.so](https://holocron.so).

# My Wiki

A semantic markdown knowledge base powered by the Wiki CLI.

## Wiki layout

- `wiki.yml` — Wiki configuration, namespace prefixes, and `fmt` defaults.
- `wiki/` — Contains markdown files with semantic frontmatter.
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

