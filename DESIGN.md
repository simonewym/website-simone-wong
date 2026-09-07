# DESIGN.md: simonewongg.wixsite.com/simone

## Source
- URL: https://simonewongg.wixsite.com/simone (+ `/portfolio`, `/research`, `/personal-projects`)
- Capture date: 2026-09-01
- Evidence: live DOM inspection via headless browser — computed styles on leaf text nodes, element geometry, and the two decorative divider SVGs extracted verbatim from their `background-image` data URIs. Screenshots taken at 1265px viewport width for visual reference.
- Note: tokens were read from the **inner styled `<span>`/`<p>` nodes**, not Wix's wrapper elements. Wrappers report misleading values (default link blue `#0000EE`, and a `baskervillemtw01` font that never loads); the values below are what actually renders.

## Design Summary

A deliberately low-fi, personal-site aesthetic: **everything is monospace**, set on a soft lavender-and-white ground with one saturated violet as the action colour. The signature move is a full-bleed decorative divider between the page header and the content — a four-layer wave on most pages, swapped for a lime-green pixel-cross pattern on Personal Projects, which also swaps the highlight colour from lavender to lime. Body copy is set at **700 weight** (not 400) which gives the whole site its slightly chunky, typewriter-ish texture. Layout is a single narrow text column with a fixed-size image rail — no cards, no shadows, no rounded corners, no borders.

## Design Tokens

### Colors

| Role | Value | Usage |
|---|---|---|
| `--lavender` | `#d4caff` | Header band background; inline highlight on Projects tags |
| `--violet` | `#7a5df5` | "Get in touch" button fill |
| `--violet-deep` | `#5b46b8` | Page `h1`, project/section titles, links |
| `--ink` | `#383838` | Body copy, active nav item |
| `--ink-muted` | `#666666` | Inactive nav items |
| `--ink-tag` | `#545454` | Text inside highlighted tags/badges |
| `--lime` | `#dfff79` | Personal Projects: divider fill, `LIVE` badge highlight |
| `--white` | `#ffffff` | Content background; wave divider fill |

There is no dark mode, no border colour, and no shadow token — the site uses none.

### Typography

Single family throughout:

```css
font-family: "Lucida Console", "Lucida Sans Typewriter", "Courier New", monospace;
```

| Element | Size | Weight | Line height | Colour |
|---|---|---|---|---|
| Page `h1` | 40px | 700 | 44px | `--violet-deep` |
| Home tagline | 20px | 400 | normal | `--ink` |
| Body / list / section head | 15px | **700** | 24px | `--ink` |
| Intro note under `h1` | 15px | 400 | 24px | `--ink` |
| Nav item | 15px | 400 | 42px | `--ink` active / `--ink-muted` inactive |
| Button label | 15px | 700 | 21px | `--white` |
| Project title | 15px | 700 | 24px | `--violet-deep`, underlined |

Letter-spacing is `normal` everywhere. No uppercase transforms.

### Spacing And Layout

- Page container: **980px**, centred.
- Text column inside it: **624px** (leaves a right-hand rail for imagery).
- Home portrait images: **233px** wide, `object-fit: cover`, stacked in the right rail.
- Project/personal-project thumbnails: **159×159px**, `object-fit: cover`, in a left rail with text starting ~196px in.
- Nav band height: **81px**. Hero band height: **~200px**.
- Divider strip: **65px** tall (wave) / **88px** tall (pixel).
- Border radius: **0** everywhere. No shadows, no borders, no card surfaces.

### Dividers

Both are `repeat-x`, positioned `50% 100%`, sitting at the bottom of the lavender header band. Saved verbatim as site assets:

- `images/divider-wave.svg` — four layered paths, fill `#FFFFFF`, tile width `1233px`. Used on Home, Projects, Research.
- `images/divider-pixel.svg` — single path of 8.8px squares forming plus/cross shapes, fill `#DFFF79`, tile width `2815px`. Used on Personal Projects, followed by a solid lime band before the white content.

## Components

- **Nav** — plain text links, left-aligned, ~30px apart, no underline. Active item is `--ink`, the rest `--ink-muted`.
- **Button** (`Get in touch 👋`) — solid `--violet`, white 700 label, square corners, no border, ~198×38px. Sits top-right in the nav band. Links to `https://cal.com/simone-wong/15min`.
- **Header block** — lavender band containing nav + `h1` + one line of intro copy, closed by the divider.
- **Media row** — image rail plus text column; images are hard-cropped squares with no frame.
- **Tag list** (Projects) — one item per line, each wrapped in an inline `--lavender` highlight with `--ink-tag` text. Reads like a highlighter pen, not a pill: no padding, no radius.
- **`LIVE` badge** (Personal Projects) — same inline-highlight treatment in `--lime`.
- **No footer.** Pages simply end after the last content block.

