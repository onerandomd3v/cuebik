---
version: "1.4"
name: "Cuebik Interface Design System"
description: "Desktop banking workspace and responsive public website"
colors:
  primary: "#F5E73F"
  onPrimary: "#09090B"
  canvasLight: "#FAFAFA"
  surfaceLight: "#FFFFFF"
  subtleLight: "#F4F4F5"
  textLight: "#09090B"
  mutedLight: "#52525B"
  borderLight: "#E4E4E7"
  canvasDark: "#09090B"
  surfaceDark: "#18181B"
  subtleDark: "#27272A"
  textDark: "#FAFAFA"
  mutedDark: "#A1A1AA"
  borderDark: "#3F3F46"
  focusLight: "#A18F00"
  focusDark: "#F5E73F"
  successLight: "#166534"
  pendingLight: "#92400E"
  infoLight: "#1D4ED8"
  dangerLight: "#B91C1C"
  successDark: "#86EFAC"
  pendingDark: "#FCD34D"
  infoDark: "#93C5FD"
  dangerDark: "#FCA5A5"
typography:
  display:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.1
  pageTitle:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 36px
  sectionTitle:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
  cardTitle:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 20px
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  buttonPrimary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: 40px
  buttonSecondary:
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: 40px
    light:
      backgroundColor: "{colors.surfaceLight}"
      textColor: "{colors.textLight}"
      borderColor: "{colors.borderLight}"
    dark:
      backgroundColor: "{colors.surfaceDark}"
      textColor: "{colors.textDark}"
      borderColor: "{colors.borderDark}"
  card:
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    light:
      backgroundColor: "{colors.surfaceLight}"
      textColor: "{colors.textLight}"
      borderColor: "{colors.borderLight}"
    dark:
      backgroundColor: "{colors.surfaceDark}"
      textColor: "{colors.textDark}"
      borderColor: "{colors.borderDark}"
---

# Cuebik — Interface Design System

**Version:** 1.4  
**Applies to:** Bank-facing dashboard and public landing page.

## Overview

**Authority:** Read `BRAND.md` first for the approved logo assets, brand colors, typefaces, and messaging. This file governs UI implementation; it does **not** define product features, AI logic, permissions, or APIs. If brand rules conflict, `BRAND.md` wins.

**Product context:** Cuebik is a Banking Intelligence & Engagement Platform for banks. Use `BRAND.md` for the authoritative product description.

**Visual direction:** Minimal, precise, high-contrast SaaS UI; generous whitespace, restrained yellow accents, realistic data displays. Prefer clarity and operational control over decoration.

- **Banking dashboard:** Desktop-only organization workspace for authorized bank staff, light theme by default with a complete dark theme. Target **1200 CSS px and wider**; use desktop interaction patterns, not mobile navigation.
- **Landing page:** Fully responsive from **320 CSS px** upwards; near-black hero, off-white typography, yellow accents, realistic product previews.
- **Bank-customer interface:** Not specified here. It should follow the host bank's design system, not the internal Cuebik dashboard styles.

## Colors

Use the front-matter tokens as canonical UI values. They implement the core palette in `BRAND.md` plus supporting neutrals; supporting tokens are not new brand colors. Components must consume semantic tokens rather than hard-coded colors. In `components`, use the `light` or `dark` variant matching the active dashboard theme; properties outside those variants apply in both themes.

| UI role | Light mode | Dark mode |
| --- | --- | --- |
| Page canvas | `canvasLight` | `canvasDark` |
| Card / panel | `surfaceLight` | `surfaceDark` |
| Muted surface | `subtleLight` | `subtleDark` |
| Primary text | `textLight` | `textDark` |
| Secondary text | `mutedLight` | `mutedDark` |
| Border / divider | `borderLight` | `borderDark` |
| Keyboard focus | `focusLight` | `focusDark` |

- **Primary action:** Cue Yellow (`primary`) with near-black text (`onPrimary`) in both themes. Never put white text on yellow.
- **Status text:** Use the `success`, `pending`, `info`, or `danger` token for the active theme, always with a visible text label; neutral/withheld states use muted text. Do not use brand yellow as an error or warning indicator.
- Never use color alone to communicate a result; verify contrast in the rendered UI.

## Typography

- **Inter** is the UI font; **JetBrains Mono** is reserved for identifiers, code, or technical values. Use the SVG wordmark from `BRAND.md`, not styled text.
- Use the named typography tokens for dashboard text. Prefer sentence case, left alignment, and tabular figures in numeric columns.
- `display` is for landing-page hero copy only; scale it down on narrow screens rather than reusing it on dashboard cards.
- Essential instructions and primary data must not rely on tiny caption text.

## Layout

**Dashboard shell:** Persistent left sidebar **240px**, top bar **64px**, main-content gutters **24px** (compact) / **32px** (wide), and **24px** typical card gaps. Show the active bank organization and account access in the header; do not display an organization switcher in the current single-organization employee experience; introduce one only if multi-organization membership becomes an approved product capability. Keep navigation stable. Use a capped reading width for text-heavy panels; let data tables take the width they need.

