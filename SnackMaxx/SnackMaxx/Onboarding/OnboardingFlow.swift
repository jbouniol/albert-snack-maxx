import SwiftUI

enum OnboardingStep: Int {
    case splash
    case auth
    case name
}

struct OnboardingFlow: View {
    @EnvironmentObject var state: AppState
    @State private var step: OnboardingStep = .splash
    @State private var name: String = ""

    var body: some View {
        ZStack {
            Mx.paper.ignoresSafeArea()
            // ambient background
            Canvas { ctx, size in
                let g1 = Gradient(colors: [Mx.orangeHot.opacity(0.18), .clear])
                ctx.fill(Path(ellipseIn: CGRect(x: -size.width * 0.2, y: -size.height * 0.1,
                                                width: size.width * 1.3,
                                                height: size.height * 0.55)),
                         with: .radialGradient(g1,
                                               center: CGPoint(x: size.width * 0.45, y: size.height * 0.05),
                                               startRadius: 0, endRadius: size.width * 0.7))
                let g2 = Gradient(colors: [Mx.blue.opacity(0.16), .clear])
                ctx.fill(Path(ellipseIn: CGRect(x: -size.width * 0.3, y: size.height * 0.55,
                                                width: size.width * 1.3,
                                                height: size.height * 0.55)),
                         with: .radialGradient(g2,
                                               center: CGPoint(x: size.width * 0.5, y: size.height * 1.0),
                                               startRadius: 0, endRadius: size.width * 0.7))
            }
            .ignoresSafeArea()

            switch step {
            case .splash:
                SplashView(onStart: { withAnimation(.easeInOut(duration: 0.3)) { step = .auth } })
                    .transition(.opacity)
            case .auth:
                AuthMethodView(onContinue: { withAnimation(.easeInOut(duration: 0.3)) { step = .name } })
                    .transition(.move(edge: .trailing).combined(with: .opacity))
            case .name:
                NameEntryView(
                    name: $name,
                    onContinue: {
                        state.userName = name.isEmpty ? "Jules Bouniol" : name
                        withAnimation(.easeInOut(duration: 0.5)) { state.onboarded = true }
                    },
                    onBack: { withAnimation(.easeInOut(duration: 0.3)) { step = .auth } }
                )
                .transition(.move(edge: .trailing).combined(with: .opacity))
            }
        }
    }
}
