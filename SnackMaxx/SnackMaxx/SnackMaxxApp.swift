import SwiftUI

@main
struct SnackMaxxApp: App {
    @StateObject private var state = AppState()

    init() {
        // print available fonts for debug
        #if DEBUG
        for family in UIFont.familyNames.sorted() {
            let names = UIFont.fontNames(forFamilyName: family)
            if names.contains(where: {
                $0.contains("Bowlby") || $0.contains("Archivo") || $0.contains("SpaceGrotesk") || $0.contains("Bungee")
            }) {
                print("[Mx] family=\(family) → \(names)")
            }
        }
        #endif
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(state)
                .preferredColorScheme(.light)
                .tint(Mx.orange)
        }
    }
}
