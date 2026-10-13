# Cuebik Backend — Codex Instructions

Applies to `apps/backend/` and its descendants. Follow the repository-root `AGENTS.md` as well.

## Service responsibilities

Use the approved Python architecture in `ARCHITECTURE.md`:

- `api/`: Django + Django Ninja Core API, validated interfaces and authoritative PostgreSQL business records.
- `intelligence/`: Customer Intelligence and eligibility-first Recommendation Engine.
- `agent/`: Central Agent orchestration and its internal, provider-agnostic Model Gateway.
- `delivery/`: Temporal Python workers for durable, authorized communication execution.

Keep responsibilities independently testable. Do not create additional mandatory microservices, duplicate business authorities, or replace the selected backend technologies without approval.

## Data ownership and contracts

- Treat Core API and PostgreSQL as authoritative for bank-scoped customer records, catalog state, policies, approvals, engagements and status transitions.
- Validate input and enforce bank/customer scope at server boundaries. Never trust identifiers, roles or permissions merely because a frontend supplied them.
- Use documented, versioned service interfaces and explicit data contracts; do not bypass authorization through direct access to another service's protected state.
- Preserve provenance, freshness, product/policy versions and event attribution where required for explainable decisions and auditability.
- Keep secrets and sensitive customer information out of logs and committed fixtures.

## Intelligence and agent boundaries

- Apply deterministic product eligibility and exclusions before explainable relevance ranking. Keep verified facts, inferences, missing evidence and uncertainty distinct.
- Preserve structured Recommend, Clarify and Suppress outcomes; Clarify does not automatically initiate customer contact.
- The Central Agent may propose whether, when and how to engage and draft supported content; it cannot invent eligibility, authorize outreach or override bank policy.
- Keep external language-model providers behind the internal Model Gateway. Do not introduce direct provider dependencies into unrelated business logic.
- Do not introduce learned ranking models or unapproved model-serving infrastructure as substitutes for the agreed initial baseline.

## Authorization and delivery

- Apply the bank's current communication permissions, restrictions and deterministic Automate / Review / Withhold policy before any outbound engagement.
- Controlled automated outreach is limited to the approved, explicitly enabled eligible savings-product cases. Do not infer fixed-deposit automation. SME/credit outbound requires authorized human review when otherwise permitted.
- Required evidence or permission gaps cannot be bypassed. A model-generated message or a recommendation is never sufficient authorization.
- Temporal workers must perform final authorization and validity checks before dispatch. Design retries and external effects for idempotency, reconciliation and traceable failure recovery.
- Keep communication providers behind replaceable adapters and respect bank-controlled delivery connections.
- Do not promote a scheduled workflow or provider handoff into Sent or Delivered without the applicable evidence.
- Keep simulator messages explicitly simulated. Never create delivery evidence for unlinked CSV-only customers.

## Testing and verification

- Write focused tests for changed business rules, authorization boundaries, tenant isolation, stale evidence, approval invalidation and retry behavior, as applicable to the task.
- Use the approved canonical synthetic scenarios with independently defined expected outcomes when those fixtures have been implemented.
- Verify API/consumer contracts when changing schemas, state transitions or event semantics.
- Use only verified commands and configured tooling documented in `docs/WORKSPACE.md`; report unavailable checks rather than claiming they passed.

## Code Review Rules

Prioritize missing bank-scope checks, unauthorized state transitions, eligibility bypasses, stale approvals, unsafe retries, duplicate dispatch, unsupported delivery claims, provider lock-in and sensitive-data exposure. Identify the violated boundary and an appropriate correction.
