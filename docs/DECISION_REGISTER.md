# Cuebik — Release 1 decision register

**Approved:** 15 October 2026. **Status:** Cross-team design decisions accepted; concrete schemas, fixtures and provider validations still to implement and review.

**Authority:** \`PRODUCT.md\` defines product behavior; \`ARCHITECTURE.md\` governs technology and service boundaries. This register records their approved implementation approach, not a new competing specification.

## Seven approved cross-team decisions

| ID | Decision | Mandatory engineering consequences |
| --- | --- | --- |
| D-01 Scope | **Release 1 is the complete functional baseline in \`PRODUCT.md §11.1\`; §11.2 is the later roadmap.** | Persisted and authorized behavior, not illustrative screens, static model outputs or scaffolds, is required for completion. Later capabilities can be tracked but are not hidden Release 1 requirements. |
| D-02 Identity | **Django-managed authenticated staff sessions; one initial Super Admin with a separately granted approval capability; server-derived bank/customer scope.** | Scope and permissions are verified on the backend, not trusted from the browser. Negative tests must cover unauthenticated access, missing approval capability, forged scope and two-bank isolation. Simulator customer identity is a separate trust context. |
| D-03 Contracts | **Core API/Django Ninja OpenAPI is the authoritative HTTP producer contract; versioned, reviewed schemas generate TypeScript consumers.** | Affected consumers and the Core API must be checked on schema changes. Do not hand-copy type definitions as independent authorities or read protected database state from another service. Exact fields and generator remain to be implemented. |
| D-04 Fixtures | **One canonical reviewed synthetic bank/customer/product/event dataset, with expected outcomes defined independently of engine outputs.** | Include savings, fixed deposits and SME/credit, eligibility/unknowns, permissions, evidence freshness, lifecycle transitions and expected Recommend/Clarify/Suppress. Keep a second minimal synthetic bank solely for tenant-isolation tests. No real-world performance claims. |
| D-05 Policy | **New organizations start in Manual Review.** Only an expressly activated policy may automate qualifying permitted savings outreach. | No automatic outreach without positive, current permission and active rule. SME/credit outreach still requires authorized review. Fixed-deposit automation is not approved. Policy drafts and unapproved messages cannot dispatch. |
| D-06 Simulator | **Explicit bank + customer + demo-session + authorized recipient linkage, uniquely identified source events, and channel-specific simulated acknowledgements/feedback.** | CSV-only customers without a linked simulated recipient remain analyzable but receive no inbox item. Only one chosen channel is dispatched per authorized engagement. Distinguish simulated Sent, Delivered/Available, Viewed and Failed by evidence; deduplicate input. |
| D-07 Reliability | **Core API authoritative state, transactional outbox/reconciliation, Temporal workflow/activity boundaries, idempotency and a final Core API authorization recheck before dispatch.** | Invalid/changed product terms, missing permissions, rejected/expired approval, stale message version or duplicate retry cannot produce unauthorized/duplicate simulated messages. Queueing/provider acceptance is not Delivered. |

## Implementation-specific safeguards

**Identity:** Use Django session/security primitives, explicit effective staff permissions, server-side organization/customer scope, CSRF protections, appropriately secured cookies and session invalidation. Super Admin ownership does not automatically grant the capability to approve an outreach proposal. The fictional banking simulator authenticates a *separate customer-demo session* and derives its linked bank/customer identity server-side. Cookie/origin deployment configuration, staff onboarding, MFA and exact permission implementation still require reviewed design before publicly exposing authenticated routes. Never disable CSRF just to make development easier.

**Contracts:** Start with \`/api/v1\` and use typed validated request/response/error schemas. HTTP API versioning is distinct from historical product/policy/message versions. Any breaking change requires a planned producer/consumer migration. Before implementing consumers, review canonical contract families: bank/staff access, customer/evidence, CSV import, catalog/version, recommendation/evidence-gap, agent proposal, policy/approval/engagement, simulated banking event/recipient/inbox/feedback, and audit/errors. Exact field names, endpoint list, schema generator, compatibility tool and state-transition enumerations are **not yet implemented or implicitly approved**.

**Evaluation:** Define synthetic input rows and expected outcomes *before* tuning ranking. Exercise \`PRODUCT.md\` scenarios A–L: Clarify without outbound contact, Suppress without handoff, savings automation with explicitly activated policy, credit review, reviewer rejection, changed product/policy/permission, retry and duplicate prevention, CSV-only unlinked recipient, customer-action feedback and two-bank access denial.

**Workflow design:** Before worker code, review authoritative state transitions, exact message/product/policy version references, unique dispatch identities, atomic state/outbox intent, scheduling/approvals/cancellation/reconciliation and the final Core API gate. A simulator dispatch records a persisted selected-channel inbox item only when authorized; retry after unknown acknowledgement must not duplicate the item.

## Remaining decisions, not silently approved

| Outstanding concrete choice | Proposed responsible role | Decision gate |
| --- | --- | --- |
| Exact CSV fields, eligibility terms, thresholds, freshness and canonical expected fixture data | Engineers A + B | Before ingestion/recommendation contracts are consumed |
| Employee and demo-customer session mechanics, onboarding, MFA, CSRF/origins | Engineer A, reviewed by C | Before UI or customer-scoped API authentication ships |
| OpenAPI schema snapshots, TypeScript generator, generated artifacts, errors and compatibility checks | Engineer A, reviewed by B/C/D | Before dependent work merges |
| Exact gpt-oss variant, hosted inference provider, privacy/cost/latency/schema validation | Engineer D | Before declaring live model-backed Central Agent complete |
| Temporal worker hosting, timeouts/signals/reconciliation detail, local control plane and retry tests | Engineer D with A | Before actual durable authorized dispatch |
| Hosting region, shared staging, secrets, backups, telemetry and qualified security/compliance review | Technical lead with A/D | Before any shared/public or real-data deployment |
| Live bank-owned SMS/email accounts, callbacks and provider proof | Engineer D | Later provider integration; simulation remains the Release 1 channel |
| Real collaborator names/handles, lead for Project 5, CODEOWNERS and branch rules | Repo owner and all engineers | Before ownership/enforcement claims |

No production dependency or external provider is newly authorized by this document. Follow \`AGENTS.md\` for approvals and PR reviews.
