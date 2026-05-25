import SwiftUI

/// Stylized package illustration. Visually inspired by `packages.jsx` but
/// reimplemented with native SwiftUI shapes. Returns a self-contained
/// view sized by frame modifier.
struct SnackPackage: View {
    let product: Product
    var size: CGSize = CGSize(width: 110, height: 130)
    var showLabel: Bool = true

    var body: some View {
        Group {
            switch product.kind {
            case .chips:    ChipsBag(product: product, showLabel: showLabel)
            case .bar:      ChocoBar(product: product, showLabel: showLabel)
            case .cookie:   CookiePack(product: product, showLabel: showLabel)
            case .can:      DrinkCan(product: product, showLabel: showLabel)
            case .bottle:   DrinkBottle(product: product, showLabel: showLabel)
            case .healthy:  HealthyBar(product: product, showLabel: showLabel)
            }
        }
        .frame(width: size.width, height: size.height)
    }
}

// MARK: - Shared helpers

private struct PackageLabel: View {
    let product: Product
    var fontSize: CGFloat
    var rotation: CGFloat = -6
    var body: some View {
        VStack(spacing: 2) {
            ZStack {
                RoundedRectangle(cornerRadius: 6, style: .continuous)
                    .fill(Mx.black)
                Text(product.shortLabel)
                    .font(MxFont.display(fontSize))
                    .italic()
                    .foregroundStyle(product.accent)
                    .lineLimit(1)
                    .minimumScaleFactor(0.5)
                    .padding(.horizontal, 8)
                    .frame(maxWidth: .infinity)
            }
            .frame(height: fontSize * 1.6)
            if product.flavor.count > 0 {
                Text(product.flavor.uppercased())
                    .font(MxFont.accent(max(8, fontSize * 0.4)))
                    .foregroundStyle(.white.opacity(0.95))
                    .lineLimit(1)
                    .minimumScaleFactor(0.6)
            }
        }
        .rotationEffect(.degrees(rotation))
        .padding(.horizontal, 6)
    }
}

private struct StarBadge: View {
    var size: CGFloat = 18
    var body: some View {
        ZStack {
            Star8(points: 8, ratio: 0.4)
                .stroke(Mx.black, lineWidth: max(1, size * 0.08))
            Star8(points: 8, ratio: 0.4)
                .fill(Mx.yellow)
                .padding(max(1, size * 0.08))
        }
        .frame(width: size, height: size)
    }
}

private struct Star8: Shape {
    let points: Int
    let ratio: CGFloat
    func path(in rect: CGRect) -> Path {
        var p = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let outer = min(rect.width, rect.height) / 2
        let inner = outer * ratio
        let step = .pi * 2 / Double(points * 2)
        for i in 0 ..< points * 2 {
            let r = i.isMultiple(of: 2) ? outer : inner
            let a = -.pi / 2 + Double(i) * step
            let pt = CGPoint(x: center.x + cos(a) * r, y: center.y + sin(a) * r)
            if i == 0 { p.move(to: pt) } else { p.addLine(to: pt) }
        }
        p.closeSubpath()
        return p
    }
}

// MARK: - Chips bag (wavy top/bottom)

private struct ChipsBag: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack {
                BagShape()
                    .fill(LinearGradient(colors: [
                        product.color.shade(35), product.color, product.color.shade(-25)
                    ], startPoint: .top, endPoint: .bottom))
                    .overlay(BagShape().stroke(Mx.black, lineWidth: max(2, w * 0.025)))
                // shine
                Rectangle()
                    .fill(LinearGradient(colors: [
                        .white.opacity(0), .white.opacity(0.35), .white.opacity(0)
                    ], startPoint: .leading, endPoint: .trailing))
                    .blendMode(.plusLighter)
                    .opacity(0.7)
                    .mask(BagShape())
                // swoosh
                Swoosh()
                    .stroke(.white.opacity(0.55), style: .init(lineWidth: max(2, w * 0.025), lineCap: .round))
                    .mask(BagShape())
                if showLabel {
                    PackageLabel(product: product, fontSize: w * 0.22)
                        .frame(width: w * 0.72)
                        .position(x: w * 0.50, y: h * 0.50)
                }
                StarBadge(size: w * 0.18)
                    .position(x: w * 0.83, y: h * 0.25)
            }
        }
    }
}

