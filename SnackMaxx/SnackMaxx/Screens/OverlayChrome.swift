import SwiftUI

/// Shared chrome for all full-screen overlays.
/// Supports swipe-down-to-dismiss via the drag handle at the top.
struct OverlayChrome<Content: View>: View {
    let title: String
    var trailing: AnyView? = nil
    let onClose: () -> Void
    let content: () -> Content

    @State private var dragOffset: CGFloat = 0

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
            VStack(spacing: 0) {
                // ── Drag handle (gesture zone) ──
                dragHandleStrip

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 0) {
                        navHeader
                        content()
                    }
                }
            }
        }
        .offset(y: max(0, dragOffset))
        .animation(.interactiveSpring(response: 0.28, dampingFraction: 0.9), value: dragOffset)
    }

    // MARK: – Drag handle

    private var dragHandleStrip: some View {
        HStack {
            Capsule()
                .fill(Mx.mute.opacity(0.35))
                .frame(width: 44, height: 4)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 10)
        .padding(.bottom, 6)
        .contentShape(Rectangle())
        .gesture(
            DragGesture(minimumDistance: 10)
                .onChanged { value in
                    withAnimation(.interactiveSpring(response: 0.28, dampingFraction: 0.9)) {
                        dragOffset = max(0, value.translation.height)
                    }
                }
                .onEnded { value in
                    let fast = value.predictedEndTranslation.height > 200
                    let far  = value.translation.height > 100
                    if fast || far {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.85)) {
                            onClose()
                        }
                    } else {
                        withAnimation(.spring(response: 0.42, dampingFraction: 0.82)) {
                            dragOffset = 0
                        }
                    }
                }
        )
    }

    // MARK: – Nav header

    private var navHeader: some View {
        VStack(spacing: 8) {
            // Row: back  |  logo  |  trailing
            HStack {
                Button(action: onClose) {
                    ZStack {
                        Circle().fill(Mx.card)
                        MxIcon(name: .back, size: 20, color: Mx.ink)
                    }
                    .frame(width: 40, height: 40)
                    .overlay(Circle().stroke(Mx.line, lineWidth: 1))
                }
                .buttonStyle(.plain)

                Spacer()

                Image("LogoSnackMaxx")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 22)

                Spacer()

                if let trailing {
                    trailing
                } else {
                    Color.clear.frame(width: 40, height: 40) // balance
                }
            }
            .padding(.horizontal, 14)
            .padding(.top, 2)

            // Large page title
            MaxxHead(text: title, size: 24)
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 14)
        }
        .padding(.top, 48) // safe area top
        .padding(.bottom, 10)
    }
}
