# Cuebik — Product Specification

**Version:** 0.1.3  
**Status:** Draft for product review  
**Updated:** 12 October 2026  
**Product category:** Banking Intelligence & Engagement Platform  
**Tagline:** Make every recommendation count.

> **Document authority:** This file defines what Cuebik is, the problems it solves, the users it serves, its intended capabilities, its business rules, and how its product workflows behave. It is the product source of truth, not a technology selection, deployment specification, API reference, or assertion that a capability is already implemented. `BRAND.md` governs identity and language; `DESIGN.md` governs UI implementation. Approved technical decisions and unresolved engineering choices belong in `ARCHITECTURE.md`.

---

## 1. Product definition

Cuebik is a banking intelligence and engagement platform that helps banks understand their customers, recommend relevant financial products, and automate personalized engagement through their existing banking channels.

Banks connect authorized systems and data to Cuebik and manage their institution's activity from an isolated organization workspace. Cuebik combines permitted customer signals with bank-defined product information to evaluate potential matches, coordinate an appropriate next action, and apply bank-controlled communication rules. Authorized engagement instructions reach customers through the bank's existing channels, and resulting delivery or interaction feedback returns to Cuebik where available.

**Cuebik is a bank-facing platform, not a consumer bank.** Bank customers do not sign into Cuebik. They experience relevant recommendations through their own bank's mobile app, SMS, or email. A separate synthetic-data banking Progressive Web App (PWA) demonstrates the experience through a fictional bank's Banking App, SMS, and Email interfaces, without implying a live bank integration or real messages sent to customers.

### 1.1 Product promise

Help a bank answer four questions responsibly:

1. **Who might benefit?** Understand relevant, permitted customer circumstances and their uncertainty.
2. **What product fits?** Match customers against the bank's actual product catalog, eligibility rules, and terms.
3. **Should the bank engage, and how?** Propose whether, when, and by which permitted channel an engagement should occur.
4. **Is it authorized, and what happened?** Apply the bank's controls before dispatch and record the resulting workflow and feedback.

Cuebik should optimize for **relevant, explainable, appropriately timed engagement**, not maximum message volume or short-term click-through at the expense of customer welfare.

### 1.2 Boundaries

Cuebik **does** provide customer intelligence, product matching, decision explanations, agent coordination, configurable engagement policies, approval workflows, communication handoffs, and bank-facing monitoring.

Cuebik **does not** independently approve credit, determine contractual product eligibility on the bank's behalf, open accounts, move customer funds, issue cards, replace a bank's core banking system, or act as a general-purpose outbound marketing platform. A recommendation is not a binding offer or proof that a product is suitable for every aspect of a person's financial life.

---

## 2. Problem and intended outcomes

Banks offer products such as savings, deposits, lending facilities, payment services, and cards. Customer circumstances, goals, affordability, permissions, and timing differ. Broad promotions and simplistic transaction-pattern rules can therefore lead to irrelevant offers, intrusive contact, and missed opportunities.

Financial activity can reveal *signals*, not necessarily *intent*. A large deposit may be borrowed funds, a business receipt, or temporary liquidity; repeated deposits may reflect a habit without proving a particular savings goal. Incomplete or stale data, misleading proxies, sensitive inferences, and repeated messages can cause harm even when a customer initially clicks an offer.

**Intended outcomes for banks**

- Identify plausible customer–product opportunities using authorized data and defined product criteria.
- Explain why a recommendation was made, held for clarification, or suppressed.
- Apply institution-defined controls over automated and human-reviewed customer outreach.
- Reduce unnecessary outreach, respect communication restrictions, and preserve a traceable decision history.
- Observe delivery and customer feedback without confusing engagement with product acquisition.

**Intended outcomes for bank customers**

- Receive fewer irrelevant or poorly timed product communications.
- See understandable product information and accurate terms through familiar bank channels.
- Retain applicable communication preferences and opportunities to seek clarification.
- Avoid being treated as conclusively interested in a product merely because a behavioural pattern was observed.

These are product goals, not established performance claims. Their effect requires evidence and appropriate evaluation.

---

## 3. Actors and access model

| Actor | Relationship to Cuebik | Primary needs |
| --- | --- | --- |
| Bank organization | Customer institution with an isolated workspace | Configure its product catalog, connections, policies, and operational oversight. |
| Authorized bank employee | An institutional work-account user | See permitted records and perform granted actions. |
| Organization administrator | Bank employee with workspace-administration permission | Configure organizational settings and authorized access. |
| Engagement reviewer | Bank employee expressly authorized under an applicable policy | Approve or reject specific proposed customer communications. |
| Product / intelligence / integration operator | Bank employee with scoped permissions | Maintain catalog, investigate evidence, or manage authorized connections. |
| Bank customer | End recipient of bank-controlled communications; **not** a Cuebik user | See or dismiss permitted product information via existing bank channels. |
| Cuebik operator | Internal platform operations actor, distinct from the bank's users | Operate and support the Cuebik service without being treated as a bank approver. |

