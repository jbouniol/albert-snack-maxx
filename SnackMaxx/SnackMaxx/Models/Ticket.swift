import Foundation

struct TicketType: Identifiable, Hashable {
    let id: String
    let label: String
    let icon: String  // matches MxIconName cases
}

struct PastTicket: Identifiable, Hashable {
    enum Color: String { case ok, warn }
    let id: String
    let date: String
    let machine: String
    let type: String
    let status: String
    let color: Color
}
