import SwiftUI

struct MainContainer: View {
    @EnvironmentObject var state: AppState

    var body: some View {
        ZStack {
            MxBackground()
            content
        }
        // ── Tab bar via safeAreaInset — ScrollViews auto-inset, no manual bottom padding needed ──
        .safeAreaInset(edge: .bottom, spacing: 0) {
            Group {
                if state.payTargetProduct == nil {
                    TabBar(active: Binding(
                        get: { state.tab },
                        set: { state.switchTo($0) }
                    ), onScan: { state.scanOpen = true })
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                }
            }
            .animation(.spring(response: 0.4, dampingFraction: 0.85), value: state.payTargetProduct == nil)
        }
        .ignoresSafeArea(.keyboard, edges: .bottom)
        // ── Product detail — native sheet for swipe-to-dismiss ──
        .sheet(item: Binding(
            get: { state.selectedProduct },
            set: { state.selectedProduct = $0 }
        )) { p in
            ProductDetailView(product: p)
                .presentationDragIndicator(.visible)
                .presentationDetents([.large])
                .presentationCornerRadius(28)
        }
        // ── Full-screen overlays — slide up from bottom ──
        .overlay {
            if let overlay = state.overlay {
                overlayView(overlay)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
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
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                    .zIndex(95)
            }
        }
        .animation(.spring(response: 0.42, dampingFraction: 0.88), value: state.overlay)
        .animation(.spring(response: 0.28, dampingFraction: 0.85), value: state.scanOpen)
        .animation(.spring(response: 0.4, dampingFraction: 0.85), value: state.payTargetProduct)
    }

    @ViewBuilder private var content: some View {
        switch state.tab {
        case .home:    HomeView()
        case .snacks:  SnacksView()
        case .scan:    HomeView()
        case .map:     MapView()
        case .profile: ProfileView()
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
