# Lessons — Snack Maxx iOS Demo

Patterns + corrections from building this demo. Add new entries at the top.

## SwiftUI: `Group { switch ... case A: Image, ... }` doesn't propagate modifiers

`.resizable()` and other modifiers don't work when applied to a `Group` containing a `switch` because the resulting type is a `Group<_ConditionalContent<...>>` of erased views, not an `Image`. Refactor to compute the `systemName` in a `var`, then apply the modifier to a single `Image(systemName:)`. Caught by `swiftc -typecheck` on `Components/CategoryTile.swift`.

## SwiftUI: two trailing `@ViewBuilder` closures with defaults cause Swift 6 deprecation

If an init has both `@ViewBuilder leading: () -> Leading = { EmptyView() }` and `@ViewBuilder trailing: () -> Trailing = { EmptyView() }`, calling `MaxxButton(...) { Image(...) }` is ambiguous — Swift 5 matched the last unlabeled trailing to `trailing`, Swift 6 deprecates this. Either label every call site (`leading: { ... }`), or redesign with a single trailing closure. We chose the latter and added an `EmptyView`-typed convenience init for icon-less buttons.

## Xcode 26.5 + iOS Simulator runtime 18.4 = build refuses

Xcode 26.5 ships with `iphonesimulator26.5` SDK metadata but not the iOS 26.5 platform runtime. With only iOS 18.4 runtime installed, `xcodebuild` reports `Found no destinations for the scheme '...'` even with explicit destination UDID. The fix is to install the iOS 26.5 platform via Xcode → Settings → Platforms (or `xcodebuild -downloadPlatform iOS`). README documents this. Typechecking via `swiftc --sdk iphonesimulator26.5 -typecheck` still works without the runtime, so use that to verify Swift correctness when the build target isn't available.

## xcodegen 2.45.4 generates a working Info.plist with `properties:` block

Setting `targets.SnackMaxx.info.properties` in `project.yml` lets you avoid hand-authoring Info.plist entirely. Camera/location usage descriptions + `UIAppFonts` + launch screen all flow through. The plist on disk gets rewritten on every `xcodegen generate`, so don't edit it manually — edit `project.yml` instead.

## Free Apple ID provisioning expires in 7 days

The README warns to install **on May 26–27** for the May 28 demo, not earlier. A paid Apple Developer team extends this to 1 year — if anyone on the Snack Maxx team has one, sign with that team in Xcode → Project → Signing & Capabilities.