**Dashboard widths:**

| Width | Behaviour |
| --- | --- |
| 1200–1439px | Compact desktop: fewer card columns, 24px gutters; tables scroll inside their containers. |
| 1440px+ | Standard/wide desktop: 32px gutters, more data columns where useful. |
| Below 1200px | **No mobile dashboard layout.** Show a desktop-optimized notice. Do not silently remove controls or use device detection; keep essential content usable when the viewport narrows due to browser zoom. |

**Dashboard navigation:** Overview · Customers · Products & Catalog · Recommendations · Agent Activity · Approvals · Engagement · Policies & Automation. Organization Settings contains Team Members & Access and a nested Integrations entry. These are screen labels, not promises of implemented capabilities.

**Landing page:** Mobile **320–639px** (stacked layout and mobile navigation); tablet **640–1023px** (selective two-column layout); desktop **1024px+** (full navigation and editorial grids). Primary CTA: **Get started** (account and organization onboarding); offer **Sign in** for existing bank team members and **How it works** as a secondary action. Show the demonstration banking app as a separate customer-experience preview, not Cuebik's core product. No global horizontal overflow. Landing-page breakpoints must not inherit the dashboard restriction.

## Elevation & Depth

Panels use a neutral **1px border** and little or no shadow. Build hierarchy with spacing, text weight, and surface contrast before adding elevation. Do not use glassmorphism, glowing edges, heavy shadows, or ornamental gradients.

## Shapes

Use the documented corner-radius tokens: `sm` for inputs/buttons, `md` for cards, `lg` for larger panels and dialogs. Icons should come from **one consistent outlined set**, normally **16–20px**; important icon actions need text labels or accessible names. Use the spacing scale rather than arbitrary one-off gaps.

## Components

- **Buttons and forms:** One primary action per context; secondary actions are neutral. Inputs have persistent labels, visible keyboard focus, inline errors, and clear disabled/loading states. Destructive or consequential actions require confirmation. Apply these patterns to sign-in, registration, organization setup, and invitations, including visible progress and error states; do not invent authentication rules.
- **Tables:** Filter and sort controls above the data; readable headers, stable row actions, pagination, empty/loading/error states. Wide tables scroll **inside the table container**. Never conceal full identifiers without an accessible way to inspect them.
- **Cards and charts:** Cards summarize a decision or metric, including its time range. Charts must have labels, units, a time range, and an accessible textual equivalent. Do not invent metrics or display synthetic data as live results.
- **Details and review:** Use a detail panel/page for supporting evidence; dialogs for final confirmation. Approval decisions must make the action and its consequences explicit. Display the current organization and permitted actions clearly; avoid controls that imply unavailable permissions.
- **Recommendation UI:** Display **product match + rationale + next step**. Separate the recommendation engine's **WHAT**, the agent's **WHETHER/WHEN/HOW**, and the bank's **AUTOMATE/REVIEW/WITHHOLD** decision. An unsuitable match is a valid outcome, not an error.
- **Decision versus delivery status:** `Recommend`, `Clarify`, `Suppress` describe decision outcomes. `Proposed`, `Pending review`, `Approved`, `Sent`, `Delivered`, `Withheld`, `Failed` describe workflow execution. **Never imply `Recommended = Sent` or `Approved = Delivered`.** Show timestamps and actors when available.
- **Shared dashboard screens:** Overview = attention and activity; Customers = profiles and interests; Products & Catalog = bank offerings and eligibility definitions; Recommendations = match evidence; Agent Activity = orchestration status and decision history; Approvals = review queue; Engagement = channel/message outcomes; Policies & Automation = bank-controlled rule settings; Integrations = authorized bank-system connections; Organization Settings = workspace and authorized access. Use only controls supported by `PRODUCT.md`.

## Do's and Don'ts

- **Do** reuse tokens, components, and the approved SVG logo variants. **Don't** recreate branding or add competing accents.
- **Do** maintain both dashboard themes. **Don't** invent dark-mode styles independently on each screen.
- **Do** make loading, empty, error, blocked, and completed states distinct. **Don't** show a planned engagement as delivered.
- **Do** preserve keyboard focus, readable labels, sufficient contrast, and zoom access. **Don't** hide essential desktop workflows solely because a browser's CSS viewport has shrunk.
- **Do** keep the landing page responsive and the dashboard desktop-oriented. **Don't** introduce a mobile dashboard navigation system.
- **Do** label illustrative mockups and synthetic datasets. **Don't** present demos as real customer records or measured bank outcomes.

**Agent handoff:** Read `BRAND.md` → read this file → check the current product specification and implemented components → design only the requested screen. Do not add features, roles, permissions, or integration states based solely on visual examples.