### 3.1 Organization workspace

- Each bank's catalog, customer references, recommendations, policies, approvals, engagements, and audit history are scoped to that bank's organization.
- Institutional work identities are used for employee access; the initial workspace journey assumes association with one authorized banking organization.
- An organization can be created by an authorized representative or joined through a valid invitation. Enrollment and organization membership are distinct events.
- Organization Owner/Administrator **does not automatically imply** specialized permission to approve financial-product outreach, policy activation, or another employee's sensitive request.
- Account membership, status, and effective permissions control access. Customer accounts never appear in employee-management workflows.

### 3.2 Capability maturity and release boundaries

The product supports a fuller organization/team-management vision, but the **initial functional release** may use a single authorized **Super Admin** bank-workspace user. This is a deliberately narrower access model, **not** permission for an unauthenticated dashboard or bypassing backend checks.

For initial end-to-end review flows, the Super Admin may exercise approval actions **only through an explicitly granted approval capability** under the applicable organization policy; an owner title alone is not that authorization. Policies requiring independent multiple sign-offs cannot be represented as satisfied by one person.

Full employee invitations, multiple permission groups, delegated administration, enterprise SSO, independent dual authorization, and rich membership management are **planned extensions** unless explicitly implemented and tested. Their interfaces may illustrate the intended workflow, but must not imply active controls that do not exist.

---

## 4. End-to-end product journey

1. **Configure the bank.** An authorized institution establishes its workspace, initial products, connection settings, and applicable engagement restrictions.
2. **Supply permitted information.** Bank-approved customer signals, product definitions, and communication permissions are ingested or synchronized from authorized bank systems; supported manual inputs are available where applicable.
3. **Build customer intelligence.** Cuebik organizes verified facts and inferred signals, records data freshness and permitted use, and recognizes missing or contradictory evidence.
4. **Evaluate products.** The Recommendation Engine checks active catalog products, applicable constraints, and available customer evidence. It produces **Recommend**, **Clarify**, or **Suppress**, with reasons and references.
5. **Coordinate engagement.** For an eligible recommendation, the Central Agent proposes whether engagement is appropriate, a suitable time window, and a permitted bank channel. A recommendation alone never dispatches a message.
6. **Apply bank policy.** Mandatory controls and active policies determine **Automate**, **Review**, or **Withhold** for the proposed engagement.
7. **Obtain required authorization.** Review cases enter the bank's approval queue. Only expressly authorized reviewers may authorize them. Rejection prevents that proposed engagement from dispatching.
8. **Dispatch through bank infrastructure.** An eligible, authorized engagement passes final restrictions and is handed to an existing bank-owned delivery channel; no policy may be bypassed by the agent.
9. **Record outcomes.** Cuebik records proposal, authorization, sending, delivery, failure, and eligible customer interaction evidence, keeping each event distinct.
10. **Learn responsibly.** Permitted feedback can inform later evaluation and product insights without treating clicks as proven suitability or product acquisition.

Every step must be traceable to its source decision and the current organization. Partial, delayed, unavailable, or contradictory data must produce an explicit non-dispatch or review outcome rather than an invented success.

---

## 5. Functional product domains

### 5.1 Bank Integrations

**Purpose:** Establish governed connections between Cuebik and the bank's existing systems. Integration is configured and observed from the Cuebik workspace; the bank's mobile app does not host the recommendation engine.

Four functional connection areas:

1. **Customer Data Ingestion:** Receive bank-approved, purpose-scoped financial, behavioural, account-status, and communication-permission signals.
2. **Product Catalog Integration:** Synchronize approved product definitions, effective terms, eligibility conditions, and lifecycle changes; allow managed manual entry/import where applicable.
3. **Engagement Delivery:** Hand authorized engagement instructions to the bank's existing Banking App, SMS, or Email systems.
4. **Delivery & Feedback:** Receive provider acknowledgements and permitted customer interaction events.

**Required behaviour:** An integration has a configured scope, lifecycle status, last-known synchronization/health information, and a clear distinction between simulated connectivity and an actual connected bank system. Failed connections cannot silently convert unknown data into verified facts or unknown deliveries into confirmed deliveries.

#### 5.1.1 Customer experience simulator (banking PWA)

**Purpose:** Provide a visible, stateful customer-side integration simulator demonstrating how Cuebik receives permitted bank signals, proposes suitable product engagement, applies approval controls, routes authorized messages to a bank channel, and receives customer feedback. This is **a fictional banking environment**, not a replacement bank, real bank integration, or real money-transfer service.

