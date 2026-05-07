# Draft Solutions - Mobile App Workstream

---

**Workstream:** Mobile App

**Team:** Florent, Guillaume, Jonathan, Sacha

---

## 🧭 Prioritization logic

Each solution is scored on 3 dimensions:

- **Impact** on the 7 Customer Objectives (speed, identification, voting, availability, habit, price, feedback)
- **Effort** (S < 2 weeks dev | M 2-6 weeks | L 6-12 weeks | XL 3+ months + cross-team)
- **Dependencies** with other workstreams

Priority = highest impact × lowest effort × unblocks downstream features.

## 🥇 Priority 1 · Foundation (must ship first)

### 1. Account creation + scan-to-pay at machine

`Effort: L`

Create an account in 30 seconds (email or Apple/Google SSO). Scan the QR code on the machine, pick a product on the phone, pay with Apple Pay / Google Pay / saved card. Transaction completes in under 10 seconds.

**Why first:** every other feature depends on an identified user. Without account + cashless payment, loyalty, voting, history, and personalization cannot exist.

**Covers objectives:** #1 speed, #2 identification

**Dependencies:** Payments & Pricing (payment stack), Physical Machine (QR code or NFC tag on machine)

### 2. Machine locator with real-time stock and status

`Effort: M`

Map of all Snack Maxx machines nearby. Each marker shows live stock level (green / orange / empty) and functional status (operational / out of service). User sees before walking 3 minutes to a dead machine.

**Why high priority:** kills the #1 WTF moment identified in the customer journey (empty / broken machine). Low dev cost if IoT data already flows from machines.

**Covers objectives:** #4 availability

**Dependencies:** Physical Machine (IoT sensors must push stock + status), Stocker Experience (data pipeline)

## 🥈 Priority 2 · Retention drivers (ship within 3 months of launch)

### 3. Loyalty program with streaks and tiered rewards

`Effort: M`

Every purchase earns points. 7-day streak unlocks a free snack. Tiered membership (Bronze / Silver / Gold) with monthly perks: free drink, early access to new products, exclusive bundles. Gamified UX with visible progress.

**Why:** student budget is fixed, so frequency is the only growth lever. Loyalty is the mechanic that turns an impulse buy into a daily habit.

**Covers objectives:** #5 daily habit, #6 fair perceived price

**Dependencies:** Payments & Pricing (discount logic), Growth (acquisition funnel)

### 4. Product voting per machine

`Effort: M`

In the app, each machine has a voting page. Users vote for products they want to see ("+1 Kinder Bueno in this machine"). Top-voted products that are not yet stocked get flagged to the Snack Selection team. Monthly "you asked, we added" push notification.

**Why:** unique differentiator on the category. Turns passive consumers into co-deciders. Directly solves the root cause: supplier-driven selection.

**Covers objectives:** #3 influence selection, #2 identification (vote requires account)

**Dependencies:** Snack Selection (must act on votes), Communications (feedback loop messaging)

## 🥉 Priority 3 · Monetization levers (ship within 6-12 months)

### 5. Monthly snack subscription ("Snack Maxx Pass")

`Effort: L`

€9.90/month: 1 free snack per weekday (Mon-Fri, max 20/month) or €14.90 for unlimited below €2 items. Auto-renewing, cancellable anytime. Subscribers get dedicated lane at machine (scan-and-go, no payment step).

**Why:** predictable recurring revenue, locks in daily habit, price-competitive vs kiosque. Bet on this being the hero feature for habit formation.

**Covers objectives:** #5 habit, #6 perceived price

**Dependencies:** Payments & Pricing (recurring billing), Growth (churn analytics)

**⚠️ Risk:** cannibalization of full-price purchases. Needs A/B test to validate unit economics.

### 6. Dynamic pricing + flash offers

`Effort: M`

Time-based discounts pushed to app: -20% after 4pm on fresh items expiring, happy hour 10-11am on coffee, surprise flash offers when a machine is overstocked. Visible only in-app → push notification trigger.

**Why:** reduces waste for Snack Maxx (overstocked items), creates urgency-driven app opens, differentiates from Selecta's static pricing.

**Covers objectives:** #6 fair price, #5 habit (app open frequency)

**Dependencies:** Payments & Pricing (pricing engine), Stocker Experience (overstock signal)

### 7. Supplier-funded featured placement ("Snack Maxx Ads")

`Effort: L`

Monetize app real estate by letting suppliers (Mars, Mondelez, Lactalis, PepsiCo) pay for featured slots on the home screen, "new this week" carousel, or push notifications for product launches. Strict rules: only products already stocked (based on user voting) are eligible. Featured content is labeled "Sponsored". Bidding model with price varying by campus and time slot.

**Why:** creates a new revenue stream (estimated €500k-1.5M/year at 100k MAU based on vending sector CPM benchmarks, 📎 à vérifier). Suppliers get something they cannot buy from Selecta today: demographic data on captive Gen Z. Aligned with "customer-driven" thesis because suppliers compete for app attention, not for shelf space, the shelf is decided by votes.

