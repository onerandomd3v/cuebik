# Cuebik — Workspace and Dependency Boundaries

> **Purpose:** Explain how contributors work across Cuebik's monorepo without unintentionally coupling its applications, packages, or backend workloads.
>
> **Status (13 October 2026):** The directory structure is present on `main` after PR #7. The app/service directories and shared-package directories are **tracked placeholders**, not runnable projects or implemented libraries. This guide records existing architectural boundaries and describes **future enforcement criteria**; it does not claim that workspace tooling, build scripts, deployment pipelines, import restrictions, or APIs have been implemented.
>
> **Document authority:** [`PRODUCT.md`](../PRODUCT.md) governs product functionality and policy. [`ARCHITECTURE.md`](../ARCHITECTURE.md) governs approved technologies, architectural ownership, deployment boundaries, and pending decisions. [`BRAND.md`](../BRAND.md) governs the Cuebik identity; [`apps/web/DESIGN.md`](../apps/web/DESIGN.md) governs landing/dashboard UI design. This file is a **contributor guide** for working within those decisions; it cannot independently approve new tools, services, functionality, or deployment providers.

## 1. One repository does not mean one application

```text
cuebik/
├── apps/
│   ├── web/                 # Grouping only; not a deployable application
│   │   ├── DESIGN.md        # Cuebik landing/dashboard design guidance
│   │   ├── landing/         # Standalone public Next.js app
│   │   └── dashboard/       # Standalone bank-staff Next.js app
│   ├── phones/              # Standalone fictional bank Next.js PWA
│   └── backend/
│       ├── api/             # Django + Django Ninja Core API
│       ├── intelligence/    # Python customer intelligence/recommendations
│       ├── agent/           # Python Central Agent and Model Gateway
│       └── delivery/        # Python Temporal delivery workers
├── packages/
│   ├── contracts/           # Shared, versioned interface contracts
│   └── ui/                  # Optional shared Cuebik landing/dashboard UI
├── infra/                   # Infrastructure configuration when implemented
└── assets/
    └── brand/               # Existing approved Cuebik brand assets
```

**Directory names describe responsibilities, not implicit dependencies.** The folders currently contain no application scaffolds. `packages/` holds optional reusable libraries, not applications to deploy separately by default.

## 2. Independence has four distinct meanings

| Boundary | Intended behavior |
| --- | --- |
| **Development** | A contributor can modify the landing app without changing dashboard, phones, or backend source files. |
| **Build/test** | Each app has its own build and test target. Building one app does not require building the other frontend apps or compiling the backend; it may need the shared libraries it explicitly imports. |
| **Deployment** | Landing, dashboard, and phones have independent release artifacts and deployment targets. Publishing one does not inherently redeploy the others. |
| **Runtime** | Each frontend app runs as its own application, yet dashboard and phones legitimately depend on authorized Core API endpoints for product behavior. Separate deployment is **not** isolation from contractual API dependencies. |

**Approved direction, not implemented capability:** `apps/web/landing/`, `apps/web/dashboard/`, and `apps/phones/` will each own their application source, manifest, configuration, tests, and deployment target **when built**. `apps/web/` itself must not be turned into one combined Next.js executable. Root-level tooling may coordinate the workspace without replacing these application-specific build boundaries.

**Shared code is an intentional dependency.** A change to a package or API contract may affect multiple consumers when they next build, test, or run. Independence does not promise that shared-contract changes have zero impact; affected consumers must be validated.

## 3. Frontend code and component ownership

