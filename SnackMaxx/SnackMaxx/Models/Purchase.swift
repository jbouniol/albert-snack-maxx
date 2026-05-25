import Foundation

struct Purchase: Identifiable, Hashable {
    let id: String
    let productId: String
    let machineId: String
    let date: String      // "Auj. · 14:22"
    let relative: String  // "il y a 1h"
    let price: Double
    let paid: String      // "Apple Pay" | "Carte"
}
