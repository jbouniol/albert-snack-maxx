import SwiftUI

extension Color {
    init(hex: UInt32, alpha: Double = 1.0) {
        let r = Double((hex >> 16) & 0xff) / 255
        let g = Double((hex >>  8) & 0xff) / 255
        let b = Double( hex        & 0xff) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: alpha)
    }
}

enum Mx {
    static let orangeHot   = Color(hex: 0xFF7A1F)
    static let orange      = Color(hex: 0xFF5A14)
    static let orangeDeep  = Color(hex: 0xE63B0A)
    static let red         = Color(hex: 0xC7281D)
    static let redDark     = Color(hex: 0x8B1A0E)
    static let blue        = Color(hex: 0x2BB4E8)
    static let blueDeep    = Color(hex: 0x1376B8)
    static let cream       = Color(hex: 0xFFF1D6)
    static let cream2      = Color(hex: 0xFFE4B0)
    static let yellow      = Color(hex: 0xFFD23F)

    static let black       = Color(hex: 0x15110E)
    static let charcoal    = Color(hex: 0x2A211C)

    static let ink         = Color(hex: 0x1A1410)
    static let ink2        = Color(hex: 0x4A3F35)
    static let mute        = Color(hex: 0x8A7A6A)
    static let line        = Color(hex: 0x1A1410, alpha: 0.10)
    static let line2       = Color(hex: 0x1A1410, alpha: 0.06)
    static let paper       = Color(hex: 0xFBF5E8)
    static let paper2      = Color(hex: 0xF4ECDA)
    static let card        = Color.white

    static let okBg        = Color(hex: 0xE8FAEE)
    static let okFg        = Color(hex: 0x0F6E36)
    static let warnBg      = Color(hex: 0xFFF4D6)
    static let warnFg      = Color(hex: 0x8A6300)
    static let badBg       = Color(hex: 0xFBE3E1)
    static let badFg       = Color(hex: 0x8B1A0E)

    static let goldText    = Color(hex: 0xFFB300)
    static let dotOk       = Color(hex: 0x29C46B)
    static let dotWarn     = Color(hex: 0xFFB300)
    static let dotBad      = Color(hex: 0xC7281D)

    static let bronze      = Color(hex: 0xB5734A)
    static let bronzeBg    = Color(hex: 0xF5E8D8)
    static let silver      = Color(hex: 0x7A6F62)
    static let silverBg    = Color(hex: 0xECE7DC)
    static let gold        = Color(hex: 0xB07A00)
    static let goldBg      = Color(hex: 0xFBEFCB)

    static let heroGradient = LinearGradient(
        colors: [orangeHot, orangeDeep, red],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let darkCardGradient = LinearGradient(
        colors: [ink, charcoal],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let blueGradient = LinearGradient(
        colors: [blue, blueDeep],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let streakBadgeGradient = LinearGradient(
        colors: [orangeHot, red],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let chromeFillGradient = LinearGradient(
        colors: [
            Color(hex: 0xFFE9C9),
            Color(hex: 0xFFC979),
            Color(hex: 0xFF7A1F),
            Color(hex: 0xFF3D14),
            Color(hex: 0xC7281D)
        ],
        startPoint: .top,
        endPoint: .bottom
    )
    static let primaryButtonGradient = LinearGradient(
        colors: [orangeHot, orangeDeep],
        startPoint: .top,
        endPoint: .bottom
    )
    static let blueButtonGradient = LinearGradient(
        colors: [blue, blueDeep],
        startPoint: .top,
        endPoint: .bottom
    )
}

extension Color {
    /// Mix toward white (positive pct) or black (negative pct). pct in [-100, 100].
    func shade(_ pct: Double) -> Color {
        UIColor(self).shade(pct: pct).color
    }
}

private extension UIColor {
    func shade(pct: Double) -> UIColor {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        guard getRed(&r, green: &g, blue: &b, alpha: &a) else { return self }
        let t: CGFloat = pct >= 0 ? 1.0 : 0.0
        let p = CGFloat(abs(pct) / 100.0)
        return UIColor(
            red:   r + (t - r) * p,
            green: g + (t - g) * p,
            blue:  b + (t - b) * p,
            alpha: a
        )
    }
    var color: Color { Color(uiColor: self) }
}
