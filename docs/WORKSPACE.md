# Cuebik Workspace Guide

> **Purpose:** Explain how the Cuebik monorepo is organized, how its independent projects and shared packages relate, and how to develop, build, test and deploy them as implementation progresses.
>
> **Status:** The three frontend applications now have initial Next.js scaffolds, a pnpm workspace and a lockfile. GitHub Actions has verified frozen dependency installation, app-specific lint/typecheck/builds, standalone HTTP startup, and import-boundary tests on Node.js 24. Backend services and shared packages remain placeholders; release targets and banking product functionality are not implemented.
>
> **Audience:** Both developers and coding agents may consult this guide for workspace understanding. The separate root-level `AGENTS.md` provides coding-agent and contributor operating instructions.

## 1. Documentation boundaries

| Document | Owns |
| --- | --- |
| [`PRODUCT.md`](../PRODUCT.md) | Product requirements and customer-facing behavior |
| [`ARCHITECTURE.md`](../ARCHITECTURE.md) | Approved architecture, technology choices, authority and pending design decisions |
| [`BRAND.md`](../BRAND.md) | Cuebik identity |
| [`apps/web/DESIGN.md`](../apps/web/DESIGN.md) | Landing/dashboard visual and interaction specifications |
| **`docs/WORKSPACE.md`** | Repository layout, dependency ownership, local-development setup, build/test workflows and release isolation |
| **`AGENTS.md`** | Concise working rules for developers and coding agents, with links to the authoritative documents |

This document explains **where work belongs and how projects fit together**; it must not re-specify product policies, visual measurements or backend algorithms. Refer to the other documents for those decisions. The root-level `AGENTS.md` links here rather than restating the workspace description.

## 2. Repository structure

```text
cuebik/
├── apps/
│   ├── web/                # Grouping only, not an app or build
│   │   ├── DESIGN.md
│   │   ├── landing/        # Independent public Next.js app
│   │   └── dashboard/      # Independent staff Next.js app
│   ├── phones/             # One standalone fictional banking PWA
│   └── backend/
│       ├── api/            # Django Core API
│       ├── intelligence/   # Python intelligence/recommendation logic
│       ├── agent/          # Python agent and Model Gateway
│       └── delivery/       # Python Temporal worker runtime
├── packages/
│   ├── contracts/          # Reserved shared interface contracts
│   └── ui/                 # Optional Cuebik web UI library
├── infra/
└── assets/
    └── brand/
```

**`apps/` contains applications and runnable responsibilities; `packages/` contains code that projects may deliberately share.** A root-level package is not automatically an application dependency. The plural name `apps/phones/` identifies **one** virtual-phone application containing Banking App, SMS, Email and Notifications views, not four separately deployed apps.

### What independence means

| Dimension | Expected outcome when implemented |
| --- | --- |
| Development | Changes to one app usually remain in that app and its declared dependencies. |
| Build and test | Landing, dashboard and phones have their **own** targets; building one does not require building the other frontend apps. Declared shared dependencies may still need building. |
| Deployment | Each app has its own artifact and release path, so publishing one need not publish the others. |
| Runtime | Each app runs independently, but dashboard and phones still legitimately use the authorized Core API. Separate deployment does not mean disconnected data. |

The backend has its own responsibilities: `api` is authoritative; `intelligence` is independently testable (separate deployment remains a candidate); `agent` and `delivery` have separately runnable worker roles where defined. **A distinct folder does not mandate a distinct microservice.** See `ARCHITECTURE.md` for execution boundaries and operational authority.

## 3. Reusable UI and dependency ownership

**Component reuse applies to the whole interface, not only buttons or dashboard navigation.** An application can reuse its own layouts, shells, headers, menus, tables, charts, filters, forms, dialogs, empty states, status displays and domain-specific components across many pages.

| Usage | Appropriate home |
| --- | --- |
| Reused by several pages **inside one app** | That app's own components and modules |
| Genuinely shared by **landing and dashboard** with a consistent Cuebik interface | Consider `packages/ui/` and an explicitly declared dependency |
| Specific to the fictional bank experience | `apps/phones/` and its own design system |

**`packages/ui/` is an optional, reusable Cuebik UI library, not a compulsory destination for components.** The architecture currently describes shared primitives as its starting scope. Useful composable patterns can also be evaluated as reuse emerges; shared-package expansion must be deliberate and aligned with the architecture/design documents. Avoid premature abstractions, duplication, and moving entire app shells or business screens into the package simply because they are reusable *inside one application*.

For example, a dashboard shell can be reused across dashboard pages without becoming a package. The same reasoning applies to any app's tables, forms, navigation or page layouts; **no example filename is an implementation requirement**.

**Hard frontend boundary:** landing, dashboard and phones must not import one another's private application source or configuration. **`apps/phones/` must not import `packages/ui/`, `apps/web/` components, or Cuebik web styling.** It owns its bank-specific UI independently; the landing/dashboard design guide does not apply to it.

Package consumption is **explicit and opt-in** through future manifests. A shared UI library is normally included in the consuming app's build output, not deployed as an independent running website. Changing shared code or contracts can affect multiple consumers; validate affected applications rather than assuming deployment independence prevents all coupling.