**User experience and visual identity:**
- The independently deployed Next.js PWA displays a **virtual smartphone shell on desktop** (a centered phone-sized viewport); on actual supported mobile browsers it uses the available mobile screen instead of nesting a second phone frame.
- The simulated phone has a home screen and distinct **Banking App**, **SMS**, **Email**, and **Notifications** experiences within the same PWA. These are simulated application views, not Android system applications, an actual telecom inbox, or an external mailbox.
- Use the canonical fictional **Harbourline Bank** identity. A red-led color palette may take inspiration from Zenith Bank's colors, but the app must **not reproduce official Zenith branding, logos, proprietary interface screens, or imply official endorsement or integration**. The simulator should visibly identify itself as fictional/simulated.
- The PWA's bank-customer design language is independent of Cuebik's marketing/dashboard design system. Its phone-viewport layout, navigation, forms, and readable message surfaces must remain accessible.

**Synthetic banking activity:**
- Bank-customer accounts, balances, and illustrative transaction histories are **fictional, seeded data**. Supported interactive actions (for example, a simulated deposit or savings action) may modify only the isolated synthetic dataset and produce a **bank-simulator-originated event** for Cuebik's normal authorized ingestion and customer-intelligence processing.
- Simulator actions must not move real funds, connect to real accounts, create real payment instructions, request bank credentials, or claim that fictional transactions occurred in an actual banking system.
- Mark synthetic events with organization/customer-demo scope, source, event identity, timestamp, and provenance. A UI interaction does **not** guarantee a recommendation: eligibility may produce **Clarify** or **Suppress**, or policy may prohibit any outreach.

**Delivery and feedback:**
- The Cuebik Central Agent proposes **one permitted engagement channel for a given engagement**, and bank policies may require review or withhold it. The same recommendation is **not automatically broadcast to Banking App, SMS, and Email** merely because the simulator offers all three inboxes.
- After final authorization, the selected *simulation adapter* records an appropriate channel-specific inbox item. The PWA reads this item from the backend rather than rendering a pre-scripted recommendation as if it were delivered.
- **Banking App** presents in-app product information; **SMS** presents a simulated text-message thread; **Email** presents a simulated email inbox and message view. Distinguish simulated channel dispatch and simulator acknowledgements from real carrier/SMTP delivery.
- Evidence-backed user actions (such as opening a message, dismissing an offer, clicking for details or requesting information) return through customer-scoped API endpoints and are recorded against the originating engagement. UI display alone must not be treated as a confirmed customer view or proof of real-world delivery.
- Cuebik's dashboard reads the same authoritative backend events, enabling an end-to-end demonstration of recommendation evidence, approval state, channel selection, simulated dispatch, and feedback. No isolated UI-only counters or fabricated delivery state may replace this record.

**Demonstration integrity:** Any simulated delivery/feedback must be **explicitly labeled simulated**. Failed approvals, missing permissions, stale terms, rejected requests, suppressed matches, and withheld engagements must never produce an inbox item. The simulator cannot bypass pre-dispatch checks or fabricate a successful customer outcome.

### 5.2 Products & Catalog

**Purpose:** Define the universe of financial products Cuebik may consider on behalf of a bank.

Each product should have a stable bank-scoped reference, name, category, concise customer-facing description, target/eligible segments where relevant, relevant financial terms and disclosures, eligibility and exclusion criteria, allowed engagement channels, effective dates, ownership, and status.

Products may be created and maintained manually or imported/synchronized from an authorized source. Catalog records should distinguish **Draft**, **Active**, and **Inactive/Paused** states and preserve sufficient version/change history to explain previous decisions.

**Rules:** Only currently active, appropriately configured products are candidates for new outgoing recommendations. A catalog update must not silently rewrite a historical recommendation or previously approved message. Credit products are *opportunities for information or application*, not pre-approved lending decisions.

### 5.3 Customers & Customer Intelligence

**Purpose:** Explain what authorized bank-held signals indicate about a customer and whether there is enough reliable information to evaluate relevant products.

A customer intelligence record may include pseudonymous bank-scoped reference, authorized segment, account tenure/status, permitted financial and activity summaries, existing product holdings, customer-stated preferences/goals (when provided), relevant communication permissions, data freshness, and evidence provenance.

Separate:

- **Observed or bank-verified facts:** e.g., an account-tenure value supplied by the bank.
- **Inferred hypotheses:** e.g., a possible savings interest derived from repeat deposits.
- **Unknown / insufficient evidence:** information that cannot presently support a reliable inference or eligibility check.

Cuebik must not present an inferred life event, purchasing intent, disposable income, or suitability conclusion as a verified customer fact. An absent signal is not evidence of disinterest. Customer-level pages must respect permissions and avoid exposing unnecessary identifiers or raw transactional detail.

### 5.4 Recommendation Engine

