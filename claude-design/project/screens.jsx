// screens.jsx — Snack Maxx app screens (v2, calmer)

const { useMemo: useMemoS, useState: useStateS } = React;

/* ── App header — logo + location pill ───────────────────── */
function AppHeader({ machine, onLocation, onNotifications, onTicket }) {
  return (
    <div style={{ padding: "54px 18px 8px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <Logo h={36} />
        <div style={{ display: "flex", gap: 8 }}>
          {onTicket && (
            <button onClick={onTicket} style={{
              appearance: "none", cursor: "pointer", border: "1px solid var(--mx-line)",
              background: "var(--mx-card)", width: 40, height: 40, borderRadius: 999,
              display: "flex", alignItems: "center", justifyContent: "center",
            }} title="Signaler un problème">
              <Icon name="alert" size={17} color="var(--mx-ink)" />
            </button>
          )}
          <button onClick={onNotifications} style={{
            appearance: "none", cursor: "pointer", border: "1px solid var(--mx-line)",
            background: "var(--mx-card)", width: 40, height: 40, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <Icon name="bell" size={18} color="var(--mx-ink)" />
            <span style={{
              position: "absolute", top: 8, right: 9, width: 8, height: 8,
              borderRadius: 999, background: "var(--mx-orange)",
              border: "2px solid var(--mx-card)",
            }} />
          </button>
        </div>
      </div>

      <button
        onClick={onLocation}
        style={{
          marginTop: 14, width: "100%",
          appearance: "none", border: "1px solid var(--mx-line)",
          background: "var(--mx-card)", borderRadius: 14, padding: "10px 14px",
          color: "var(--mx-ink)", textAlign: "left", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: "rgba(255,90,20,.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="pin" size={18} color="var(--mx-orange)" />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)",
                        textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}>
            Distributeur le plus proche
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14,
                        color: "var(--mx-ink)", marginTop: 2,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {machine.name} · {fmtDist(machine.distance)}
          </div>
        </div>
        <Icon name="chevron" size={18} color="var(--mx-mute)" />
      </button>
    </div>
  );
}

function fmtDist(d) {
  return d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`;
}

/* ── HOME ─────────────────────────────────────────────────── */
function HomeScreen({
  machine, onScan, onSelectProduct, onGoSnacks, onGoMap,
  onOpenHistory, onOpenLoyalty, onOpenVote, onOpenTicket,
  onReorder,
}) {
  const featured = PRODUCTS.filter(p => p.hot).slice(0, 4);
  const lowStock = PRODUCTS.filter(p => p.low).slice(0, 4);
  const usuals = getUsuals();
  const topPick = usuals[0];     // for personalized banner
  const topMachineForPick = MACHINES.find(m => m.id === "m01");

  return (
    <div>
      <AppHeader machine={machine} onLocation={onGoMap} onTicket={onOpenTicket} />

      {/* Hero machine card */}
      <div style={{ padding: "8px 18px 6px" }}>
        <div style={{
          position: "relative",
          borderRadius: 22,
          background: "linear-gradient(160deg,#FF7A1F 0%, #E63B0A 70%, #C7281D 100%)",
          padding: 18,
          color: "#fff",
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(199,40,29,.32)",
        }}>
          <svg viewBox="0 0 400 220" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .4,
          }}>
            <path d="M-40 130 Q200 30 440 110" stroke="rgba(43,180,232,.85)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M-40 150 Q200 50 440 130" stroke="rgba(255,210,63,.55)" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: 999, background: "#5BFFA0",
                boxShadow: "0 0 0 4px rgba(91,255,160,.25)",
              }} />
              <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
                             letterSpacing: ".14em", textTransform: "uppercase",
                             color: "rgba(255,241,214,.95)", whiteSpace: "nowrap" }}>
                Stock en direct
              </span>
            </div>

            <div style={{ marginTop: 8 }}>
              <span className="mx-head" style={{ fontSize: 26, color: "#fff" }}>
                {machine.name.split(" — ")[0]}
              </span>
              <div style={{ fontFamily: "var(--f-body)", color: "rgba(255,241,214,.9)", fontSize: 13, marginTop: 2 }}>
                {machine.name.split(" — ")[1] || machine.address}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
              {[
                { k: "Réfs", v: machine.products },
                { k: "Stock", v: `${machine.stockHealth || 94}%` },
                { k: "Distance", v: fmtDist(machine.distance) },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,.14)",
                  borderRadius: 12, padding: "9px 12px",
                  backdropFilter: "blur(4px)",
                }}>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
                                color: "rgba(255,241,214,.9)", textTransform: "uppercase", letterSpacing: ".1em" }}>{s.k}</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 2 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <MaxxButton variant="cream" size="md" icon={<Icon name="qrcode" size={18} color="var(--mx-ink)" />} onClick={onScan} style={{ flex: 1 }}>
                Scanner & payer
              </MaxxButton>
              <MaxxButton variant="dark" size="md" icon={<Icon name="snack" size={18} color="#fff" />} onClick={onGoSnacks} style={{ flex: 1.2 }}>
                Voir les snacks
              </MaxxButton>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized banner (M9) */}
      {topPick && (
        <div style={{ padding: "12px 18px 0" }}>
          <button onClick={() => onSelectProduct(topPick.product)} className="mx-press" style={{
            appearance: "none", cursor: "pointer", width: "100%",
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px 10px 10px",
            border: "1px solid var(--mx-line)",
            borderRadius: 16,
            background: "var(--mx-card)",
            textAlign: "left",
            boxShadow: "0 4px 14px rgba(0,0,0,.05)",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(160deg, ${shadeHex(topPick.product.color, 25)}, ${shadeHex(topPick.product.color, -15)})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <SnackPackage kind={topPick.product.kind} w={36} h={46}
                            color={topPick.product.color} accent={topPick.product.accent}
                            label={shortLabel(topPick.product.name)} flavor="" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mx-eyebrow" style={{ color: "var(--mx-orange)" }}>
                <Icon name="bolt" size={11} color="var(--mx-orange)" /> Pour toi à cette heure
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)", marginTop: 2 }}>
                Ton {topPick.product.name}, dispo à {fmtDist(topMachineForPick.distance)}.
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 1 }}>
                Tu l'as pris {topPick.times}× cette semaine.
              </div>
            </div>
            <Icon name="chevron" size={18} color="var(--mx-mute)" />
          </button>
        </div>
      )}

      {/* Reprendre — recent purchases (M8) */}
      <SectionHeader title="Reprendre" action="Historique" onAction={onOpenHistory} />
      <div style={{ display: "flex", gap: 10, padding: "0 18px 4px", overflowX: "auto" }} className="mx-noscroll">
        {PURCHASES.slice(0, 4).map(h => {
          const p = PRODUCTS.find(pp => pp.id === h.productId);
          const m = MACHINES.find(mm => mm.id === h.machineId);
          if (!p) return null;
          return (
            <div key={h.id} style={{
              flexShrink: 0, width: 168,
              border: "1px solid var(--mx-line)",
              background: "var(--mx-card)",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,.04)",
            }}>
              <div style={{
                height: 80, display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(160deg, ${shadeHex(p.color, 28)}, ${shadeHex(p.color, -15)})`,
                position: "relative",
              }}>
                <SnackPackage kind={p.kind} w={58} h={70} color={p.color} accent={p.accent}
                              label={shortLabel(p.name)} flavor="" />
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                  background: "rgba(255,255,255,.95)", color: "var(--mx-ink)",
                  padding: "2px 6px", borderRadius: 999,
                }}>{h.relative}</div>
              </div>
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12, color: "var(--mx-ink)",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)", marginTop: 1,
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {m ? m.name.split(" — ")[0] : ""}
                </div>
                <button onClick={() => onReorder(p)} className="mx-press" style={{
                  marginTop: 6, width: "100%",
                  appearance: "none", cursor: "pointer",
                  background: "var(--mx-ink)", color: "#fff",
                  border: "none", borderRadius: 10,
                  padding: "6px 8px",
                  fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 11,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}>
                  Reprendre · {p.price.toFixed(2)} €
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <SectionHeader title="Catégories" action="Tout voir" onAction={onGoSnacks} />
      <div style={{ display: "flex", gap: 10, padding: "0 18px 4px", overflowX: "auto" }} className="mx-noscroll">
        {CATEGORIES.filter(c => c.id !== "all").map((c, i) => (
          <CategoryTile key={c.id} cat={c} idx={i} onClick={onGoSnacks} />
        ))}
      </div>

      {/* Featured */}
      <SectionHeader title="À l'honneur" action="Voir plus" onAction={onGoSnacks} />
      <div style={{ display: "flex", gap: 12, padding: "0 18px 8px", overflowX: "auto" }} className="mx-noscroll">
        {featured.map(p => (
          <FeaturedCard key={p.id} product={p} onClick={() => onSelectProduct(p)} />
        ))}
      </div>

      {/* Loyalty teaser card (M4) */}
      <div style={{ padding: "16px 18px 0" }}>
        <LoyaltyTeaser onClick={onOpenLoyalty} />
      </div>

      {/* Vote teaser card (M3) */}
      <div style={{ padding: "12px 18px 0" }}>
        <VoteTeaser onClick={onOpenVote} machine={machine} />
      </div>

      {/* Low stock */}
      <SectionHeader title="Ça part vite" action="Voir tout" onAction={onGoSnacks} />
      <div style={{ padding: "0 18px 130px" }}>
        <div className="mx-card" style={{ overflow: "hidden" }}>
          {lowStock.map((p, i) => (
            <button key={p.id} onClick={() => onSelectProduct(p)} className="mx-press" style={{
              appearance: "none", cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px",
              background: "transparent", textAlign: "left",
              borderTop: i ? "1px solid var(--mx-line-2)" : "none",
              color: "var(--mx-ink)",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(160deg, ${shadeHex(p.color, 15)}, ${shadeHex(p.color, -15)})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SnackPackage kind={p.kind} w={34} h={42} color={p.color} accent={p.accent}
                              label={shortLabel(p.name)} flavor="" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                  Slot {p.slot} · {p.flavor}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 15, color: "var(--mx-ink)" }}>
                  {p.price.toFixed(2)} €
                </div>
                <div className="mx-pill mx-pill--warn" style={{ marginTop: 4, padding: "2px 8px", fontSize: 10 }}>
                  {p.stock} restant{p.stock > 1 ? "s" : ""}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Loyalty teaser card (used on Home) ───────────────────── */
function LoyaltyTeaser({ onClick }) {
  const tier = LOYALTY_TIERS.find(t => t.id === USER.tier);
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer", width: "100%", textAlign: "left",
      border: "none", borderRadius: 22,
      background: "linear-gradient(160deg,#1A1410 0%, #2A211C 100%)",
      padding: 18,
      color: "#fff",
      overflow: "hidden", position: "relative",
      boxShadow: "0 12px 26px rgba(0,0,0,.32)",
    }}>
      {/* subtle gold sweep */}
      <svg viewBox="0 0 400 200" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .35,
      }}>
        <path d="M-20 130 Q200 50 440 110" stroke="rgba(255,179,0,.45)" strokeWidth="6" fill="none"/>
        <path d="M-20 160 Q200 90 440 140" stroke="rgba(255,122,31,.3)" strokeWidth="3" fill="none"/>
      </svg>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                        background: tier.bg, color: tier.color,
                        padding: "3px 10px", borderRadius: 999,
                        fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 11,
                        textTransform: "uppercase", letterSpacing: ".06em" }}>
            <Icon name="trophy" size={12} color={tier.color} />
            {tier.label}
          </div>
          <div style={{ marginTop: 8 }}>
            <span className="mx-head" style={{ fontSize: 22, color: "#fff" }}>
              Plus que {USER.nextPerkPts} pts
            </span>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,241,214,.7)", marginTop: 2 }}>
              avant ton prochain snack offert
            </div>
          </div>
        </div>

        {/* Streak chip */}
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "linear-gradient(160deg,#FF7A1F,#C7281D)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 6px 14px rgba(199,40,29,.35)",
        }}>
          <Icon name="fire" size={18} color="#fff" />
          <span style={{ fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 16, color: "#fff", marginTop: 2 }}>
            {USER.streak}j
          </span>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ position: "relative", marginTop: 14 }}>
        <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: "62%",
            background: "linear-gradient(90deg,#FFB300,#FF7A1F,#FF3D14)",
            borderRadius: 999,
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,241,214,.65)" }}>
            {USER.monthSpend.toFixed(2).replace(".", ",")} € ce mois
          </span>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, color: "#FFB300" }}>
            Voir mes avantages →
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Vote teaser card ─────────────────────────────────────── */
function VoteTeaser({ onClick, machine }) {
  const top = VOTES.slice(0, 3);
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer", width: "100%", textAlign: "left",
      border: "1px solid var(--mx-line)", borderRadius: 22,
      background: "var(--mx-card)",
      padding: 18, color: "var(--mx-ink)",
      boxShadow: "0 8px 22px rgba(0,0,0,.05)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mx-eyebrow" style={{ color: "var(--mx-blue-deep)" }}>
            <Icon name="vote" size={12} color="var(--mx-blue-deep)" /> Tu décides
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="mx-head" style={{ fontSize: 22, color: "var(--mx-ink)" }}>
              Vote pour les prochains snacks
            </span>
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
            Sur {machine.name.split(" — ")[0]} · {VOTES.length} demandes en cours
          </div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: "rgba(43,180,232,.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="vote" size={22} color="var(--mx-blue-deep)" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        {top.map((v, i) => (
          <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: "var(--mx-paper-2)",
              fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 11,
              color: "var(--mx-ink-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>{i + 1}</span>
            <span style={{ flex: 1, fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13,
                           color: "var(--mx-ink)",
                           overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {v.name}
            </span>
            <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12,
                           color: v.voted ? "var(--mx-orange)" : "var(--mx-mute)",
                           display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>
              {v.voted && <Icon name="check" size={12} color="var(--mx-orange)" />}
              {v.votes}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 12, padding: "10px 12px",
        background: "var(--mx-paper-2)", borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
      }}>
        <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-ink-2)" }}>
          {VOTE_FULFILLED.length} snacks déjà ajoutés grâce à vos votes ✦
        </span>
        <span style={{ fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 700, color: "var(--mx-orange)" }}>
          Voter →
        </span>
      </div>
    </button>
  );
}

