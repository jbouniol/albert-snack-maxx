import SwiftUI

struct LoyaltyTeaser: View {
    let user: SnackUser
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            ZStack {
                LinearGradient(colors: [Mx.ink, Mx.charcoal],
                               startPoint: .topLeading, endPoint: .bottomTrailing)
                // gold sweep
                Canvas { ctx, size in
                    var p = Path()
                    p.move(to: CGPoint(x: -20, y: size.height * 0.65))
                    p.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.55),
                                   control: CGPoint(x: size.width / 2, y: size.height * 0.25))
                    ctx.stroke(p, with: .color(Color(hex: 0xFFB300).opacity(0.45)), lineWidth: 6)
                    var p2 = Path()
                    p2.move(to: CGPoint(x: -20, y: size.height * 0.80))
                    p2.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.70),
                                    control: CGPoint(x: size.width / 2, y: size.height * 0.45))
                    ctx.stroke(p2, with: .color(Mx.orangeHot.opacity(0.30)), lineWidth: 3)
                }
                .opacity(0.9)

                VStack(alignment: .leading, spacing: 14) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 8) {
                            HStack(spacing: 6) {
                                MxIcon(name: .trophy, size: 12, color: user.tier.color)
                                Text(user.tier.label.uppercased())
                                    .font(MxFont.body(11, weight: .bold))
                                    .tracking(0.6)
                                    .foregroundStyle(user.tier.color)
                            }
                            .padding(.vertical, 3).padding(.horizontal, 10)
                            .background(user.tier.bg)
                            .clipShape(Capsule())

                            MaxxHead(text: "Plus que \(user.nextPerkPts) pts", size: 22, color: .white)
                                .fixedSize(horizontal: false, vertical: true)
                            Text("avant ton prochain snack offert")
                                .font(MxFont.body(12))
                                .foregroundStyle(.white.opacity(0.7))
                        }
                        Spacer()
                        // streak badge
                        VStack(spacing: 2) {
                            MxIcon(name: .fire, size: 18, color: .white)
                            Text("\(user.streak)j")
                                .font(MxFont.body(16, weight: .heavy))
                                .foregroundStyle(.white)
                        }
                        .frame(width: 64, height: 64)
                        .background(Mx.streakBadgeGradient)
                        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                        .shadow(color: Mx.red.opacity(0.35), radius: 14, x: 0, y: 6)
                    }
                    VStack(spacing: 6) {
                        ZStack(alignment: .leading) {
                            Capsule().fill(.white.opacity(0.08)).frame(height: 8)
                            GeometryReader { geo in
                                Capsule()
                                    .fill(LinearGradient(colors: [Mx.goldText, Mx.orangeHot, Mx.red],
                                                         startPoint: .leading, endPoint: .trailing))
                                    .frame(width: geo.size.width * 0.62, height: 8)
                            }
                            .frame(height: 8)
                        }
                        HStack {
                            Text(formatEur(user.monthSpend) + " ce mois")
                                .font(MxFont.body(11))
                                .foregroundStyle(.white.opacity(0.65))
                            Spacer()
                            Text("Voir mes avantages →")
                                .font(MxFont.body(11, weight: .bold))
                                .foregroundStyle(Mx.goldText)
                        }
                    }
                }
                .padding(18)
            }
            .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
            .shadow(color: .black.opacity(0.32), radius: 26, x: 0, y: 12)
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}

struct VoteTeaser: View {
    let votes: [VoteRequest]
    let machine: Machine
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 14) {
                HStack(alignment: .top, spacing: 12) {
                    VStack(alignment: .leading, spacing: 6) {
                        HStack(spacing: 6) {
                            MxIcon(name: .vote, size: 12, color: Mx.blueDeep)
                            Text("TU DÉCIDES")
                                .font(MxFont.head(10))
                                .tracking(1.4)
                                .foregroundStyle(Mx.blueDeep)
                        }
                        MaxxHead(text: "Vote pour les prochains snacks", size: 22)
                            .fixedSize(horizontal: false, vertical: true)
                        Text("Sur \(machine.shortName) · \(votes.count) demandes en cours")
                            .font(MxFont.body(12))
                            .foregroundStyle(Mx.mute)
                    }
                    Spacer()
                    ZStack {
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Mx.blue.opacity(0.12))
                        MxIcon(name: .vote, size: 22, color: Mx.blueDeep)
                    }
                    .frame(width: 44, height: 44)
                }
                VStack(spacing: 8) {
                    ForEach(Array(votes.prefix(3).enumerated()), id: \.element.id) { (i, v) in
                        HStack(spacing: 10) {
                            Text("\(i + 1)")
                                .font(MxFont.body(11, weight: .heavy))
                                .foregroundStyle(Mx.ink2)
                                .frame(width: 22, height: 22)
                                .background(Mx.paper2)
                                .clipShape(Circle())
                            Text(v.name)
                                .font(MxFont.body(13, weight: .semibold))
                                .foregroundStyle(Mx.ink)
                                .lineLimit(1)
                            Spacer()
                            HStack(spacing: 3) {
                                if v.voted { MxIcon(name: .check, size: 12, color: Mx.orange) }
                                Text("\(v.votes)")
                                    .font(MxFont.body(12, weight: .bold))
                                    .foregroundStyle(v.voted ? Mx.orange : Mx.mute)
                            }
                        }
                    }
                }
                HStack {
                    Text("\(MockData.votesFulfilled.count) snacks déjà ajoutés grâce à vos votes ✦")
                        .font(MxFont.body(12))
                        .foregroundStyle(Mx.ink2)
                    Spacer()
                    Text("Voter →")
                        .font(MxFont.body(12, weight: .bold))
                        .foregroundStyle(Mx.orange)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .background(Mx.paper2)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .padding(18)
            .background(Mx.card)
            .overlay(
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
            .shadow(color: .black.opacity(0.05), radius: 22, x: 0, y: 8)
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}

func formatEur(_ value: Double) -> String {
    let s = String(format: "%.2f", value).replacingOccurrences(of: ".", with: ",")
    return "\(s) €"
}
