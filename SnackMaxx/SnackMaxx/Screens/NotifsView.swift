import SwiftUI

struct NotifsView: View {
    @EnvironmentObject var state: AppState

    @State private var restock = true
    @State private var newProducts = true
    @State private var votes = true
    @State private var streak = true
    @State private var drops = false
    @State private var weekly = true

    var body: some View {
        OverlayChrome(title: "Notifications", onClose: { state.overlay = nil }) {
            VStack(spacing: 0) {
                SectionHeader(title: "Activité")
                group {
                    toggleRow(label: "Restock d'un favori",
                              sub: "Quand un snack que tu aimes revient en stock",
                              isOn: $restock, isFirst: true)
                    toggleRow(label: "Rappel de streak",
                              sub: "Avant de perdre ta série",
                              isOn: $streak)
                }

                SectionHeader(title: "Découverte")
                group {
                    toggleRow(label: "Nouveaux snacks",
                              sub: "Drops, éditions limitées",
                              isOn: $newProducts, isFirst: true)
                    toggleRow(label: "Mes votes",
                              sub: "Quand un snack que tu as voté arrive",
                              isOn: $votes)
                    toggleRow(label: "Flash deals",
                              sub: "Offres limitées (peut être bruyant)",
                              isOn: $drops)
                }

                SectionHeader(title: "Résumé")
                group {
                    toggleRow(label: "Bilan hebdomadaire",
                              sub: "Combien tu as dépensé / économisé",
                              isOn: $weekly, isFirst: true)
                }

                Color.clear.frame(height: 130)
            }
        }
    }

    @ViewBuilder private func group<C: View>(@ViewBuilder content: () -> C) -> some View {
        VStack(spacing: 0) { content() }
            .background(Mx.card)
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Mx.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            .padding(.horizontal, 18)
    }

    private func toggleRow(label: String, sub: String, isOn: Binding<Bool>,
                           isFirst: Bool = false) -> some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(label)
                    .font(MxFont.body(14, weight: .semibold))
                    .foregroundStyle(Mx.ink)
                Text(sub)
                    .font(MxFont.body(11))
                    .foregroundStyle(Mx.mute)
            }
            Spacer()
            Toggle("", isOn: isOn)
                .toggleStyle(SwitchToggleStyle(tint: Mx.orange))
                .labelsHidden()
        }
        .padding(.horizontal, 14).padding(.vertical, 12)
        .overlay(alignment: .top) {
            if !isFirst { Rectangle().fill(Mx.line2).frame(height: 1) }
        }
    }
}
