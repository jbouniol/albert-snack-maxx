import SwiftUI

enum MaxxButtonVariant {
    case primary, blue, dark, ghost, cream
}

enum MaxxButtonSize {
    case sm, md, lg
    var height: CGFloat {
        switch self {
        case .sm: return 38
        case .md: return 46
        case .lg: return 54
        }
    }
    var font: CGFloat {
        switch self {
        case .sm: return 13
        case .md: return 14
        case .lg: return 15
        }
    }
    var radius: CGFloat {
        switch self {
        case .sm: return 12
        case .md: return 14
        case .lg: return 16
        }
    }
    var hpad: CGFloat {
        switch self {
        case .sm: return 14
        case .md: return 18
        case .lg: return 22
        }
    }
    var gap: CGFloat {
        switch self {
        case .sm: return 6
        case .md: return 8
        case .lg: return 10
        }
    }
}

struct MaxxButton<Icon: View>: View {
    let title: String
    let variant: MaxxButtonVariant
    let size: MaxxButtonSize
    let full: Bool
    let action: () -> Void
    let icon: Icon

    init(_ title: String,
         variant: MaxxButtonVariant = .primary,
         size: MaxxButtonSize = .lg,
         full: Bool = false,
         action: @escaping () -> Void,
         @ViewBuilder icon: () -> Icon)
    {
        self.title = title
        self.variant = variant
        self.size = size
        self.full = full
        self.action = action
        self.icon = icon()
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: size.gap) {
                icon
                Text(title)
                    .font(MxFont.body(size.font, weight: .bold))
                    .tracking(0.2)
            }
            .foregroundStyle(fg)
            .padding(.horizontal, size.hpad)
            .frame(maxWidth: full ? .infinity : nil)
            .frame(height: size.height)
            .background(bg)
            .overlay(border)
            .clipShape(RoundedRectangle(cornerRadius: size.radius, style: .continuous))
            .shadow(color: shadow.color, radius: shadow.r, x: 0, y: shadow.y)
        }
        .buttonStyle(.plain)
        .mxPress()
    }

    @ViewBuilder private var bg: some View {
        switch variant {
        case .primary: Mx.primaryButtonGradient
        case .blue:    Mx.blueButtonGradient
        case .dark:    Mx.ink
        case .ghost:   Color.clear
        case .cream:   Mx.cream
        }
    }
    private var fg: Color {
        switch variant {
        case .primary, .blue, .dark: return .white
        case .ghost, .cream:         return Mx.ink
        }
    }
    @ViewBuilder private var border: some View {
        switch variant {
        case .ghost:
            RoundedRectangle(cornerRadius: size.radius, style: .continuous)
                .stroke(Mx.ink.opacity(0.18), lineWidth: 1.5)
        case .cream:
            RoundedRectangle(cornerRadius: size.radius, style: .continuous)
                .stroke(Mx.line, lineWidth: 1.5)
        default: EmptyView()
        }
    }
    private var shadow: (color: Color, r: CGFloat, y: CGFloat) {
        switch variant {
        case .primary: return (Mx.orangeDeep.opacity(0.30), 18, 8)
        case .blue:    return (Mx.blueDeep.opacity(0.30), 18, 8)
        case .dark:    return (.black.opacity(0.22), 18, 6)
        case .ghost:   return (.clear, 0, 0)
        case .cream:   return (.black.opacity(0.06), 14, 6)
        }
    }
}

/// Icon-less convenience init for MaxxButton.
extension MaxxButton where Icon == EmptyView {
    init(_ title: String,
         variant: MaxxButtonVariant = .primary,
         size: MaxxButtonSize = .lg,
         full: Bool = false,
         action: @escaping () -> Void)
    {
        self.init(title, variant: variant, size: size, full: full, action: action) {
            EmptyView()
        }
    }
}
