import SwiftUI

struct Chip: View {
    let label: String
    let isActive: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(MxFont.body(13, weight: .semibold))
                .foregroundStyle(isActive ? .white : Mx.ink)
                .padding(.horizontal, 14)
                .padding(.vertical, 9)
                .background(isActive ? Mx.ink : Mx.card)
                .overlay(
                    Capsule().stroke(isActive ? Color.clear : Mx.line, lineWidth: 1)
                )
                .clipShape(Capsule())
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}
