import SwiftUI

struct NameEntryView: View {
    @Binding var name: String
    let onContinue: () -> Void
    let onBack: () -> Void
    @FocusState private var focused: Bool

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button(action: onBack) {
                    ZStack {
                        Circle().fill(Mx.card)
                        MxIcon(name: .back, size: 20, color: Mx.ink)
                    }
                    .frame(width: 40, height: 40)
                    .overlay(Circle().stroke(Mx.line, lineWidth: 1))
                }
                .buttonStyle(.plain)
                Spacer()
            }
            .padding(.horizontal, 18).padding(.top, 14)

            VStack(alignment: .leading, spacing: 8) {
                Text("À TOI")
                    .font(MxFont.head(11))
                    .tracking(1.8)
                    .foregroundStyle(Mx.orange)
                MaxxHead(text: "Comment on t'appelle ?", size: 30)
                Text("Pour que tes commandes, ton streak et tes votes soient bien à toi.")
                    .font(MxFont.body(14))
                    .foregroundStyle(Mx.ink2)
                    .padding(.top, 4)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 24)
            .padding(.top, 40)

            VStack(alignment: .leading, spacing: 10) {
                Text("Ton prénom")
                    .font(MxFont.head(11))
                    .tracking(1.4)
                    .foregroundStyle(Mx.mute)
                TextField("ex: Jonathan", text: $name)
                    .focused($focused)
                    .font(MxFont.body(20, weight: .bold))
                    .foregroundStyle(Mx.ink)
                    .padding(.horizontal, 14).padding(.vertical, 14)
                    .background(Mx.card)
                    .overlay(
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .stroke(Mx.line, lineWidth: 1)
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .submitLabel(.continue)
                    .onSubmit { if !name.isEmpty { onContinue() } }
            }
            .padding(.horizontal, 24).padding(.top, 30)

            Spacer()

            MaxxButton("Continuer", variant: .primary, size: .lg, full: true, action: onContinue) {
                MxIcon(name: .check, size: 18, color: .white)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 32)
            .opacity(name.isEmpty ? 0.5 : 1)
            .disabled(name.isEmpty)
        }
        .onAppear { DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) { focused = true } }
    }
}
