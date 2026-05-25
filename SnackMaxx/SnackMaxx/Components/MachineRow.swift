import SwiftUI

struct MachineRow: View {
    let machine: Machine
    let isActive: Bool
    let action: () -> Void

    private var statusKind: MxStatusDot.Kind {
        switch machine.status {
        case .live: return .ok
        case .warn: return .warn
        case .offline: return .bad
        }
    }

    private var statusLabel: String {
        switch machine.status {
        case .live: return "En direct"
        case .warn: return "Stock bas"
        case .offline: return "Offline"
        }
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(Mx.orange.opacity(0.10))
                    MxIcon(name: .pin, size: 20, color: Mx.orange)
                }
                .frame(width: 44, height: 44)

                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 6) {
                        MxStatusDot(kind: statusKind)
                        Text(statusLabel)
                            .font(MxFont.head(10))
                            .tracking(1.4)
                            .foregroundStyle(Mx.mute)
                    }
                    Text(machine.name)
                        .font(MxFont.body(14, weight: .bold))
                        .foregroundStyle(Mx.ink)
                        .lineLimit(1)
                    Text("\(machine.products) réfs · restock \(machine.restock)")
                        .font(MxFont.body(12))
                        .foregroundStyle(Mx.mute)
                        .lineLimit(1)
                }
                Spacer(minLength: 4)
                VStack(alignment: .trailing, spacing: 2) {
                    Text(machine.distanceLabel)
                        .font(MxFont.body(14, weight: .bold))
                        .foregroundStyle(Mx.ink)
                    MxIcon(name: .chevron, size: 16, color: Mx.mute)
                }
            }
            .padding(14)
            .background(Mx.card)
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(isActive ? Mx.orange : Mx.line, lineWidth: isActive ? 1.5 : 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .shadow(color: .black.opacity(0.04), radius: 14, x: 0, y: 4)
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}
