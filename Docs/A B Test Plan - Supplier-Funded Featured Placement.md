# A/B Test Plan - Supplier-Funded Featured Placement ("Snack Maxx Ads")

---

**Workstream:** Mobile App

**Team:** Florent, Guillaume, Jonathan, Sacha

**Solution tested:** #7 Supplier-funded featured placement

**Test type:** A/B/C (3 variants)

---

## 🎯 Business question

Can Snack Maxx introduce sponsored supplier content in the app without degrading user trust, engagement, and retention, and what is the maximum sponsored density the product can sustain?

## 🧪 Hypothesis

**H1** Users will tolerate up to 20% sponsored content on the home screen without a measurable drop in 30-day retention, NPS, or purchase frequency. Above 20%, trust and engagement degrade.

**H0 (null)** There is no significant difference in retention, NPS, or purchase frequency between users exposed to 0%, 20%, and 40% sponsored content.

## 🔬 Experiment design

**Variants (random assignment, user-level):**

- **Control (A)** · 33% of users: no sponsored content. Home screen 100% organic (algorithm-driven + voting-based).
- **Treatment 1 (B)** · 33% of users: 20% sponsored slots. 1 sponsored banner on home screen + 1 sponsored product in carousel. Clearly labeled "Sponsorisé".
- **Treatment 2 (C)** · 33% of users: 40% sponsored slots. 2 sponsored banners + 2 sponsored products + 1 sponsored push per week. Same labeling.

**Sponsored content sourced from 3 real paying suppliers** (Mars, Mondelez, Coca-Cola) signed on pilot contracts. Real money at stake = real test.

## 📊 Metrics

`Primary metric (decision driver)`

- 30-day retention rate (% of users who made ≥1 purchase in days 1-30 post-exposure)

`Secondary metrics (guardrails, any significant drop kills the variant)`

- In-app NPS (surveyed at day 14 and day 30)
- Purchase frequency per user per week
- App session length
- Voting participation rate (detect if ads suppress voting behavior)

`Revenue metrics (upside)`

- Sponsored revenue per user (€ per MAU)
- Sponsored CTR (supplier interest proxy)
- Conversion from sponsored view → purchase

## 👥 Audience & sample size

- **Target population:** all MAU with ≥30 days tenure on the app (exclude brand-new users who can't yet have stable behavior)
- **Sample size needed:** 3 000 users per variant = 9 000 total
Assumption: baseline retention 45%, MDE (minimum detectable effect) 5 percentage points, α=0.05, power=0.80
📎 À recalculer avec le vrai baseline une fois collecté
- **Stratification:** balanced across campus location (Sorbonne / Dauphine / Sciences Po / metro zones) and tenure (30-90 days / 90+ days)

## ⏱️ Duration

**4 weeks minimum.** Rationale:

- Week 1: novelty effect (users react to new content format)
- Weeks 2-3: stable behavior window
- Week 4: retention measurement at 30-day mark

Extended to 6 weeks if week 4 results are within margin of error (±2pp).

## ✅ Success criteria

**GO** (ship 20% variant to 100%)

- Variant B retention ≥ Control retention − 1pp (non-inferiority)
- NPS(B) ≥ NPS(A) − 3 points
- Sponsored revenue ≥ €0.80 per MAU per month

**CAUTION** (iterate before ship)

- Variant B retention drops 1-3pp → test format/placement changes before full rollout

**KILL** (do not ship)

- Variant B retention drops >3pp
- NPS(B) drops >5 points
- Voting rate drops >10% (means ads undermine the product's core differentiator)

**Variant C (40%) is expected to fail**, included to map the ceiling, not to ship.

## ⚠️ Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Supplier ad pulled mid-test (contract breach) | Pre-signed 8-week pilot contracts with 3 suppliers, cancellation penalty |
| Seasonal bias (exam period = lower app usage) | Avoid test during exam weeks (mid-May, mid-June) |
| Users screenshot and complain publicly ("Snack Maxx sold out") | Pre-draft crisis comms; cap variant C exposure to <1 000 users |
| Sample contamination (users discuss app across variants) | Campus-level stratification, isolate Sorbonne users in one variant |
| Insufficient sponsored inventory to fill variant C | Secure 6 weeks of supplier content before test launch |

## 🔁 Learning plan (regardless of outcome)

- If B wins → test format variations (video vs static, product-card vs banner) as follow-up
- If B loses → test lower density (5%, 10%) and alternative placements (bottom-of-screen only, post-purchase screen only)
- If voting drops in B → sponsored content must never appear within 2 scroll-lengths of the voting feature