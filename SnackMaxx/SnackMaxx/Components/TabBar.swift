import SwiftUI

struct TabBar: View {
    @Binding var active: AppTab
    let onScan: () -> Void

    private let tabs: [(AppTab, String, MxIconName, Bool)] = [
        (.home,    "Accueil", .home,   false),
        (.snacks,  "Snacks",  .snack,  false),
        (.scan,    "Scan",    .qrcode, true),
        (.map,     "Carte",   .map,    false),
        (.profile, "Profil",  .user,   false),
    ]

    var body: some View {
        HStack(spacing: 0) {
            ForEach(tabs, id: \.0) { (tab, label, icon, center) in
                if center {
                    centerButton.frame(maxWidth: .infinity)
                } else {
                    Button {
                        withAnimation(.spring(response: 0.35, dampingFraction: 0.75)) {
                            active = tab
                        }
                    } label: {
                        VStack(spacing: 2) {
                            MxIcon(name: icon, size: 22,
                                   color: active == tab ? Mx.orange : Mx.mute,
                                   weight: active == tab ? .bold : .semibold)
                                .scaleEffect(active == tab ? 1.12 : 1.0)
                                .animation(.spring(response: 0.3, dampingFraction: 0.6), value: active)

                            Text(label)
                                .font(MxFont.body(10, weight: active == tab ? .bold : .semibold))
                                .foregroundStyle(active == tab ? Mx.orange : Mx.mute)

                            // Active indicator dot
                            Circle()
                                .fill(Mx.orange)
                                .frame(width: 4, height: 4)
                                .scaleEffect(active == tab ? 1.0 : 0.01)
                                .opacity(active == tab ? 1.0 : 0)
                                .animation(.spring(response: 0.3, dampingFraction: 0.6), value: active)
                        }
                        .frame(maxWidth: .infinity)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(.top, 10)
        .padding(.bottom, 10)
        .padding(.horizontal, 6)
        // ── Liquid Glass background (no clipShape → FAB can overflow above) ──
        .background {
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(.ultraThinMaterial)
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .stroke(
                    LinearGradient(
                        colors: [.white.opacity(0.6), .white.opacity(0.15)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 0.75
                )
        }
        .shadow(color: .black.opacity(0.09), radius: 22, x: 0, y: -3)
        .padding(.horizontal, 14)
        .padding(.bottom, 8)
        .sensoryFeedback(.impact(flexibility: .soft, intensity: 0.5), trigger: active)
    }

    // FAB center button — offset(y: -22) protrudes above the glass pill.
    // No clipShape on the container means this renders freely without being cut.
    private var centerButton: some View {
        Button(action: onScan) {
            VStack(spacing: 4) {
                ZStack {
                    Circle()
                        .fill(Mx.primaryButtonGradient)
                        .frame(width: 58, height: 58)
                        .overlay(
                            Circle().stroke(
                                LinearGradient(
                                    colors: [.white.opacity(0.5), .white.opacity(0.1)],
                                    startPoint: .top, endPoint: .bottom
                                ),
                                lineWidth: 1
                            )
                        )
                        .shadow(color: Mx.orangeDeep.opacity(0.45), radius: 18, x: 0, y: 10)
                    MxIcon(name: .qrcode, size: 27, color: .white, weight: .bold)
                }
                Text("Scan")
                    .font(MxFont.body(10, weight: .bold))
                    .foregroundStyle(Mx.ink2)
            }
            .offset(y: -22)
            .frame(height: 48)
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}