**Purpose:** Determine **WHAT** banking product, if any, should be considered for a particular customer.

For each evaluation, use the bank's active catalog and eligible, sufficiently fresh customer evidence; apply hard product criteria separately from statistical relevance. Preserve evidence references, a comprehensible match rationale, important unknowns, catalog version, and evaluation time.

The engine must produce one of three explicit outcomes:

| Outcome | Meaning | Consequence |
| --- | --- | --- |
| **Recommend** | Evidence supports considering an eligible bank product as potentially relevant. | Makes a candidate available for governed engagement planning; **does not send it**. |
| **Clarify** | Missing, uncertain, contradictory, or insufficient information prevents a reliable conclusion. | Record the gap and request authorized enrichment or clarification; do not silently treat it as a positive match. |
| **Suppress** | Product is ineligible, unsuitable under defined controls, restricted, or lacks a defensible recommendation basis. | No engagement handoff for that candidate. Retain an appropriate internal explanation. |

A recommendation score, where present, is an evaluation signal, not a probability of customer acceptance, guaranteed suitability, or a lending decision. Multiple candidates may be evaluated for a customer, but product ranking must not defeat exclusions or customer restrictions.

### 5.5 Central Agent & Agent Activity

**Purpose:** Decide **WHETHER**, **WHEN**, and **HOW** to propose engagement for an eligible recommendation, then record that coordination.

The agent may consider bank-approved channel permissions, customer communication cadence, relevant contextual signals, product terms, scheduled windows, and existing engagement state. It proposes an action; it cannot grant itself authorization or bypass the Policy & Autonomy Engine.

Agent Activity shows bank-facing availability as **Running**, **Idle**, or **Unavailable**, plus a searchable history of proposals, clarifications, suppressions, planned channels/times, policy handoffs, and resulting workflow states. Detailed individual decisions link to recommendation evidence and any approval/engagement record.

The ambient connected-intelligence visualization is a visual summary of product relationships. Its iconography or motion is not evidence of a live connection; production activity indicators must reflect observed service state.

### 5.6 Policies & Automation

**Purpose:** Let each bank define the limits of permitted customer engagement.

**Organization-wide modes**

- **Manual Review:** Otherwise eligible proposed customer engagements require authorized human review before dispatch.
- **Controlled Automation:** Individual active bank policies may allow automatic authorization for specified engagements; matching review requirements and mandatory withholding restrictions still apply.

**Per-proposal policy decisions**

| Decision | Meaning |
| --- | --- |
| **Automate** | The engagement may proceed without individual review **only after** all applicable mandatory gates and active rules allow it. |
| **Review** | Route the specific proposal to authorized humans; hold dispatch pending the required decision(s). |
| **Withhold** | Prevent dispatch when a restriction, prohibition, or other mandatory safeguard applies. |

**Precedence and fail-safe principles**

1. Required product eligibility, lawful-purpose/permission conditions, and mandatory restrictions cannot be overridden by a more permissive rule.
2. A governing **Withhold** condition prevents engagement.
3. Any applicable **Review** mandate takes priority over a permissive **Automate** match.
4. **Automate** applies only where all other required conditions pass and an active policy permits it.
5. Missing authorization, unknown communication permission, or conflicting evidence must **never permit automatic dispatch**.
6. Current restrictions and authorization validity are rechecked before dispatch.

Policies have configuration statuses (e.g., Draft, Active, Disabled, Archived) separate from their Automate/Review/Withhold decision. Creating, previewing, simulating, or saving a draft does not activate it. Changes to active policies are versioned, tested, and authorized before becoming effective. Previously withheld or rejected engagements are not silently sent when rules change. Reusable templates are editable **draft starting points**, not pre-authorized policy deployments.

### 5.7 Approvals

**Purpose:** Let an appropriately authorized bank employee review a **specific proposed engagement**, not simply endorse a product-match score.

A review request identifies its customer reference, product/recommendation, proposed message, channel, timing, policy rationale, evidence summary, reviewer assignment, and current state.

The reviewer must be able to inspect the exact message that would reach the customer and then **Approve** or **Reject**, with confirmation and recorded attribution. Rejection requires a reason; any additional independent approvals must follow the specific bank policy, not a universal rule.

Approval is an authorization event: **Approved ≠ Sent ≠ Delivered**. A rejected, expired, or superseded approval must not be treated as an ordinary policy Withhold outcome. Restricted users may view only permitted information and cannot decide requests. Changes to product terms, evidence, permissions, or the proposed message before dispatch can invalidate an earlier authorization and require re-evaluation.

### 5.8 Engagement

**Purpose:** Show what happened to an authorized customer communication through bank channels.

Supported customer-facing channels are **Banking App**, **SMS**, and **Email**. A relationship-manager internal task is not itself an outbound customer channel.

