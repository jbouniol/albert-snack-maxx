import SwiftUI

struct LoyaltyView: View {
    @EnvironmentObject var state: AppState

    var body: some View {
        OverlayChrome(title: "Mon club Maxx", onClose: { state.overlay = nil }) {
            VStack(spacing: 0) {
                hero
                    .padding(.horizontal, 18).padding(.top, 8)

                SectionHeader(title: "Ton streak")
                streakCard
                    .padding(.horizontal, 18)

                SectionHeader(title: "Les niveaux")
                VStack(spacing: 10) {
                    ForEach(LoyaltyTier.allCases) { tier in
                        tierCard(tier: tier)
                    }
                }
                .padding(.horizontal, 18)

                Text("1 € dépensé = 10 pts · pts remis à zéro chaque mois.\nLe club Snack Maxx, c'est gratuit, sans engagement.")
                    .font(MxFont.body(11))
                    .foregroundStyle(Mx.mute)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 18).padding(.top, 16).padding(.bottom, 130)
            }
        }
    }

    private var hero: some View {
        ZStack {
            LinearGradient(colors: [Mx.ink, Mx.charcoal],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            Canvas { ctx, size in
                var p = Path()
                p.move(to: CGPoint(x: -20, y: size.height * 0.65))
                p.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.5),
                               control: CGPoint(x: size.width / 2, y: size.height * 0.25))
                ctx.stroke(p, with: .color(Color(hex: 0xFFB300).opacity(0.45)),
                           style: .init(lineWidth: 6, lineCap: .round))
                var q = Path()
                q.move(to: CGPoint(x: -20, y: size.height * 0.80))
                q.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.65),
                               control: CGPoint(x: size.width / 2, y: size.height * 0.45))
                ctx.stroke(q, with: .color(Mx.orangeHot.opacity(0.35)),
                           style: .init(lineWidth: 3, lineCap: .round))
                ctx.fill(Path(ellipseIn: CGRect(x: size.width - 80, y: 10,
                                                width: 80, height: 80)),
                         with: .color(Color(hex: 0xFFB300).opacity(0.08)))
            }
            VStack(alignment: .leading, spacing: 14) {
                HStack(spacing: 6) {
                    MxIcon(name: .trophy, size: 13, color: state.user.tier.color)
                    Text("NIVEAU \(state.user.tier.label.uppercased())")
                        .font(MxFont.body(12, weight: .bold))
                        .tracking(0.8)
                        .foregroundStyle(state.user.tier.color)
                }
                .padding(.vertical, 4).padding(.horizontal, 12)
                .background(state.user.tier.bg)
                .clipShape(Capsule())

                MaxxHead(text: state.user.firstName, size: 32, color: .white)

                Text(formatEur(state.user.monthSpend) + " dépensés ce mois · ")
                    .font(MxFont.body(13))
                    .foregroundStyle(.white.opacity(0.75))
                  + Text("\(formatEur(state.user.monthSaved)) économisés")
                    .font(MxFont.body(13, weight: .bold))
                    .foregroundColor(Mx.goldText)

                VStack(spacing: 6) {
                    HStack {
                        Text("Vers \(nextTier(state.user.tier).label)")
                            .font(MxFont.body(11))
                            .foregroundStyle(.white.opacity(0.7))
                        Spacer()
                        Text("\(state.user.nextPerkPts) pts restants")
                            .font(MxFont.body(11, weight: .bold))
                            .foregroundStyle(Mx.goldText)
                    }
                    ZStack(alignment: .leading) {
                        Capsule().fill(.white.opacity(0.08)).frame(height: 10)
                        GeometryReader { geo in
                            Capsule()
                                .fill(LinearGradient(colors: [Mx.goldText, Mx.orangeHot, Mx.red],
                                                     startPoint: .leading, endPoint: .trailing))
                                .frame(width: geo.size.width * 0.62, height: 10)
                        }
                        .frame(height: 10)
                    }
                }
            }
            .padding(20)
        }
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
        .shadow(color: .black.opacity(0.32), radius: 30, x: 0, y: 14)
    }

    private var streakCard: some View {
        HStack(spacing: 14) {
            VStack(spacing: 4) {
                MxIcon(name: .fire, size: 22, color: .white)
                Text("\(state.user.streak)j")
                    .font(MxFont.body(14, weight: .heavy))
                    .foregroundStyle(.white)
            }
            .frame(width: 60, height: 60)
            .background(Mx.streakBadgeGradient)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .shadow(color: Mx.red.opacity(0.3), radius: 12, x: 0, y: 6)

            VStack(alignment: .leading, spacing: 4) {
                Text("\(state.user.streak) jours d'affilée")
                    .font(MxFont.body(14, weight: .bold))
                    .foregroundStyle(Mx.ink)
                Text("Record : \(state.user.bestStreak) jours · 3 jours pour débloquer un snack offert")
                    .font(MxFont.body(12))
                    .foregroundStyle(Mx.mute)
                HStack(spacing: 6) {
                    ForEach(1...7, id: \.self) { d in
                        let done = d <= state.user.streak
                        let isPerk = d == 7
                        RoundedRectangle(cornerRadius: 6, style: .continuous)
                            .fill(done ? Mx.orangeHot : Mx.paper2)
                            .frame(height: 24)
                            .overlay(
                                RoundedRectangle(cornerRadius: 6, style: .continuous)
                                    .stroke(isPerk ? Mx.goldText : .clear, lineWidth: 1.5)
                            )
                            .overlay(
                                Group {
                                    if isPerk {
                                        MxIcon(name: .gift, size: 11, color: done ? .white : Mx.goldText)
                                    } else {
                                        Text("\(d)")
                                            .font(MxFont.body(9, weight: .heavy))
                                            .foregroundStyle(done ? .white : Mx.mute)
                                    }
                                }
                            )
                    }
                }
                .padding(.top, 4)
            }
        }
        .padding(16)
        .mxCard()
    }

    private func tierCard(tier: LoyaltyTier) -> some View {
        let isCurrent = tier == state.user.tier
        let locked = isLocked(tier)
        return VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 10) {
                HStack(spacing: 5) {
                    MxIcon(name: .trophy, size: 11, color: tier.color)
                    Text(tier.label.uppercased())
                        .font(MxFont.body(11, weight: .bold))
                        .tracking(0.6)
                        .foregroundStyle(tier.color)
                }
                .padding(.vertical, 4).padding(.horizontal, 10)
                .background(tier.bg)
                .clipShape(Capsule())
                if isCurrent { MxPill("Actuel", kind: .ok) }
                if locked {
                    Text(tier.unlockHint)
                        .font(MxFont.body(11))
                        .foregroundStyle(Mx.mute)
                }
            }
            VStack(alignment: .leading, spacing: 4) {
                ForEach(tier.perks, id: \.self) { perk in
                    HStack(spacing: 8) {
                        MxIcon(name: .check, size: 14, color: tier.color)
                        Text(perk)
                            .font(MxFont.body(13))
                            .foregroundStyle(Mx.ink2)
                    }
                }
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Mx.card)
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(isCurrent ? Mx.orange : Mx.line, lineWidth: isCurrent ? 1.5 : 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .opacity(locked ? 0.65 : 1)
    }

    private func nextTier(_ current: LoyaltyTier) -> LoyaltyTier {
        switch current {
        case .bronze: return .silver
        case .silver: return .gold
        case .gold:   return .gold
        }
    }
    private func isLocked(_ tier: LoyaltyTier) -> Bool {
        switch (state.user.tier, tier) {
        case (.bronze, .silver), (.bronze, .gold), (.silver, .gold): return true
        default: return false
        }
    }
}