private struct BagShape: Shape {
    func path(in r: CGRect) -> Path {
        var p = Path()
        let inset: CGFloat = max(8, r.width * 0.07)
        let crinkles = 9
        let stepX = (r.width - inset * 2) / CGFloat(crinkles)
        // top crinkles
        var x = r.minX + inset
        p.move(to: CGPoint(x: x, y: r.minY + inset))
        for i in 0 ..< crinkles {
            let up = i.isMultiple(of: 2)
            let next = x + stepX
            p.addQuadCurve(to: CGPoint(x: next, y: r.minY + inset),
                           control: CGPoint(x: x + stepX / 2,
                                            y: r.minY + (up ? 0 : inset * 2)))
            x = next
        }
        // right side
        p.addLine(to: CGPoint(x: r.maxX - inset, y: r.maxY - inset))
        // bottom crinkles (reverse)
        x = r.maxX - inset
        for i in 0 ..< crinkles {
            let up = i.isMultiple(of: 2)
            let next = x - stepX
            p.addQuadCurve(to: CGPoint(x: next, y: r.maxY - inset),
                           control: CGPoint(x: x - stepX / 2,
                                            y: r.maxY - (up ? 0 : inset * 2)))
            x = next
        }
        p.closeSubpath()
        return p
    }
}

private struct Swoosh: Shape {
    func path(in r: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: r.minX, y: r.midY * 0.85))
        p.addQuadCurve(
            to: CGPoint(x: r.maxX, y: r.midY * 0.95),
            control: CGPoint(x: r.midX, y: r.midY * 0.55)
        )
        return p
    }
}

// MARK: - Choco bar (rounded rect with depth)

private struct ChocoBar: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack {
                RoundedRectangle(cornerRadius: w * 0.08, style: .continuous)
                    .fill(LinearGradient(colors: [
                        product.color.shade(30), product.color, product.color.shade(-30)
                    ], startPoint: .top, endPoint: .bottom))
                    .overlay(
                        RoundedRectangle(cornerRadius: w * 0.08, style: .continuous)
                            .stroke(Mx.black, lineWidth: max(2, w * 0.025))
                    )
                // shine highlight
                RoundedRectangle(cornerRadius: w * 0.08, style: .continuous)
                    .fill(LinearGradient(colors: [.white.opacity(0.35), .clear],
                                         startPoint: .top, endPoint: .bottom))
                    .opacity(0.45)
                    .padding(w * 0.05)
                    .frame(height: h * 0.30, alignment: .top)
                    .frame(maxHeight: .infinity, alignment: .top)
                // ribbon
                if showLabel {
                    Rectangle()
                        .fill(product.accent)
                        .frame(height: h * 0.16)
                        .overlay(
                            Text(product.shortLabel)
                                .font(MxFont.display(w * 0.16))
                                .italic()
                                .foregroundStyle(Mx.black)
                                .lineLimit(1)
                                .minimumScaleFactor(0.5)
                        )
                        .padding(.horizontal, w * 0.08)
                        .rotationEffect(.degrees(-4))
                        .padding(.top, h * 0.45)
                }
                StarBadge(size: w * 0.16)
                    .position(x: w * 0.85, y: h * 0.18)
            }
        }
    }
}

// MARK: - Cookie pack (circular cookie)

private struct CookiePack: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack {
                // wrapper
                RoundedRectangle(cornerRadius: w * 0.20, style: .continuous)
                    .fill(LinearGradient(colors: [
                        product.color.shade(28), product.color, product.color.shade(-20)
                    ], startPoint: .top, endPoint: .bottom))
                    .overlay(
                        RoundedRectangle(cornerRadius: w * 0.20, style: .continuous)
                            .stroke(Mx.black, lineWidth: max(2, w * 0.025))
                    )
                // cookie circle
                Circle()
                    .fill(product.color.shade(-40))
                    .overlay(Circle().stroke(Mx.black, lineWidth: max(2, w * 0.02)))
                    .frame(width: w * 0.62, height: w * 0.62)
                    .overlay(
                        ZStack {
                            ForEach(0..<5, id: \.self) { i in
                                let a = Double(i) / 5.0 * .pi * 2
                                Circle()
                                    .fill(product.accent)
                                    .frame(width: w * 0.08, height: w * 0.08)
                                    .offset(x: cos(a) * w * 0.18, y: sin(a) * w * 0.18)
                            }
                        }
                    )
                if showLabel {
                    PackageLabel(product: product, fontSize: w * 0.16)
                        .frame(width: w * 0.85)
                        .position(x: w * 0.5, y: h * 0.85)
                }
            }
        }
    }
}

// MARK: - Drink can

