# Cuebik — Brand Guidelines

**Version:** 1.3.3  
**Updated:** 12 October 2026  
**Applies to:** Cuebik's website, product interfaces, presentations, documentation, and marketing materials.

This file is the **source of truth for Cuebik's brand identity**. Contributors and coding agents should follow its naming, colors, typography, logo, and messaging rules. Interface-level specifications belong in Cuebik's [`apps/web/DESIGN.md`](apps/web/DESIGN.md).

---

## 01. Brand identity

| Element | Standard |
| --- | --- |
| Product name | **Cuebik** |
| Logo wordmark | **cuebik.** — lowercase, with a yellow final period |
| Product category | **Banking Intelligence & Engagement Platform** |
| Tagline | **Make every recommendation count.** |
| Logo concept | **Timed Cube** — geometric cube with a segmented, partial timing arc |
| Primary audience | Banks and financial institutions |
| Product users | Authorized bank staff work in organization workspaces; banking customers receive recommendations through their bank’s channels |

### Official product definition

> Cuebik is a banking intelligence and engagement platform that analyzes customer financial behaviour, banking activity, and individual interests to recommend relevant financial products and coordinate personalized engagement through existing banking channels. Its agentic AI system matches products, coordinates engagement, and follows bank-defined controls. Banks connect their existing systems to Cuebik and use dedicated organization workspaces to monitor recommendations, manage team access, and determine which engagements are automatic, require approval, or are withheld.

Use this definition verbatim when the official full description is required. For shorter placements, use:

> Cuebik is a banking intelligence and engagement platform that helps banks understand their customers, recommend relevant financial products, and automate personalized engagement through their existing banking channels.

**Brand idea:** Structured intelligence acting at the right moment.

**Personality:** Intelligent, precise, modern, confident, trustworthy, and approachable. Cuebik is a **product**, not a bank or the name of its development team.

---

## 02. Color palette

Use these exact values for Cuebik's core identity.

| Color | HEX | Usage |
| --- | --- | --- |
| **Cuebik Black** | `#09090B` | Dark brand backgrounds; primary text on light backgrounds |
| **Cue Yellow** | `#F5E73F` | Signature accent, logo timing arc, wordmark period, selected highlights and key actions |
| **Off-White** | `#FAFAFA` | Light page and dashboard backgrounds |
| **Pure White** | `#FFFFFF` | Cards, content panels, and text/logo elements on dark backgrounds |
| **Muted Gray** | `#71717A` | Secondary text and supporting UI elements where contrast permits |

**Usage rules**

- Use **black and off-white as the foundation**; yellow is a purposeful accent, not a full-page default.
- Use **near-black text on yellow**. Do not put white text on yellow or yellow body text on off-white.
- Use off-white or white text for most content on black surfaces; reserve yellow for emphasis.
- Do not introduce another primary brand color without updating this guide.
- Use separate semantic status colors for success, warning, error, and information in the UI design system. Never communicate status through color alone.
- Check accessible contrast for each actual text/background combination.

---

## 03. Typography

| Use | Typeface | Rule |
| --- | --- | --- |
| Brand and interface text | **Inter** | Default for headings, body text, navigation, labels, and presentations |
| Technical content | **JetBrains Mono** | Only for code, identifiers, technical data, or carefully selected labels |
| Logo wordmark | **Approved SVG artwork** | Never recreate the wordmark with a regular text font |

- Use strong, concise headings, readable body copy, and generous whitespace.
- Prefer sentence case. Avoid long all-caps headings or paragraphs.
- Establish hierarchy through type size, weight, and spacing rather than decorative colors.
- Exact font sizes, line heights, and responsive text scales belong in `apps/web/DESIGN.md`.

---

## 04. Logo guidelines

### The Timed Cube

The logo combines a geometric cube with a **segmented, partial yellow arc** around its upper-right side. The cube conveys organized intelligence; the arc represents timing and the moment to act. The symbol can appear on its own or beside the lowercase **cuebik.** wordmark.

### Approved SVG assets

The files below are the canonical logo assets. **`dark` means for use on a dark background; `light` means for use on a light background.** SVG backgrounds are transparent.

| Asset | Use |
| --- | --- |
| [`assets/brand/wordmark/cuebik-full-logo-dark.svg`](assets/brand/wordmark/cuebik-full-logo-dark.svg) | Full logo on black/dark surfaces |
| [`assets/brand/wordmark/cuebik-full-logo-light.svg`](assets/brand/wordmark/cuebik-full-logo-light.svg) | Full logo on off-white/light surfaces |
| [`assets/brand/mark/cuebik-symbol-dark.svg`](assets/brand/mark/cuebik-symbol-dark.svg) | Compact icon on dark surfaces |
| [`assets/brand/mark/cuebik-symbol-light.svg`](assets/brand/mark/cuebik-symbol-light.svg) | Compact icon on light surfaces |

**Logo rules**

