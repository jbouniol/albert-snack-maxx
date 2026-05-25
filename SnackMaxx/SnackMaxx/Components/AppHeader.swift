import SwiftUI

struct AppHeader: View {
    let machine: Machine
    var showTicket: Bool = true
    let onLocation: () -> Void
    let onNotifications: () -> Void
    let onTicket: () -> Void

    var body: some View {
        VStack(spacing: 14) {
            HStack {
                Image("LogoSnackMaxx")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 36)
                Spacer()
                HStack(spacing: 8) {
                    if showTicket {
                        circleButton(icon: .alert, action: onTicket)
                    }
                    ZStack(alignment: .topTrailing) {
                        circleButton(icon: .bell, action: onNotifications)
                        Circle()
                            .fill(Mx.orange)
                            .frame(width: 8, height: 8)
                            .overlay(Circle().stroke(Mx.card, lineWidth: 2))
                            .offset(x: -8, y: 8)
                    }
                }
            }
            Button(action: onLocation) {
                HStack(spacing: 10) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .fill(Mx.orange.opacity(0.10))
                        MxIcon(name: .pin, size: 18, color: Mx.orange)
                    }
                    .frame(width: 36, height: 36)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("DISTRIBUTEUR LE PLUS PROCHE")
                            .font(MxFont.head(10))
                            .tracking(1.4)
                            .foregroundStyle(Mx.mute)
                        Text("\(machine.name) · \(machine.distanceLabel)")
                            .font(MxFont.body(14, weight: .semibold))
                            .foregroundStyle(Mx.ink)
                            .lineLimit(1)
                    }
                    Spacer(minLength: 4)
                    MxIcon(name: .chevron, size: 18, color: Mx.mute)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background(Mx.card)
                .overlay(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .stroke(Mx.line, lineWidth: 1)
                )
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 18)
    }

    private func circleButton(icon: MxIconName, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            ZStack {
                Circle().fill(Mx.card)
                MxIcon(name: icon, size: 18, color: Mx.ink)
            }
            .frame(width: 40, height: 40)
            .overlay(Circle().stroke(Mx.line, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }
}