| Owner | May contain | Must not become |
| --- | --- | --- |
| `apps/web/landing/` | Its public pages, responsive navigation, layout, and landing-specific components; optional explicitly consumed Cuebik UI primitives | A dependency on dashboard-internal components or dashboard-specific page shells |
| `apps/web/dashboard/` | Its reusable sidebar, top bar, dashboard shell, page-specific tables/forms, and staff workflows; optional shared Cuebik primitives | A component source imported directly by landing or phones |
| `apps/phones/` | The **single standalone** virtual-phone application: fictional bank UI, Banking App, SMS, Email, Notifications views, and its own bank-specific components and styling | A consumer of `packages/ui/`, `apps/web/` components, or Cuebik landing/dashboard styles |
| `packages/ui/` | **Optional** reusable Cuebik-branded UI primitives useful to landing and dashboard (for example, generic buttons, inputs, and badges) | The dashboard sidebar/top bar, complete app screens, the phones design system, or a required runtime service |
| `packages/contracts/` | Shared, versioned API/data interface definitions or clients where appropriate | A shared business-authority layer, an excuse to import another app's internals, or a single unvalidated schema assumed to work across Python and TypeScript without translation |

**Agreed restriction:** `apps/phones/` must not import Cuebik's `packages/ui/`, any `apps/web/` components, or their styling. It has a separate fictional-bank identity, while using explicit, validated backend contracts for customer-scoped data. `apps/web/DESIGN.md` does **not** govern phones.

**App-private imports stay private:** Landing, dashboard, and phones must not import each other's `src/`, `app/`, `components/`, or private configurations. If genuinely reusable Cuebik UI becomes necessary, consider extracting a **small explicit shared primitive** into `packages/ui/` after evaluating its consumers; do not relocate whole app shells there by default.

**Dashboard consistency:** The dashboard should define its persistent sidebar, top navigation, and page shell once within the dashboard application and reuse them across its routes. The existing design guide specifies a 240px sidebar, 64px top bar, stable navigation, and desktop-oriented layouts. Page content changes, not the ownership of the navigation shell.

**Package availability is opt-in:** Merely placing `packages/ui/` at repository root never makes it a dependency of every application. A future package manifest must declare the dependency explicitly; future import-boundary checks must reject forbidden imports. Sharing a development workspace or package manager does not require shared visual design.

## 4. Backend responsibilities and authority

| Directory | Responsibility | Deployment position |
| --- | --- | --- |
| `apps/backend/api/` | Core API, authoritative bank-scoped records, catalog, policy decisions, approvals, engagement status transitions, and validated interfaces | Independently deployed backend core |
| `apps/backend/intelligence/` | Permitted customer features, traceable eligibility-first recommendation evaluation, and Recommend / Clarify / Suppress results | Independently testable Python workload; **separate deployment is a candidate**, not a mandated microservice |
| `apps/backend/agent/` | Central Agent planning and bounded language/model assistance through its internal Model Gateway; produces validated proposals | Separate worker runtime; deploy independently where justified |
| `apps/backend/delivery/` | Independently runnable Temporal workers for authorized scheduling, channel handoff, retries, and evidence-backed delivery/feedback processing | Independently runnable worker deployment; requires final Core API authorization |

**Authority remains centralized:** The Core API with PostgreSQL is the business source of truth. Neither Intelligence, Agent, Delivery, nor a frontend may grant its own outreach permission, mutate protected approval/engagement state outside authorized Core API contracts, or access another service's private database tables as an undocumented interface. The model proposes; deterministic bank policy and required review authorize; Delivery rechecks permission, product, policy, and approved message state before dispatch.

**Runtime composition is deliberate:** A logical module, Python worker, process boundary, and network-deployed service are not always the same thing. Preserve independently testable responsibilities without inventing a requirement to deploy every subdirectory as a microservice. Temporal coordinates durable workflows; it does not replace PostgreSQL or the Core API's authority.

**Channel ownership and evidence:** The initial experience uses explicitly authorized, linked synthetic recipients and simulated inboxes. CSV-only customers without an authorized simulator recipient remain analyzable but must not receive invented phone messages. Real SMS/email integrations, if later configured, must operate under bank-controlled accounts or an authorized bank gateway; status labels must reflect genuine simulated or real evidence, not UI events or workflow enqueueing alone. These are product/architecture constraints, not delivery implementations in this document.

## 5. Contracts between applications and services

