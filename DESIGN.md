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
| Display | Instrument Serif (400, italic) | Name, statement, section titles. Never body. |
| Reading | Inter (400/500/600) | Everything you read. |
| Label | JetBrains Mono (400/500) | Eyebrows, metadata, chips, clock, footer legal. |

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
| `--sprout` | `#c8f169` | same | Accent — pill hover, selection, one italic word. Sparingly. |
| `--paper` | `#f4f3ee` | `#101613` | The sheet |
| `--paper-2` | `#ebeae3` | `#161d19` | Nav track, thumb placeholders, hover fills |
| `--ink` | `#14201a` | `#ecefe9` | Text |
| `--ink-2` | `#5b665f` | `#a3ada6` | Secondary text |
| `--display` | `--green-800` | `#b7dcc6` | Name, page titles, wordmark dot |
| `--em` | `--green-700` | `#9fd4b8` | Italic accents, hovers, focus ring |
| `--btn-bg` | `--green-800` | `#21775a` | Active nav pill |
| `--accent` | `--sprout` | same | Primary call to action, with `--green-900` text. Distinct from the nav pill, still in family. |
| `--signal-text` / `--signal-dot` | `#bf4410` / `#e5322d` | `#ff8a4c` / `#ff5a4f` | The availability line, and nothing else |

`--display`, `--em` and `--btn-bg` exist because deep green disappears on a
dark ground (1.5:1). Every foreground/background pair in both themes clears
WCAG AA; the dark button clears the 3:1 non-text floor against the page.

### Type scale

Fluid, via `clamp()`:

- `--fs-name` `clamp(3.5rem, 16vw, 17rem)` — the name spans ~74% of the viewport at any width
- `--fs-h2` `clamp(2.25rem, 1.6rem + 3vw, 4.5rem)`
- `--fs-stmt` `clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem)` — hero statement
- `--fs-lead`, `--fs-body`, `--fs-sm` (0.875rem), `--fs-xs` (0.75rem, mono labels)

### Space, shape

- 8-step spacing scale `--s-1` (0.5rem) → `--s-8` (7rem).
- `--frame` `clamp(6px, 1.2vw, 16px)` — the green border around the sheet.
- `--radius` 18px for the sheet, blocks and cards; 12–14px for thumbnails; `--pill` for anything interactive.
- Container 1320px; gutter `clamp(1rem, 4vw, 3rem)`.
- Hairlines only (`--line`, 12% ink). No shadows.

## Components

- **Sheet** — the paper page inset in the green frame. Everything lives inside it.
- **Top bar** — sticky frosted glass (translucent paper gradient, 26px blur, saturate 190%, a highlight edge on top); mono wordmark, pill nav with a filled active state, live Berlin clock, primary CTA.
- **Hero** — bio, two buttons, then the availability line (left column, right column left open) → the name across the full width at the bottom of the first viewport. No eyebrow, no divider, no metadata.
- **Focus cards** — numbered, hairline-bordered, lift on hover. Three: mobile-first, subscription, cross-functional.
- **Work cards** — 4:3 image, title + ↗, mono chips. Image scales on hover.
- **Case rows** (Projects, Personal) — number / 160px thumb / serif title + blurb + chips.
- **Paper rows** (Research) — number / title / mono meta, hairline-separated.
- **Orbit** (About → What I do) — a short blurb beside a hand-drawn-feeling constellation: the word *Simone* in italic serif, five thin arms at irregular angles ending in a small circle and an uppercase mono label. Four are background (Education / CRM stack / Code / AI tools) and open into skill leaves; the fifth, **Services**, hangs downward and opens into four category nodes (Strategy / Technical / Communications / Process), each of which opens into its own list. Arms are exclusive; categories are exclusive with each other. Services opens by itself once the map scrolls into view; everything else starts closed. The field drifts ±7° and each arm sways ±3°; every label is anchored by its dot and counter-rotates all three angles so text stays horizontal and dots stay on their lines. Closed branches are `visibility: hidden` so they never intercept clicks. On narrow screens only the arms and the four category nodes are drawn; skills (second and third level) are listed as chips under the map.
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

- Name and title are always the largest things on the home page.
- The hero is a person, not a pitch: bio, buttons, then availability. Industry preference is stated as a preference ("Preferred, not required") right before Projects. B2C only; the AI note and llms.txt say so explicitly.
- Services are listed as capabilities in her own words; nothing invented.
- Photos are placeholders pending new headshots; slots are 4:5 in About and 4:3 in cards.
- Personality is stated, not implied: tech and psychology, and the question of building technology that leaves people better off. The Research lede ties the academic work to the same thread.

## Still to do

- New headshots (4:5) and a hero-worthy photo for the About section.
- An Open Graph image (1200×630) so shared links get a preview card.
- A favicon in the green.