The module includes a directory, channel-level metrics, message preview, status history, delivery feedback, permitted customer interaction events, and references back to the recommendation, agent decision, approval, and originating product.

- **Proposed:** Message/action has been prepared, not authorized for dispatch.
- **Pending Review:** Required human authorization is outstanding; no dispatch.
- **Approved:** Necessary approval(s) recorded; dispatch may still be queued or scheduled.
- **Sent:** The appropriate delivery system confirms the message was sent.
- **Delivered:** Supported delivery evidence confirms receipt/delivery, not necessarily reading or acceptance.
- **Withheld:** A policy-controlled engagement is prevented from dispatch.
- **Failed:** An attempted dispatch or delivery failed.

Internal scheduling, queueing, gateway acceptance, retries, and confirmation waiting can be additional event details without conflating the canonical statuses. Approval rejection and expiry are recorded as distinct decision events that block the associated dispatch.

An API acknowledgement, SMTP acceptance, or push-submission response **alone** is not proof of customer delivery. “Viewed,” “clicked,” “requested information,” “application started,” and “product acquired” are distinct feedback events and may only be recorded when actually supported by the bank's feedback source.

### 5.9 Dashboard Overview

**Purpose:** Give authorized bank employees a concise operational summary, including customers analyzed, recommendation decisions, pending review requests, engagement outcomes, notable agent activity, and configuration readiness. Metrics have clear time windows and definitions. Historical event counts and current backlogs must not be combined as though they represent the same cohort.

### 5.10 Organization Settings & Team Management

**Purpose:** Manage the organization's workspace identity, regional preferences, capability readiness, autonomy-mode summary, employee access, and relevant administrative history. Integration setup and policy editing remain within their own authoritative modules.

The fuller product includes invitations, member profiles, roles, effective permission views, member suspension and revocation, and delegated administrative actions with applicable confirmation or review. **The initial functional release can operate with one authenticated Super Admin** while these richer membership features remain planned. The single-admin role does not remove organization scoping, backend permission checks, action confirmation, or audit needs.

---

## 6. Unified decision language and state boundaries

Cuebik must not use the word “approved” as a synonym for “recommended,” or “delivered” as a synonym for “sent.”

| Layer | Canonical concept | Values / examples |
| --- | --- | --- |
| Product Catalog | Product configuration state | Draft, Active, Inactive/Paused |
| Recommendation Engine | Match outcome | **Recommend, Clarify, Suppress** |
| Central Agent | Proposed coordination | Whether to engage, suggested time, chosen permitted channel, explanation |
| Agent availability | Bank-facing service state | **Running, Idle, Unavailable** |
| Policy & Autonomy | Engagement authorization decision | **Automate, Review, Withhold** |
| Policy configuration | Rule lifecycle | Draft, Active, Disabled, Archived |
| Approval | Human review decision/state | Pending, Approved, Rejected, Expired/Cancelled as applicable |
| Engagement | Communication workflow | **Proposed, Pending Review, Approved, Sent, Delivered, Withheld, Failed** |
| Customer feedback | Observed interaction | Viewed, Clicked, Information Requested, Application Started, etc., only if evidenced |

A single recommendation evaluation and a single engagement can have different identifiers and lifecycles. A candidate may be **Recommend** but the engagement **Withheld**, or **Recommend** and the engagement **Pending Review**. A **Suppress** outcome has no outbound engagement handoff by default. A **Clarify** outcome generates an internal missing-evidence workflow; any actual customer-directed clarification requires its own permissions and applicable authorization rather than bypassing policy controls.

**Canonical product invariants**

- Customer data, catalog, policies, decisions, and audit records are organization-scoped.
- Only active and appropriate products may be considered for new outward offers.
- Customer facts and inferred interests are labeled separately.
- Product eligibility is not replaced by a model relevance score.
- A recommendation never sends a message by itself.
- The Central Agent never self-authorizes or bypasses applicable bank controls.
- An approval authorizes a controlled next step; it is not delivery evidence.
- Rejected, withheld, expired, or otherwise unauthorized engagements must not be dispatched.
- Delivery and engagement analytics must be grounded in distinct provider/bank events.
- Draft configuration changes cannot affect active policy enforcement until activation.
- Customer data or communication permissions that are missing or invalid cannot be treated as granted.

---

## 7. Information required by the product

The table below specifies **product-level information groups**, not database schemas or specific API fields.

