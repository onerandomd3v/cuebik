# Cuebik — Codex Instructions

## Scope

These instructions apply throughout the Cuebik repository. More specific `AGENTS.md` files add guidance for their directories. When starting from the repository root, explicitly inspect the applicable nested instructions for work inside `apps/web/`, `apps/phones/`, or `apps/backend/` if Codex has not loaded them.

Cuebik is a **banking intelligence and engagement platform**. Do not describe it as an "AI-powered" platform or frame ordinary project documentation as a hackathon deliverable.

## Sources of truth

Consult the documents relevant to the assigned task:

- `PRODUCT.md`: product behavior, boundaries and approval workflows.
- `ARCHITECTURE.md`: approved technology, service responsibilities, integration and data authority.
- `BRAND.md`: product naming, identity and messaging.
- `apps/web/DESIGN.md`: Cuebik landing/dashboard interface design.
- `docs/WORKSPACE.md`: repository ownership, shared dependencies and verified development workflows.
- `docs/DECISION_REGISTER.md`: approved implementation decisions and remaining decision gates.
- `docs/CONTRACT_BASELINE.md`: cross-language schema/consumer requirements and acceptance checks.
- `docs/RELEASE_1_PLAN.md`: Release 1 workstream responsibilities and dependency plan.

Do not read every document before every trivial edit. Read what the task requires. Historical presentations, illustrative examples and unimplemented proposals do not override current approved specifications. Where sources conflict or approval is unclear, identify the conflict rather than silently selecting a new product or architecture decision.

## Autonomy and approvals

- Complete the assigned task independently within its authorized scope, including necessary local fixes and relevant verification.
- Do not expand product scope, change architectural boundaries, introduce a new service, or replace selected technologies without explicit approval.
- Before adding a **production dependency**, explain why it is needed, alternatives considered and the effect on maintenance or operations; obtain approval.
- Prefer existing capabilities and simple implementations over speculative abstractions, unnecessary dependencies or premature infrastructure.
- Do not silently turn recommendations, optional capabilities or pending decisions into approved requirements.
- Preserve unrelated files and existing work. Do not overwrite another contributor's changes or perform destructive operations without authorization.

## Engineering integrity

- Implement working functionality consistent with the task and the approved backend authority; do not present hardcoded UI outcomes as completed business functionality.
- Preserve organization/customer isolation, permissions, versioned decisions and evidence-backed state wherever the task touches those concerns.
- Do not fabricate recommendation evidence, approvals, communication dispatches, deliveries, customer interactions or performance metrics.
- Never commit credentials, customer secrets or sensitive production data. Use appropriately scoped configuration and synthetic test fixtures.
- Keep changes understandable, typed and maintainable where applicable. Reuse relevant existing code without introducing improper cross-project dependencies.

## Verification and documentation

- Inspect the affected implementation and use actual configured project commands from `docs/WORKSPACE.md` or the relevant manifests.
- Run focused tests and appropriate checks for the change; test affected consumers when modifying shared packages or contracts. Fix failures caused by the assigned work when feasible.
- Do not invent commands, passing tests, deployment status or functionality. Report checks not run and why.
- Update the relevant authoritative documentation when an approved change modifies its decisions. Update `docs/WORKSPACE.md` when verified workspace commands, dependency boundaries or build/deployment procedures change.
- Do not add unrelated documents, configuration, tools or dependencies merely to make the repository appear complete.

## Git and delivery workflow

- Use a feature branch for changes intended for review; do not commit directly to `main`.
- For implementation tasks, identify one accountable human engineer, the authoritative product behavior, touched paths, dependent contracts, explicit acceptance/negative tests and approved dependency scope before asking Codex to implement. Planning labels A–D are not actual assigned collaborator accounts.
- Submit work through a pull request for human review when the task calls for repository delivery.
- Never automatically merge a pull request, bypass review, or force-push shared history.
- Do not deploy, send real customer communications, rotate credentials or modify live infrastructure without explicit authorization.
- At handoff, summarize the change, affected paths, verification results, unresolved issues and decisions requiring approval.

## Code Review Rules

Flag changes that violate service ownership, bank-scoped authorization, product eligibility, communication-policy enforcement, or evidence-backed statuses. Flag unauthorized production dependencies, cross-application private imports, secrets and claims of functionality unsupported by implementation or tests. Give a concrete reason and a safe corrective path.