- Use **documented, validated, bank-scoped APIs/events** rather than importing another deployed application's private source or accessing its private tables.
- `packages/contracts/` is the reserved home for reusable versioned interface artifacts **where applicable**. The authoritative OpenAPI/schema design and the mechanism for generating or consuming clients across TypeScript/Python remain implementation decisions. A TypeScript package is not automatically importable by Python.
- Treat changes to request/response fields, schema revisions, authentication, customer identifiers, status semantics, or policy evidence as potentially cross-application changes. Update contracts and verify consumers intentionally.
- Landing may link to the dashboard's sign-in flow, but must not require privileged customer data simply to render its public pages.
- Phones and dashboard may use the **same** authoritative backend records through **different, authorized access scopes**. Phones' fictional bank branding and standalone deployment do not create a second authority for customer or engagement state.
- The backend must support both approved evidence inputs: validated bank-dashboard CSV imports and permitted fictional simulator activity, with traceability and consistent identity scope.

## 6. Day-to-day contribution expectations

When implementation begins, contributors should:

1. Identify which app/service owns the change and consult its relevant source-of-truth documents.
2. Make app-specific changes inside that owner; do not edit unrelated apps or copy private code across app boundaries.
3. Add shared-library dependencies only when there is an explicit reusable contract or component, with compatible consumers identified.
4. Validate the changed project's own build/tests and **also** affected consumers of any changed shared package or API contract.
5. Keep backend authorizations and delivery status transitions testable end to end; do not replace working functionality with hardcoded front-end results.
6. Document genuine new cross-boundary decisions in the authoritative architecture/product docs before representing them as approved.

**Commands are intentionally not specified yet.** There are no project manifests, configured workspaces, install commands, runnable local services, CI workflows, or selected deployment targets in the scaffolded repo. Do not instruct contributors to run invented commands or treat a directory's `.gitkeep` as proof of implementation.

## 7. Converting documented boundaries into enforceable behavior

The following are **implementation acceptance criteria to specify and implement later**, not assertions about the present repository or an approval of a particular tool/vendor:

| Area | Required outcome when configured | Still to decide |
| --- | --- | --- |
| Workspace management | Root coordination can identify each independent app and explicitly referenced shared packages | Workspace/package manager, package manifests, lockfile strategy, install scripts |
| Frontend builds | Landing, dashboard, and phones can each be built and tested independently, consuming only declared dependencies | Build scripts, dependency caching, environment-variable validation, test tools |
| Import boundaries | Automated checks reject cross-app private imports and **all phones-to-Cuebik-UI imports** | Linter/dependency graph rules, package export maps, test fixtures |
| Backend execution | API, intelligence, agent, and delivery are runnable/testable according to their approved service responsibilities | Process entrypoints, protocols, worker orchestration, intelligence deployment topology |
| Interface compatibility | Changed contracts validate on both producer and consuming sides, including authentication and bank/customer scope | Schema locations, generated clients, versioning and compatibility policy |
| CI/release isolation | App-only changes do not trigger unrelated releases; shared changes test relevant consumers; deploy credentials are scoped | CI provider, path/dependency change detection, deployment targets, secrets strategy |
| Real operational safeguards | Database authority, policy rechecks, idempotency, and audit evidence survive retries and failures | Specific schemas, outbox/reconciliation, Temporal activity contracts, observability and test cases |

**Proof, once implementation starts:** A phones-only UI change can build/test/deploy phones without rebuilding landing or dashboard; a landing-only change behaves likewise; a forbidden phones import from `packages/ui/` fails a check; a shared contract change runs the relevant consumer checks; Delivery cannot dispatch after consent or authorization becomes invalid. These are targets for future verification, **not tests already passing today**.

## 8. Changes to this guide

Keep this guide synchronized with [`ARCHITECTURE.md`](../ARCHITECTURE.md), and preserve the distinction between **agreed boundaries**, **implementation choices still pending**, and **working safeguards with evidence**. Propose consequential changes through review rather than treating an illustrative example or tool suggestion as automatically approved.
