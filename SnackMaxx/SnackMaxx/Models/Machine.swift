import Foundation

enum MachineStatus: String, Codable {
    case live, warn, offline
}

struct Machine: Identifiable, Hashable {
    let id: String
    let name: String
    let distance: Double
    let status: MachineStatus
    let products: Int
    let restock: String
    let address: String
    let open: Bool
    let stockHealth: Int

    /// "Lycée Voltaire" / "Hall A"
    var shortName: String { name.components(separatedBy: " — ").first ?? name }
    var subName: String { name.components(separatedBy: " — ").dropFirst().joined(separator: " — ") }

    var distanceLabel: String {
        if distance < 1 { return "\(Int(distance * 1000)) m" }
        return String(format: "%.1f km", distance)
    }
}