**Covers objectives:** Revenue diversification (outside the 7 Customer Objectives but strategically critical to hit 2029 financial targets). Partially serves #6 fair price because ad revenue subsidizes product prices.

**Dependencies:** Snack Selection (must guarantee stock matches votes, not ads), Marketing (supplier B2B sales), legal (clear "Sponsored" labeling, comply with app store rules), Data (campaign measurement dashboards for suppliers).

**⚠️ Risks:**

- Brand perception: if users feel the app is an ad platform, trust drops
- Regulatory: ads targeting students 18+ OK, but 15-17 minors on university campuses = compliance risk
- Cannibalization of voting legitimacy if users suspect paid products are favored

**🎯 Guardrail:** sponsored slots capped at 20% of app surface area. No sponsored content in voting or stock availability screens. Monthly transparency report to users: "X% of screen was sponsored this month."

## 🏅 Priority 4 · Trust and feedback (ship within 9 months)

### 8. In-app feedback & ticket system

`Effort: S`

2-tap issue reporting: select machine → select issue (empty / jammed / expired / wrong item / other) → submit. Auto-refund if validated. User gets real-time ticket status. Stockers see tickets in their app.

**Why:** cheapest to build, huge trust signal. Frustration becomes actionable data. Closes the customer journey loop.

**Covers objectives:** #7 feedback loop

**Dependencies:** Stocker Experience (ticket inbox), Communications (resolution messaging)

### 9. Purchase history + reorder one-tap

`Effort: S`

List of past purchases. One-tap "buy the same thing" at the nearest machine. Weekly summary: "you spent €18.40, saved €2.10 with Pass, ate 4 Kinder Bueno 🫠".

**Why:** minimal dev cost, high habit-forming value. Surfaces value of the app every week.

**Covers objectives:** #1 speed (reorder shortcut), #5 habit

**Dependencies:** None (internal data only)

## 🚀 Priority 5 · Growth and emotional layer (ship within 12 months)

### 10. Referral program with campus leaderboard

`Effort: M`

Invite a friend → both get a free snack on first friend purchase. Campus leaderboard: top 10 referrers at Sorbonne / Dauphine / Sciences Po visible in-app with badges. Monthly "top recruiter" wins a month of free Pass.

**Why:** virality on captive campus populations. Transforms the product into social status. Network effect at zero marketing cost.

**Covers objectives:** growth (outside the 7 but strategically critical)

**Dependencies:** Growth, Marketing

### 11. Personalized home screen with push content

`Effort: M`

Based on purchase history + time of day + location: "You usually grab a Coke Zero around now, the machine at Dauphine has some in stock". ML-driven recommendations after 30 days of data.

**Why:** converts identification (#2) into genuine personalization. Creates the "it knows me" moment that drives emotional attachment, the layer Selecta cannot build.

**Covers objectives:** #5 habit, #1 speed

**Dependencies:** Data infrastructure (need 3-6 months of usage data first)

## 📊 Prioritized summary table

| # | Solution | Effort | Primary objective | Ship window |
| --- | --- | --- | --- | --- |
| 1 | Account + scan-to-pay | L | #1 speed, #2 ID | Month 0-3 |
| 2 | Machine locator + live stock | M | #4 availability | Month 0-3 |
| 3 | Loyalty streaks + tiers | M | #5 habit, #6 price | Month 3-6 |
| 4 | Product voting | M | #3 selection | Month 3-6 |
| 5 | Snack Maxx Pass subscription | L | #5 habit, #6 price | Month 6-9 |
| 6 | Dynamic pricing + flash offers | M | #6 price, #5 habit | Month 6-9 |
| 7 | Supplier-funded featured placement | L | Revenue diversification | Month 9-12 |
| 8 | In-app feedback + tickets | S | #7 feedback | Month 6-9 |
| 9 | Purchase history + reorder | S | #1 speed, #5 habit | Month 6-9 |
| 10 | Referral + campus leaderboard | M | Growth | Month 9-12 |
| 11 | Personalized home screen | M | #5 habit | Month 9-12 |

## 🔗 Cross-workstream dependencies

| Mobile App solution | Partner workstream(s) |
| --- | --- |
| #1 Account + scan-to-pay | Payments & Pricing, Physical Machine |
| #2 Machine locator | Physical Machine, Stocker Experience |
| #3 Loyalty | Payments & Pricing, Growth |
| #4 Voting | Snack Selection, Communications |
| #5 Pass subscription | Payments & Pricing, Growth |
| #6 Dynamic pricing | Payments & Pricing, Stocker Experience |
| #7 Supplier ads | Snack Selection, Marketing, Payments & Pricing |
| #8 Feedback & tickets | Stocker Experience, Communications |
| #10 Referral | Growth, Marketing |