| Information group | Minimum product need | Boundary |
| --- | --- | --- |
| Organization | Stable bank identity, workspace, access context, regional defaults | Do not mix records from different banks. |
| Customer reference | Bank-scoped pseudonymous reference and data-readiness context | Direct identifying information should be limited to necessary, authorized uses. |
| Customer signals | Permitted behavioural/financial summaries, verification/source, freshness | Do not infer intimate motives as proven facts. |
| Communication permissions | Allowed/restricted channels, provenance, applicable constraints | Unknown permission does not authorize outreach. |
| Financial product | Stable ID, active state, terms, eligibility, exclusions, disclosures | Terms used in a message must match the approved catalog version. |
| Recommendation record | Candidate, outcome, reason, evidence, uncertainty, evaluation time | Match result is not a credit or purchase decision. |
| Agent decision | Whether/when/how proposal, supporting rationale, source recommendation | Coordination is not dispatch authorization. |
| Policy evaluation | Evaluated rules and versions, outcome, reason, time | Mandatory restrictions prevail; version history persists. |
| Approval request | Reviewer authorization scope, message preview, decision, actor and time | Rejection and expiration block dispatch. |
| Engagement record | Authorized channel, message version, lifecycle events, delivery feedback | Provider acceptance is not delivery confirmation. |
| Audit event | Actor/system source, affected record, change/result, event time | Logs preserve traceability without promising an unimplemented storage guarantee. |

Cuebik should not require raw banking passwords, PINs, full card numbers, unmasked BVNs, or unrestricted full transaction histories for product matching. Data fields and retention must follow the bank's documented purpose and applicable requirements. Detailed data contracts and security controls will be specified separately.

---

## 8. Product journeys and illustrative acceptance scenarios

The scenarios below specify expected **behaviour**. They use fictitious banking identities and data; example balances, rates, time windows, and labels are **not** binding product terms or real institution results.

### Scenario A — Recommend + Review

An authorized customer profile appears potentially suitable for an active fixed-deposit product. The Recommendation Engine records **Recommend** and its supporting, appropriately qualified evidence. The agent drafts a permitted in-app message and proposed time window. A high-value review policy returns **Review**. The message appears in Approvals with its exact content and governing rule. **Until the required reviewer authorizes it, Engagement shows Pending Review and no dispatch or delivery event.**

### Scenario B — Recommend + Automate + Delivered

A customer has verified signals and sufficient eligibility for an active savings product. Their communication permissions are valid, and applicable active policies allow **Automate**. The agent prepares a suitable bank-app communication. A final pre-dispatch check passes; the bank's delivery adapter receives the authorized instruction. Engagement records **Sent** only on sending evidence, **Delivered** only on supported delivery evidence, and customer interaction only when separately reported.

### Scenario C — Clarify

An otherwise promising SME product candidate lacks a required customer or business signal. The engine produces **Clarify** with a named evidence gap. No positive recommendation is silently made and no customer marketing dispatch occurs. Authorized enrichment or clarification can allow a later independent re-evaluation.

### Scenario D — Suppress / No Handoff

A customer-product candidate fails eligibility or a meaningful suitability/relevance requirement. The engine records **Suppress** and an internal explanation. No proposed outbound engagement is created for that candidate. It must **not** appear later as a failed SMS or email campaign.

### Scenario E — Review rejection

An authorized reviewer rejects a particular proposed customer message with a reason. The approval becomes **Rejected** and the associated message cannot dispatch. That event is not misrepresented as a policy Withhold result or an attempted delivery failure.

### Scenario F — Data, permission, or channel failure

A required permission becomes restricted, eligibility changes, the catalog product is paused, or the delivery system cannot confirm an action. The workflow holds or blocks dispatch as appropriate, records the true failure or unknown state, and does not manufacture a successful customer communication.

### Scenario G — Policy revision

An administrator saves a new policy draft and runs illustrative scenarios. The active policy remains unchanged until authorized activation. Once a new version becomes effective, future evaluations use that version; historical recommendations, approvals, and engagements are not overwritten or silently replayed.

### Scenario H — Bank PWA to Cuebik and back

A fictional Harbourline Bank customer performs a **simulated** savings deposit in the virtual smartphone's Banking App. The PWA posts an authorized synthetic event to the Core API, which records its provenance and makes permitted signals available to Customer Intelligence and the Recommendation Engine. If the outcome is **Recommend**, the Central Agent may propose a customer message; the Policy Engine either **Withholds**, requires **Review**, or permits **Automate**. For Review, the authorized bank reviewer must approve the exact message before dispatch. Temporal-based engagement execution applies final checks and sends the approved instruction to **only the selected simulated channel**. The corresponding Banking App, SMS, or Email view retrieves its newly created backend inbox item. If the customer opens the message or requests details, that supported event is saved and shown in Cuebik's dashboard. Suppressed, withheld, unapproved and expired engagements produce no inbox message; sending and receiving simulation acknowledgements do not imply actual network SMS/email delivery.

---

## 9. Quality requirements and responsible operation

These describe required **product behaviour**, not claims of completed certification or deployed controls.

**Explainability and traceability**

- Users can see why a product was considered and which bank rules governed engagement.
- Observed facts, inferred hypotheses, unknowns, model/rule versions, and decision times remain distinguishable.
- Material state transitions preserve a traceable outcome and actor/system source.

