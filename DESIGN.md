# DESIGN.md: simonewongg.com

Source of truth for the site's visual system. The earlier version of this
file documented the design extracted from the Wix original; that extraction
is preserved in git history (`237ea70`) and is no longer what the site uses.

## Positioning

Simone Wong — CRM, lifecycle and retention marketing consultant, Berlin. The site is built to
attract **mobile-first, subscription products**, and the copy says so in the
first sentence a visitor reads. Her name and title are the hero; there is deliberately no sales headline. Services and target clients follow immediately underneath.

## Identity

**Deep forest green.** Chosen over olive as the primary because olive goes
muddy in large fills, while a deep green frames the page with authority and
maps literally onto her discipline — *growth*. Olive survives as the
secondary (tints, chips, the availability dot). It is also a genuinely
underused colour in the CRM/SaaS space, which is wall-to-wall blue and
purple, so it does the "stand out" job on its own.

Three type voices, each with a strict role:

| Voice | Family | Role |
|---|---|---|
| Name | Helvetica Neue / Helvetica, large and tight (-0.055em) | The name only, one style. |
| Titles | Helvetica Neue / Helvetica, regular | H1 to H3, see the type system below. No serif anywhere: EB Garamond, Newsreader and Fraunces were all tried and dropped. |
| Reading | Helvetica Neue / Helvetica (Arial fallback) | Everything you read. |
| Label | Space Mono | Eyebrows, status line, chips, numbering. |

The serif carries the personality; the mono carries the "tech-forward"
signal; Inter stays out of the way.

## Tokens

### Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| `--green-900` | `#0b2a20` | same | Page frame around the sheet |
| `--green-800` | `#0f3d2e` | same | Services block fill |
| `--olive-500` | `#7f8f4a` | same | Availability dot, pulse |
| `--olive-200` | `#e3e8cf` | `#2a3324` | Chip / badge tint |
| `--sprout` | `#c8f169` | same | Legacy lime, now only in the hidden Off the clock section. Not used for selection or focus any more. |
| `--paper` | `#f4f3ee` | `#101613` | The sheet |
| `--band` | `#e2e8de` | `#18211c` | Working together background band |
| `--paper-2` | `#ebeae3` | `#161d19` | Nav track, thumb placeholders, hover fills |
| `--ink` | `#14201a` | `#ecefe9` | Text |
| `--ink-2` | `#5b665f` | `#a3ada6` | Secondary text |
| `--display` | `--green-800` | `#b7dcc6` | Name, page titles, wordmark dot |
| `--em` | `--green-700` | `#9fd4b8` | Italic accents, hovers, focus ring |
| `--btn-bg` | `--green-800` | `#21775a` | Active nav pill |
| `--accent` | `--sprout` | same | Primary call to action, with `--green-900` text. Distinct from the nav pill, still in family. |
| `--signal-text` / `--signal-dot` | `#c8000a` / `#e8000b` | `#ff5c5c` / `#ff3b3b` | The availability line, and nothing else. A sharp true red, not orange; text is 5.5:1 on paper |

`--display`, `--em` and `--btn-bg` exist because deep green disappears on a
dark ground (1.5:1). Every foreground/background pair in both themes clears
WCAG AA; the dark button clears the 3:1 non-text floor against the page.

### Type system

One family for everything you read (Helvetica Neue / Helvetica, Arial fallback), and Space Mono only for small labels. Every piece of text on the site is one of these ten styles; don't add new sizes. The rules live in the "Type system" block at the end of `style.css`.

| Style | Size (phone → desktop) | Weight / tracking | Used for |
|---|---|---|---|
| Display | `--fs-name` | 500 (medium), tight | The name in the hero, nothing else |
| H1 | `--fs-h1` 44 → 88px | 400, -0.04em, lh 1.0 | Inner page titles (Projects, Research) |
| H2 | `--fs-h2` 32 → 52px | 400, -0.03em | Section headings, the footer statement |
| H3 | `--fs-h3` 20 → 24px | 400, -0.02em | Sub-headings, column titles, project/paper titles on inner pages |
| H4 | `--fs-body` 16px | 700, -0.01em | Card titles, list-item titles, the wordmark |
| Lead | `--fs-lead` 17 → 19px | 400 | The line that introduces a section |
| Body | `--fs-body` 16px | 400, lh 1.5 | All paragraphs and lists |
| Column | `--fs-col` 14px | 400, lh 1.4, `--ink-2` (5.3:1) | Text in the 3-column What I do grid. In rem, so it still scales with zoom and the reader's default size; don't go below this for running text |
| Small | `--fs-sm` 13px | 400 | Hero intro, nav, the AI note |
| Label | `--fs-label` 11px | Space Mono 400, caps, 0.06em | Eyebrows, numbers, chips, status, legal |

