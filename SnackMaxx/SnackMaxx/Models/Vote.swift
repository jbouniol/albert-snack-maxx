import Foundation

struct VoteRequest: Identifiable, Hashable {
    let id: String
    var name: String
    var brand: String
    var category: SnackCategory
    var votes: Int
    var voted: Bool
    var trend: String
}

struct VoteFulfilled: Identifiable, Hashable {
    let id: String
    let name: String
    let date: String
    let machine: String
}
