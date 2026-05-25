import SwiftUI

struct RootView: View {
    @EnvironmentObject var state: AppState

    var body: some View {
        ZStack {
            if state.onboarded {
                MainContainer()
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
            } else {
                OnboardingFlow()
                    .transition(.opacity)
            }
        }
        .animation(.easeInOut(duration: 0.4), value: state.onboarded)
    }
}

#Preview {
    RootView().environmentObject(AppState())
}