private struct DrinkCan: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack(alignment: .top) {
                // body
                RoundedRectangle(cornerRadius: w * 0.10, style: .continuous)
                    .fill(LinearGradient(colors: [
                        product.color.shade(30), product.color, product.color.shade(-25)
                    ], startPoint: .leading, endPoint: .trailing))
                    .overlay(
                        RoundedRectangle(cornerRadius: w * 0.10, style: .continuous)
                            .stroke(Mx.black, lineWidth: max(2, w * 0.022))
                    )
                    .padding(.top, h * 0.06)
                // lid
                Ellipse()
                    .fill(product.color.shade(-30))
                    .frame(width: w * 0.86, height: h * 0.10)
                    .overlay(Ellipse().stroke(Mx.black, lineWidth: max(2, w * 0.022)))
                    .position(x: w * 0.5, y: h * 0.07)
                Ellipse()
                    .fill(Mx.black)
                    .frame(width: w * 0.18, height: h * 0.04)
                    .position(x: w * 0.62, y: h * 0.07)
                // shine
                RoundedRectangle(cornerRadius: w * 0.06, style: .continuous)
                    .fill(.white.opacity(0.20))
                    .frame(width: w * 0.06)
                    .padding(.top, h * 0.16).padding(.bottom, h * 0.10).padding(.leading, w * 0.18)
                    .frame(maxWidth: .infinity, alignment: .leading)
                // diagonal stripe with label
                if showLabel {
                    Rectangle()
                        .fill(product.accent)
                        .frame(height: h * 0.22)
                        .overlay(
                            Text(product.shortLabel)
                                .font(MxFont.display(w * 0.20))
                                .italic()
                                .foregroundStyle(Mx.black)
                                .lineLimit(1)
                                .minimumScaleFactor(0.5)
                        )
                        .rotationEffect(.degrees(-8))
                        .padding(.top, h * 0.40)
                }
            }
        }
    }
}

// MARK: - Bottle

private struct DrinkBottle: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack(alignment: .top) {
                // cap
                RoundedRectangle(cornerRadius: w * 0.06, style: .continuous)
                    .fill(Mx.black)
                    .frame(width: w * 0.30, height: h * 0.10)
                    .position(x: w * 0.5, y: h * 0.06)
                // neck
                Rectangle()
                    .fill(product.color.shade(20))
                    .frame(width: w * 0.34, height: h * 0.10)
                    .position(x: w * 0.5, y: h * 0.16)
                // body
                RoundedRectangle(cornerRadius: w * 0.18, style: .continuous)
                    .fill(LinearGradient(colors: [
                        product.color.shade(30), product.color, product.color.shade(-25)
                    ], startPoint: .top, endPoint: .bottom))
                    .overlay(
                        RoundedRectangle(cornerRadius: w * 0.18, style: .continuous)
                            .stroke(Mx.black, lineWidth: max(2, w * 0.022))
                    )
                    .padding(.top, h * 0.22)
                    .padding(.horizontal, w * 0.10)
                // label band
                if showLabel {
                    Rectangle()
                        .fill(product.accent.opacity(0.95))
                        .frame(height: h * 0.30)
                        .overlay(
                            VStack(spacing: 2) {
                                Text(product.shortLabel)
                                    .font(MxFont.display(w * 0.20))
                                    .italic()
                                    .foregroundStyle(Mx.black)
                                Text(product.flavor.uppercased())
                                    .font(MxFont.accent(w * 0.07))
                                    .foregroundStyle(Mx.black.opacity(0.65))
                                    .lineLimit(1)
                                    .minimumScaleFactor(0.5)
                            }
                            .padding(.horizontal, 6)
                        )
                        .padding(.horizontal, w * 0.14)
                        .padding(.top, h * 0.42)
                }
            }
        }
    }
}

// MARK: - Healthy

private struct HealthyBar: View {
    let product: Product
    let showLabel: Bool
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            ZStack {
                RoundedRectangle(cornerRadius: w * 0.12, style: .continuous)
                    .fill(LinearGradient(colors: [
                        product.color.shade(35), product.color, product.color.shade(-30)
                    ], startPoint: .topLeading, endPoint: .bottomTrailing))
                    .overlay(
                        RoundedRectangle(cornerRadius: w * 0.12, style: .continuous)
                            .stroke(Mx.black, lineWidth: max(2, w * 0.022))
                    )
                LeafBadge()
                    .frame(width: w * 0.30, height: w * 0.30)
                    .position(x: w * 0.20, y: h * 0.20)
                if showLabel {
                    PackageLabel(product: product, fontSize: w * 0.18)
                        .frame(width: w * 0.85)
                        .position(x: w * 0.55, y: h * 0.55)
                }
            }
        }
    }
}

private struct LeafBadge: View {
    var body: some View {
        ZStack {
            Circle().fill(.white)
            Image(systemName: "leaf.fill")
                .resizable()
                .scaledToFit()
                .padding(6)
                .foregroundStyle(Mx.okFg)
        }
    }
}
