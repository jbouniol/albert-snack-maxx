import SwiftUI

struct SectionHeader: View {
    let title: String
    var actionLabel: String? = nil
    var onAction: (() -> Void)? = nil

    var body: some View {
        HStack(alignment: .center, spacing: 8) {
            MaxxHead(text: title, size: 20)
                .fixedSize()
            Spacer()
            if let actionLabel, let onAction {
                Button(action: onAction) {
                    HStack(spacing: 4) {
                        Text(actionLabel)
                            .font(MxFont.body(13, weight: .bold))
                        MxIcon(name: .chevron, size: 16, color: Mx.orange)
                    }
                    .foregroundStyle(Mx.orange)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 18)
        .padding(.top, 20)
        .padding(.bottom, 10)
    }
}
