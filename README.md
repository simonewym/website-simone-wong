# simonewong.com

The personal website of **Simone Wong**, a CRM and lifecycle marketing consultant in Berlin. She works with B2C apps and subscription products on retention and growth, from strategy to delivery.

**Live site:** [simonewong.com](https://simonewong.com), hosted on GitHub Pages from the `main` branch.

## What's on the site

The home page is one long page, with the nav jumping between its sections:

1. **Hero:** name, a short intro, the portrait, and a "Book a 15-min call" link with the availability status.
2. **About:** background in psychology and communications, and the human-first approach to CRM.
3. **Work with me:** what Simone does, across Strategy, Execution and Optimisation.
4. **Working together:** three ways to engage (Retainer, Project, Advisory), as expandable rows.
5. **Projects:** three selected projects, linking to the full list.
6. **Contact:** email, LinkedIn and a booking link.

Inner pages:

- `portfolio.html`: all freelance projects.
- `research.html` and `personal-projects.html`: academic work and side projects. These are built but **hidden for now**: they're not in the nav, and their sections on the home page carry the `hidden` attribute.

## How it's built

Plain static HTML, CSS and a little JavaScript. There's no framework, build step or dependencies, so what's in the repo is exactly what's served.

| File | What it is |
|---|---|
| `index.html`, `portfolio.html`, `research.html`, `personal-projects.html` | The pages |
| `style.css` | All styling. Later rules refine earlier ones, so the end of the file is the current state of each component |
| `site.js` | Progressive enhancement only. The site works without it. It handles the name animation and fade-ins, the nav underline that follows the section you're reading, the header name on scroll, and the phone menu |
| `images/` | Photos and project artwork |
| `DESIGN.md` | **The design system:** colours, type scale, spacing, layout rules, components, motion and copy conventions. Read this before changing the design |
| `llms.txt` | A plain-text profile for AI assistants screening freelancers, with the full detail of services, fit and tools |
| `CNAME` | The custom domain for GitHub Pages (`simonewong.com`) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are, without a Jekyll build |
| `archive/` | Removed pieces kept for reference (the old orbit mind map) |
| `content-export/` | The original text exported from the old Wix site |

**Fonts:** Helvetica Neue / Helvetica, with Arial as the fallback, for all text. Space Mono, from Google Fonts, for the small labels.

**For AI readers:** besides `llms.txt`, the home page has a collapsible note addressed to AI assistants, plus JSON-LD `Person` data in the `<head>`.

## Run it locally

Any static file server works. From the project folder:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). The same server is set up as the `site` preview in `.claude/launch.json`.

## Publish a change

GitHub Pages publishes whatever is on `main`, so committing and pushing is all it takes:

```bash
git push origin main
```

The live site updates within a minute or two.

## Domain

`simonewong.com` is registered at Namecheap and points at GitHub Pages: four `A` records for `@` to GitHub's IPs, and a `CNAME` for `www` to `simonewym.github.io`. Email for `work@simonewong.com` runs on Google Workspace through the domain's MX records, which must be kept whenever the DNS is edited.

## Accessibility and performance

- Every colour pair meets WCAG AA contrast. The checked values are in `DESIGN.md`.
- The site works fully by keyboard and without JavaScript. The expandable rows are native `<details>` elements.
- All motion is a plain fade and switches off under `prefers-reduced-motion`.
- Layouts are checked from 320px phones to 1920px screens with no sideways scrolling.

---

© Simone Wong. The content and photos are personal and not licensed for reuse.