- Prefer the **full logo** where space allows; use the **symbol** for favicons, compact navigation, or app icons.
- Preserve original proportions, colors, geometry, and the yellow final period.
- Do not redraw the timing arc, add clock hands, complete the arc into a circle, rotate the mark, add gradients, or change the wordmark.
- Keep clear space around the logo. Do not place it over busy images or near competing visual elements.
- Confirm legibility at the final display size, especially when the segmented arc is small.
- Provide an accessible name such as “Cuebik” for logo links and images.

---

## 05. Visual style

Cuebik uses a **minimal, high-contrast, product-focused SaaS aesthetic**.

- **Layout:** Spacious, aligned, and uncluttered; one clear message per section.
- **Shapes:** Precise geometry, subtle borders, modest rounding, and restrained shadows.
- **Accent:** Use yellow intentionally for important highlights and actions, not as decoration everywhere.
- **Imagery:** Prefer realistic Cuebik interfaces, customer recommendation flows, and legible data visualizations.
- **Icons:** Consistent, simple line or geometric icons that complement the Timed Cube.
- **Motion:** Subtle, purposeful transitions. Respect reduced-motion settings.

Avoid generic robot imagery, excessive glows, ornamental gradients, crowded charts, or decorative 3D objects unrelated to Cuebik's product experience.

---

## 06. Brand applications

**Landing page:** A bold near-black hero, large off-white typography, restrained yellow highlights, and realistic product previews. The overall experience is minimal and product-led.

**Internal banking dashboard:** Light-first, with an off-white page canvas, white content panels, readable dark text, and a coordinated dark mode. Each bank's authorized team uses its own organization workspace for insights, agent activity, recommendations, approvals, and controls. Prioritize clarity over decorative branding.

**Banking customer experience:** Cuebik handles recommendation intelligence through connections with existing bank systems. Customers see approved outcomes within their bank's applications and channels. Follow the bank's branding requirements; do not make Cuebik look like the bank itself.

**CueBank fictional simulator:** **CueBank** is the canonical name of Cuebik's fictional demonstration bank, **not** a rename of the Cuebik platform or a real banking partner. Its standalone virtual-phone experience and dedicated synthetic-data bank organization use a distinct bank-inspired visual identity, separate from Cuebik's yellow-and-black brand system. Make its fictional/simulated nature visible; do not reuse Cuebik's wordmark as CueBank's logo or copy a real bank's official name, logo or proprietary screens. Normal bank workspaces retain their own authorized identities and do not inherit CueBank's seeded data. The product behavior and data isolation rules remain defined in `PRODUCT.md` and `ARCHITECTURE.md`.

**Pitch decks and marketing:** Use the full logo prominently on covers, clear product messaging, high-contrast layouts, and selective yellow accents. Use diagrams or product mockups instead of dense paragraphs.

---

## 07. Voice and messaging

**Voice:** Clear, direct, confident, human, and technically credible. Lead with the benefit before explaining how AI works. Use concise language without unnecessary jargon or repetitive legal phrasing.

**Consistent product terminology**

| Term | Meaning |
| --- | --- |
| **Cuebik** | The full product |
| **Customer Intelligence Layer** | Organizes customer financial and app-behaviour information into useful profiles |
| **Recommendation Engine** | Determines which financial products best match individual customers, or returns no suitable match |
| **Central Agent** | Coordinates whether, when, and how to propose customer engagement |
| **Policy & Autonomy Engine** | Enforces bank-defined automation, human review, and engagement withholding controls |
| **Internal Banking Dashboard** | The bank team's monitoring, insight, and control workspace |
| **Organization Workspace** | A bank-specific workspace where authorized employees monitor recommendations, manage team access, and control engagement |
| **CueBank** | Fictional demonstration bank and simulator identity, separate from Cuebik and real institutional bank workspaces |

**Preferred messaging:** “Banking intelligence and engagement.” “Relevant products for individual customers.” “Intelligent matching and personalized engagement.” “Banks stay in control.” “Make every recommendation count.”

**Avoid:** Generic technology-first claims, claims of perfect accuracy, guaranteed customer outcomes, unrestricted AI control, or real bank deployments and partnerships that have not been demonstrated. Include privacy, permission, and regulatory detail where the context requires it, rather than in every headline.

---

## 08. Brand assets and governance

**Asset and documentation ownership**

The approved SVG paths in [§04](#04-logo-guidelines) are the canonical brand assets. The **repository layout** is defined in [`ARCHITECTURE.md`](ARCHITECTURE.md), rather than duplicated here. The existing design guide now lives at [`apps/web/DESIGN.md`](apps/web/DESIGN.md), alongside the scaffolded web app directories.

- **`BRAND.md`** controls brand identity: names, messaging, logos, colors, typography, and overall visual direction.
- **`apps/web/DESIGN.md`** controls implementation: design tokens, responsive layouts, components, dashboard patterns, themes, and interaction details. It must follow `BRAND.md` where the two overlap.
- Use approved assets directly. Do not substitute generated approximations or edit the master SVGs inside product components.
- When a brand rule changes, update `BRAND.md` and the affected asset files first, then update design specifications and product surfaces accordingly.

**Do not treat sample product screens, illustrative customer data, or unverified performance claims as real bank records or production results.**
