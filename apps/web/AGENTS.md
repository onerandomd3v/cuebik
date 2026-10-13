# Cuebik Web Applications — Codex Instructions

Applies to `apps/web/` and its descendants. Follow the repository-root `AGENTS.md` as well.

## Application boundaries

- `landing/` and `dashboard/` are independent Next.js + TypeScript applications with separate build and deployment responsibilities.
- `apps/web/` is an organizational directory, not a combined application.
- Keep application-specific components, routes, styling and internal modules within their owning application. Do not import one application's private implementation into another.
- Do not import UI components or styling from `apps/phones/`, or treat the banking simulator as a Cuebik-branded frontend.

## Design and reusable components

- For Cuebik-facing visual work, use `BRAND.md` and `apps/web/DESIGN.md`. Use `PRODUCT.md` where the interface depends on product behavior.
- Build reusable, composable components for repeated patterns: layouts, navigation, forms, tables, filters, dialogs, visualizations, status displays and other justified interface structures.
- Reuse components within their owning application. Consider `packages/ui/` only when landing and dashboard genuinely need a shared Cuebik component or pattern with a coherent interface.
- Do not force every reusable component into `packages/ui/`. Do not introduce an abstraction merely because two implementations look similar.
- Keep page shells, route structure and domain-specific screens application-owned unless an approved architectural change establishes another boundary.
- Maintain the documented design language and responsive, accessible behavior. Avoid introducing competing visual conventions.

## Functional interfaces

- Use real, authorized backend contracts for functional customer, product, recommendation, approval and engagement screens.
- Preserve distinctions between recommendations, agent proposals, policy decisions, approvals and delivery statuses.
- Provide meaningful loading, empty, error, validation and permission-denied states for implemented functionality.
- Do not present a decorative mockup, hardcoded statistic or inactive control as a working feature.
- Enforce authorization on the backend; frontend visibility or disabled controls are not security boundaries.
- Do not invent authentication methods, employee roles or unavailable product capabilities from visual examples.

## Verification

Use the application's actual configured checks once available, including appropriate type checks, tests, accessibility and responsive verification. Verify affected consumers when shared UI or contracts change. Follow `docs/WORKSPACE.md` for confirmed commands; do not assume build tooling already exists.

## Code Review Rules

Flag cross-app private imports, divergence from Cuebik's approved design, inaccessible controls, misleading functional states and UI behavior that implies unauthorized capabilities.
