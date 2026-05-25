import SwiftUI

struct CategoryTile: View {
    let category: SnackCategory
    let index: Int
    let action: () -> Void

    private static let palettes: [(bg: Color, fg: Color)] = [
        (Color(hex: 0xFFE9D7), Color(hex: 0xC7281D)),
        (Color(hex: 0xFFE2DC), Color(hex: 0x8B1A0E)),
        (Color(hex: 0xFFEFC2), Color(hex: 0x8A6300)),
        (Color(hex: 0xD7EFFD), Color(hex: 0x1376B8)),
        (Color(hex: 0xD9F4E2), Color(hex: 0x0F6E36)),
    ]

    private var palette: (bg: Color, fg: Color) { Self.palettes[index % Self.palettes.count] }

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                CategoryGlyph(category: category)
                    .foregroundStyle(palette.fg)
                    .frame(width: 30, height: 30)
                Text(category.label)
                    .font(MxFont.body(12, weight: .bold))
                    .foregroundStyle(Mx.ink)
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 8)
            .frame(width: 90)
            .background(palette.bg)
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}

private struct CategoryGlyph: View {
    let category: SnackCategory
    private var systemName: String {
        switch category {
        case .all:    return "square.grid.2x2"
        case .chips:  return "popcorn"
        case .choco:  return "rectangle.grid.3x2"
        case .cookie: return "circle.dashed.inset.filled"
        case .drinks: return "cup.and.heat.waves"
        case .fit:    return "leaf"
        }
    }
    var body: some View {
        Image(systemName: systemName)
            .resizable()
            .scaledToFit()
    }
}
