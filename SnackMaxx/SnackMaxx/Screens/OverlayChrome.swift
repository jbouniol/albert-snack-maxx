import SwiftUI

/// Shared chrome for all full-screen overlays.
struct OverlayChrome<Content: View>: View {
    let title: String
    var trailing: AnyView? = nil
    let onClose: () -> Void
    let content: () -> Content

    init(title: String,
         trailing: AnyView? = nil,
         onClose: @escaping () -> Void,
         @ViewBuilder content: @escaping () -> Content) {
        self.title = title
        self.trailing = trailing
        self.onClose = onClose
        self.content = content
    }

    var body: some View {
        ZStack {
            MxBackground()
            ScrollView(showsIndicators: false) {
                VStack(spacing: 0) {
                    HStack(spacing: 8) {
                        Button(action: onClose) {
                            ZStack {
                                Circle().fill(Mx.card)
                                MxIcon(name: .back, size: 20, color: Mx.ink)
                            }
                            .frame(width: 40, height: 40)
                            .overlay(Circle().stroke(Mx.line, lineWidth: 1))
                        }
                        .buttonStyle(.plain)
                        MaxxHead(text: title, size: 22)
                            .padding(.leading, 6)
                            .fixedSize(horizontal: false, vertical: true)
                        Spacer()
                        if let trailing { trailing }
                    }
                    .padding(.horizontal, 14)
                    .padding(.top, 60)
                    .padding(.bottom, 8)

                    content()
                }
            }
        }
    }
}