**Privacy and permissions**

- Use the minimum bank-authorized information for the declared purpose, with scoped access and retention requirements.
- Do not display full sensitive identifiers when a masked or pseudonymous reference suffices.
- Apply communication restrictions and required legal/contractual permissions before any customer-directed action.
- Product-specific data protection and consumer-protection obligations require qualified review; the product must never imply certification simply because a UI badge exists.

**Safety, suitability, and fairness**

- Do not substitute engagement propensity for customer benefit, affordability, or bank-controlled eligibility.
- Recognize data sparsity, stale signals, and unequal availability of formal banking histories.
- Support suppression and clarification as legitimate outcomes, not system errors.
- Avoid unnecessarily sensitive inferences, misleading urgency, repeated outreach, or undisclosed financial terms.

**Reliability and governance**

- Failed or unavailable dependencies result in explicit non-success states.
- Consequential actions use confirmation and appropriate authorization.
- Bank customers are never contacted merely because a demonstration UI displays a recommendation.
- Financial amounts and product terms in engagement previews are sourced from the appropriate product definition.

**Accessibility and localization**

- Bank-facing administrative language should be understandable without engineering expertise.
- Support Nigerian banking context, NGN/₦, West Africa Time, and clear status labels that do not depend only on color.
- The dashboard follows `DESIGN.md`; the separate customer-facing simulator follows its fictional bank's own design language. Its red-inspired palette is not a copy of Zenith Bank's official UI or a claim of an official integration.

---

## 10. Measurement and evidence

Cuebik should measure both commercial and customer-respectful outcomes. Metrics must declare their population, denominator, time window, and whether they represent synthetic data, observations, or estimates.

| Area | Useful measures | Interpretation boundary |
| --- | --- | --- |
| Matching | Eligibility pass/fail, recommendation outcome mix, human-reviewed relevance, clarification rate | A relevance score is not demonstrated customer benefit. |
| Engagement quality | Permission blocks, frequency/cooldown interventions, opt-outs, complaint indicators | Fewer messages is not automatically worse performance. |
| Authorization | Review backlog, age, approval/rejection distribution | Approval is not customer contact. |
| Delivery | Dispatch attempts, confirmed sent, confirmed delivered, failures, unconfirmed outcomes | Gateway acceptance alone is not a delivered message. |
| Customer feedback | Explicit interests, product-information requests, verified interactions | Clicks and opens are not proof of uptake or welfare. |
| Operations | Catalog freshness, data readiness, policy version usage, dependency failures | Demonstration metrics are not real operating SLAs. |

Evaluation should eventually consider relevance, transparent terms, unwanted-contact burden, fairness, and adverse financial outcomes—not merely conversions.

---

## 11. Product scope and delivery posture

This section distinguishes the **defined full experience** from the **initial functional baseline**; it does not change the requirements for correctness, authorization, or truthful reporting.

### 11.1 Initial functional baseline

- Authenticated, organization-scoped banking workspace with a **single Super Admin** role.
- Working permitted synthetic customer data intake and a usable bank product catalog.
- Customer intelligence profiles with fact/hypothesis separation and evidence readiness.
- End-to-end Recommend / Clarify / Suppress matching with explanations.
- Central Agent decisions and activity records linking to source recommendations.
- Enforced bank-defined Automate / Review / Withhold policies, including a simple organization-wide autonomy mode.
- At least one real, stateful authorized human approval workflow.
- Controlled engagement instruction routing to a bank-channel demonstration adapter, with accurate status and feedback events.
- Dashboard modules connected to shared records, not unrelated screen-specific fixtures.
- An independently deployed Next.js banking PWA that displays a desktop virtual smartphone and mobile full-screen mode, including Banking App, SMS, Email and Notifications simulations. Seeded customer financial activity can generate source-labeled synthetic events for real Cuebik evaluation. Authorized channel-specific messages and supported feedback must round-trip through the Core API rather than disconnected UI fixtures.

### 11.2 Subsequent product capabilities

- Multiple employee roles, invitations, granular RBAC, delegated administration, and enterprise identity integration.
- Extended organization administration, sensitive access-change workflows, and richer policy simulation/activation governance.
- Broader bank integrations, product families, and channel providers with independently verified operational readiness.
- More advanced ranking, experimentation, fairness monitoring, and longitudinal outcome assessment after representative data and evaluation protocols are available.

An incomplete feature must be described as planned or illustrative rather than presented as operational. Prioritization does not authorize shortcuts around permissions, evidence, state transitions, or data boundaries.

---

## 12. Dependencies and product decisions to resolve

These are **unresolved product-level decisions** requiring explicit agreement before their detailed contracts are finalized. Approved technologies and remaining technical choices are tracked in `ARCHITECTURE.md`.

