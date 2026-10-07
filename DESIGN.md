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
| Display | `--fs-name` | 400, tight | The name in the hero, nothing else |
| H1 | `--fs-h1` 44 → 88px | 400, -0.04em | Inner page titles (Projects, Research) |
| H2 | `--fs-h2` 32 → 52px | 400, -0.03em | Section headings, the footer statement |
| H3 | `--fs-h3` 20 → 24px | 400, -0.02em | Sub-headings, column titles, project/paper titles on inner pages |
| H4 | `--fs-body` 16px | 700, -0.01em | Card titles, list-item titles, the wordmark |
| Lead | `--fs-lead` 17 → 19px | 400 | The line that introduces a section |
| Body | `--fs-body` 16px | 400, line-height 1.6 | All paragraphs and lists |
| Column | `--fs-col` 14px | 400, line-height 1.45, `--ink-2` (5.3:1) | Text in the 3-column What I do grid. In rem, so it still scales with zoom and the reader's default size; don't go below this for running text |
| Small | `--fs-sm` 13px | 400 (CTA 700) | Hero intro, nav, CTA, the AI note |
| Label | `--fs-label` 11px | Space Mono 400, caps, 0.06em | Eyebrows, numbers, chips, status, legal |

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
- **Footer** — oversized serif "Let's build *something that sticks.*", link row, a primary Book-a-call button, mono legal with an `llms.txt` link.

## Motion

All motion is progressive enhancement and switches off under
`prefers-reduced-motion`.

- **Load** — hero blocks blur-and-rise in sequence; the name arrives letter by letter (38ms stagger, slight rotation, blur → sharp).
- **Scroll** — `.reveal` elements blur-and-rise once via IntersectionObserver; `[data-stagger]` groups offset their children.
- **Page-to-page** — `@view-transition { navigation: auto }` gives a crossfade-and-slide between the four pages in supporting browsers, with no JS.
- **Micro** — link underlines that wipe out on hover, arrows that nudge, buttons that compress on press, work images that ease in scale over 900ms.
- **Ambient** — the services glow drifts on a 24s loop; the availability dot pulses.

Easing is a single `cubic-bezier(0.22, 1, 0.36, 1)` for anything entering, so everything feels like it belongs to one system.

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

Four elements only: the name (top left), the intro with the call to action and availability line under it (lower left, raised 9rem off the bottom), and the portrait (right, square corners). The portrait is exactly half the content width at every screen size, phones included, and pinned to the top-right corner. That way it scales smoothly as the window widens instead of jumping at the 900px breakpoint. It's 4:5, never taller than the screen (it crops in from the sides when space is short). "Simone Wong" is always on one line: in the header row on phones, and at the top of the left half on desktop (6vw, up to 5rem). The nav is three plain text links (About, Projects, Contact) sitting on the page, not in a separate bar; the home page has no wordmark because the name is the headline, inner pages show "Simone Wong" top-left as the way home. No photo on the site has rounded corners.

On phones (under 900px) the hero follows the Liam Bennett reference. The portrait is the same 50% width as on desktop. "Simone Wong" sits on one line in the top-left corner, on the same row as a "Menu" button. The header row starts 24px down from the top edge, so the name isn't pressed against it. Below the name is a lot of empty space, then the portrait at about half width, pushed right. The intro follows 32px under the photo, then the CTA and status. All three share the name's left edge.

On phones the nav folds into a dropdown under "Menu", which changes to "Close" and is underlined when open. The links stack, right-aligned, on paper. The dropdown closes on a link tap, an outside tap or Escape. Without JS the button stays hidden and the links show inline.

### What I do

Written for the person hiring: a founder, Head of Growth or Head of Product at a B2C subscription app who already knows some CRM. The copy names no platforms (no Braze, Klaviyo or "Canvas"); it describes the work instead. The section has three rows on the 3-column grid. (1) The intro: the label in column one; across columns two and three, the H2 "From the first push notification to the retention roadmap." and a Lead carrying the whole core message: B2C and subscription, retention is revenue, CRM sits where Product, Tech and Marketing meet, she builds and sets strategy, so less gets lost. (2) Strategy / Execution / Optimisation. (3) Where I do my best work: the label, "Strategy that ships." with one line, and the fit list. Lists have no markers: each item is its own short line on one left edge, separated by space.

### Working together

Its own section, after Projects and before the AI note and footer. The tone is friendly-professional with one light running joke: the working relationship as a relationship ("Pick your relationship status.", "nobody gets ghosted"). It pays off in the footer line "Looking for something long-term? So are your users." Same grid: label and intro, then three columns, Retainer ("In it for the long run."), Project ("Clear scope, happy ending.") and Advisory ("The friend with opinions."), then the Book-a-call link with a short reassurance line. Keep the wit to the H3 titles and one line of the intro; the descriptions stay plain and specific.

### Copy conventions

- Statement headings are full sentences and end with a full stop ("Your users stay where they feel understood."). Section and card titles do not ("Projects", "Off the clock", "Strategy").
- Sentence case everywhere, including chips and research titles. Proper nouns, product names and acronyms keep their capitals (CRM, TIER Mobility, Braze); the one deliberate exception is "Lifecycle Marketing" in the bio, capitalised as a discipline name.
- Body text and list descriptions end with a full stop; chips, buttons and labels do not.

### Calls to action

The primary action is bold, underlined body text with an arrow (one continuous underline under the words, the space and the arrow), the same size as the text around it ("Book a 15-min call →"), not a filled button. Hover thickens the underline. The lime fill is no longer used for actions.

### Lines and colour

Spacing separates sections; there are no dividers between them. The one exception is the What I do section, which is set like an editorial spread: a single hairline opens each group (intro, the three disciplines, how we work together) so the eye reads each row as one block. Don't add rules anywhere else.

**Red is the highlight colour** (`--highlight`, which is `--signal-text` `#c8000a`, 5.5:1 on paper). It's used for every mono label and number on the site, and for the availability line. Use it only for these small markers that lead the eye in, never for headings or body text. Deep green is the primary colour and is used for text: `--ink` is `#0f3d2e` (10.9:1 on paper), secondary text `#56695f` (5.3:1). The note for AI assistants is set entirely in olive (`--note`, `#5c6b2e`, 5.3:1) so it reads as a side note addressed to someone else. The footer is reversed: a full-width deep green band with paper text. The availability status sits on its own line under the call to action, at 10px, so it never competes with it.


### Selection and focus

Selected text uses a soft sage grey mixed from the palette (16% ink on paper) with green text; in the footer it's paper on green. The footer focus ring is paper. No lime.
