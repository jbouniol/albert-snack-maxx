// ui.jsx — Snack Maxx UI primitives (v2, calmer)

const { useState, useEffect, useRef } = React;

/* ── Logo image (transparent PNG, sized by height) ────────── */
function Logo({ h = 36, style = {} }) {
  return (
    <img
      src="assets/snackmaxx-logo.png"
      alt="Snack Maxx"
      style={{ height: h, width: "auto", display: "block", ...style }}
    />
  );
}

/* ── Chrome wordmark — italic gradient text (limited use) ── */
function ChromeText({ children, variant = "orange", size = 56, skew = -8, style = {}, className = "" }) {
  const cls =
    variant === "blue"  ? "mx-chrome mx-chrome--blue"  :
                          "mx-chrome";
  return (
    <span
      className={`${cls} ${className}`}
      style={{
        fontSize: size, lineHeight: .95, transform: `skewX(${skew}deg)`,
        ...style,
      }}>
      {children}
    </span>
  );
}

/* Bold italic display head (no chrome) */
function MaxxHead({ children, size = 28, color, style = {}, skew = -6 }) {
  return (
    <span className="mx-head" style={{ fontSize: size, color, transform: `skewX(${skew}deg)`, ...style }}>
      {children}
    </span>
  );
}

/* ── Primary button — solid brand color, subtle depth ───── */
function MaxxButton({ children, icon, iconRight, onClick, variant = "primary", full = false, size = "lg", style = {} }) {
  const palettes = {
    primary:   { bg: "linear-gradient(180deg,#FF7A1F,#E63B0A)", color: "#fff",   border: "transparent", shadow: "0 8px 18px rgba(230,59,10,.30)" },
    blue:      { bg: "linear-gradient(180deg,#2BB4E8,#1376B8)", color: "#fff",   border: "transparent", shadow: "0 8px 18px rgba(19,118,184,.30)" },
    dark:      { bg: "#1A1410",                                color: "#fff",   border: "transparent", shadow: "0 6px 18px rgba(0,0,0,.22)" },
    ghost:     { bg: "transparent",                            color: "#1A1410", border: "1.5px solid rgba(26,20,16,.18)", shadow: "none" },
    cream:     { bg: "#FFF1D6",                                color: "#1A1410", border: "1.5px solid rgba(26,20,16,.10)", shadow: "0 6px 14px rgba(0,0,0,.06)" },
  };
  const p = palettes[variant];
  const sz = size === "sm"
    ? { pad: "8px 14px",  fs: 13, h: 38, radius: 12, gap: 6 }
    : size === "md"
    ? { pad: "10px 18px", fs: 14, h: 46, radius: 14, gap: 8 }
    : { pad: "14px 22px", fs: 15, h: 54, radius: 16, gap: 10 };

  return (
    <button
      onClick={onClick}
      className="mx-press"
      style={{
        appearance: "none", border: p.border, background: p.bg, color: p.color,
        fontFamily: "var(--f-body)", fontWeight: 700, letterSpacing: ".01em",
        fontSize: sz.fs, padding: sz.pad, height: sz.h,
        borderRadius: sz.radius, cursor: "pointer",
        boxShadow: p.shadow,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: sz.gap,
        width: full ? "100%" : "auto",
        ...style,
      }}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

/* ── Sparkle accent — subtle, used 1× per screen max ──────── */
function Sparkle({ size = 16, color = "#FFB300", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" fill={color} />
    </svg>
  );
}

/* ── Category chip — flat ─────────────────────────────────── */
function Chip({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="mx-press"
      style={{
        appearance: "none", cursor: "pointer", flexShrink: 0,
        border: active ? "none" : "1px solid var(--mx-line)",
        background: active ? "var(--mx-ink)" : "var(--mx-card)",
        color: active ? "#fff" : "var(--mx-ink)",
        fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13,
        padding: "9px 14px",
        borderRadius: 999,
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
}

/* ── Icon set ─────────────────────────────────────────────── */
function Icon({ name, size = 22, color = "currentColor", stroke = 2 }) {
  const s = { width: size, height: size, fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home":     return <svg viewBox="0 0 24 24" {...s}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>;
    case "snack":    return <svg viewBox="0 0 24 24" {...s}><path d="M7 4h10l-1 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L7 4z"/><path d="M10 9h4M10 13h4M10 17h3"/></svg>;
    case "scan":     return <svg viewBox="0 0 24 24" {...s}><path d="M4 8V5a1 1 0 0 1 1-1h3"/><path d="M20 8V5a1 1 0 0 0-1-1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 12h16"/></svg>;
    case "map":      return <svg viewBox="0 0 24 24" {...s}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v16M15 6v16"/></svg>;
    case "user":     return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>;
    case "pin":      return <svg viewBox="0 0 24 24" {...s}><path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>;
    case "bolt":     return <svg viewBox="0 0 24 24" {...s} fill={color} stroke="none"><polygon points="13,2 4,14 11,14 9,22 20,9 13,9"/></svg>;
    case "flame":    return <svg viewBox="0 0 24 24" {...s}><path d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4-1 3 2 4 3 2-1-3 0-6 0-8z"/></svg>;
    case "clock":    return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>;
    case "chevron":  return <svg viewBox="0 0 24 24" {...s}><path d="M9 6l6 6-6 6"/></svg>;
    case "back":     return <svg viewBox="0 0 24 24" {...s}><path d="M15 6l-6 6 6 6"/></svg>;
    case "heart":    return <svg viewBox="0 0 24 24" {...s}><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>;
    case "heart-fill": return <svg viewBox="0 0 24 24" {...s} fill={color} stroke="none"><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>;
    case "star":     return <svg viewBox="0 0 24 24" {...s} fill={color}><polygon points="12,2 14.6,9 22,9.5 16.3,14.4 18.3,21.5 12,17.6 5.7,21.5 7.7,14.4 2,9.5 9.4,9"/></svg>;
    case "tag":      return <svg viewBox="0 0 24 24" {...s}><path d="M3 13V4a1 1 0 0 1 1-1h9l8 8-10 10z"/><circle cx="8" cy="8" r="1.5" fill={color} stroke="none"/></svg>;
    case "search":   return <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>;
    case "filter":   return <svg viewBox="0 0 24 24" {...s}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case "close":    return <svg viewBox="0 0 24 24" {...s}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "bell":     return <svg viewBox="0 0 24 24" {...s}><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2z"/><path d="M10 21h4"/></svg>;
    case "settings": return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "info":     return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8v.01"/></svg>;
    case "leaf":     return <svg viewBox="0 0 24 24" {...s}><path d="M21 3c-5 0-12 2-15 9-2 4-1 8 1 9 1-2 5-3 9-5 6-3 7-9 5-13z"/><path d="M3 21c1-4 5-7 9-9"/></svg>;
    case "qrcode":   return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v3h-3M14 21h3M21 17v4"/></svg>;
    case "sliders":  return <svg viewBox="0 0 24 24" {...s}><path d="M4 6h12M4 12h6M4 18h14"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="18" r="2"/></svg>;
    case "credit":   return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></svg>;
    case "lang":     return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg>;
    case "alert":    return <svg viewBox="0 0 24 24" {...s}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.01"/></svg>;
    case "package":  return <svg viewBox="0 0 24 24" {...s}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>;
    case "shuffle":  return <svg viewBox="0 0 24 24" {...s}><path d="M16 3h5v5M21 3l-7 7M4 4l16 16M16 21h5v-5M9 14l-5 5"/></svg>;
    case "gift":     return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 13h18M12 8v13M8 8c-2 0-3-1-3-3s2-3 3-3c2 0 4 3 4 6M16 8c2 0 3-1 3-3s-2-3-3-3c-2 0-4 3-4 6"/></svg>;
    case "trophy":   return <svg viewBox="0 0 24 24" {...s}><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 15h6l1 6H8l1-6z"/></svg>;
    case "fire":     return <svg viewBox="0 0 24 24" {...s} fill={color} stroke="none"><path d="M12 2c1 4 6 6 6 11a6 6 0 1 1-12 0c0-3 2-4 3-6 0 3 3 3 3 0 0-2-1-3 0-5z"/></svg>;
    case "plus":     return <svg viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14"/></svg>;
    case "check":    return <svg viewBox="0 0 24 24" {...s}><path d="M5 13l4 4L19 7"/></svg>;
    case "apple":    return <svg viewBox="0 0 24 24" {...s} fill={color} stroke="none"><path d="M16.5 12.5c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2.1-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.5 1.4 11.2.9 1.3 2 2.8 3.5 2.8 1.4-.1 2-.9 3.7-.9 1.7 0 2.2.9 3.7.9 1.5 0 2.5-1.4 3.5-2.7 1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.4zM13.5 4.6c.8-.9 1.3-2.2 1.1-3.6-1.1.1-2.5.7-3.3 1.7-.7.8-1.4 2.2-1.2 3.5 1.3.1 2.6-.7 3.4-1.6z"/></svg>;
    case "google":   return <svg viewBox="0 0 24 24" fill="none"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-.9 2.4-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6C4.7 19.7 8.1 22 12 22z" fill="#34A853"/><path d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3C2.4 8.8 2 10.4 2 12s.4 3.2 1 4.5l3.4-2.6z" fill="#FBBC05"/><path d="M12 5.4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.4 14.6 1.5 12 1.5 8.1 1.5 4.7 3.8 3 7.5l3.4 2.6c.8-2.3 3-4.1 5.6-4.7z" fill="#EA4335"/></svg>;
    case "face":     return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v1M16 10v1M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></svg>;
    case "minus":    return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14"/></svg>;
    case "camera":   return <svg viewBox="0 0 24 24" {...s}><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/><circle cx="12" cy="13" r="4"/></svg>;
    case "history":  return <svg viewBox="0 0 24 24" {...s}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/></svg>;
    case "vote":     return <svg viewBox="0 0 24 24" {...s}><path d="M5 21h14M7 21V10l5-7 5 7v11"/><path d="M9 14l2 2 4-4"/></svg>;
    case "ticket":   return <svg viewBox="0 0 24 24" {...s}><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-2V8z"/><path d="M10 6v12" strokeDasharray="2 2"/></svg>;
    default: return null;
  }
}

/* ── Section header bar ───────────────────────────────────── */
function SectionHeader({ title, action, actionIcon, onAction }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 18px 10px",
    }}>
      <span className="mx-head" style={{ fontSize: 20, color: "var(--mx-ink)", transform: "skewX(-6deg)" }}>{title}</span>
      {action && (
        <button onClick={onAction} style={{
          appearance: "none", cursor: "pointer", border: "none", background: "transparent",
          color: "var(--mx-orange)", fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13,
          display: "inline-flex", alignItems: "center", gap: 4,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {action}
          {actionIcon !== false && <Icon name="chevron" size={16} color="currentColor" />}
        </button>
      )}
    </div>
  );
}

/* ── Tab bar (cleaner, white-on-paper) ────────────────────── */
function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home",    label: "Accueil", icon: "home"  },
    { id: "snacks",  label: "Snacks",  icon: "snack" },
    { id: "scan",    label: "Scan",    icon: "qrcode", center: true },
    { id: "map",     label: "Carte",   icon: "map"   },
    { id: "profile", label: "Profil",  icon: "user"  },
  ];

  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 30,
      padding: "12px 14px 26px",
      pointerEvents: "none",
    }}>
      <div style={{
        position: "relative",
        background: "var(--mx-card)",
        border: "1px solid var(--mx-line)",
        borderRadius: 22,
        boxShadow: "0 8px 24px rgba(0,0,0,.12)",
        padding: "10px 6px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.2fr 1fr 1fr",
        pointerEvents: "auto",
      }}>
        {tabs.map(t => {
          const isActive = active === t.id;
          if (t.center) {
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className="mx-press"
                style={{
                  appearance: "none", border: "none", background: "transparent",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  padding: 0, cursor: "pointer",
                  position: "relative", top: -22,
                }}>
                <span style={{
                  width: 56, height: 56, borderRadius: 999,
                  background: "linear-gradient(180deg,#FF7A1F,#E63B0A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 10px 22px rgba(230,59,10,.4)",
                  border: "3px solid var(--mx-card)",
                }}>
                  <Icon name="qrcode" size={26} color="#fff" stroke={2.2} />
                </span>
                <span style={{
                  fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
                  color: "var(--mx-ink-2)", marginTop: 4,
                }}>{t.label}</span>
              </button>
            );
          }
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                appearance: "none", border: "none", background: "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "4px 0", cursor: "pointer",
                color: isActive ? "var(--mx-orange)" : "var(--mx-mute)",
              }}>
              <Icon name={t.icon} size={22} color={isActive ? "var(--mx-orange)" : "var(--mx-mute)"} stroke={2.2} />
              <span style={{
                fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
              }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  Logo, ChromeText, MaxxHead, MaxxButton, Sparkle, Chip, Icon,
  SectionHeader, TabBar,
});