**`packages/contracts/`** is reserved for appropriately versioned data/API interface definitions or client artifacts. It does not own business state or permit app-private source imports. Cross-language schema and client generation must be designed explicitly; TypeScript packages are not directly importable into Python.

## 4. Integration boundaries

Frontend applications and backend workloads communicate through **authorized, validated, bank-scoped APIs or contracts**, not private source imports or undocumented direct access to another component's storage.

The Core API and PostgreSQL own protected banking business state. Agent proposals, intelligence evaluations and delivery workers cannot bypass API authorization or bank policy. Exact rules for customer identity, permissions, approval, delivery evidence and provider adapters live in [`PRODUCT.md`](../PRODUCT.md) and [`ARCHITECTURE.md`](../ARCHITECTURE.md), not in a duplicate specification here.

When a shared interface changes, validate the producer **and all relevant consumers**, including bank/customer scoping and status semantics. Sharing a contract does not mean sharing a component library or combining deployments.

## 5. Working, building and testing

The **frontend** has verified installation, lint, typecheck, build, production-start smoke checks and import-boundary tests as documented below. The development-server commands are configured but have not been smoke-tested. **Backend runtime, deployment and release procedures are still pending**; do not invent commands or claim those capabilities work.

As each project is implemented, add a concise, **verified** workspace reference for that project's:

- Directory, prerequisites, runtime entry point, and commands to install, develop, test, lint, type-check and build, as applicable.
- Environment variable **names** and setup instructions; never publish secrets.
- Required local backend/database/Temporal dependencies and startup order.
- Output artifacts, release target, deployment procedure, and operational checks once configured.
- Shared dependencies and how changes to those dependencies affect tests/builds.

A project-specific change should run that project's checks; a shared-package, contract or infrastructure change should also exercise affected consumers. Note commands that are not applicable, instead of pretending they exist. Document failures, not just passing results.

### Frontend workspace (initial scaffold)

**Runtime:** Node.js 24 LTS and pnpm 11.28.4. Run commands from the repository root after installing the pinned runtime and pnpm version.

```sh
pnpm install --frozen-lockfile
pnpm --filter @cuebik/landing dev      # http://localhost:3000
pnpm --filter @cuebik/dashboard dev    # http://localhost:3001
pnpm --filter @cuebik/phones dev       # http://localhost:3002
pnpm --filter @cuebik/landing build
pnpm --filter @cuebik/dashboard build
pnpm --filter @cuebik/phones build
pnpm run lint
pnpm run typecheck
pnpm run check:boundaries
pnpm run test:boundaries
```

Each frontend app has its own source, package manifest, TypeScript/ESLint configuration and Next.js build target. The root pnpm workspace coordinates installs without combining the three apps. The optional `packages/ui/` and `packages/contracts/` directories remain placeholders rather than installable packages. Import-boundary checks reject frontend cross-app private-source imports and phones-to-Cuebik UI imports; this check is not a replacement for runtime authorization.

**Verification:** [Frontend CI](https://github.com/onerandomd3v/cuebik/actions/runs/38733437449) passed on Node.js 24 with pnpm 11.28.4: frozen install, per-app lint/typecheck/build, standalone server HTTP smoke tests (ports 3000/3001/3002) and AST-based import checks with negative tests. Root aggregate convenience scripts and interactive `next dev` have not been individually exercised. Browser/PWA completeness, backend commands and independent deployment infrastructure remain pending.

## 6. Evolving the implemented workspace

The following is a **living implementation register**, distinguishing implemented and CI-verified frontend capabilities from still-pending work. Update each entry alongside approved configuration changes and verified results.

| Concern | Required capability | Current status |
| --- | --- | --- |
| Workspace dependencies | Explicit app/package manifests and controlled dependency installation | **Frontend implemented, CI-verified:** pnpm workspace, manifests, pinned pnpm, lockfile and frozen install; shared packages not yet implemented |
| Local development | Independent start, test, lint and build targets per project | **Frontend partially verified:** each app builds, type-checks, lints and serves separately in CI; interactive dev-server commands configured but not smoke-tested; backend pending |
| Import enforcement | Checks reject private cross-app imports and phones importing Cuebik web UI | **Frontend implemented, CI-verified:** TypeScript AST-based source-import check and negative tests; not a substitute for access control or future package export rules |
| Interface validation | Versioned producer/consumer checks | **Pending:** schema strategy and compatibility checks |
| Backend execution | Defined Core API and appropriate worker startup/test paths | **Pending:** executable entry points and service configuration |
| CI and release isolation | Relevant checks and deployments run for changed projects and shared consumers | **Partially implemented:** GitHub Actions matrix checks each frontend independently; affected-project-only execution, deployments and deployment permissions remain pending |

**Boundary verification:** isolated frontend app builds and HTTP startup, plus forbidden phones-to-`packages/ui` import tests, now pass in CI. Independent **deployments**, dependency-aware test selection and shared-contract consumer checks remain future acceptance criteria, not completed capabilities.

### Keeping this guide current

Update `WORKSPACE.md` alongside changes to workspace manifests, actual developer commands, shared-package interfaces, boundary-enforcement configuration or CI/deployment workflows. Record what is **approved, implemented and verified**; remove obsolete placeholders. Keep product/architecture decisions in their source documents, and keep prescriptive coding-agent operating rules in the root-level `AGENTS.md` instead of copying them here.
