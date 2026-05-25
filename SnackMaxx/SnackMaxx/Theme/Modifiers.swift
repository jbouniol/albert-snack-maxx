import SwiftUI

extension View {
    func mxCard(radius: CGFloat = 18) -> some View {
        self
            .background(Mx.card)
            .clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: radius, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.05), radius: 22, x: 0, y: 8)
    }

    func mxPress() -> some View {
        modifier(PressEffect())
    }
}

struct PressEffect: ViewModifier {
    @State private var pressed = false
    func body(content: Content) -> some View {
        content
            .scaleEffect(pressed ? 0.97 : 1)
            .animation(.easeOut(duration: 0.12), value: pressed)
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in pressed = true }
                    .onEnded { _ in pressed = false }
            )
    }
}

enum PillStyleKind { case neutral, ok, warn, bad, ghost }

struct MxPill: View {
    let kind: PillStyleKind
    let text: String
    let icon: String?
    init(_ text: String, kind: PillStyleKind = .neutral, icon: String? = nil) {
        self.text = text
        self.kind = kind
        self.icon = icon
    }
    var body: some View {
        HStack(spacing: 6) {
            if let icon { Image(systemName: icon).font(.system(size: 10, weight: .bold)) }
            Text(text)
        }
        .font(MxFont.body(11, weight: .semibold))
        .padding(.vertical, 5)
        .padding(.horizontal, 10)
        .foregroundStyle(fg)
        .background(bg)
        .clipShape(Capsule())
        .overlay(Capsule().stroke(stroke, lineWidth: 1))
    }
    private var fg: Color {
        switch kind {
        case .neutral, .ghost: return Mx.ink
        case .ok:    return Mx.okFg
        case .warn:  return Mx.warnFg
        case .bad:   return Mx.badFg
        }
    }
    private var bg: Color {
        switch kind {
        case .neutral: return Mx.card
        case .ghost:   return .clear
        case .ok:      return Mx.okBg
        case .warn:    return Mx.warnBg
        case .bad:     return Mx.badBg
        }
    }
    private var stroke: Color {
        switch kind {
        case .neutral, .ghost: return Mx.line
        case .ok:    return Mx.okFg.opacity(0.18)
        case .warn:  return Mx.warnFg.opacity(0.18)
        case .bad:   return Mx.badFg.opacity(0.18)
        }
    }
}

struct MxStatusDot: View {
    enum Kind { case ok, warn, bad }
    let kind: Kind
    var body: some View {
        Circle()
            .fill(color)
            .frame(width: 8, height: 8)
    }
    private var color: Color {
        switch kind {
        case .ok: return Mx.dotOk
        case .warn: return Mx.dotWarn
        case .bad: return Mx.dotBad
        }
    }
}

/// Background painter for screens.
struct MxBackground: View {
    var body: some View {
        ZStack {
            Mx.paper.ignoresSafeArea()
            // soft orange glow top-right
            RadialGradient(
                colors: [Mx.orange.opacity(0.10), .clear],
                center: UnitPoint(x: 0.85, y: -0.1),
                startRadius: 0,
                endRadius: 420
            )
            .ignoresSafeArea()
            // soft blue glow bottom-left
            RadialGradient(
                colors: [Mx.blue.opacity(0.08), .clear],
                center: UnitPoint(x: -0.1, y: 1.1),
                startRadius: 0,
                endRadius: 380
            )
            .ignoresSafeArea()
        }
    }
}
