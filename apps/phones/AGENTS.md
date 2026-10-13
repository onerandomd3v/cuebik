# Cuebik Virtual Phone — Codex Instructions

Applies to `apps/phones/` and its descendants. Follow the repository-root `AGENTS.md` as well.

## Application identity and ownership

- This directory contains **one standalone Next.js virtual-phone application** with Banking App, SMS, Email and Notifications views.
- Represent the approved fictional banking environment, Harbourline Bank. Do not claim a real banking integration, reproduce official bank branding, or imply that simulated transactions move actual money.
- Maintain a bank-specific interface and component system independent of Cuebik's landing/dashboard design.
- Do not import `packages/ui/`, `apps/web/` components, their styling or another frontend application's private implementation.
- Reuse components freely **within phones** where appropriate. Independent visual design does not mean duplicating every phone component.

## Data and interaction boundaries

- Use the authorized Core API and validated bank/customer-scoped contracts for functional simulation.
- Do not treat client-supplied customer identifiers as proof of identity or authorization. The backend must validate the effective session and customer scope.
- Simulated customer actions may create permitted fictional banking events through the backend. UI-only interactions must not silently invent authoritative transactions, recommendation outcomes or delivery records.
- Do not hardcode recommendations or inbox messages and present them as results of completed backend workflows.
- A CSV-imported customer can be analyzed without a simulator account. Do not create a simulated recipient or inbox delivery unless an explicitly authorized, bank-scoped recipient link exists.

## Messaging and evidence

- A qualifying recommendation does not itself authorize a message. Respect the selected communication channel, bank policy and required approvals.
- Do not broadcast one engagement into every inbox merely because Banking App, SMS and Email views are available.
- Display only backend-backed message and interaction states, with simulated delivery clearly distinguished from real-world delivery.
- Do not equate proposal, approval, queueing, dispatch, sending, delivery or message opening.
- Suppressed, withheld, rejected or otherwise unauthorized engagements must not produce simulated inbox messages.

## User experience and verification

- Keep the virtual-phone experience coherent, accessible and usable at the intended phone viewport.
- Support appropriate loading, error, empty and interaction states without inventing unsupported customer capabilities.
- Test account/customer isolation, events, channel routing, withheld messages and message-state accuracy using synthetic fixtures once the relevant tests exist.
- Follow `PRODUCT.md`, `ARCHITECTURE.md` and `docs/WORKSPACE.md` for approved behavior, technical contracts and verified commands.

## Code Review Rules

Flag Cuebik web UI imports, real-bank branding claims, invented delivery evidence, incorrect bank/customer identity mapping, cross-customer data leakage and simulated interactions that bypass backend authorization.