/* Category tile (small, colored) */
function CategoryTile({ cat, onClick, idx }) {
  const palettes = [
    { bg: "#FFE9D7", fg: "#C7281D" },
    { bg: "#FFE2DC", fg: "#8B1A0E" },
    { bg: "#FFEFC2", fg: "#8A6300" },
    { bg: "#D7EFFD", fg: "#1376B8" },
    { bg: "#D9F4E2", fg: "#0F6E36" },
  ];
  const p = palettes[idx % palettes.length];
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer", flexShrink: 0,
      width: 90,
      border: "1px solid var(--mx-line)",
      background: p.bg,
      borderRadius: 18, padding: "12px 8px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      color: p.fg,
    }}>
      <CategoryGlyph id={cat.id} color={p.fg} />
      <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12, color: "var(--mx-ink)" }}>
        {cat.label}
      </span>
    </button>
  );
}
function CategoryGlyph({ id, color }) {
  // mini SVGs that suggest the category, fits the brand without emoji
  const s = { width: 30, height: 30, fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (id === "chips")  return <svg viewBox="0 0 32 32" {...s}><path d="M6 8c2-3 6-3 10-3s8 0 10 3l-2 16c-1 3-5 4-8 4s-7-1-8-4L6 8z"/><path d="M11 14h10M11 19h8"/></svg>;
  if (id === "choco")  return <svg viewBox="0 0 32 32" {...s}><rect x="6" y="6" width="20" height="20" rx="3"/><path d="M6 12h20M6 18h20M12 6v20M20 6v20"/></svg>;
  if (id === "cookie") return <svg viewBox="0 0 32 32" {...s}><circle cx="16" cy="16" r="11"/><circle cx="12" cy="12" r="1.6" fill={color}/><circle cx="20" cy="14" r="1.6" fill={color}/><circle cx="14" cy="20" r="1.6" fill={color}/><circle cx="21" cy="21" r="1.2" fill={color}/></svg>;
  if (id === "drinks") return <svg viewBox="0 0 32 32" {...s}><rect x="11" y="5" width="10" height="22" rx="2"/><path d="M13 10h6"/></svg>;
  if (id === "fit")    return <svg viewBox="0 0 32 32" {...s}><path d="M26 5c-6 0-15 2-18 11-2 5-1 9 1 11 1-2 6-4 11-7 7-3 8-10 6-15z"/></svg>;
  return null;
}

/* Featured product card (horizontal carousel) */
function FeaturedCard({ product, onClick }) {
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer", flexShrink: 0,
      width: 180,
      border: "1px solid var(--mx-line)",
      borderRadius: 18,
      background: "var(--mx-card)",
      overflow: "hidden", textAlign: "left",
      boxShadow: "0 6px 18px rgba(0,0,0,.06)",
    }}>
      <div style={{
        height: 140, position: "relative",
        background: `linear-gradient(160deg, ${shadeHex(product.color, 30)}, ${shadeHex(product.color, -20)})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <SnackPackage kind={product.kind} w={110} h={120}
                      color={product.color} accent={product.accent}
                      label={shortLabel(product.name)}
                      flavor={product.flavor.split(" ")[0].toUpperCase()} />
        {product.hot && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span className="mx-pill" style={{ background: "rgba(255,255,255,.95)", borderColor: "transparent", color: "#C7281D" }}>
              <Icon name="flame" size={12} color="#C7281D" /> Nouveau
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: "10px 12px 14px" }}>
        <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.name}
        </div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.flavor}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 6 }}>
          <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16, color: "var(--mx-ink)", whiteSpace: "nowrap" }}>
            {product.price.toFixed(2)} €
          </span>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", whiteSpace: "nowrap" }}>
            Slot {product.slot}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── SNACKS GRID ──────────────────────────────────────────── */
function SnacksScreen({ machine, onSelectProduct }) {
  const [cat, setCat] = useStateS("all");
  const [q, setQ] = useStateS("");

  const items = useMemoS(() => {
    return PRODUCTS.filter(p =>
      (cat === "all" || p.cat === cat) &&
      (!q || (p.name + " " + p.flavor).toLowerCase().includes(q.toLowerCase()))
    );
  }, [cat, q]);

  return (
    <div>
      <div style={{ padding: "54px 18px 8px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div className="mx-eyebrow" style={{ color: "var(--mx-orange)" }}>
              {machine.name.split(" — ")[0]}
            </div>
            <span className="mx-head" style={{ fontSize: 30, marginTop: 2, color: "var(--mx-ink)" }}>Snacks dispo</span>
          </div>
          <span className="mx-pill"><b>{items.length}</b> réfs</span>
        </div>

        {/* search */}
        <div style={{
          marginTop: 14,
          display: "flex", alignItems: "center", gap: 10,
          background: "var(--mx-card)",
          border: "1px solid var(--mx-line)",
          borderRadius: 14, padding: "10px 14px",
        }}>
          <Icon name="search" size={18} color="var(--mx-mute)" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un snack…"
                 style={{
                   flex: 1, background: "transparent", border: "none", outline: "none",
                   color: "var(--mx-ink)", fontFamily: "var(--f-body)", fontSize: 14,
                 }} />
          <button style={{
            appearance: "none", border: "none", background: "transparent", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 4,
            color: "var(--mx-ink-2)", fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 12,
          }}>
            <Icon name="sliders" size={16} color="var(--mx-ink-2)" />
          </button>
        </div>
      </div>

      {/* category chips */}
      <div style={{ display: "flex", gap: 8, padding: "12px 18px 10px", overflowX: "auto" }} className="mx-noscroll">
        {CATEGORIES.map(c => (
          <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      {/* grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        padding: "4px 18px 130px",
      }}>
        {items.map(p => (
          <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p)} />
        ))}
        {items.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "var(--mx-mute)" }}>
            <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16 }}>Pas de résultat</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Essaie un autre mot ou une autre catégorie.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const isOut = product.empty;
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer",
      border: "1px solid var(--mx-line)",
      borderRadius: 18,
      background: "var(--mx-card)",
      overflow: "hidden", textAlign: "left",
      boxShadow: "0 4px 14px rgba(0,0,0,.05)",
      opacity: isOut ? .55 : 1,
      position: "relative",
    }}>
      {/* art area */}
      <div style={{
        height: 150, position: "relative",
        background: `linear-gradient(160deg, ${shadeHex(product.color, 30)}, ${shadeHex(product.color, -20)})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <SnackPackage kind={product.kind} w={108} h={130}
                      color={product.color} accent={product.accent}
                      label={shortLabel(product.name)}
                      flavor={product.flavor.split(" ")[0].toUpperCase()} />

        {/* status pill */}
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          {product.hot && (
            <span className="mx-pill" style={{ background: "rgba(255,255,255,.95)", borderColor: "transparent", color: "#C7281D" }}>
              <Icon name="flame" size={12} color="#C7281D" /> Nouveau
            </span>
          )}
          {!product.hot && product.low && !isOut && (
            <span className="mx-pill mx-pill--warn" style={{ background: "rgba(255,255,255,.95)" }}>
              Stock bas
            </span>
          )}
          {isOut && (
            <span className="mx-pill mx-pill--bad" style={{ background: "rgba(255,255,255,.95)" }}>
              Épuisé
            </span>
          )}
        </div>

        <div style={{ position: "absolute", bottom: 8, right: 10,
                      fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
                      color: "rgba(255,255,255,.85)", whiteSpace: "nowrap" }}>
          Slot {product.slot}
        </div>
      </div>

      <div style={{ padding: "10px 12px 14px" }}>
        <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.name}
        </div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.flavor}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 6 }}>
          <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16, color: "var(--mx-ink)", whiteSpace: "nowrap" }}>
            {product.price.toFixed(2)} €
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
                         fontFamily: "var(--f-body)", fontSize: 11, color: isOut ? "#C7281D" : product.low ? "#8a6300" : "var(--mx-mute)" }}>
            <span className={`mx-dot ${isOut ? "bad" : product.low ? "warn" : ""}`} />
            {isOut ? "Vide" : `${product.stock} en stock`}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── PRODUCT DETAIL ───────────────────────────────────────── */