**Line height has four values:** 1.0 for H1 and the name, 1.1 for H2 and H3, 1.4 for the 14px Column style (What I do boxes, About, Services rows), and 1.5 for everything else you read (lead, body, small, labels, H4). They live as `--lh-tight`, `--lh-heading` and `--lh-text` in the line-height block at the end of `style.css`. Buttons are the one exception: their line-height is the 44px tap target, not text spacing.

**Tracking:** all reading text (lead, body, column, small, nav, CTA, H4) is set at -0.02em (`--track-text`) for a slimmer texture. H3 is -0.015 to -0.02em, H2 -0.03em, H1 -0.04em and the name -0.055em. The Space Mono caps labels stay at +0.06em.

Headings are never bold; bold belongs to H4, the CTA and `<strong>`. The hero intro is deliberately Small rather than Body, so the name and photo carry the first screen.

### Space, shape

- 8-step spacing scale `--s-1` (0.5rem) → `--s-8` (7rem).
- `--frame` `clamp(6px, 1.2vw, 16px)` — the green border around the sheet.
- `--radius` 18px for the sheet, blocks and cards; 12–14px for thumbnails; `--pill` for anything interactive.
- Container 1320px; gutter `clamp(1rem, 4vw, 3rem)`.
- Hairlines only (`--line`, 12% ink). No shadows.

## Components

- **Sheet** — the paper page inset in the green frame. Everything lives inside it.
- **Top bar** — sticky frosted glass (translucent paper gradient, 26px blur, saturate 190%, a highlight edge on top); mono wordmark, pill nav with a filled active state, live Berlin clock, primary CTA.
- **Hero** — bio, two buttons, then the availability line, with the name immediately below at full width (~24px gap; it is not pushed to the fold). No eyebrow, no divider, no metadata.
- **Focus cards** — numbered, hairline-bordered, lift on hover. Three: mobile-first, subscription, cross-functional.
- **Work cards** — 4:3 image, title + ↗, mono chips. Image scales on hover.
- **Case rows** (Projects, Personal) — number / 160px thumb / serif title + blurb + chips.
- **Paper rows** (Research) — number / title / mono meta, hairline-separated.
- **Browser window** (Off the clock) — the section sits inside a fake browser: traffic-light dots, a URL bar reading `simonewong.com/off-the-clock`, and the light switch in the toolbar. Lights off darkens the whole window like a browser in dark mode.
- **Note for AI assistants** — a dashed, collapsed `<details>` near the footer written for an LLM screening freelancers: who, best fit, tools, an honest "less of a fit", and where to verify. Backed by `/llms.txt` and JSON-LD `Person` data in the head, which is the part that actually signals AI fluency rather than claiming it.
- **Light switch** (Off the clock) — the section starts collapsed with a hint. Flipping the lights *off* turns the block into a dark room (deep green, lamp glow) and expands the after-hours cards via a `grid-template-rows: 0fr → 1fr` transition. `aria-expanded` on the switch; collapsed content is `inert`. Without JS it's simply expanded.
- **Footer** — contact only on the paper: email, LinkedIn, Book a 15-min call, and a small legal line with the llms.txt link.

## Motion

One simple effect only: a plain 400ms opacity fade. Content blocks fade in as they scroll into view; the hero name fades in as a whole on load. There's no blur, no slide, no rotation and no per-letter stagger. Page-to-page navigation is a 180ms crossfade (`@view-transition`). All of it switches off under `prefers-reduced-motion`. The only other motion is the availability dot's pulse and the +/− turn on the Working together rows.

## Content rules

- On desktop the portrait is always the largest element on the first screen: wider than the name, about three times its height, and fully visible without scrolling. The name is the largest *type* on the page, but never bigger than the photo. Check this at 1024, 1280, 1440 and 1920px after any hero change.
- The hero is a person, not a pitch: bio, buttons, then availability. Industry preference sits *after* Projects, framed as an invitation ("Always open to more") in the first person: the health/learning/habit space is where she does her best work, not a restriction. B2C only; the AI note and llms.txt say so explicitly.
- Services are listed as capabilities in her own words; nothing invented.
- Photos are placeholders pending new headshots; slots are 4:5 in About and 4:3 in cards.
- Personality is stated, not implied: tech and psychology, and the question of building technology that leaves people better off. The Research lede ties the academic work to the same thread.

