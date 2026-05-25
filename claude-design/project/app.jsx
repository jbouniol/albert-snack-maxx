// app.jsx — Snack Maxx root app (v3)

const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": "clean",
  "background": "cream",
  "showTabBar": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [tab, setTab] = useStateA("home");
  const [machine, setMachine] = useStateA(MACHINES[0]);
  const [product, setProduct] = useStateA(null);     // for ProductDetail overlay
  const [scanOpen, setScanOpen] = useStateA(false);

  // Overlay state — only one at a time
  const [overlay, setOverlay] = useStateA(null);     // "loyalty" | "history" | "vote" | "ticket" | "notifs"
  const [payTarget, setPayTarget] = useStateA(null); // { product, machine }

  const bgClass =
    t.background === "grid"      ? "mx-bg-grid"      :
    t.background === "blueprint" ? "mx-bg-blueprint" :
    t.background === "speed"     ? "mx-bg-speed"     :
    t.background === "solid"     ? "mx-bg-solid"     :
                                   "mx-bg-cream";

  const openPay = (p, m = machine) => setPayTarget({ product: p, machine: m });
  const closePay = () => setPayTarget(null);

  const reorderProduct = (p) => {
    // shortcut: open the pay sheet directly with the same machine
    setProduct(null);
    openPay(p, machine);
  };

  let Screen = null;
  if (tab === "home")    Screen = <HomeScreen
                                    machine={machine}
                                    onScan={() => setScanOpen(true)}
                                    onSelectProduct={setProduct}
                                    onGoSnacks={() => setTab("snacks")}
                                    onGoMap={() => setTab("map")}
                                    onOpenHistory={() => setOverlay("history")}
                                    onOpenLoyalty={() => setOverlay("loyalty")}
                                    onOpenVote={() => setOverlay("vote")}
                                    onOpenTicket={() => setOverlay("ticket")}
                                    onReorder={reorderProduct} />;
  if (tab === "snacks")  Screen = <SnacksScreen machine={machine} onSelectProduct={setProduct} />;
  if (tab === "map")     Screen = <MapScreen currentId={machine.id} onSelectMachine={(m) => { setMachine(m); setTab("home"); }} />;
  if (tab === "profile") Screen = <ProfileScreen
                                    onSelectProduct={setProduct}
                                    onSelectMachine={(m) => { setMachine(m); setTab("home"); }}
                                    currentMachineId={machine.id}
                                    onOpenLoyalty={() => setOverlay("loyalty")}
                                    onOpenHistory={() => setOverlay("history")}
                                    onOpenTicket={() => setOverlay("ticket")}
                                    onOpenNotifs={() => setOverlay("notifs")}
                                    onOpenVote={() => setOverlay("vote")} />;

  return (
    <div data-screen-label="00 Snack Maxx App">
      <div data-intensity={t.intensity}>
        <IOSDevice width={402} height={874} dark={t.intensity === "maxx"}>
          <div
            data-screen-label={`Screen — ${tab.toUpperCase()}`}
            className={`${bgClass} mx-noscroll`}
            style={{
              position: "absolute", inset: 0,
              overflowY: "auto",
              color: "var(--mx-ink)",
              paddingBottom: 90,
            }}>
            {Screen}
          </div>

          {product && (
            <ProductDetail product={product} machine={machine}
                           onClose={() => setProduct(null)}
                           onPay={(p, m) => { setProduct(null); openPay(p, m); }} />
          )}

          {/* Full-screen overlays */}
          {overlay === "loyalty"  && <LoyaltyScreen onClose={() => setOverlay(null)} />}
          {overlay === "history"  && <HistoryScreen
                                       onClose={() => setOverlay(null)}
                                       onSelectProduct={setProduct}
                                       onReorder={reorderProduct} />}
          {overlay === "vote"     && <VoteScreen onClose={() => setOverlay(null)} machine={machine} />}
          {overlay === "ticket"   && <TicketScreen onClose={() => setOverlay(null)} machine={machine} />}
          {overlay === "notifs"   && <NotifsScreen onClose={() => setOverlay(null)} />}

          <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} />

          <PayConfirm
            open={!!payTarget}
            product={payTarget?.product}
            machine={payTarget?.machine}
            onClose={closePay} />

          {t.showTabBar && !payTarget && (
            <TabBar active={tab} onChange={(id) => {
              if (id === "scan") { setScanOpen(true); return; }
              setOverlay(null);
              setProduct(null);
              setTab(id);
            }} />
          )}
        </IOSDevice>
      </div>

      <TweaksPanel title="Snack Maxx — Tweaks">
        <TweakSection label="Intensité de la marque" />
        <TweakRadio
          label="Ambiance"
          value={t.intensity}
          options={[
            { value: "clean", label: "Clean" },
            { value: "maxx",  label: "MAXX" },
          ]}
          onChange={(v) => setTweak("intensity", v)} />

        <TweakSection label="Fond d'écran" />
        <TweakSelect
          label="Style"
          value={t.background}
          options={[
            { value: "cream",     label: "Crème (défaut)" },
            { value: "grid",      label: "Grille subtile" },
            { value: "blueprint", label: "Blueprint bleu" },
            { value: "speed",     label: "Speed lines" },
            { value: "solid",     label: "Uni" },
          ]}
          onChange={(v) => setTweak("background", v)} />

        <TweakSection label="Affichage" />
        <TweakToggle
          label="Tab bar visible"
          value={t.showTabBar}
          onChange={(v) => setTweak("showTabBar", v)} />

        <TweakSection label="Écrans" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <TweakButton label="Accueil"        onClick={() => { setOverlay(null); setProduct(null); setPayTarget(null); setScanOpen(false); setTab("home"); }} />
          <TweakButton label="Snacks"         onClick={() => { setOverlay(null); setProduct(null); setPayTarget(null); setScanOpen(false); setTab("snacks"); }} />
          <TweakButton label="Carte"          onClick={() => { setOverlay(null); setProduct(null); setPayTarget(null); setScanOpen(false); setTab("map"); }} />
          <TweakButton label="Profil"         onClick={() => { setOverlay(null); setProduct(null); setPayTarget(null); setScanOpen(false); setTab("profile"); }} />
        </div>

        <TweakSection label="Flux & overlays" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <TweakButton label="Détail produit" onClick={() => setProduct(PRODUCTS[0])} />
          <TweakButton label="QR scan"        onClick={() => setScanOpen(true)} />
          <TweakButton label="Payer"          onClick={() => openPay(PRODUCTS[0], machine)} />
          <TweakButton label="Club Maxx"      onClick={() => setOverlay("loyalty")} />
          <TweakButton label="Historique"     onClick={() => setOverlay("history")} />
          <TweakButton label="Vote"           onClick={() => setOverlay("vote")} />
          <TweakButton label="Signalement"    onClick={() => setOverlay("ticket")} />
          <TweakButton label="Notifications"  onClick={() => setOverlay("notifs")} />
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
