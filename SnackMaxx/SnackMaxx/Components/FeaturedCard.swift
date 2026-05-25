import SwiftUI

struct FeaturedCard: View {
    let product: Product
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 0) {
                ZStack(alignment: .topLeading) {
                    LinearGradient(colors: [
                        product.color.shade(30), product.color.shade(-20)
                    ], startPoint: .topLeading, endPoint: .bottomTrailing)
                    .frame(height: 140)
                    SnackPackage(product: product, size: CGSize(width: 110, height: 120))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                    if product.hot {
                        HStack(spacing: 4) {
                            MxIcon(name: .flame, size: 12, color: Mx.red)
                            Text("Nouveau")
                                .font(MxFont.body(11, weight: .semibold))
                                .foregroundStyle(Mx.red)
                        }
                        .padding(.horizontal, 8).padding(.vertical, 4)
                        .background(.white.opacity(0.95))
                        .clipShape(Capsule())
                        .padding(10)
                    }
                }
                VStack(alignment: .leading, spacing: 2) {
                    Text(product.name)
                        .font(MxFont.body(14, weight: .bold))
                        .foregroundStyle(Mx.ink)
                        .lineLimit(1)
                    Text(product.flavor)
                        .font(MxFont.body(11))
                        .foregroundStyle(Mx.mute)
                        .lineLimit(1)
                    HStack {
                        Text(String(format: "%.2f €", product.price).replacingOccurrences(of: ".", with: ","))
                            .font(MxFont.body(16, weight: .bold))
                            .foregroundStyle(Mx.ink)
                        Spacer()
                        Text("Slot \(product.slot)")
                            .font(MxFont.body(11))
                            .foregroundStyle(Mx.mute)
                    }
                    .padding(.top, 6)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 12)
            }
            .frame(width: 180)
            .background(Mx.card)
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            .shadow(color: .black.opacity(0.06), radius: 18, x: 0, y: 6)
        }
        .buttonStyle(.plain)
        .mxPress()
    }
}