## Still to do

- New headshots (4:5) and a hero-worthy photo for the About section.
- An Open Graph image (1200×630) so shared links get a preview card.
- A favicon in the green.

### Above the fold

Four elements only: the name (top left), the intro with the call to action and availability line under it (lower left, raised 9rem off the bottom), and the portrait (right, square corners). The portrait is half the content width at every screen size, phones included, capped at 440px wide on wide screens (so on laptops it's 440 × 550), and pinned to the top-right corner. That way it scales smoothly as the window widens instead of jumping at the 900px breakpoint. It's 4:5, never taller than the screen (it crops in from the sides when space is short). "Simone Wong" is always on one line: in the header row on phones, and at the top of the left half on desktop (6vw, up to 5rem). The nav is three plain text links (About, Projects, Contact) sitting on the page, not in a separate bar; the home page has no wordmark because the name is the headline, inner pages show "Simone Wong" top-left as the way home. No photo on the site has rounded corners.

On phones (under 900px) the hero follows the Liam Bennett reference. The portrait is the same 50% width as on desktop. "Simone Wong" sits on one line in the top-left corner, on the same row as a "Menu" button. The header row starts 24px down from the top edge, so the name isn't pressed against it. Below the name is a lot of empty space, then the portrait at about half width, pushed right. The intro follows 32px under the photo, then the CTA and status. All three share the name's left edge.

On phones the nav folds into a dropdown under "Menu", which changes to "Close" and is underlined when open. The links stack, right-aligned, on paper. The dropdown closes on a link tap, an outside tap or Escape. Without JS the button stays hidden and the links show inline.

### What I do

Written for the person hiring: a founder, Head of Growth or Head of Product at a B2C subscription app who already knows some CRM. The copy names no platforms (no Braze, Klaviyo or "Canvas"); it describes the work instead. The red "What I do" label sits in column one; columns two and three hold the H2 "CRM for B2C apps and subscription products across strategy and delivery." Under it, the disciplines sit as a 2-column grid of bordered boxes: Strategy and Execution side by side, then Optimisation on the second row. All three boxes are squares of at most 340px, always identical (`grid-auto-rows: 1fr`). They never stretch to fill a wide single column. The grid goes from one column to two as soon as two readable squares fit in the space the boxes actually have (a container query at 604px), not at a fixed screen width, so resizing never makes them jump. On the smallest phones (around 320px) all three grow slightly taller together rather than clip. Each is a bordered box with a line icon, an H3 in medium weight (500) and one short prose paragraph of four sentences, the last starting "And…" with the AI angle. No lists, no numbered red labels. Lists have no markers: each item is its own short line on one left edge, separated by space.

### Working together

Its own section (`#together`), after Projects and before the AI note and footer, on a full-width light sage band (`--band`, `#e2e8de`; `#18211c` in dark mode). On the band, ink is 9.7:1, ink-2 4.7:1 and the red labels 4.9:1. Layout follows the architecture-studio reference: "Working together" as an H2 in the left column. In the right two columns: the Lead "Wherever your CRM team stands today, I'll meet you there…", the Book-a-call link with the pulsing "Available for new projects" line under it (same style as the hero), then the three options as expandable rows between hairlines. Each row's summary shows only the option name (H3, medium weight 500 like the What I do box titles) on the left and the sign on the right; no taglines ("In it for the long run.", "Clear scope, clean handover.", "A sounding board with opinions.") and a hairline +, which turns to − when open. Opening a row shows the plain description and a bold "Good fit if…" line. Retainer starts open. Spacing groups it: the availability line sits tight under the CTA as its footnote; the options start after a clear gap; open rows get 32px before the next hairline. Keyboard focus shows as an underline on the option title, never a box over the text. It's built on `<details>`/`<summary>`, so it works by keyboard, with screen readers and without JS. On phones the tagline drops under the name. The tone is professional with a bit of fun; no dating jokes.

### Copy conventions

- Statement headings are full sentences and end with a full stop ("Your users stay where they feel understood."). Section and card titles do not ("Projects", "Off the clock", "Strategy").
- Sentence case everywhere, including chips and research titles. Proper nouns, product names and acronyms keep their capitals (CRM, TIER Mobility, Braze); the one deliberate exception is "Lifecycle Marketing" in the bio, capitalised as a discipline name.
- Body text and list descriptions end with a full stop; chips, buttons and labels do not.

### Calls to action

The primary action is bold, underlined body text (16px, 1.5px underline, 2.5px on hover) with an arrow (one continuous underline under the words, the space and the arrow), the same size as the text around it ("Book a 15-min call →"), not a filled button. Hover thickens the underline. The lime fill is no longer used for actions.

### Lines and colour

Spacing separates sections; there are no dividers between them. In What I do, Strategy / Execution / Optimisation are each a box with a 1px hairline border (`--line`), square corners and 1.5rem padding. The boxes do the grouping, so the section has no divider lines. The only other rules are the hairlines between the Services rows. Don't add dividers anywhere else.

**Red is the highlight colour** (`--highlight`, which is `--signal-text` `#c8000a`, 5.5:1 on paper, 4.9:1 on the sage band). It's used for every mono label and number on the site, and for the availability dot. The availability line appears twice (under the hero CTA and the Working together CTA); its dot pulses red but its text is secondary grey, so it never competes with the CTA. Use it only for these small markers that lead the eye in, never for headings or body text. Deep green is the primary colour and is used for text: `--ink` is `#0f3d2e` (10.9:1 on paper), secondary text `#56695f` (5.3:1). The note for AI assistants is set entirely in a neutral grey (`--note`, `#666662`, 5.2:1; `#a3a3a0` in dark mode) so it reads as a quiet side note addressed to someone else. The footer is contact only, on the paper: email and LinkedIn on the left, Book a 15-min call on the right, then a small grey line (© · Berlin · llms.txt). No statement, no coloured band. The availability status sits on its own line under the call to action, at 10px, so it never competes with it.


### Selection and focus

Selected text uses a soft sage grey mixed from the palette (16% ink on paper) with green text; in the footer it's paper on green. The footer focus ring is paper. No lime.

### About

No heading and no label: three paragraphs in the Column style (14px), in Simone's own words. Only the opener is bold, at the same size, in dark green: "Most CRM teams ask how to keep users subscribed." One photo, the Braze panel, as a 4:3 landscape rectangle close to its original framing. On desktop the photo takes the first of three columns with an 88px gap, and the text spans the other two on the same grid as What I do. On phones the text comes first, then the photo at half width, pushed right, matching the hero portrait so it's present but not dominant.

### Icons

Thin geometric line icons, drawn as inline SVG: 0.6px non-scaling stroke in `currentColor` (ink), no fill, `aria-hidden`. Every drawing fills a 36×36 square edge to edge (viewBox `6 6 36 36`), so all icons have the same optical size and the gap to the heading is a consistent 16px. Strategy is concentric circles (a target, setting direction). Execution is three stacked layers (building and shipping). Optimisation is two circles overlapping on the diagonal (A/B variants). New icons should follow the same rules: simple overlapping or repeated geometry that fills the full square, one stroke weight, no colour.

### Header, nav and page structure

**Persistent header** on every page: "Simone Wong" on the left (1.25rem, medium; on phones 24–32px, also medium) and the nav on the right. It's sticky at the top, on the paper with no divider line. On the home page on desktop, the small name is hidden while the big hero name is on screen and fades in once it scrolls away, so the name never shows twice. On phones the header carries the name; the hero name stays the page's H1 for screen readers but is visually hidden.

**Nav:** About · Work with me · Projects · Contact. On the home page the links jump to `#about`, `#work-with-me`, `#work` and `#contact`; inner pages use `index.html#…` and `#contact` for their own footer. The underline follows the section you're reading: About covers the hero and About, Work with me covers the disciplines and Working together, Projects covers Projects, and Contact lights up at the bottom of the page. On inner pages the current page keeps its underline (Projects on the Projects page). On phones the nav folds into the Menu dropdown. Jump targets get `scroll-margin-top` so they land below the sticky header.

**Page order:** hero → About → What I do → Working together → Projects → AI note → Contact (footer).

**Section titles:** every titled section uses one pattern, a big H2 in the left column ("CRM for B2C apps and subscription products across strategy and delivery.", "Working together", "Projects", "Contact"), with the content in the two columns on the right, opened by a Lead (`.section-lead`, 19px, ink). About has no title, by Simone's choice. The disciplines section (nav: Work with me) uses its statement as the H2, with the three boxes on the right, starting level with the title.
