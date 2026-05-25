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
                    centerButton
                        .frame(maxWidth: .infinity)
                } else {
                    Button {
                        active = tab
                    } label: {
                        VStack(spacing: 3) {
                            MxIcon(name: icon, size: 22, color: active == tab ? Mx.orange : Mx.mute, weight: .semibold)
                            Text(label)
                                .font(MxFont.body(10, weight: .bold))
                                .foregroundStyle(active == tab ? Mx.orange : Mx.mute)
                        }
                        .frame(maxWidth: .infinity)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 6)
        .background(Mx.card)
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(Mx.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
        .shadow(color: .black.opacity(0.12), radius: 24, x: 0, y: 8)
        .padding(.horizontal, 14)
        .padding(.bottom, 26)
    }

    private var centerButton: some View {
        Button(action: onScan) {
            VStack(spacing: 4) {
                ZStack {
                    Circle()
                        .fill(Mx.primaryButtonGradient)
                        .frame(width: 56, height: 56)
                        .overlay(Circle().stroke(Mx.card, lineWidth: 3))
                        .shadow(color: Mx.orangeDeep.opacity(0.4), radius: 16, x: 0, y: 10)
                    MxIcon(name: .qrcode, size: 26, color: .white, weight: .bold)
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