## Page Patterns

All four pages share: lavender header band → divider → white content, single column, left aligned.

| Page | `h1` | Content shape | Accent |
|---|---|---|---|
| Home | Simone Wong | Prose + emoji offer list + CTA, portrait rail right | Wave / lavender |
| Projects | Projects | 5 entries: 159px thumb left, title + blurb + tag list | Wave / lavender |
| Research | Research | 5 entries: two-line underlined title, then `date \| institution` | Wave / lavender |
| Personal Projects | Personal Projects | 5 entries: 159px thumb left, title + `LIVE` badge + blurb | Pixel / lime |

Responsive behaviour isn't observable from the Wix output (it ships separate mobile layouts), so the rebuild is **mobile-first and inferred, not copied**: a single fluid column by default, thumbnails going 96px → 159px at 640px, and the Home portrait rail moving from a two-up grid to the original's 233px side rail at 900px. Type scales fluidly with `clamp()` between those bounds.

## Deliberate Departures From The Original

The clone above is what Wix ships. The implementation in this repo diverges from it in the following places, each to fix a measured problem rather than a matter of taste. Anything not listed here is unchanged.

| Change | From | To | Why |
|---|---|---|---|
| Body weight | 700 | 400 | Bold monospace flattens letterform differences and measurably hurts multi-line reading. 700 is kept for headings, titles, buttons and emphasis, so the texture survives. |
| Button fill | `#7a5df5` | `#6544e8` | White label on the original was **4.46:1**, under the 4.5:1 floor for 15px text. Now 5.92:1. |
| Inactive nav | `#666666` | `#565663` | **3.74:1** on lavender — a clear AA failure. Now 4.71:1, tinted violet to stay in family. |
| Line height | 24px fixed | 1.65 unitless | Scales with the fluid type ramp instead of tightening as text grows. |
| Dividers | `background-image` | CSS `mask` + `background-color` | The wave's white fill was hardcoded, so it could not follow a theme. As a mask, one asset paints itself in whatever colour the theme needs. |

Every foreground/background pair in both themes now clears WCAG AA (lowest ratio: 4.54 light, 5.49 dark).

Additions the original had no equivalent for: a dark theme via `prefers-color-scheme`, a skip link, visible `:focus-visible` rings, `aria-current="page"` on the active nav item, 44px minimum touch targets, a `prefers-reduced-motion` guard, per-page meta descriptions and Open Graph tags, and a small footer carrying a persistent contact affordance.

## Content Style

Voice is warm and first-person, with emoji used as list bullets and in the CTA (`👋`, `🚀`, `🧪`, `🔩`, `🔊`, `👥`) and casual asides in parentheses or with `:)`. Headings are plain nouns ("Projects", "Research"), never marketing-speak. Project entries lead with the name, give one sentence of what the thing is, then list the contribution as terse noun phrases.

## Agent Build Instructions

1. Set the monospace stack on `:root` and inherit it everywhere. Do not introduce a second family.
2. Body copy is weight 400 on a fluid 15→16px ramp at `line-height: 1.65`; reserve 700 for headings, titles, buttons and emphasis.
3. Build the header as a `.page-head` band in `--band`, containing `.site-nav`, `h1`, and an optional `.intro-note`, with the divider as a `::after` strip of fixed height using `mask-image` so it can be painted per theme.
4. Keep every corner square and add no shadows. Visual separation comes from the colour bands and whitespace; the only rules are the hairline dividers in Research and the footer.
5. Use inline `<span class="hl">` highlights rather than padded pills for tags and badges.
6. Personal Projects sets `.pixel` on the header and `.lime` on `<body>` — the body class is what carries the accent override into `<main>`.
7. Define every colour as a token on `:root` and redefine only the tokens inside the `prefers-color-scheme: dark` block. Never give a colour its sole definition inside a media query.

## Rerun Inputs
workflow: firecrawl-website-design-clone
source_url: https://simonewongg.wixsite.com/simone
target_stack: static HTML + single CSS file (GitHub Pages)
output: DESIGN.md
