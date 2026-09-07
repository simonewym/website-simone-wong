# simonewongg.com — Wix → GitHub Pages migration kit

This folder contains everything pulled from your Wix site (`https://simonewongg.wixsite.com/simone`) plus a ready-to-host static version of it, so you can self-host on GitHub Pages instead of Wix.

## What's in here

- `index.html`, `portfolio.html`, `research.html`, `personal-projects.html` — the four pages of your site, rebuilt as plain static HTML with the same content, images, and links as the Wix version. `style.css` gives them a clean, minimal shared look (not a pixel copy of the Wix theme — Wix's own theme/CSS isn't portable outside Wix, so this is a fresh simple design you can restyle freely).
- `images/` — every image from the site, downloaded at full original resolution (not the small cropped thumbnails Wix serves by default):
  - `simone-headshot.png`, `simone-braze-conference.jpeg` (Home)
  - `portfolio-weatherpromise.jpg`, `portfolio-jokr-logo.webp`, `portfolio-slowly.png`, `portfolio-global-bubble-parade.png`, `portfolio-ladyplans.jpg` (Portfolio)
  - `personal-medium.webp`, `personal-instagram-not-elsewhere.png`, `personal-motleysphere-sphere.png`, `personal-intent-paced-thoughts.jpg`, `personal-hk-summer-2016.jpg` (Personal Projects)
- `content-export/` — the raw extracted text/links for each page as Markdown, in case you want the source content without the HTML wrapper (e.g. to paste into a different site builder or CMS).

## Site structure found on Wix

4 pages total, linked from the same nav on every page: **Home**, **Portfolio** (`/portfolio`), **Research** (`/research`), **Personal Projects** (`/personal-projects`). No hidden/extra pages were found beyond these.

## How to publish this on GitHub Pages

1. Create a new GitHub repository (public, unless you have GitHub Pro/Enterprise for a private Pages site).
2. Copy everything in this folder (`index.html`, `portfolio.html`, `research.html`, `personal-projects.html`, `style.css`, `images/`) into the repo root. (`content-export/` and this `README.md` are optional extras — safe to keep or drop.)
3. Commit and push to the `main` branch.
4. In the repo, go to **Settings → Pages**, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
5. GitHub will publish it at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
6. If you want your own domain (e.g. `simonewongg.com`) instead of the github.io URL: add a `CNAME` file with just your domain name in it at the repo root, and point your domain's DNS to GitHub Pages (an `A` record to GitHub's IPs, or a `CNAME` record to `<your-username>.github.io` for a subdomain) — GitHub's Pages docs walk through the exact DNS records.

## Things that don't carry over automatically (Wix-specific)

- **The "Schedule a call" and "Email me" buttons** already just link out to `cal.com` and a `mailto:` link — these work as-is, no Wix dependency.
- **Contact/consultation booking** is already external (Cal.com), so nothing to migrate there.
- **Analytics** — if you had Wix Analytics or a tracking pixel installed on the Wix site, that's Wix-only and isn't reflected here. Add Google Analytics/Plausible/etc. separately if you want visitor stats on the new site.
- **SEO basics** — I didn't carry over Wix's auto-generated meta tags/sitemap; the new pages have basic `<title>` tags but you may want to add meta descriptions and an Open Graph image if SEO matters to you.
- **Domain** — if `simonewongg.wixsite.com` (or a custom domain attached to it) is what people currently visit, remember to update/redirect that once the GitHub Pages site is live, and cancel/downgrade the Wix plan once you're confident the new site is complete.

## Verification

Every image was downloaded directly from Wix's asset CDN (`static.wixstatic.com`) at full original resolution and verified as a valid image file (correct dimensions, no corruption) before being included here. All page text was extracted directly from the live site on 2026-09-01.