1. **Initial product families:** Confirm the specific savings, fixed-deposit, and SME/credit product types needed for the first curated catalog, with genuine fictional terms and eligibility rules.
2. **Customer signal contract:** Define exactly which synthetic financial/behavioural summaries, freshness rules, and stated preferences the evaluation will accept.
3. **Clarification handling:** Confirm which gaps are resolved internally versus which could generate a separately authorized customer prompt.
4. **Product suitability boundaries:** Decide which exclusion criteria are mandatory bank rules and which evaluations may be learned or inferred.
5. **Autonomy defaults:** Agree the initial bank policy set, review thresholds, frequency restrictions, permitted channels, and the safe behaviour when no rule matches.
6. **Approval roles:** Define the one-Super-Admin functional baseline while preserving the future distinction between ownership, review, and policy-activation permissions.
7. **Delivery evidence:** Define which simulated events justify Sent, Delivered, Failed, or Unknown for Banking App, SMS, and Email.
8. **Product success evaluation:** Define baseline comparisons and which customer-respectful outcomes can actually be measured with the available dataset.
9. **Bank connection model:** Agree the permitted ingestion/product/delivery/feedback capabilities required for the first functional system versus later external connectors.
10. **Reference dataset:** Establish one canonical synthetic organization, customer, catalog, recommendation, policy, approval, and engagement fixture set so every product screen agrees.
11. **Simulator financial events:** Select the first supported fictional deposit/savings/transfer-like interactions, synthetic balance effects, event identifiers, and allowed feature updates; no real money movement.
12. **Simulator channel contracts:** Specify how approved engagements become backend Banking App/SMS/Email inbox items, which simulated acknowledgements are credible, and how customer actions propagate to the dashboard without falsely claiming external delivery.

**Technology selection, deployment topology, programming languages, frameworks, database products, hosting, and concrete API endpoints are intentionally outside this file.** They are evaluated after product scope and constraints are approved, then recorded in `ARCHITECTURE.md` and machine-readable contracts as appropriate.

---

## 13. Source-of-truth and change management

| Concern | Authority |
| --- | --- |
| Product identity, messaging, logo, and brand vocabulary | [`BRAND.md`](BRAND.md) |
| UI design system, components, themes, and layouts | [`DESIGN.md`](DESIGN.md) |
| Product intent, behaviour, terminology, scope, and acceptance scenarios | **This `PRODUCT.md`** |
| Selected technology, boundaries, data contracts, architecture, and deployment | [`ARCHITECTURE.md`](ARCHITECTURE.md) and its referenced contracts |
| Implemented behaviour | Tests and running software, checked against approved product and architecture specifications |

Screens generated for exploration provide valuable design references, but fictional labels, arbitrary KPI values, compliance badges, product names, and conflicting states in those screens do **not** automatically become product requirements.

A product behaviour change must update this specification and its relevant acceptance scenarios before downstream architecture, code-agent instructions, and implementation are aligned. Product assumptions not resolved here remain explicit questions; they must not be silently invented by coding agents.

---

## Appendix A — Five functional product layers

1. **Customer Intelligence:** Understand permitted facts, interests, signals, provenance, and uncertainty.
2. **Recommendation Engine:** Evaluate **WHAT** product may fit and produce Recommend / Clarify / Suppress.
3. **Central Agent:** Coordinate **WHETHER, WHEN, HOW** to propose customer engagement.
4. **Policy & Autonomy Engine:** Enforce **AUTOMATE, REVIEW, WITHHOLD** and mandatory bank restrictions.
5. **Customer Engagement:** Deliver authorized content through bank-owned channels and capture supported feedback.

The Product Catalog, Integrations, organization workspace, approvals, and dashboard supply the supporting data, governance, oversight, and operational interfaces across these layers.

## Appendix B — Glossary

- **Customer intelligence:** Evidence-organized bank customer information and qualified interpretations.
- **Product match:** A candidate association between a specific customer reference and active bank product, subject to rules.
- **Recommendation outcome:** Recommend / Clarify / Suppress from the matching layer.
- **Engagement proposal:** A coordinated suggestion of customer message, channel, and timing; not necessarily authorized.
- **Policy decision:** Automate / Review / Withhold for a proposed engagement.
- **Human approval:** Authorized review of a particular proposal and message; not a credit decision.
- **Dispatch:** A controlled request for bank-owned customer communication infrastructure to send an authorized message.
- **Delivery acknowledgement:** Evidence of delivery from an appropriate supporting source; distinct from acceptance or sending.
- **Organization workspace:** Bank-scoped interface and data context for authorized bank employees.
- **Banking simulator PWA:** Fictional bank-customer virtual smartphone with simulated Banking App, SMS, and Email views, using authorized backend records without representing a real bank integration.