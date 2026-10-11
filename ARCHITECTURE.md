# Cuebik — System Architecture

**Version:** 0.1.0  
**Status:** Working draft — technology candidates only; no stack approved  
**Updated:** 11 October 2026

> **Document scope:** This is the starting point for Cuebik's architecture evaluation, not a completed architecture design or an implementation mandate. All technologies listed below are **provisional candidates**. We will refine the selection based on the requirements in [`PRODUCT.md`](PRODUCT.md), measured workloads, integration and security constraints, and engineering review. Finalized component boundaries, data models, deployment topology, API contracts, operational guarantees, and architectural decisions will be documented here after evaluation.

## 1. Provisional technology selection

The following table records the current leading candidates, the product-specific reasons for considering them, and our confidence in their suitability. **No selection in this table is final.**

| Product responsibility | Leading candidate | Why it fits Cuebik | Confidence |
| --- | --- | --- | --- |
| **Operational database** | PostgreSQL | Strong transactional integrity for recommendations, approvals, policies, and engagement records; supports bank-level data isolation. | High |
| **Backend language** | Python | Extensive ecosystem for customer intelligence, financial data processing, machine learning, and recommendation logic. | High |
| **Backend framework** | Django + Django Ninja; FastAPI as alternative | Django provides mature data management, transactions, and authentication; Django Ninja adds typed APIs. FastAPI offers a leaner API-first alternative. | Medium |
| **Data validation & API contracts** | Typed schemas + OpenAPI | Keeps the banking dashboard, Android app, and backend aligned through explicit, validated request and response contracts. | High |
| **Customer feature processing** | Python data ecosystem (Polars, pandas, NumPy) | Transforms permitted financial and behavioural signals into usable customer features for matching. | High |
| **Recommendation Engine** | Eligibility rules + ranking model | Keeps mandatory bank product restrictions separate from relevance scoring so an ineligible product cannot qualify merely because it scores highly. | High |
| **ML tooling** | scikit-learn; LightGBM where justified | scikit-learn supports explainable baselines and evaluation; LightGBM may improve ranking if appropriate labeled data supports it. | Medium |
| **Central Agent** | Structured orchestration + selective LLM use | Coordinates whether, when, and how to propose engagement while keeping sensitive authorization decisions outside an LLM. | Medium |
| **Policy evaluator** | Versioned deterministic rules | Produces testable, predictable Automate / Review / Withhold decisions under bank-defined restrictions. | High |
| **Background execution** | PostgreSQL-backed jobs; Temporal alternative | Supports scheduled engagements, ingestion, and retries; Temporal warrants evaluation for complex, long-running workflows. | Medium |
| **Web frontend** | React + TypeScript | Supports an interactive banking dashboard with reusable components and typed application data. | High |
| **Web framework** | Next.js or Vite | Next.js can serve the public website and dashboard together; Vite may simplify a predominantly client-heavy dashboard. | Medium |
| **Android banking app** | Kotlin Compose or React Native + Expo | Kotlin provides a native Android experience; React Native offers cross-platform development and possible TypeScript reuse. | Medium |
| **Authentication** | Managed B2B identity or framework-based authentication | Provides controlled employee access while allowing for eventual enterprise identity and organization membership management. | Open |
| **Hosting & deployment** | Managed containers + managed PostgreSQL | Can run API and background workers independently while supporting persistent storage and controlled deployments. | Medium |
| **Observability** | OpenTelemetry-compatible instrumentation | Enables tracing and diagnosis across recommendation, agent, policy, approval, and engagement processing. | High |

### 1.1 How to interpret confidence

- **High:** Strong fit to the currently defined product requirements; still subject to design and operational validation.
- **Medium:** Credible leading approach, but alternatives must be compared against constraints or prototypes.
- **Open:** Insufficient evidence or unresolved requirements prevent a preferred selection.

Confidence is **not** a benchmark result, a production-readiness claim, or approval to implement a candidate.

### 1.2 Important distinctions

1. **High confidence does not mean finalized.** For example, PostgreSQL and Python are strong candidates, but deployment constraints and representative workloads still need examination.
2. **Some rows describe architectural approaches rather than individual products.** The Recommendation Engine, Central Agent, and policy evaluator require internal design decisions before their supporting libraries can be selected.
3. **Choices must be evaluated as a system.** The backend framework, database access, background execution, and authorization mechanisms must work together correctly. The same applies to model training, inference, and agent orchestration.

## 2. Evaluation status and next steps

This document intentionally does **not yet** contain a finalized architecture diagram, selected stack, data model, deployment design, API specification, scaling targets, or technology decision records.

Before approving candidates, evaluate their suitability against:

- The workflows and decision boundaries in [`PRODUCT.md`](PRODUCT.md).
- Correctness of eligibility, approval, policy precedence, and pre-dispatch permission checks.
- Data isolation, privacy, integrity, auditability, and recovery requirements.
- Actual workloads, latency, throughput, and infrastructure cost targets.
- Available training/evaluation data and explainability requirements.
- Bank integration constraints, team experience, and maintainability.

All final technology selections and their trade-offs will be recorded in this file following review. Until then, **the table above is a working shortlist, not an implementation instruction**.
