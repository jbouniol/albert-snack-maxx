# Snack Maxx iOS Demo — Build Tracker

Mirrors `/Users/jo/.claude/plans/fetch-this-design-file-melodic-rain.md`.

## Phase A — Foundation

- [x] Generate Xcode project via `xcodegen` (`SnackMaxx/project.yml`)
- [x] Download 4 fonts (Bowlby One, Archivo Black, Space Grotesk, Bungee) into `SnackMaxx/SnackMaxx/Fonts/`
- [x] Wire `UIAppFonts` in Info.plist (via xcodegen)
- [x] `Theme/Colors.swift` — 14 brand colors + 7 gradient presets + `Color.shade(pct:)`
- [x] `Theme/Fonts.swift` — `MxFont.display/head/body/accent` + `.mxHeadStyle(skew:)` for true CGAffineTransform skew
- [x] `Theme/Modifiers.swift` — `.mxCard()`, `.mxPress()`, `MxPill`, `MxStatusDot`, `MxBackground`
- [x] Models: `Product`, `Machine`, `SnackUser`, `LoyaltyTier`, `VoteRequest`, `VoteFulfilled`, `TicketType`, `PastTicket`, `Purchase`
- [x] `Data/MockData.swift` — full port of `claude-design/project/data.jsx`
- [x] `AppState` ObservableObject — tab, machine, overlay, scan, payTarget, votes
- [x] `SnackMaxxApp.swift` + `RootView.swift`
- [x] Asset catalog: `AppIcon`, `AccentColor`, `LaunchBackground`, `LogoSnackMaxx.imageset`

## Phase B — Onboarding

- [x] `SplashView` with logo + chrome eyebrow + "Commencer" button + spring entrance
- [x] `AuthMethodView` with Apple/Google/Email buttons + Face ID overlay during simulated auth
- [x] `NameEntryView` with text field, "Continuer" CTA, persists to `@AppStorage`
- [x] `OnboardingFlow` wrapper with ambient gradient background

## Phase C — Tab shell + Home

- [x] `TabBar` with 5 tabs + center QR FAB at `y: -22px` offset
- [x] `AppHeader` (logo + bell with dot + ticket button + location pill)
- [x] `MaxxButton` (5 variants × 3 sizes; refactored to use `icon:` only to avoid Swift 6 trailing-closure ambiguity)
- [x] `ChromeText` + `MaxxHead` with `CGAffineTransform` skew
- [x] `Chip`, `SectionHeader`, `MxIcon` (32 cases mapped to SF Symbols + 2 custom paths)
- [x] `SnackPackage` SwiftUI port (6 kinds: chips bag, bar, cookie, can, bottle, healthy)
- [x] `CategoryTile`, `ProductCard`, `MachineRow`, `FeaturedCard`, `LoyaltyTeaser`, `VoteTeaser`
- [x] `HomeView` — hero machine card + personalized banner + Reprendre carousel + categories + featured + loyalty teaser + vote teaser + low-stock list

## Phase D — Other tabs

- [x] `SnacksView` — search + category chip rail + 2-col LazyVGrid of `ProductCard`
- [x] `MapView` — stylized Canvas with cream background, grid, 2 curved roads, Seine, 5 pins, blue you-are-here pulse + machine list
- [x] `ProfileView` — identity card with gradient initials avatar + inner loyalty card + stat row + activities + favorites + saved machines + preferences

## Phase E — Overlays & sheets

- [x] `OverlayChrome` wrapper (top bar with back button, MaxxHead title, scroll container)
- [x] `ProductDetailView` — colored hero with package art + stock/kcal cards + nutri row + machine row + Apple Pay CTA
- [x] `ScanView` — animated viewfinder with 4 corner brackets + scan line + auto-resolve in 2s
- [x] `PayConfirmView` — 3-phase (confirm → Face ID → success) with recovery code reveal
- [x] `LoyaltyView` — dark hero with progress + 7-day streak grid + 3 tier cards
- [x] `HistoryView` — month summary + 7 purchase rows with re-order
- [x] `VoteView` — blue hero + tabs (active / fulfilled) + vote list with +/- toggles + suggest-new expanding card
- [x] `TicketView` — 3-step (type grid → detail with notes + refund toggle → success)
- [x] `NotifsView` — 6 toggles grouped by Activité / Découverte / Résumé

## Phase F — Build, polish, deploy

- [x] Full typecheck via `swiftc -typecheck` against iOS 17.0 simulator target — **0 errors, 0 warnings**
- [x] README with iPhone deploy steps
- [x] Document iOS 26.5 platform install requirement
- [ ] (USER) Install iOS 26.5 simulator runtime via Xcode → Settings → Platforms
- [ ] (USER) First end-to-end build in Xcode simulator
- [ ] (USER) Sideload to personal iPhone with Personal Team signing
- [ ] (USER) Walk full 11-step demo script
- [ ] (OPTIONAL) Visual diff vs `claude-design/project/index.html` rendered in browser

## Review

The demo covers all 7 customer objectives from `Docs/Customer Objectives - Mobile App Workstream.md`:

| Objective | Implemented as |
|---|---|
| #1 Fast purchase | Onboarding → Scan → PayConfirm |
| #2 Identification | NameEntry + `@AppStorage` user |
| #3 Voting | VoteView with persistent count |
| #4 Real-time availability | Home hero stock %, machine status pills |
| #5 Daily habit | LoyaltyView with streak grid + tiers |
| #6 Fair price | Silver discount in PayConfirm totals |
| #7 Feedback | TicketView 3-step flow with auto-refund |

The DA matches the prototype:
- Brand palette ripped from `styles.css` (14 colors, exact hex)
- 4 Google fonts bundled (Bowlby One italic chrome, Archivo Black heads, Space Grotesk body, Bungee accents)
- Skewed italic display via `CGAffineTransform`
- Stylized SnackPackage SVG → SwiftUI Canvas/Shape ports
- French copy preserved verbatim from `data.jsx`

The only deferred design feature is the **MAXX intensity dark mode**. The plan flagged this as Phase F stretch goal — skipped to ship the core demo on time.