function ProductDetail({ product, onClose, machine, onPay }) {
  if (!product) return null;
  const isOut = product.empty;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 80,
      background: "var(--mx-paper)",
      overflowY: "auto",
      animation: "mx-slidein .25s ease-out",
    }} className="mx-noscroll">
      <style>{`@keyframes mx-slidein { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>

      {/* coloured hero top */}
      <div style={{
        position: "relative",
        background: `linear-gradient(160deg, ${shadeHex(product.color, 25)} 0%, ${shadeHex(product.color, -10)} 100%)`,
        paddingTop: 54, paddingBottom: 30,
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
      }}>
        {/* speed line decoration */}
        <svg viewBox="0 0 400 220" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .25,
        }}>
          <path d="M-40 130 Q200 30 440 110" stroke="#fff" strokeWidth="6" fill="none"/>
        </svg>

        <div style={{ position: "relative", padding: "12px 18px 0", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} className="mx-press" style={{
            appearance: "none", cursor: "pointer",
            border: "none", background: "rgba(255,255,255,.18)",
            backdropFilter: "blur(6px)",
            width: 40, height: 40, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="back" size={20} color="#fff" />
          </button>
          <span className="mx-pill" style={{ background: "rgba(255,255,255,.18)", borderColor: "transparent", color: "#fff", backdropFilter: "blur(6px)" }}>
            Slot {product.slot}
          </span>
          <button className="mx-press" style={{
            appearance: "none", cursor: "pointer",
            border: "none", background: "rgba(255,255,255,.18)",
            backdropFilter: "blur(6px)",
            width: 40, height: 40, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="heart" size={20} color="#fff" />
          </button>
        </div>

        {/* big product art */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "16px 0 0" }}>
          <SnackPackage kind={product.kind} w={200} h={240}
                        color={product.color} accent={product.accent}
                        label={shortLabel(product.name)}
                        flavor={product.flavor.toUpperCase()} />
        </div>
      </div>

      {/* info sheet */}
      <div style={{ padding: "20px 18px 4px" }}>
        <div className="mx-eyebrow">{product.flavor}</div>
        <div style={{ marginTop: 6, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
          <span className="mx-head" style={{ fontSize: 30, color: "var(--mx-ink)" }}>
            {product.name}
          </span>
          <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 22, color: "var(--mx-ink)" }}>
            {product.price.toFixed(2)} €
          </span>
        </div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-ink-2)", marginTop: 8, lineHeight: 1.5 }}>
          {product.tagline}.
        </div>
      </div>

      {/* stock + slot status row */}
      <div style={{ padding: "14px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div className="mx-card" style={{ padding: 14 }}>
          <div className="mx-eyebrow" style={{ color: "var(--mx-mute)" }}>Stock</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 28, color: isOut ? "#C7281D" : "var(--mx-ink)" }}>
              {isOut ? 0 : product.stock}
            </span>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)" }}>unités</span>
          </div>
          <span className={`mx-pill ${isOut ? "mx-pill--bad" : product.low ? "mx-pill--warn" : "mx-pill--ok"}`}
                style={{ marginTop: 8 }}>
            <span className={`mx-dot ${isOut ? "bad" : product.low ? "warn" : ""}`} />
            {isOut ? "Rupture" : product.low ? "Bas" : "Disponible"}
          </span>
        </div>
        <div className="mx-card" style={{ padding: 14 }}>
          <div className="mx-eyebrow" style={{ color: "var(--mx-mute)" }}>Calories</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 28, color: "var(--mx-ink)" }}>
              {product.kcal}
            </span>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)" }}>kcal</span>
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 8 }}>
            Portion {product.cat === "drinks" ? "33cl" : "45g"}
          </div>
        </div>
      </div>

      {/* nutri row */}
      <div style={{ padding: "12px 18px 0" }}>
        <div className="mx-card" style={{ padding: "12px 6px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {[
              { k: "Protéines", v: "6g" },
              { k: "Glucides",  v: "28g" },
              { k: "Sucres",    v: "12g" },
              { k: "Sel",       v: "0.8g" },
            ].map((x, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 8px",
                                    borderRight: i < 3 ? "1px solid var(--mx-line-2)" : "none" }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)",
                              textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}>{x.k}</div>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16, color: "var(--mx-ink)", marginTop: 2 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHERE IT'S AT */}
      <div style={{ padding: "12px 18px 0" }}>
        <div className="mx-card" style={{ padding: 14 }}>
          <div className="mx-eyebrow" style={{ color: "var(--mx-mute)" }}>Disponible sur</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <span style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: "rgba(255,90,20,.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="pin" size={18} color="var(--mx-orange)" />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, color: "var(--mx-ink)", fontSize: 14 }}>{machine.name}</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                {fmtDist(machine.distance)} · {machine.address}
              </div>
            </div>
            <Icon name="chevron" size={18} color="var(--mx-mute)" />
          </div>
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{ padding: "18px 18px 140px" }}>
        {isOut ? (
          <MaxxButton variant="dark" full size="lg" icon={<Icon name="bell" size={20} color="#fff" />}>
            Me prévenir au restock
          </MaxxButton>
        ) : (
          <button onClick={() => onPay && onPay(product, machine)} className="mx-press" style={{
            appearance: "none", cursor: "pointer", width: "100%",
            background: "#000", color: "#fff",
            border: "none", borderRadius: 16, height: 54,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16,
            boxShadow: "0 8px 22px rgba(0,0,0,.32)",
          }}>
            <Icon name="apple" size={20} color="#fff" />
            Payer · {product.price.toFixed(2)} €
          </button>
        )}
        <div style={{ textAlign: "center", fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 8 }}>
          {isOut ? "On te ping dès que le slot est rechargé." : "Paiement instantané · livraison sur le slot."}
        </div>
      </div>
    </div>
  );
}

/* ── QR SCAN MODAL ────────────────────────────────────────── */
function ScanModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 90,
      background: "rgba(11,9,7,.96)",
      backdropFilter: "blur(8px)",
      display: "flex", flexDirection: "column",
      animation: "mx-fadein .2s ease",
    }}>
      <style>{`@keyframes mx-fadein { from { opacity: 0 } to { opacity: 1 } }
               @keyframes mx-scanline { 0% { top: 8%; } 100% { top: 92%; } }`}</style>

      <div style={{ padding: "54px 18px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,241,214,.6)",
                        textTransform: "uppercase", letterSpacing: ".14em", fontWeight: 700 }}>
            Scanner un distributeur
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 20, color: "#fff", marginTop: 2 }}>
            Vise le QR du distributeur
          </div>
        </div>
        <button onClick={onClose} style={{
          appearance: "none", cursor: "pointer", border: "1px solid rgba(255,255,255,.15)",
          background: "rgba(255,255,255,.06)", color: "#fff",
          width: 40, height: 40, borderRadius: 999,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="close" size={20} color="#fff" />
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 24px 0" }}>
        <div style={{
          position: "relative", width: 280, height: 280,
          borderRadius: 24, overflow: "hidden",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
        }}>
          {/* viewport corners */}
          {[
            { t: 12, l: 12 }, { t: 12, r: 12 },
            { b: 12, l: 12 }, { b: 12, r: 12 },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute", top: c.t, left: c.l, right: c.r, bottom: c.b,
              width: 32, height: 32,
              borderTop: c.t != null ? "3px solid #FF7A1F" : "none",
              borderLeft: c.l != null ? "3px solid #FF7A1F" : "none",
              borderRight: c.r != null ? "3px solid #FF7A1F" : "none",
              borderBottom: c.b != null ? "3px solid #FF7A1F" : "none",
              borderRadius: c.t != null && c.l != null ? "8px 0 0 0"
                           : c.t != null && c.r != null ? "0 8px 0 0"
                           : c.b != null && c.l != null ? "0 0 0 8px"
                           : "0 0 8px 0",
            }} />
          ))}
          {/* scan line */}
          <div style={{
            position: "absolute", left: 24, right: 24, height: 2,
            background: "linear-gradient(90deg, transparent, #FF7A1F, transparent)",
            boxShadow: "0 0 12px rgba(255,122,31,.7)",
            animation: "mx-scanline 2s ease-in-out infinite alternate",
          }} />
        </div>

        <div style={{ marginTop: 24, textAlign: "center", maxWidth: 280 }}>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,241,214,.75)", lineHeight: 1.5 }}>
            Approche-toi de la vitre du distributeur. On t'amène direct sur le bon catalogue.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="mx-pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)", color: "#fff", cursor: "pointer" }}>
            <Icon name="flame" size={12} color="#FF7A1F" /> Torche
          </button>
          <button className="mx-pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)", color: "#fff", cursor: "pointer" }}>
            <Icon name="search" size={12} color="#FFB300" /> Saisir le code
          </button>
        </div>
      </div>

      <div style={{ padding: "0 24px 80px", marginTop: 28 }}>
        <MaxxButton full variant="primary" size="lg" icon={<Icon name="pin" size={20} color="#fff" />} onClick={onClose}>
          Utiliser ma position
        </MaxxButton>
      </div>
    </div>
  );
}

/* ── MAP ──────────────────────────────────────────────────── */
function MapScreen({ onSelectMachine, currentId }) {
  return (
    <div>
      <div style={{ padding: "54px 18px 8px" }}>
        <div className="mx-eyebrow">{MACHINES.length} distributeurs · Paris</div>
        <span className="mx-head" style={{ fontSize: 30, marginTop: 2, color: "var(--mx-ink)" }}>Carte</span>
      </div>

      {/* stylized map */}
      <div style={{ padding: "10px 18px 6px" }}>
        <div style={{
          position: "relative", height: 280, borderRadius: 22,
          border: "1px solid var(--mx-line)",
          background: "linear-gradient(135deg,#F4ECDA 0%,#E8DCC4 100%)",
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,.06)",
        }}>
          <svg width="100%" height="100%" viewBox="0 0 360 280" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="mxgrid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M22 0H0V22" fill="none" stroke="rgba(26,20,16,.07)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="360" height="280" fill="url(#mxgrid)" />
            <path d="M-20 200 Q120 120 380 240" stroke="#FF7A1F" strokeWidth="5" opacity=".7" fill="none" strokeLinecap="round"/>
            <path d="M-20 100 Q180 180 380 60"  stroke="#2BB4E8" strokeWidth="4" opacity=".7" fill="none" strokeLinecap="round"/>
            <path d="M180 -20 L180 320" stroke="rgba(26,20,16,.25)" strokeWidth="2" opacity=".4" strokeDasharray="6 6"/>
            <path d="M-20 250 Q120 240 220 260 T 380 200" stroke="rgba(43,180,232,.5)" strokeWidth="12" fill="none"/>
          </svg>

          {[
            { id: "m01", x: 90,  y: 110 },
            { id: "m02", x: 200, y: 70  },
            { id: "m03", x: 260, y: 180 },
            { id: "m04", x: 120, y: 200 },
            { id: "m05", x: 300, y: 90  },
          ].map(p => {
            const m = MACHINES.find(mm => mm.id === p.id);
            const sel = currentId === p.id;
            const color = m.status === "live" ? "#FF5A14" : m.status === "warn" ? "#FFB300" : "#C7281D";
            return (
              <button key={p.id} onClick={() => onSelectMachine(m)} style={{
                appearance: "none", cursor: "pointer",
                position: "absolute", left: p.x, top: p.y,
                transform: "translate(-50%,-100%)",
                border: "none", background: "transparent",
              }}>
                <svg width="34" height="42" viewBox="0 0 34 42" style={{
                  filter: sel ? "drop-shadow(0 4px 8px rgba(0,0,0,.25))" : "drop-shadow(0 2px 4px rgba(0,0,0,.18))",
                }}>
                  <path d="M17 0C7 0 0 7 0 17c0 12 17 25 17 25s17-13 17-25C34 7 27 0 17 0z"
                        fill={color} stroke="#fff" strokeWidth="3"/>
                  <circle cx="17" cy="15" r="5" fill="#fff"/>
                </svg>
              </button>
            );
          })}

          {/* you-are-here */}
          <div style={{
            position: "absolute", left: 80, top: 130,
            width: 16, height: 16, borderRadius: 999,
            background: "#2BB4E8", border: "3px solid #fff",
            boxShadow: "0 0 0 5px rgba(43,180,232,.25)",
            transform: "translate(-50%,-50%)",
          }} />

          {/* legend */}
          <div style={{
            position: "absolute", left: 12, bottom: 12,
            background: "rgba(255,255,255,.95)",
            borderRadius: 12, padding: "8px 10px",
            display: "flex", flexDirection: "column", gap: 4,
            border: "1px solid var(--mx-line)",
          }}>
            {[
              { c: "#FF5A14", l: "En direct" },
              { c: "#FFB300", l: "Stock bas" },
              { c: "#C7281D", l: "Hors service" },
            ].map((x, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: x.c }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-ink)" }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionHeader title="À proximité" action="Filtres" />
      <div style={{ padding: "0 18px 130px", display: "flex", flexDirection: "column", gap: 10 }}>
        {MACHINES.map(m => (
          <MachineRow key={m.id} m={m} active={currentId === m.id} onClick={() => onSelectMachine(m)} />
        ))}
      </div>
    </div>
  );
}

function MachineRow({ m, active, onClick }) {
  return (
    <button onClick={onClick} className="mx-press" style={{
      appearance: "none", cursor: "pointer", textAlign: "left",
      border: active ? "1.5px solid var(--mx-orange)" : "1px solid var(--mx-line)",
      borderRadius: 16,
      background: "var(--mx-card)",
      padding: 14,
      display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 4px 14px rgba(0,0,0,.04)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: "rgba(255,90,20,.10)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name="pin" size={20} color="var(--mx-orange)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className={`mx-dot ${m.status === "warn" ? "warn" : m.status === "live" ? "" : "bad"}`} />
          <span style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)",
                         textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, whiteSpace: "nowrap" }}>
            {m.status === "live" ? "En direct" : m.status === "warn" ? "Stock bas" : "Offline"}
          </span>
        </div>
        <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)", marginTop: 2,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {m.name}
        </div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
          {m.products} réfs · restock {m.restock}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)", whiteSpace: "nowrap" }}>
          {fmtDist(m.distance)}
        </div>
        <Icon name="chevron" size={16} color="var(--mx-mute)" />
      </div>
    </button>
  );
}

/* ── PROFILE ─────────────────────────────────────────────── */
function ProfileScreen({
  onSelectProduct, onSelectMachine, currentMachineId,
  onOpenLoyalty, onOpenHistory, onOpenTicket, onOpenNotifs, onOpenVote,
}) {
  const favIds = ["p01", "p09", "p07"];
  const favs = favIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const savedMachineIds = ["m01", "m03"];
  const saved = savedMachineIds.map(id => MACHINES.find(m => m.id === id)).filter(Boolean);
  const tier = LOYALTY_TIERS.find(t => t.id === USER.tier);

  return (
    <div>
      <div style={{ padding: "54px 18px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="mx-head" style={{ fontSize: 30, color: "var(--mx-ink)" }}>Profil</span>
          <button style={{
            appearance: "none", cursor: "pointer", border: "1px solid var(--mx-line)",
            background: "var(--mx-card)", width: 40, height: 40, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="settings" size={18} color="var(--mx-ink)" />
          </button>
        </div>
      </div>

      {/* identity + loyalty stacked card */}
      <div style={{ padding: "0 18px 4px" }}>
        <div className="mx-card" style={{ padding: 0, overflow: "hidden" }}>
          {/* identity row */}
          <div style={{ padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 999,
              background: "linear-gradient(160deg,#FF7A1F,#C7281D)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: 24,
              boxShadow: "0 6px 14px rgba(230,59,10,.3)",
            }}>{USER.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 17, color: "var(--mx-ink)" }}>
                {USER.name}
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                {USER.email} · {USER.city}
              </div>
            </div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: tier.bg, color: tier.color,
              padding: "4px 10px", borderRadius: 999,
              fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 11,
              textTransform: "uppercase", letterSpacing: ".06em",
            }}>
              <Icon name="trophy" size={11} color={tier.color} />
              {tier.label}
            </span>
          </div>

          {/* loyalty inner card — tappable */}
          <button onClick={onOpenLoyalty} className="mx-press" style={{
            appearance: "none", cursor: "pointer", width: "100%",
            border: "none", borderTop: "1px solid var(--mx-line-2)",
            background: "linear-gradient(180deg,#FBF5E8 0%, #F4ECDA 100%)",
            padding: "14px 18px", textAlign: "left",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(160deg,#FF7A1F,#C7281D)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "#fff",
              boxShadow: "0 6px 12px rgba(199,40,29,.25)",
            }}>
              <Icon name="fire" size={14} color="#fff" />
              <span style={{ fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 12, marginTop: 1 }}>{USER.streak}j</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>
                Tu enchaînes depuis {USER.streak} jours
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-ink-2)", marginTop: 2 }}>
                Plus que {USER.nextPerkPts} pts avant un snack offert
              </div>
            </div>
            <Icon name="chevron" size={18} color="var(--mx-mute)" />
          </button>
        </div>
      </div>

      {/* stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "12px 18px 4px" }}>
        {[
          { k: "Snacks", v: PURCHASES.length, sub: "ce mois" },
          { k: "Dépensé", v: `${USER.monthSpend.toFixed(2).replace(".", ",")} €`, sub: "ce mois" },
          { k: "Économisé", v: `${USER.monthSaved.toFixed(2).replace(".", ",")} €`, sub: "via le club" },
        ].map((s, i) => (
          <div key={i} className="mx-card" style={{ padding: "10px 8px", textAlign: "center" }}>
            <div className="mx-eyebrow" style={{ color: "var(--mx-mute)" }}>{s.k}</div>
            <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16, color: "var(--mx-ink)", marginTop: 2 }}>{s.v}</div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Mes activités */}
      <SectionHeader title="Mes activités" />
      <div style={{ padding: "0 18px" }}>
        <div className="mx-card" style={{ overflow: "hidden" }}>
          {[
            { icon: "history", label: "Historique d'achats", sub: `${PURCHASES.length} achats`, onClick: onOpenHistory },
            { icon: "vote",    label: "Mes votes",           sub: `${VOTES.filter(v => v.voted).length} actifs`, onClick: onOpenVote },
            { icon: "ticket",  label: "Mes signalements",    sub: `${PAST_TICKETS.filter(t => t.color === "warn").length} en cours`, onClick: onOpenTicket },
            { icon: "trophy",  label: "Mon club Maxx",       sub: `${tier.label} · ${USER.streak}j de streak`, onClick: onOpenLoyalty },
          ].map((it, i) => (
            <button key={i} onClick={it.onClick} className="mx-press" style={{
              appearance: "none", cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px",
              background: "transparent", textAlign: "left",
              borderTop: i ? "1px solid var(--mx-line-2)" : "none",
              color: "var(--mx-ink)",
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,90,20,.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon name={it.icon} size={18} color="var(--mx-orange)" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14 }}>{it.label}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>{it.sub}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--mx-mute)" />
            </button>
          ))}
        </div>
      </div>

      {/* Favorite snacks */}
      <SectionHeader title="Snacks favoris" action="Tout voir" />
      <div style={{ display: "flex", gap: 12, padding: "0 18px 4px", overflowX: "auto" }} className="mx-noscroll">
        {favs.map(p => (
          <button key={p.id} onClick={() => onSelectProduct(p)} className="mx-press" style={{
            appearance: "none", cursor: "pointer", flexShrink: 0,
            width: 144, border: "1px solid var(--mx-line)", borderRadius: 16,
            background: "var(--mx-card)", overflow: "hidden", textAlign: "left",
            boxShadow: "0 4px 14px rgba(0,0,0,.05)",
          }}>
            <div style={{
              height: 110,
              background: `linear-gradient(160deg, ${shadeHex(p.color, 25)}, ${shadeHex(p.color, -20)})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <SnackPackage kind={p.kind} w={84} h={100} color={p.color} accent={p.accent}
                            label={shortLabel(p.name)} flavor={p.flavor.split(" ")[0].toUpperCase()} />
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <Icon name="heart-fill" size={16} color="#fff" />
              </div>
            </div>
            <div style={{ padding: "8px 10px 10px" }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12, color: "var(--mx-ink)",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2, whiteSpace: "nowrap" }}>
                {p.price.toFixed(2)} €
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* saved machines */}
      <SectionHeader title="Mes distributeurs" action="Gérer" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {saved.map(m => (
          <MachineRow key={m.id} m={m} active={currentMachineId === m.id} onClick={() => onSelectMachine(m)} />
        ))}
      </div>

      {/* preferences */}
      <SectionHeader title="Préférences" />
      <div style={{ padding: "0 18px 130px" }}>
        <div className="mx-card" style={{ overflow: "hidden" }}>
          {[
            { icon: "bell",     label: "Notifications",            sub: "Restock, nouveautés, streak", onClick: onOpenNotifs },
            { icon: "leaf",     label: "Préférences alimentaires", sub: "Sans gluten, végan…" },
            { icon: "credit",   label: "Moyens de paiement",       sub: "Apple Pay · Visa •• 4242" },
            { icon: "lang",     label: "Langue",                   sub: "Français" },
            { icon: "info",     label: "À propos",                 sub: "Version 1.4.0" },
          ].map((it, i) => (
            <button key={i} onClick={it.onClick} className="mx-press" style={{
              appearance: "none", cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px",
              background: "transparent", textAlign: "left",
              borderTop: i ? "1px solid var(--mx-line-2)" : "none",
              color: "var(--mx-ink)",
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,90,20,.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon name={it.icon} size={18} color="var(--mx-orange)" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14 }}>{it.label}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>{it.sub}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--mx-mute)" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── utilities ────────────────────────────────────────────── */
function shadeHex(hex, pct) {
  const m = hex.replace("#", "").match(/.{2}/g).map(h => parseInt(h, 16));
  const t = pct >= 0 ? 255 : 0;
  const p = Math.abs(pct) / 100;
  const out = m.map(c => Math.round(c + (t - c) * p));
  return "#" + out.map(c => c.toString(16).padStart(2, "0")).join("");
}
function shortLabel(name) {
  return name.replace(/^Maxx\s+/i, "").toUpperCase().slice(0, 8);
}

Object.assign(window, {
  AppHeader, HomeScreen, SnacksScreen, ProductDetail, ScanModal,
  MapScreen, ProfileScreen, MachineRow, ProductCard,
  LoyaltyTeaser, VoteTeaser,
  shadeHex, shortLabel, fmtDist,
});
