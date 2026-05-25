import SwiftUI

struct MapView: View {
    @EnvironmentObject var state: AppState

    private let mapPins: [(id: String, x: Double, y: Double)] = [
        ("m01", 90, 110),
        ("m02", 200, 70),
        ("m03", 260, 180),
        ("m04", 120, 200),
        ("m05", 300, 90),
    ]

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 4) {
                    Image("LogoSnackMaxx")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 28)
                        .padding(.bottom, 6)
                    Text("\(MockData.machines.count) DISTRIBUTEURS · PARIS")
                        .font(MxFont.head(10))
                        .tracking(1.6)
                        .foregroundStyle(Mx.orange)
                    MaxxHead(text: "Carte", size: 30)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 18).padding(.top, 52)

                stylizedMap
                    .frame(height: 280)
                    .padding(.horizontal, 18).padding(.top, 10)

                SectionHeader(title: "À proximité", actionLabel: "Filtres", onAction: {})

                VStack(spacing: 10) {
                    ForEach(MockData.machines) { m in
                        MachineRow(machine: m, isActive: m.id == state.machine.id) {
                            state.machine = m
                            state.switchTo(.home)
                        }
                    }
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 20)
            }
        }
    }

    private var stylizedMap: some View {
        ZStack {
            LinearGradient(colors: [Color(hex: 0xF4ECDA), Color(hex: 0xE8DCC4)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            Canvas { ctx, size in
                // grid
                let gridStroke = GraphicsContext.Shading.color(Mx.ink.opacity(0.07))
                let g: CGFloat = 22
                var x: CGFloat = 0
                while x < size.width {
                    var p = Path()
                    p.move(to: CGPoint(x: x, y: 0))
                    p.addLine(to: CGPoint(x: x, y: size.height))
                    ctx.stroke(p, with: gridStroke, lineWidth: 1)
                    x += g
                }
                var y: CGFloat = 0
                while y < size.height {
                    var p = Path()
                    p.move(to: CGPoint(x: 0, y: y))
                    p.addLine(to: CGPoint(x: size.width, y: y))
                    ctx.stroke(p, with: gridStroke, lineWidth: 1)
                    y += g
                }
                // orange road
                var orange = Path()
                orange.move(to: CGPoint(x: -20, y: size.height * 0.71))
                orange.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.86),
                                    control: CGPoint(x: size.width * 0.33, y: size.height * 0.43))
                ctx.stroke(orange, with: .color(Mx.orangeHot.opacity(0.7)),
                           style: .init(lineWidth: 5, lineCap: .round))
                // blue road
                var blue = Path()
                blue.move(to: CGPoint(x: -20, y: size.height * 0.36))
                blue.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.21),
                                  control: CGPoint(x: size.width * 0.50, y: size.height * 0.64))
                ctx.stroke(blue, with: .color(Mx.blue.opacity(0.7)),
                           style: .init(lineWidth: 4, lineCap: .round))
                // vertical dashed line (faux meridian)
                var meridian = Path()
                meridian.move(to: CGPoint(x: size.width * 0.5, y: -20))
                meridian.addLine(to: CGPoint(x: size.width * 0.5, y: size.height + 20))
                ctx.stroke(meridian, with: .color(Mx.ink.opacity(0.25)),
                           style: .init(lineWidth: 2, dash: [6, 6]))
                // Seine — thick blue wave bottom
                var seine = Path()
                seine.move(to: CGPoint(x: -20, y: size.height * 0.89))
                seine.addQuadCurve(to: CGPoint(x: size.width * 0.6, y: size.height * 0.93),
                                   control: CGPoint(x: size.width * 0.33, y: size.height * 0.86))
                seine.addQuadCurve(to: CGPoint(x: size.width + 20, y: size.height * 0.71),
                                   control: CGPoint(x: size.width * 0.85, y: size.height * 0.99))
                ctx.stroke(seine, with: .color(Mx.blue.opacity(0.5)),
                           style: .init(lineWidth: 12, lineCap: .round))
            }
            GeometryReader { geo in
                let sx = geo.size.width / 360
                let sy = geo.size.height / 280
                ForEach(mapPins, id: \.id) { pin in
                    if let m = MockData.machines.first(where: { $0.id == pin.id }) {
                        Button {
                            state.machine = m
                            state.switchTo(.home)
                        } label: {
                            MapPin(color: pinColor(m.status), selected: state.machine.id == m.id)
                                .frame(width: 34, height: 42)
                        }
                        .buttonStyle(.plain)
                        .position(x: pin.x * sx, y: pin.y * sy)
                    }
                }
                // You are here
                PulsingDot()
                    .position(x: 80 * sx, y: 130 * sy)
            }
            // Legend
            VStack(alignment: .leading, spacing: 4) {
                legendRow(color: Mx.orange, label: "En direct")
                legendRow(color: Mx.dotWarn, label: "Stock bas")
                legendRow(color: Mx.dotBad, label: "Hors service")
            }
            .padding(.horizontal, 10).padding(.vertical, 8)
            .background(.white.opacity(0.95))
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .padding(.leading, 12).padding(.bottom, 12)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
        }
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(Mx.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
        .shadow(color: .black.opacity(0.06), radius: 18, x: 0, y: 6)
    }

    private func legendRow(color: Color, label: String) -> some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 8, height: 8)
            Text(label).font(MxFont.body(11)).foregroundStyle(Mx.ink)
        }
    }

    private func pinColor(_ status: MachineStatus) -> Color {
        switch status {
        case .live: return Mx.orange
        case .warn: return Mx.dotWarn
        case .offline: return Mx.dotBad
        }
    }
}

