// screens-extra.jsx — Full-screen overlays: Loyalty, History, Vote, Tickets, PayConfirm

const { useState: useStateX, useEffect: useEffectX, useMemo: useMemoX } = React;

/* ── Generic full-screen overlay with header back/close ──── */
function FullScreen({ children, onClose, bg = "var(--mx-paper)" }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 80,
      background: bg,
      overflowY: "auto",
      animation: "mx-slidein-x .25s ease-out",
    }} className="mx-noscroll">
      <style>{`@keyframes mx-slidein-x { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>
      {children}
    </div>
  );
}
function TopBar({ title, onClose, trailing }) {
  return (
    <div style={{ padding: "54px 14px 8px", display: "flex", alignItems: "center", gap: 8 }}>
      <button onClick={onClose} className="mx-press" style={{
        appearance: "none", cursor: "pointer", border: "1px solid var(--mx-line)",
        background: "var(--mx-card)", width: 40, height: 40, borderRadius: 999,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon name="back" size={20} color="var(--mx-ink)" />
      </button>
      <span className="mx-head" style={{ flex: 1, fontSize: 22, color: "var(--mx-ink)" }}>{title}</span>
      {trailing}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   M4 — LOYALTY HUB
   ═══════════════════════════════════════════════════════════ */
function LoyaltyScreen({ onClose }) {
  const tier = LOYALTY_TIERS.find(t => t.id === USER.tier);
  const tierIdx = LOYALTY_TIERS.findIndex(t => t.id === USER.tier);
  const next = LOYALTY_TIERS[tierIdx + 1] || tier;

  return (
    <FullScreen onClose={onClose}>
      <TopBar title="Mon club Maxx" onClose={onClose} />

      {/* Hero loyalty card */}
      <div style={{ padding: "8px 18px 0" }}>
        <div style={{
          position: "relative",
          borderRadius: 24, padding: 20,
          background: "linear-gradient(160deg,#1A1410 0%, #2A211C 100%)",
          color: "#fff", overflow: "hidden",
          boxShadow: "0 14px 30px rgba(0,0,0,.32)",
        }}>
          <svg viewBox="0 0 400 220" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .35,
          }}>
            <path d="M-20 130 Q200 50 440 110" stroke="rgba(255,179,0,.45)" strokeWidth="6" fill="none"/>
            <path d="M-20 160 Q200 90 440 140" stroke="rgba(255,122,31,.35)" strokeWidth="3" fill="none"/>
            <circle cx="350" cy="50" r="40" fill="rgba(255,179,0,.08)"/>
          </svg>

          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                          background: tier.bg, color: tier.color,
                          padding: "4px 12px", borderRadius: 999,
                          fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12,
                          textTransform: "uppercase", letterSpacing: ".08em" }}>
              <Icon name="trophy" size={13} color={tier.color} />
              Niveau {tier.label}
            </div>
            <div style={{ marginTop: 14 }}>
              <span className="mx-head" style={{ fontSize: 32, color: "#fff" }}>
                {USER.firstName}
              </span>
            </div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,241,214,.75)", marginTop: 4 }}>
              {USER.monthSpend.toFixed(2).replace(".", ",")} € dépensés ce mois ·{" "}
              <b style={{ color: "#FFB300" }}>{USER.monthSaved.toFixed(2).replace(".", ",")} € économisés</b>
            </div>

            {/* progress */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,241,214,.7)" }}>
                  Vers {next.label}
                </span>
                <span style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, color: "#FFB300" }}>
                  {USER.nextPerkPts} pts restants
                </span>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: "62%",
                  background: "linear-gradient(90deg,#FFB300,#FF7A1F,#FF3D14)",
                  borderRadius: 999,
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak */}
      <SectionHeader title="Ton streak" />
      <div style={{ padding: "0 18px 0" }}>
        <div className="mx-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: "linear-gradient(160deg,#FF7A1F,#C7281D)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: "#fff", flexShrink: 0,
            boxShadow: "0 6px 14px rgba(199,40,29,.3)",
          }}>
            <Icon name="fire" size={22} color="#fff" />
            <span style={{ fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 14 }}>{USER.streak}j</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>
              {USER.streak} jours d'affilée
            </div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
              Record : {USER.bestStreak} jours · 3 jours pour débloquer un snack offert
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              {[1, 2, 3, 4, 5, 6, 7].map(d => {
                const done = d <= USER.streak;
                const isPerk = d === 7;
                return (
                  <div key={d} style={{
                    flex: 1, height: 24, borderRadius: 6,
                    background: done ? "#FF7A1F" : "var(--mx-paper-2)",
                    border: isPerk ? "1.5px solid #FFB300" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 9,
                    color: done ? "#fff" : "var(--mx-mute)",
                  }}>
                    {isPerk ? <Icon name="gift" size={11} color={done ? "#fff" : "#FFB300"} /> : d}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tiers list */}
      <SectionHeader title="Les niveaux" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {LOYALTY_TIERS.map((t, i) => {
          const isCurrent = t.id === USER.tier;
          const isLocked = i > tierIdx;
          return (
            <div key={t.id} className="mx-card" style={{
              padding: 14,
              border: isCurrent ? "1.5px solid var(--mx-orange)" : "1px solid var(--mx-line)",
              opacity: isLocked ? .65 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: t.bg, color: t.color,
                  padding: "4px 10px", borderRadius: 999,
                  fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 11,
                  textTransform: "uppercase", letterSpacing: ".06em",
                }}>
                  <Icon name="trophy" size={11} color={t.color} />
                  {t.label}
                </span>
                {isCurrent && (
                  <span className="mx-pill mx-pill--ok" style={{ padding: "2px 8px", fontSize: 10 }}>Actuel</span>
                )}
                {isLocked && (
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)" }}>
                    {t.id === "gold" ? "à 500 pts" : "à 200 pts"}
                  </span>
                )}
              </div>
              <ul style={{
                margin: "10px 0 0", padding: 0, listStyle: "none",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                {t.perks.map((p, j) => (
                  <li key={j} style={{
                    fontFamily: "var(--f-body)", fontSize: 13, color: "var(--mx-ink-2)",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <Icon name="check" size={14} color={t.color} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "16px 18px 130px" }}>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", textAlign: "center", lineHeight: 1.5 }}>
          1 € dépensé = 10 pts · pts remis à zéro chaque mois.<br />
          Le club Snack Maxx, c'est gratuit, sans engagement.
        </div>
      </div>
    </FullScreen>
  );
}

/* ═══════════════════════════════════════════════════════════
   M8 — HISTORY
   ═══════════════════════════════════════════════════════════ */
function HistoryScreen({ onClose, onSelectProduct, onReorder }) {
  const monthSpend = PURCHASES.reduce((a, h) => a + h.price, 0);

  return (
    <FullScreen onClose={onClose}>
      <TopBar title="Historique" onClose={onClose} />

      <div style={{ padding: "0 18px" }}>
        <div className="mx-card" style={{ padding: 16 }}>
          <div className="mx-eyebrow" style={{ color: "var(--mx-mute)" }}>Ce mois</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 28, color: "var(--mx-ink)" }}>
              {monthSpend.toFixed(2).replace(".", ",")} €
            </span>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)" }}>
              · {PURCHASES.length} snacks
            </span>
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "#0F6E36", marginTop: 4, fontWeight: 600 }}>
            – {USER.monthSaved.toFixed(2).replace(".", ",")} € grâce au club
          </div>
        </div>
      </div>

      <SectionHeader title="Toutes mes commandes" />
      <div style={{ padding: "0 18px 130px", display: "flex", flexDirection: "column", gap: 10 }}>
        {PURCHASES.map(h => {
          const p = PRODUCTS.find(pp => pp.id === h.productId);
          const m = MACHINES.find(mm => mm.id === h.machineId);
          if (!p) return null;
          return (
            <div key={h.id} className="mx-card" style={{ padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => onSelectProduct(p)} style={{
                appearance: "none", cursor: "pointer", border: "none", padding: 0,
                background: `linear-gradient(160deg, ${shadeHex(p.color, 25)}, ${shadeHex(p.color, -15)})`,
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SnackPackage kind={p.kind} w={36} h={46} color={p.color} accent={p.accent}
                              label={shortLabel(p.name)} flavor="" />
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                  {h.date} · {m ? m.name.split(" — ")[0] : ""}
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <span style={{
                    fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, color: "var(--mx-ink)",
                  }}>{h.price.toFixed(2).replace(".", ",")} €</span>
                  <span style={{
                    fontFamily: "var(--f-body)", fontSize: 10, color: "var(--mx-mute)",
                  }}>· {h.paid}</span>
                </div>
              </div>
              <button onClick={() => onReorder(p)} className="mx-press" style={{
                appearance: "none", cursor: "pointer",
                background: "var(--mx-ink)", color: "#fff",
                border: "none", borderRadius: 10,
                padding: "8px 12px",
                fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12,
                display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0,
              }}>
                <Icon name="bolt" size={12} color="#fff" /> Reprendre
              </button>
            </div>
          );
        })}
      </div>
    </FullScreen>
  );
}

/* ═══════════════════════════════════════════════════════════
   M3 — VOTING
   ═══════════════════════════════════════════════════════════ */
function VoteScreen({ onClose, machine }) {
  const [votes, setVotes] = useStateX(() => VOTES.map(v => ({ ...v })));
  const [tab, setTab] = useStateX("active"); // active | fulfilled
  const [suggestOpen, setSuggestOpen] = useStateX(false);
  const [suggest, setSuggest] = useStateX("");

  const sorted = useMemoX(() =>
    [...votes].sort((a, b) => b.votes - a.votes), [votes]);

  const toggle = (id) => {
    setVotes(vs => vs.map(v => v.id === id
      ? { ...v, voted: !v.voted, votes: v.voted ? v.votes - 1 : v.votes + 1 }
      : v));
  };

  return (
    <FullScreen onClose={onClose}>
      <TopBar title="Tu décides" onClose={onClose} />

      <div style={{ padding: "0 18px" }}>
        <div style={{
          position: "relative", borderRadius: 22, padding: 18,
          background: "linear-gradient(160deg,#2BB4E8,#1376B8)",
          color: "#fff", overflow: "hidden",
          boxShadow: "0 12px 24px rgba(19,118,184,.3)",
        }}>
          <svg viewBox="0 0 400 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .25 }}>
            <path d="M-40 130 Q200 30 440 110" stroke="#fff" strokeWidth="6" fill="none"/>
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                          background: "rgba(255,255,255,.18)",
                          padding: "4px 10px", borderRadius: 999,
                          fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 11,
                          textTransform: "uppercase", letterSpacing: ".08em" }}>
              <Icon name="pin" size={11} color="#fff" />
              {machine.name.split(" — ")[0]}
            </div>
            <div style={{ marginTop: 10 }}>
              <span className="mx-head" style={{ fontSize: 24, color: "#fff" }}>
                Quel snack veux-tu voir ici ?
              </span>
            </div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,.85)", marginTop: 6, lineHeight: 1.4 }}>
              Vote pour ce que tu veux dans ce distributeur. Le top 3 du mois rentre direct dans la sélection.
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "14px 18px 8px", display: "flex", gap: 8 }}>
        {[
          { id: "active",    label: `Demandes (${votes.length})` },
          { id: "fulfilled", label: `Déjà ajoutés (${VOTE_FULFILLED.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="mx-press" style={{
            appearance: "none", cursor: "pointer", flex: 1,
            border: "none", borderRadius: 12,
            padding: "10px 12px",
            background: tab === t.id ? "var(--mx-ink)" : "var(--mx-card)",
            color: tab === t.id ? "#fff" : "var(--mx-ink-2)",
            fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13,
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "active" ? (
        <div style={{ padding: "4px 18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.map((v, i) => (
            <div key={v.id} className="mx-card" style={{
              padding: 14, display: "flex", alignItems: "center", gap: 12,
              border: v.voted ? "1.5px solid var(--mx-orange)" : "1px solid var(--mx-line)",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999,
                background: i < 3 ? "var(--mx-ink)" : "var(--mx-paper-2)",
                color: i < 3 ? "#fff" : "var(--mx-ink-2)",
                fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {v.name}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                  {v.brand} · <span style={{ color: "#0F6E36", fontWeight: 700 }}>{v.trend} cette semaine</span>
                </div>
              </div>
              <button onClick={() => toggle(v.id)} className="mx-press" style={{
                appearance: "none", cursor: "pointer",
                background: v.voted ? "var(--mx-orange)" : "var(--mx-card)",
                color: v.voted ? "#fff" : "var(--mx-ink)",
                border: v.voted ? "none" : "1px solid var(--mx-line)",
                borderRadius: 999, padding: "8px 14px",
                fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13,
                display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0,
                minWidth: 64, justifyContent: "center",
              }}>
                {v.voted ? <Icon name="check" size={13} color="#fff" /> : <Icon name="plus" size={13} color="var(--mx-ink)" />}
                {v.votes}
              </button>
            </div>
          ))}

          {/* Suggest new */}
          <div className="mx-card" style={{ padding: 14 }}>
            {!suggestOpen ? (
              <button onClick={() => setSuggestOpen(true)} className="mx-press" style={{
                appearance: "none", cursor: "pointer", width: "100%",
                border: "1.5px dashed var(--mx-line)",
                background: "transparent", color: "var(--mx-ink-2)",
                borderRadius: 12, padding: "12px",
                fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <Icon name="plus" size={14} color="var(--mx-ink-2)" />
                Suggérer un nouveau snack
              </button>
            ) : (
              <div>
                <div className="mx-eyebrow" style={{ color: "var(--mx-orange)" }}>Nouveau snack</div>
                <input
                  value={suggest}
                  onChange={(e) => setSuggest(e.target.value)}
                  placeholder="Ex: KitKat Cookies & Cream"
                  autoFocus
                  style={{
                    width: "100%", marginTop: 8,
                    background: "var(--mx-paper-2)", border: "1px solid var(--mx-line)",
                    borderRadius: 10, padding: "10px 12px",
                    fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-ink)",
                    outline: "none",
                  }} />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => { setSuggestOpen(false); setSuggest(""); }} className="mx-press" style={{
                    appearance: "none", cursor: "pointer", flex: 1,
                    background: "transparent", border: "1px solid var(--mx-line)",
                    color: "var(--mx-ink)", borderRadius: 10, padding: "10px 12px",
                    fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13,
                  }}>Annuler</button>
                  <button onClick={() => { setSuggestOpen(false); setSuggest(""); }} className="mx-press" style={{
                    appearance: "none", cursor: "pointer", flex: 1.4,
                    background: "var(--mx-orange)", border: "none",
                    color: "#fff", borderRadius: 10, padding: "10px 12px",
                    fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13,
                  }}>Soumettre</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", textAlign: "center", padding: "8px 20px 100px", lineHeight: 1.5 }}>
            Tes votes sont anonymes. Vote x2 si tu es <b>Gold</b>.
          </div>
        </div>
      ) : (
        <div style={{ padding: "4px 18px 130px", display: "flex", flexDirection: "column", gap: 10 }}>
          {VOTE_FULFILLED.map(f => (
            <div key={f.id} className="mx-card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                width: 40, height: 40, borderRadius: 12,
                background: "rgba(15,110,54,.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon name="check" size={20} color="#0F6E36" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>
                  {f.name}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                  Ajouté {f.date} · {f.machine}
                </div>
              </div>
              <span className="mx-pill mx-pill--ok" style={{ flexShrink: 0 }}>En rayon</span>
            </div>
          ))}
        </div>
      )}
    </FullScreen>
  );
}

/* ═══════════════════════════════════════════════════════════
   M5 — TICKET / FEEDBACK
   ═══════════════════════════════════════════════════════════ */
function TicketScreen({ onClose, machine, onSubmitted }) {
  const [step, setStep] = useStateX("type"); // type | detail | success
  const [type, setType] = useStateX(null);
  const [refund, setRefund] = useStateX(true);
  const [notes, setNotes] = useStateX("");

  return (
    <FullScreen onClose={onClose}>
      <TopBar title="Signaler un problème" onClose={onClose} />

      {step === "type" && (
        <div style={{ padding: "0 18px" }}>
          {/* Machine context */}
          <div className="mx-card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,90,20,.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="pin" size={18} color="var(--mx-orange)" />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13, color: "var(--mx-ink)" }}>
                {machine.name}
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                Détecté automatiquement
              </div>
            </div>
            <button style={{
              appearance: "none", cursor: "pointer",
              background: "transparent", border: "none",
              color: "var(--mx-orange)",
              fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 12,
            }}>Changer</button>
          </div>

          <SectionHeader title="Quel est le problème ?" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 0 12px" }}>
            {TICKET_TYPES.map(t => (
              <button key={t.id} onClick={() => { setType(t); setStep("detail"); }} className="mx-press" style={{
                appearance: "none", cursor: "pointer", textAlign: "left",
                border: "1px solid var(--mx-line)",
                background: "var(--mx-card)",
                borderRadius: 14, padding: 14,
                display: "flex", flexDirection: "column", gap: 8,
                color: "var(--mx-ink)",
              }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(199,40,29,.10)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={t.icon} size={18} color="#C7281D" />
                </span>
                <span style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 12, color: "var(--mx-ink)" }}>{t.label}</span>
              </button>
            ))}
          </div>

          <SectionHeader title="Mes signalements" />
          <div style={{ padding: "0 0 130px", display: "flex", flexDirection: "column", gap: 8 }}>
            {PAST_TICKETS.map(t => (
              <div key={t.id} className="mx-card" style={{ padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: t.color === "ok" ? "rgba(15,110,54,.12)" : "rgba(255,179,0,.18)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon name={t.color === "ok" ? "check" : "clock"} size={18}
                        color={t.color === "ok" ? "#0F6E36" : "#8a6300"} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13, color: "var(--mx-ink)" }}>
                    {t.type}
                  </div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                    {t.date} · {t.machine}
                  </div>
                </div>
                <span className={`mx-pill ${t.color === "ok" ? "mx-pill--ok" : "mx-pill--warn"}`} style={{ flexShrink: 0 }}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "detail" && type && (
        <div style={{ padding: "0 18px 130px" }}>
          <div className="mx-card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(199,40,29,.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name={type.icon} size={20} color="#C7281D" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, color: "var(--mx-ink)" }}>{type.label}</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                {machine.name}
              </div>
            </div>
          </div>

          <SectionHeader title="Détails (optionnel)" />
          <div style={{ padding: "0 0" }}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Décris ce qui s'est passé en quelques mots…"
              rows={4}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "var(--mx-card)", border: "1px solid var(--mx-line)",
                borderRadius: 14, padding: 14,
                fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-ink)",
                outline: "none", resize: "vertical",
              }} />

            <button style={{
              appearance: "none", cursor: "pointer", marginTop: 10,
              border: "1px dashed var(--mx-line)", borderRadius: 12,
              background: "transparent", color: "var(--mx-ink-2)",
              padding: "10px 14px", width: "100%",
              fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Icon name="camera" size={16} color="var(--mx-ink-2)" />
              Ajouter une photo
            </button>
          </div>

          <SectionHeader title="Demander un remboursement" />
          <div className="mx-card" style={{
            padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13, color: "var(--mx-ink)" }}>
                Remboursement automatique
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                Sur ton moyen de paiement (Apple Pay)
              </div>
            </div>
            <button onClick={() => setRefund(!refund)} style={{
              appearance: "none", cursor: "pointer", border: "none", padding: 0,
              width: 44, height: 26, borderRadius: 999,
              background: refund ? "var(--mx-orange)" : "var(--mx-paper-2)",
              position: "relative", flexShrink: 0,
              transition: "background .2s",
            }}>
              <span style={{
                position: "absolute", top: 2, left: refund ? 20 : 2,
                width: 22, height: 22, borderRadius: 999, background: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                transition: "left .2s",
              }} />
            </button>
          </div>

          <div style={{ padding: "20px 0 0" }}>
            <MaxxButton variant="primary" full size="lg" onClick={() => setStep("success")}
                        icon={<Icon name="check" size={20} color="#fff" />}>
              Envoyer le signalement
            </MaxxButton>
          </div>
        </div>
      )}

      {step === "success" && (
        <div style={{ padding: "30px 18px 130px", textAlign: "center" }}>
          <div style={{
            width: 96, height: 96, borderRadius: 999, margin: "30px auto 20px",
            background: "rgba(15,110,54,.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="check" size={48} color="#0F6E36" />
          </div>
          <span className="mx-head" style={{ fontSize: 28, color: "var(--mx-ink)" }}>Signalement envoyé</span>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-ink-2)", marginTop: 8, lineHeight: 1.5, maxWidth: 300, margin: "8px auto 0" }}>
            On regarde ça tout de suite. Tu seras notifié dès que l'équipe répond.
          </div>
          {refund && (
            <div className="mx-card" style={{ marginTop: 24, padding: 14, textAlign: "left",
                                              display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(15,110,54,.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="credit" size={18} color="#0F6E36" />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13, color: "var(--mx-ink)" }}>Remboursement demandé</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>
                  Sous 48h après vérification
                </div>
              </div>
            </div>
          )}
          <div style={{ marginTop: 24 }}>
            <MaxxButton variant="dark" full size="md" onClick={onClose}>
              Fermer
            </MaxxButton>
          </div>
        </div>
      )}
    </FullScreen>
  );
}

/* ═══════════════════════════════════════════════════════════
   M1 — PAY CONFIRMATION SHEET
   ═══════════════════════════════════════════════════════════ */
function PayConfirm({ open, product, machine, onClose }) {
  const [phase, setPhase] = useStateX("confirm"); // confirm | auth | success
  useEffectX(() => {
    if (!open) { setPhase("confirm"); }
  }, [open]);

  if (!open || !product) return null;

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 95,
      background: "rgba(0,0,0,.55)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      animation: "mx-fadein-pay .2s ease",
    }} onClick={onClose}>
      <style>{`@keyframes mx-fadein-pay { from { opacity: 0 } to { opacity: 1 } }
               @keyframes mx-rise { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>

      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", background: "#fff",
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: "20px 18px 28px",
        animation: "mx-rise .25s ease-out",
        boxShadow: "0 -10px 30px rgba(0,0,0,.35)",
        maxHeight: "92%", overflowY: "auto",
      }} className="mx-noscroll">
        <div style={{ width: 40, height: 4, borderRadius: 999, background: "rgba(0,0,0,.15)", margin: "0 auto 16px" }} />

        {phase === "confirm" && (
          <div>
            <div className="mx-eyebrow" style={{ color: "var(--mx-orange)" }}>Confirmation</div>
            <div style={{ marginTop: 4 }}>
              <span className="mx-head" style={{ fontSize: 24, color: "var(--mx-ink)" }}>Payer ton snack</span>
            </div>

            {/* item row */}
            <div className="mx-card" style={{
              marginTop: 14, padding: 12, display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(160deg, ${shadeHex(product.color, 25)}, ${shadeHex(product.color, -15)})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SnackPackage kind={product.kind} w={40} h={50} color={product.color} accent={product.accent}
                              label={shortLabel(product.name)} flavor="" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, color: "var(--mx-ink)" }}>{product.name}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--mx-mute)", marginTop: 2 }}>
                  Slot {product.slot} · {machine.name.split(" — ")[0]}
                </div>
              </div>
              <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 18, color: "var(--mx-ink)", whiteSpace: "nowrap" }}>
                {product.price.toFixed(2)} €
              </span>
            </div>

            {/* totals */}
            <div style={{ marginTop: 10, padding: "12px 14px",
                          border: "1px solid var(--mx-line)", borderRadius: 14,
                          background: "var(--mx-paper-2)",
                          display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { k: "Snack",                 v: `${product.price.toFixed(2).replace(".", ",")} €` },
                { k: "Réduction Silver",      v: `– 0,10 €`, accent: "#0F6E36" },
                { k: "Points gagnés",         v: `+${Math.round(product.price * 10)} pts`, accent: "var(--mx-orange)" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between",
                                       fontFamily: "var(--f-body)", fontSize: 13,
                                       color: "var(--mx-ink-2)" }}>
                  <span>{r.k}</span>
                  <span style={{ color: r.accent || "var(--mx-ink)", fontWeight: 600 }}>{r.v}</span>
                </div>
              ))}
              <div style={{
                marginTop: 4, paddingTop: 8, borderTop: "1px solid var(--mx-line)",
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 15, color: "var(--mx-ink)" }}>Total</span>
                <span style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 18, color: "var(--mx-ink)" }}>
                  {(product.price - 0.10).toFixed(2).replace(".", ",")} €
                </span>
              </div>
            </div>

            {/* pay buttons */}
            <button onClick={() => setPhase("auth")} className="mx-press" style={{
              appearance: "none", cursor: "pointer", width: "100%", marginTop: 18,
              background: "#000", color: "#fff",
              border: "none", borderRadius: 16, height: 54,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 16,
              boxShadow: "0 8px 22px rgba(0,0,0,.32)",
            }}>
              <Icon name="apple" size={20} color="#fff" />
              Payer avec Apple Pay
            </button>
            <button className="mx-press" style={{
              appearance: "none", cursor: "pointer", width: "100%", marginTop: 8,
              background: "var(--mx-paper-2)", color: "var(--mx-ink)",
              border: "1px solid var(--mx-line)", borderRadius: 16, height: 50,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14,
            }}>
              <Icon name="credit" size={18} color="var(--mx-ink)" />
              Visa •• 4242
            </button>

            <div style={{ textAlign: "center", fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 12 }}>
              Transaction sécurisée · livraison instantanée à la machine
            </div>
          </div>
        )}

        {phase === "auth" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 96, height: 96, borderRadius: 24, margin: "0 auto 20px",
              background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
              animation: "mx-pulse 1.4s ease infinite",
              boxShadow: "0 0 0 6px rgba(0,0,0,.08)",
            }}>
              <Icon name="face" size={50} color="#fff" stroke={1.6} />
            </div>
            <style>{`@keyframes mx-pulse { 0%, 100% { box-shadow: 0 0 0 6px rgba(0,0,0,.08) } 50% { box-shadow: 0 0 0 12px rgba(0,0,0,.04) } }`}</style>
            <span className="mx-head" style={{ fontSize: 22, color: "var(--mx-ink)" }}>Regarde l'iPhone</span>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-mute)", marginTop: 6 }}>
              Authentification Face ID…
            </div>
            <div style={{ marginTop: 28 }}>
              <button onClick={() => setPhase("success")} className="mx-press" style={{
                appearance: "none", cursor: "pointer",
                background: "transparent", border: "1px solid var(--mx-line)",
                color: "var(--mx-ink)", borderRadius: 12, padding: "8px 14px",
                fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 12,
              }}>Simuler la validation</button>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div style={{ textAlign: "center", padding: "10px 0 0" }}>
            <div style={{
              width: 96, height: 96, borderRadius: 999, margin: "10px auto 20px",
              background: "rgba(15,110,54,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "mx-pop .3s ease-out",
            }}>
              <Icon name="check" size={48} color="#0F6E36" />
            </div>
            <style>{`@keyframes mx-pop { from { transform: scale(.6); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>
            <span className="mx-head" style={{ fontSize: 26, color: "var(--mx-ink)" }}>Payé !</span>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--mx-ink-2)", marginTop: 8, maxWidth: 280, margin: "8px auto 0" }}>
              Va chercher ton <b>{product.name}</b> sur le <b>slot {product.slot}</b>.
            </div>

            {/* slot ticket */}
            <div style={{
              marginTop: 22, padding: 16,
              background: "linear-gradient(160deg,#FF7A1F 0%, #C7281D 100%)",
              borderRadius: 18, color: "#fff",
              boxShadow: "0 12px 24px rgba(199,40,29,.3)",
              textAlign: "left",
            }}>
              <div className="mx-eyebrow" style={{ color: "#FFD23F" }}>Code de récupération</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
                {[..."A2-4F"].map((c, i) => (
                  <span key={i} style={{
                    fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: 36, color: "#fff",
                    textShadow: "0 3px 0 rgba(0,0,0,.25)", letterSpacing: ".02em",
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,241,214,.85)", marginTop: 6 }}>
                Distribué automatiquement dans 3 secondes — sinon, tape ce code sur l'écran de la machine.
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <MaxxButton variant="primary" full size="lg" onClick={onClose}
                          icon={<Icon name="check" size={20} color="#fff" />}>
                Récupéré, merci !
              </MaxxButton>
            </div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 10 }}>
              + {Math.round(product.price * 10)} pts ajoutés à ton compte
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   M6 — NOTIFICATIONS PREFERENCES
   ═══════════════════════════════════════════════════════════ */
function NotifsScreen({ onClose }) {
  const [prefs, setPrefs] = useStateX({
    restock: true, newProducts: true, votes: true,
    streak: true, drops: false, weekly: true,
  });
  const set = (k, v) => setPrefs(p => ({ ...p, [k]: v }));

  const groups = [
    { title: "Activité",  items: [
      { k: "restock",     l: "Restock d'un favori",          s: "Quand un snack que tu aimes revient en stock" },
      { k: "streak",      l: "Rappel de streak",             s: "Avant de perdre ta série" },
    ]},
    { title: "Découverte", items: [
      { k: "newProducts", l: "Nouveaux snacks",              s: "Drops, éditions limitées" },
      { k: "votes",       l: "Mes votes",                    s: "Quand un snack que tu as voté arrive" },
      { k: "drops",       l: "Flash deals",                  s: "Offres limitées (peut être bruyant)" },
    ]},
    { title: "Résumé",     items: [
      { k: "weekly",      l: "Bilan hebdomadaire",           s: "Combien tu as dépensé / économisé" },
    ]},
  ];

  return (
    <FullScreen onClose={onClose}>
      <TopBar title="Notifications" onClose={onClose} />
      <div style={{ padding: "0 18px 130px" }}>
        {groups.map(g => (
          <div key={g.title}>
            <SectionHeader title={g.title} />
            <div className="mx-card" style={{ overflow: "hidden" }}>
              {g.items.map((it, i) => (
                <div key={it.k} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px",
                  borderTop: i ? "1px solid var(--mx-line-2)" : "none",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14, color: "var(--mx-ink)" }}>{it.l}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--mx-mute)", marginTop: 2 }}>{it.s}</div>
                  </div>
                  <button onClick={() => set(it.k, !prefs[it.k])} style={{
                    appearance: "none", cursor: "pointer", border: "none", padding: 0,
                    width: 44, height: 26, borderRadius: 999,
                    background: prefs[it.k] ? "var(--mx-orange)" : "var(--mx-paper-2)",
                    position: "relative", flexShrink: 0,
                    transition: "background .2s",
                  }}>
                    <span style={{
                      position: "absolute", top: 2, left: prefs[it.k] ? 20 : 2,
                      width: 22, height: 22, borderRadius: 999, background: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                      transition: "left .2s",
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FullScreen>
  );
}

Object.assign(window, {
  FullScreen, TopBar,
  LoyaltyScreen, HistoryScreen, VoteScreen, TicketScreen, NotifsScreen,
  PayConfirm,
});
