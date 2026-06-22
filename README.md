# wiki-mintlify-template

Publish a [Wiki CLI](https://github.com/wazootech/wiki)-compatible vault with [Holocron](https://holocron.so) (open-source MDX documentation site generator, Mintlify-compatible).

Edit semantic markdown in `wiki/`; validate with `wiki check`; sync to `docs/` for docs-site deploy. CI publishes to Holocron managed hosting automatically on every push — free via GitHub Actions OIDC, no API keys needed.

Registry: [Wiki CLI templates](https://github.com/wazootech/wiki/blob/main/docs/wiki/Wiki_CLI.md#ecosystem-templates).

## Quick start

```bash
pip install wazootech-wiki
wiki check --strict
bash scripts/sync-docs.sh
npm install
npx vite
```

## Layout

| Path | Role |
| ---- | ---- |
| `wiki/` | Semantic vault (Wiki CLI source of truth) |
| `wiki.yaml` | Wiki CLI config |
| `scripts/sync-docs.sh` | Transform wiki frontmatter `headline`/`description` → Holocron `title`/`description`, output `.mdx` |
| `docs/` | Holocron site (`docs.json`, pages) |
| `vite.config.ts` | Holocron Vite plugin config |
| `docs.json` | Holocron navigation and theme config |

## Workflow

1. Author in `wiki/` with typed frontmatter and Markdown links.
2. Run `wiki check --strict` (and `wiki lint --strict` in CI).
3. Run `bash scripts/sync-docs.sh` to keep `docs/` in sync.
4. Preview locally with `npx vite`, then push.

## Deploy

CI deploys to Holocron managed hosting via GitHub Actions OIDC — no config needed.
The URL is derived from your repo: `https://<repo>-<owner>-site.holocron.so`.

For custom domains or self-hosting, Holocron also supports:

- [Cloudflare Workers](https://holocron.so/docs/deploy/cloudflare) (free tier)
- [Node.js](https://holocron.so/docs/deploy/node) (Railway, Fly, VPS)

## CI

| Status | Trigger | What runs |
| ------ | ------- | --------- |
| Validate | Every push/PR | `wiki check --strict`, `wiki lint --strict`, `sync-docs.sh`, `vite build` |
| Deploy | Push to `main`/`master` | Sync + `@holocron.so/cli deploy` |

## Comparison: Holocron vs Mintlify

| Area | Mintlify | Holocron |
| ---- | -------- | -------- |
| **Hosting** | Cloud only | Self-hosted, or holocron.so managed hosting |
| **Build** | Cloud build on push | Local `vite build`, standard CI |
| **Pricing** | Starts at $150/mo | Free, open source (MIT) |
| **Git workflow** | Mintlify-managed deploys | Standard git: PRs, branches, diffs |
| **Config** | `docs.json` | Same `docs.json` (compatible) |
| **Components** | Proprietary MDX set | Same components, open source |
| **API reference** | Interactive playground | Read-only API reference from OpenAPI |
| **Search** | Algolia / built-in | Orama (local, zero config) |
| **Custom domains** | Dashboard setting | Your hosting provider |
| **Analytics** | Built-in dashboard | Bring your own |
| **AI exports** | `/llms.txt`, `.md` routes | `/llms.txt`, `/docs.zip`, `.md` routes, skill discovery |
| **Custom routes** | Not possible | Mount alongside a Spiceflow app |

Holocron accepts unknown Mintlify fields via `.passthrough()`, so a Mintlify `docs.json`
works without changes.

## Related

- [#31](https://github.com/wazootech/wiki/issues/31)
- [Wiki Configuration](https://github.com/wazootech/wiki/blob/main/docs/wiki/Wiki_Configuration.md)
- [Holocron documentation](https://holocron.so)
