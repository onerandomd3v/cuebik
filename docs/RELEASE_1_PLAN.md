# Cuebik — Four-engineer Release 1 delivery plan

**Release boundary:** \`PRODUCT.md §11.1\` defines the **complete, functioning** Release 1; §11.2 is the separately tracked later roadmap. The initial repository has independently building frontend scaffolds and a runnable Django health-only foundation, **not** functional banking, agent or delivery features.

**Date:** 15 October 2026. **Target:** 20 October 2026. This five-day window is an **exceptionally aggressive stretch target**, not guaranteed completion. Four engineers using Codex can accelerate implementation but not bypass authorization, integration or tests. If essential acceptance cases do not pass on October 20, disclose the failure and remaining work rather than declaring completion or silently removing requirements.

## Five Linear projects to populate after decision/ownership signoff

| Project | Primary scope | Initial proposed responsibility |
| --- | --- | --- |
| **1. Core Banking Data & Governance** | Staff authentication and bank isolation, catalog/versioning, CSV ingestion, Core API contracts, policy/approval/audit authority | **Engineer A** |
| **2. Customer Intelligence & Recommendation** | Permitted evidence, freshness, deterministic eligibility/exclusions, explainable ranking, Recommend/Clarify/Suppress and expected fixture evaluation | **Engineer B** |
| **3. Bank Dashboard & Staff Experience** | Real API-backed customers, catalog, intelligence, recommendations, approval queue, policies, engagement, agent activity and accessible UX | **Engineer C** |
| **4. Central Agent & Policy Coordination** | Internal model gateway, controlled proposals/messages/channels/timing, agent activity; **A retains policy decision authority** | **Engineer D**, with **A** reviewing the policy handoff |
| **5. Virtual Banking, Delivery & Feedback** | Harbourline Bank PWA, synthetic activity, Banking App/SMS/Email/Notifications, Temporal final recheck, simulated dispatch/inbox/feedback | **C** owns PWA UI; **D** owns delivery. **One overall project lead still to designate** |

Engineer A–D are **provisional role labels** until the four actual collaborator usernames, expertise and availability are mapped. No Linear projects/issues or CODEOWNERS mapping have been created by this documentation PR.

## Critical dependency spine

1. **A publishes reviewed organization, customer and catalog contracts** with real authorization tests; B/C/D may implement parallel code against those exact interfaces but cannot invent incompatible client types.
2. **A+B define canonical fixtures and independent expected outcomes**. B implements eligibility first and evidence-backed ranking. C creates frontends with honest loading/error states, using explicitly provisional mocks only until data is persisted and integrated.
3. **B → D:** only real, qualifying Recommend outcomes become agent proposal inputs; Clarify/Suppress have no marketing handoff. A persists protected proposal/audit state.
4. **A → D:** A owns active bank policies, initial Manual Review, explicit reviewer approval capability and exact-message state; D cannot implement a second authority.
5. **D → C:** Temporal coordinates validated, idempotent one-channel simulator delivery only after a fresh Core API authorization gate; C renders authorized backend inbox items and sends attributed feedback.
6. **All:** jointly test two-bank isolation, permission revocation, duplicate or lost acknowledgements, stale terms/approvals, rejected reviews, withheld contact and audited correct states.

## October 15–20 stretch checkpoints

| Date | Workstreams in parallel | Evidence required at day's end |
| --- | --- | --- |
| **15 Oct** | Approve contract/decision docs; map engineers; review one synthetic fixture specification | Reviewed interfaces, scoped Codex assignments and named cross-team reviewers |
| **16 Oct** | A identity/catalog/customer API; B fixture/eligibility; C dashboard/PWA shells; D agent/delivery contracts | Isolation tests and versioned contract examples shared across lanes |
| **17 Oct** | Integrated CSV/events and matching; dashboard reads actual recommendation/evidence | Recommend/Clarify/Suppress + provenance + persisted API round-trip |
| **18 Oct** | Policy activation, reviewer capability, exact-message approvals; agent proposals; permitted simulator event | Denied/approved state-transition tests and no unauthorized customer inbox |
| **19 Oct** | Temporal execution, simulated one-channel inbox and feedback; cross-service defects | Deduplication, stale permission/product block and customer feedback visible in dashboard |
| **20 Oct** | Integrate, stabilize and run full canonical acceptance suite | \`PRODUCT.md\` scenarios A–L with actual persisted service records, required CI green and cross-team review |

The schedule has essentially no contingency. **Do not defer integration until the last day.** Escalate contract disputes and failing tests immediately. At any checkpoint, reforecast honestly if prerequisites are unmet; request scope changes explicitly rather than downgrading an acceptance criterion without approval.

## Complete Release 1 definition of done

- One authenticated, bank-scoped Super Admin workspace with distinct authorized approval capability and tenant isolation tests.
- Editable, real PostgreSQL-backed savings, fixed-deposit and SME/credit catalog, bank-scoped CSV import, customer intelligence/evidence records and permitted simulator event ingestion.
- Deterministic eligibility before explainable relevance; correct Recommend/Clarify/Suppress, internal evidence gaps, new evaluations on evidence change and reproducible canonical expected outcomes.
- Working Central Agent proposals, gateway/provider integration evaluated if claiming **model-backed** operation, and traceable source recommendation.
- Bank policy engine with initial Manual Review, explicitly activated savings automation only, credit review requirement, and stateful human approval/rejection of the exact message.
- Temporal-coordinated, reauthorized, idempotent **simulated** delivery in the selected channel, stored backend inbox, correct distinct Sent/Delivered/Viewed/Failed evidence and customer feedback.
- Functional staff dashboard modules and independently buildable, responsive fictional bank PWA (Banking App/SMS/Email/Notifications) reading common authoritative backend state, not manufactured UI totals.
- Integration/schema consumer checks, denied/duplicate/stale-state tests, real data-backed A–L acceptance run, accessible error/empty/loading states, reproducible local startup and reviewed PRs. No statement of real bank integration, real SMS/email delivery or production compliance without separate proof.

## Codex and engineer working agreement

Linear is the operational system for **issues, owner, dependencies, milestones and status**, not the authority for product behavior or architecture. Each issue requires exactly one accountable human engineer, mapped module paths, linked approved specification/scenario, input/output contract, dependencies, negative tests and acceptance proof. Assign one cross-team reviewer where a shared interface, permission or lifecycle state changes; no Codex-run PR auto-merges.

Use one bounded issue/branch per reviewable slice, comply with applicable \`AGENTS.md\`, keep one shared interface owner, and run CI plus affected consumers. For this compressed window hold a short **twice-daily integration checkpoint** and retain explicit red/green status for every acceptance case. Code throughput, screenshot polish and model-generated PR count are **not** completion evidence.

**Still requiring team input:** engineer names/handles, exact five-project lead for Project 5, whether October 20 includes public deployment (not implied here), exact unimplemented schema/fixture values, model/Temporal operational choices. Do not put actual credentials or customer records in the public repository.
