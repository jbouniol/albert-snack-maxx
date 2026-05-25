import SwiftUI

/// "MAXX" chrome text: italic gradient fill + stroke + drop shadow + skew.
struct ChromeText: View {
    let text: String
    var size: CGFloat = 56
    var variant: Variant = .orange
    enum Variant { case orange, blue }

    var body: some View {
        let strokeColor: Color = variant == .orange ? Mx.redDark : Color(hex: 0x0B4F7E)
        let shadowColor: Color = strokeColor.opacity(0.25)
        return Text(text.uppercased())
            .font(MxFont.display(size))
            .italic()
            .tracking(0.5)
            .foregroundStyle(gradient)
            .overlay(
                Text(text.uppercased())
                    .font(MxFont.display(size))
                    .italic()
                    .tracking(0.5)
                    .foregroundStyle(.clear)
                    .background(
                        Text(text.uppercased())
                            .font(MxFont.display(size))
                            .italic()
                            .tracking(0.5)
                            .foregroundStyle(strokeColor)
                            .blur(radius: 0.6)
                    )
                    .mask(
                        Text(text.uppercased())
                            .font(MxFont.display(size))
                            .italic()
                            .tracking(0.5)
                            .foregroundStyle(.black)
                    )
                    .opacity(0.7)
            )
            .shadow(color: shadowColor, radius: 0, x: 0, y: 2)
            .mxHeadStyle(skew: -8)
    }

    private var gradient: LinearGradient {
        switch variant {
        case .orange:
            return Mx.chromeFillGradient
        case .blue:
            return LinearGradient(
                colors: [
                    Color(hex: 0xDCF3FF),
                    Color(hex: 0x7BD7FF),
                    Color(hex: 0x2BB4E8),
                    Color(hex: 0x1376B8)
                ],
                startPoint: .top,
                endPoint: .bottom
            )
        }
    }
}

/// Bold italic display headline without chrome — solid ink color.
struct MaxxHead: View {
    let text: String
    var size: CGFloat = 28
    var color: Color = Mx.ink
    var skew: CGFloat = -6

    var body: some View {
        Text(text)
            .font(MxFont.display(size))
            .italic()
            .lineSpacing(0)
            .foregroundStyle(color)
            .mxHeadStyle(skew: skew)
    }
}
