import SwiftUI

/// Mirrors the prototype's <Icon name="..."/> set. Backed by SF Symbols
/// where possible, custom paths otherwise.
enum MxIconName: String {
    case home, snack, scan, map, user, pin, bolt, flame, clock
    case chevron, back, heart, heartFill, star, tag, search, filter
    case close, bell, settings, info, leaf, qrcode, sliders, credit
    case lang, alert, package, shuffle, gift, trophy, fire, plus
    case check, apple, google, face, minus, camera, history, vote, ticket
}

struct MxIcon: View {
    let name: MxIconName
    var size: CGFloat = 22
    var color: Color = Mx.ink
    var weight: Font.Weight = .semibold

    var body: some View {
        Group {
            switch name {
            case .home:      Image(systemName: "house").font(.system(size: size * 0.95, weight: weight))
            case .snack:     Image(systemName: "takeoutbag.and.cup.and.straw").font(.system(size: size * 0.95, weight: weight))
            case .scan:      Image(systemName: "viewfinder").font(.system(size: size * 0.95, weight: weight))
            case .map:       Image(systemName: "map").font(.system(size: size * 0.95, weight: weight))
            case .user:      Image(systemName: "person").font(.system(size: size * 0.95, weight: weight))
            case .pin:       Image(systemName: "mappin.and.ellipse").font(.system(size: size * 0.95, weight: weight))
            case .bolt:      Image(systemName: "bolt.fill").font(.system(size: size * 0.95, weight: weight))
            case .flame:     Image(systemName: "flame").font(.system(size: size * 0.95, weight: weight))
            case .fire:      Image(systemName: "flame.fill").font(.system(size: size * 0.95, weight: weight))
            case .clock:     Image(systemName: "clock").font(.system(size: size * 0.95, weight: weight))
            case .chevron:   Image(systemName: "chevron.right").font(.system(size: size * 0.85, weight: weight))
            case .back:      Image(systemName: "chevron.left").font(.system(size: size * 0.85, weight: weight))
            case .heart:     Image(systemName: "heart").font(.system(size: size * 0.95, weight: weight))
            case .heartFill: Image(systemName: "heart.fill").font(.system(size: size * 0.95, weight: weight))
            case .star:      Image(systemName: "star.fill").font(.system(size: size * 0.95, weight: weight))
            case .tag:       Image(systemName: "tag").font(.system(size: size * 0.95, weight: weight))
            case .search:    Image(systemName: "magnifyingglass").font(.system(size: size * 0.95, weight: weight))
            case .filter:    Image(systemName: "line.3.horizontal.decrease").font(.system(size: size * 0.95, weight: weight))
            case .close:     Image(systemName: "xmark").font(.system(size: size * 0.85, weight: weight))
            case .bell:      Image(systemName: "bell").font(.system(size: size * 0.95, weight: weight))
            case .settings:  Image(systemName: "gearshape").font(.system(size: size * 0.95, weight: weight))
            case .info:      Image(systemName: "info.circle").font(.system(size: size * 0.95, weight: weight))
            case .leaf:      Image(systemName: "leaf").font(.system(size: size * 0.95, weight: weight))
            case .qrcode:    Image(systemName: "qrcode").font(.system(size: size * 0.95, weight: weight))
            case .sliders:   Image(systemName: "slider.horizontal.3").font(.system(size: size * 0.95, weight: weight))
            case .credit:    Image(systemName: "creditcard").font(.system(size: size * 0.95, weight: weight))
            case .lang:      Image(systemName: "globe").font(.system(size: size * 0.95, weight: weight))
            case .alert:     Image(systemName: "exclamationmark.triangle").font(.system(size: size * 0.95, weight: weight))
            case .package:   Image(systemName: "shippingbox").font(.system(size: size * 0.95, weight: weight))
            case .shuffle:   Image(systemName: "shuffle").font(.system(size: size * 0.95, weight: weight))
            case .gift:      Image(systemName: "gift").font(.system(size: size * 0.95, weight: weight))
            case .trophy:    Image(systemName: "trophy").font(.system(size: size * 0.95, weight: weight))
            case .plus:      Image(systemName: "plus").font(.system(size: size * 0.95, weight: weight))
            case .check:     Image(systemName: "checkmark").font(.system(size: size * 0.95, weight: weight))
            case .apple:     Image(systemName: "applelogo").font(.system(size: size * 0.95, weight: weight))
            case .google:    GoogleGlyph(size: size)
            case .face:      Image(systemName: "faceid").font(.system(size: size * 0.95, weight: .regular))
            case .minus:     Image(systemName: "minus").font(.system(size: size * 0.95, weight: weight))
            case .camera:    Image(systemName: "camera").font(.system(size: size * 0.95, weight: weight))
            case .history:   Image(systemName: "clock.arrow.circlepath").font(.system(size: size * 0.95, weight: weight))
            case .vote:      VoteGlyph().frame(width: size, height: size)
            case .ticket:    Image(systemName: "ticket").font(.system(size: size * 0.95, weight: weight))
            }
        }
        .foregroundStyle(color)
        .frame(width: size, height: size)
    }
}

/// Static multi-color Google "G" glyph.
private struct GoogleGlyph: View {
    let size: CGFloat
    var body: some View {
        ZStack {
            Path { p in
                p.move(to: CGPoint(x: 0.5, y: 0))
                p.addArc(center: CGPoint(x: 0.5, y: 0.5), radius: 0.5, startAngle: .degrees(-90), endAngle: .degrees(-15), clockwise: false)
            }
            .stroke(Color(hex: 0xEA4335), style: .init(lineWidth: 0.15, lineCap: .butt))
            Image(systemName: "g.circle.fill")
                .resizable()
                .foregroundStyle(
                    LinearGradient(colors: [Color(hex: 0x4285F4), Color(hex: 0xEA4335)],
                                   startPoint: .topLeading, endPoint: .bottomTrailing)
                )
                .frame(width: size, height: size)
        }
    }
}

private struct VoteGlyph: View {
    var body: some View {
        GeometryReader { geo in
            let s = min(geo.size.width, geo.size.height)
            Path { p in
                p.move(to: CGPoint(x: s * 0.2, y: s * 0.88))
                p.addLine(to: CGPoint(x: s * 0.8, y: s * 0.88))
                p.move(to: CGPoint(x: s * 0.28, y: s * 0.88))
                p.addLine(to: CGPoint(x: s * 0.28, y: s * 0.42))
                p.addLine(to: CGPoint(x: s * 0.5, y: s * 0.12))
                p.addLine(to: CGPoint(x: s * 0.72, y: s * 0.42))
                p.addLine(to: CGPoint(x: s * 0.72, y: s * 0.88))
                p.move(to: CGPoint(x: s * 0.38, y: s * 0.58))
                p.addLine(to: CGPoint(x: s * 0.46, y: s * 0.66))
                p.addLine(to: CGPoint(x: s * 0.62, y: s * 0.50))
            }
            .stroke(Color.primary, style: .init(lineWidth: max(1, s * 0.08),
                                                lineCap: .round, lineJoin: .round))
        }
    }
}
