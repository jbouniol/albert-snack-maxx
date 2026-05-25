import SwiftUI

struct MainContainer: View {
    @EnvironmentObject var state: AppState

    var body: some View {
        ZStack(alignment: .bottom) {
            MxBackground()
            content
                .padding(.bottom, 90)
            VStack(spacing: 0) {
                Spacer()
                if state.payTargetProduct == nil {
                    TabBar(active: Binding(
                        get: { state.tab },
                        set: { state.switchTo($0) }
                    ), onScan: { state.scanOpen = true })
                    .transition(.move(edge: .bottom))
                }
            }
        }
        .ignoresSafeArea(.keyboard, edges: .bottom)
        .overlay {
            if let p = state.selectedProduct {
                ProductDetailView(product: p)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                    .zIndex(80)
            }
        }
        .overlay {
            if let overlay = state.overlay {
                overlayView(overlay)
                    .transition(.move(edge: .trailing).combined(with: .opacity))
                    .zIndex(85)
            }
        }
        .overlay {
            if state.scanOpen {
                ScanView()
                    .transition(.opacity)
                    .zIndex(90)
            }
        }
        .overlay {
            if let prod = state.payTargetProduct, let mach = state.payTargetMachine {
                PayConfirmView(product: prod, machine: mach)
                    .transition(.move(edge: .bottom))
                    .zIndex(95)
            }
        }
        .animation(.easeInOut(duration: 0.28), value: state.selectedProduct)
        .animation(.easeInOut(duration: 0.28), value: state.overlay)
        .animation(.easeInOut(duration: 0.20), value: state.scanOpen)
        .animation(.spring(response: 0.4, dampingFraction: 0.85), value: state.payTargetProduct)
    }

    @ViewBuilder private var content: some View {
        switch state.tab {
        case .home:
            HomeView()
        case .snacks:
            SnacksView()
        case .scan:
            HomeView() // scan tab handled by FAB
        case .map:
            MapView()
        case .profile:
            ProfileView()
        }
    }

    @ViewBuilder private func overlayView(_ overlay: AppOverlay) -> some View {
        switch overlay {
        case .loyalty: LoyaltyView()
        case .history: HistoryView()
        case .vote:    VoteView()
        case .ticket:  TicketView()
        case .notifs:  NotifsView()
        }
    }
}