private struct MapPin: View {
    let color: Color
    let selected: Bool
    var body: some View {
        ZStack {
            PinShape()
                .fill(color)
                .overlay(PinShape().stroke(.white, lineWidth: 3))
                .shadow(color: .black.opacity(selected ? 0.25 : 0.18),
                        radius: selected ? 8 : 4, x: 0, y: 4)
            Circle().fill(.white).frame(width: 10, height: 10)
                .offset(y: -7)
        }
    }
}

private struct PinShape: Shape {
    func path(in r: CGRect) -> Path {
        var p = Path()
        let mid = r.midX
        p.move(to: CGPoint(x: mid, y: r.minY))
        p.addCurve(
            to: CGPoint(x: r.maxX, y: r.midY * 0.6),
            control1: CGPoint(x: r.maxX, y: r.minY),
            control2: CGPoint(x: r.maxX, y: r.midY * 0.5)
        )
        p.addCurve(
            to: CGPoint(x: mid, y: r.maxY),
            control1: CGPoint(x: r.maxX, y: r.maxY * 0.9),
            control2: CGPoint(x: mid + r.width * 0.1, y: r.maxY)
        )
        p.addCurve(
            to: CGPoint(x: r.minX, y: r.midY * 0.6),
            control1: CGPoint(x: mid - r.width * 0.1, y: r.maxY),
            control2: CGPoint(x: r.minX, y: r.maxY * 0.9)
        )
        p.addCurve(
            to: CGPoint(x: mid, y: r.minY),
            control1: CGPoint(x: r.minX, y: r.midY * 0.5),
            control2: CGPoint(x: r.minX, y: r.minY)
        )
        return p
    }
}

private struct PulsingDot: View {
    @State private var pulse = false
    var body: some View {
        ZStack {
            Circle().fill(Mx.blue.opacity(0.25))
                .frame(width: pulse ? 38 : 28, height: pulse ? 38 : 28)
            Circle().fill(Mx.blue).frame(width: 16, height: 16)
                .overlay(Circle().stroke(.white, lineWidth: 3))
        }
        .animation(.easeInOut(duration: 1.2).repeatForever(autoreverses: true), value: pulse)
        .onAppear { pulse = true }
    }
}
