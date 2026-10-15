# Cuebik — Producer/consumer contract baseline

**Status:** Approved schema/versioning *strategy*; actual machine-readable domain schemas and generated clients are still missing. `/api/v1/health` is currently only a liveness route, not a banking contract. Product authority remains `PRODUCT.md`; integration authority remains `ARCHITECTURE.md`.

**Producer:** Django Ninja Core API and its OpenAPI output. **Consumers:** independently runnable Next.js dashboard, banking PWA, and authorized Python intelligence/agent/delivery workloads. Generated TypeScript types/clients must derive from reviewed OpenAPI, not copied hand-authored parallel definitions. Generator/package selection requires normal production-dependency review if applicable.

| Contract group | Required meaning before its issue is ready | Critical negative case |
| --- | --- | --- |
| Bank workspace and staff | Server-derived bank scope, authenticated staff, effective approval capability | Different bank, unauthenticated or non-reviewer is denied |
| Customer and evidence ingestion | Stable bank/customer reference, allowed source, provenance, event identity/time, verified versus inferred versus unknown | CSV record doesn't create a simulator recipient or unverified customer fact |
| Catalog and terms | Bank product ID, family/status, effective terms and history, mandatory eligibility/exclusions | Inactive/stale product cannot silently authorize a new message |
| Intelligence and recommendation | Source evidence/freshness, candidate outcome, named evidence gap, evaluation/rule version | Clarify or Suppress cannot hand off outbound engagement |
| Agent and policy | Qualifying recommendation, proposed message/channel/time, current policy/version, Automate/Review/Withhold | Agent proposal never grants permission or bypasses Manual Review |
| Approval and engagement | Reviewer capability, exact approved message/version, decision source, distinct engagement lifecycle events | Rejection, changed consent or stale approval prevents dispatch |
| Simulator source/session | Explicit demo session/customer/bank scope; permitted financial or app-activity event and idempotency ID | Forged linkage/replayed event cannot modify unrelated customer |
| Simulated inbox/feedback | Recipient link, chosen channel, persisted inbox item, simulated sending/availability/viewed evidence, event attribution | Unlinked CSV-only record, other inboxes or duplicate retry cannot claim delivery |
| Audit and errors | Actor/source, scoped target, timestamp/version, validated denied/conflict and missing-evidence results | Denied mutation never returns success or leaks protected data |

### Contract release checklist

Each concrete schema PR needs: declared owning engineer; request/response/validation schema; bank/customer authorization boundary; errors and versioning; positive and negative tests; snapshot or compatibility check for the OpenAPI schema; affected generated TypeScript consumers built/tested; applicable status-transition and idempotency tests. The complete field list, numeric thresholds, allowed event types, route inventory, codegen choice and page sizes remain to be designed and reviewed as part of implementation.

### One synthetic reference fixture suite

Create **one canonical Harbourline Bank fixture** with explicit savings/fixed-deposit/SME-credit terms, CSV columns, permissible events, consent/policy state, expected eligibility and ranked candidate outputs, approval decisions and simulation acknowledgements. Keep expected outputs independently authored before code is tuned. Include a second isolated test bank for cross-tenant denials. Link expected case identifiers to `PRODUCT.md §8` scenarios A–L. Test results on synthetic data do not represent financial suitability, conversion, or provider delivery.
