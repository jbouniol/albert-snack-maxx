# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This repo is the **Snack Maxx mobile app** workstream — a student digital-transformation project (Albert School, deliverable May 28, 2026). Team: Florent, Guillaume, Jonathan, Sacha.

Snack Maxx operates 2,000 cash-only vending machines (Paris universities + metro). The app is the primary lever to shift from anonymous transactions to a recurring, data-driven customer relationship (target: €50M revenue / €15M profit by 2029). The app is **not a feature**, it is the vehicle for that shift — every product decision should be evaluated against that thesis.

Full context lives in [Docs/](Docs/):
- [Customer Objectives](Docs/Customer%20Objectives%20-%20Mobile%20App%20Workstream.md) — 7 CEO objectives + success metrics. The north star.
- [Draft Solutions](Docs/Draft%20Solutions%20-%20Mobile%20App%20Workstream.md) — 11 prioritized solutions with effort, dependencies, ship windows.
- [A/B Test Plan](Docs/A%20B%20Test%20Plan%20-%20Supplier-Funded%20Featured%20Placement.md) — sponsored-content experiment design.
- [Subject transcription](Docs/Subject%20transcription.md) — original brief, financials, constraints.
- `Persona.pdf`, `Consumer_Journey_Map.pdf` — user research.

**Read these before making product/architecture decisions.** Solution priorities (P1 → P5) and cross-workstream dependencies are non-obvious and drive what to build first.

## Stack

- Primary: **Swift / SwiftUI** (iOS app).
- Secondary: **Python** likely used for data work (voting analytics, A/B test analysis, ML for personalized home screen — solution #11).
- No code yet — repo currently contains only `Docs/`. When scaffolding, prefer the simplest layout that fits the priority-1 features (account + scan-to-pay, machine locator).

## Architecture anchors (when code lands)

The customer objectives map directly to durable subsystems. Group code along these lines, not by technical layer:

1. **Identity & payment** (Obj #1, #2) — account creation, Apple/Google SSO, scan-to-pay via QR/NFC, Apple Pay / Google Pay. Every other feature depends on an identified user; treat the user identity model as a hard contract.
2. **Machine locator + live state** (Obj #4) — map, real-time stock/status from IoT. Depends on the Physical Machine workstream's data pipeline; mock the feed behind a protocol so the app is testable without it.
3. **Voting** (Obj #3) — per-machine product voting. Differentiator. Must never be visually adjacent to sponsored content (see A/B test guardrail).
4. **Loyalty / Pass / pricing** (Obj #5, #6) — streaks, tiers, subscription, dynamic pricing.
5. **Feedback & tickets** (Obj #7) — 2-tap reporting, auto-refund flow.
6. **Sponsored placements** — capped at 20% of surface, always labeled "Sponsorisé", never inside voting or stock screens. This cap is a product invariant, enforce it in code (not just in design).

## Workflow (project-specific rules)

These come from the team's working agreement and override generic defaults:

1. **Plan first.** For any non-trivial task (3+ steps or architectural choice), write a plan to `tasks/todo.md` with checkable items before implementing. Verify the plan with the user before coding.
2. **Track progress in `tasks/todo.md`** — mark items complete as you go, add a review section at the end.
3. **Capture lessons in `tasks/lessons.md`.** After *any* user correction, append the pattern + a rule to prevent repeating it. Review `tasks/lessons.md` at session start.
4. **Subagents liberally** to keep the main context clean — offload research, exploration, parallel analysis. One concern per subagent.
5. **Verify before "done".** Never mark complete without proving it works (build, run, test, demonstrate). Diff behavior vs. main when relevant.
6. **Demand elegance on non-trivial changes.** Pause and ask "is there a more elegant way?" If a fix feels hacky, redo it knowing what you now know. Skip for small obvious fixes.
7. **Autonomous bug fixing.** Given a bug report or failing CI, just fix it — point at the logs/errors, resolve, don't ask for hand-holding.
8. **Re-plan on drift.** If something goes sideways mid-task, stop and re-plan rather than pushing through.

## Core principles

- **Simplicity first** — minimal code, minimal impact, no speculative abstraction.
- **No laziness** — find root causes, no temporary patches.
- **Minimal blast radius** — touch only what's necessary.
