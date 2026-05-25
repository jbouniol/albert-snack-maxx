import SwiftUI

struct SplashView: View {
    let onStart: () -> Void
    @State private var appear = false

    var body: some View {
        VStack(spacing: 0) {
            Spacer()
            Image("LogoSnackMaxx")
                .resizable()
                .scaledToFit()
                .frame(width: 240)
                .shadow(color: Mx.red.opacity(0.25), radius: 30, x: 0, y: 16)
                .scaleEffect(appear ? 1 : 0.85)
                .opacity(appear ? 1 : 0)
            VStack(spacing: 12) {
                MaxxHead(text: "Bienvenue dans la team", size: 28)
                Text("Scanne. Paie. Vote. Recommence.")
                    .font(MxFont.body(15, weight: .medium))
                    .foregroundStyle(Mx.ink2)
            }
            .padding(.top, 18)
            .opacity(appear ? 1 : 0)

            Spacer()
            VStack(spacing: 10) {
                MaxxButton("Commencer", variant: .primary, size: .lg, full: true, action: onStart) {
                    MxIcon(name: .bolt, size: 18, color: .white)
                }
                Text("En continuant, tu acceptes les CGU et la politique de confidentialité.")
                    .font(MxFont.body(11))
                    .foregroundStyle(Mx.mute)
                    .multilineTextAlignment(.center)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 32)
            .opacity(appear ? 1 : 0)
        }
        .onAppear {
            withAnimation(.spring(response: 0.6, dampingFraction: 0.7).delay(0.05)) {
                appear = true
            }
        }
    }
}
