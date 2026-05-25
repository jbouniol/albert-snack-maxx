// packages.jsx — SVG illustrations of snack/drink packages
// Each component returns a viewBox-fit SVG. Use width/height to size.
// All packages have brand-styled labels and chrome accents.

function PkgChipsBag({ w = 140, h = 170, color = "#FF5A14", accent = "#FFD23F", label = "MAXX BBQ", flavor = "BARBECUE" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 140 170">
      <defs>
        <linearGradient id={`bag-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 35)} />
          <stop offset=".5" stopColor={color} />
          <stop offset="1" stopColor={shade(color, -25)} />
        </linearGradient>
        <linearGradient id={`bag-${label}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset=".5" stopColor="rgba(255,255,255,.35)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* crinkly top + bottom */}
      <path d="M10 18 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 L130 152
               q-6 6 -12 0 q-6 -6 -12 0 q-6 6 -12 0 q-6 -6 -12 0 q-6 6 -12 0 q-6 -6 -12 0 q-6 6 -12 0 q-6 -6 -12 0 q-6 6 -12 0 Z"
            fill={`url(#bag-${label})`} stroke="#15110E" strokeWidth="3" strokeLinejoin="round"/>
      {/* shine */}
      <rect x="14" y="22" width="112" height="126" fill={`url(#bag-${label}-shine)`} opacity=".7"/>
      {/* speed swoosh */}
      <path d="M14 70 Q70 50 126 80" stroke="#fff" strokeWidth="3" fill="none" opacity=".55"/>
      {/* label brick */}
      <g transform="translate(20 60) rotate(-6)">
        <rect x="0" y="0" width="100" height="38" rx="6" fill="#15110E"/>
        <text x="50" y="26" textAnchor="middle"
              fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="22"
              fill={accent} stroke="#15110E" strokeWidth="0.5">{label}</text>
      </g>
      <g transform="translate(20 102) rotate(-6)">
        <text x="50" y="0" textAnchor="middle"
              fontFamily="Bungee, system-ui" fontSize="9" fill="#fff" opacity=".95">{flavor}</text>
      </g>
      {/* corner star */}
      <g transform="translate(108 38)">
        <polygon points="0,-10 2,-2 10,0 2,2 0,10 -2,2 -10,0 -2,-2" fill="#FFD23F" stroke="#15110E" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function PkgCan({ w = 110, h = 170, color = "#2BB4E8", accent = "#FFD23F", label = "MAXX", flavor = "FUEL" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 110 170">
      <defs>
        <linearGradient id={`can-${label}-${flavor}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0"  stopColor={shade(color, -15)} />
          <stop offset=".15" stopColor={shade(color, 30)} />
          <stop offset=".5" stopColor={color} />
          <stop offset=".85" stopColor={shade(color, -25)} />
          <stop offset="1"  stopColor={shade(color, -35)} />
        </linearGradient>
      </defs>
      {/* lid */}
      <ellipse cx="55" cy="14" rx="40" ry="7" fill="#B6AC9E" stroke="#15110E" strokeWidth="2.5"/>
      <ellipse cx="55" cy="12" rx="36" ry="5" fill="#ECE7DC" stroke="#15110E" strokeWidth="1.5"/>
      {/* body */}
      <rect x="15" y="14" width="80" height="140" rx="4"
            fill={`url(#can-${label}-${flavor})`} stroke="#15110E" strokeWidth="3"/>
      {/* base shadow */}
      <ellipse cx="55" cy="155" rx="40" ry="7" fill={shade(color, -45)} stroke="#15110E" strokeWidth="2.5"/>
      {/* label band */}
      <rect x="15" y="58" width="80" height="58" fill="#15110E"/>
      <text x="55" y="84" textAnchor="middle"
            fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="22"
            fill={accent}>{label}</text>
      <text x="55" y="104" textAnchor="middle"
            fontFamily="Bungee, system-ui" fontSize="11" fill="#fff" opacity=".9">{flavor}</text>
      {/* speed line */}
      <path d="M20 130 Q55 122 90 132" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".75"/>
      <path d="M20 138 Q55 130 90 140" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".55"/>
    </svg>
  );
}

function PkgBar({ w = 140, h = 110, color = "#8B1A0E", accent = "#FFD23F", label = "MAXX BAR", flavor = "CARAMEL" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 140 110">
      <defs>
        <linearGradient id={`bar-${label}-${flavor}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 35)} />
          <stop offset=".5" stopColor={color} />
          <stop offset="1" stopColor={shade(color, -25)} />
        </linearGradient>
      </defs>
      <g transform="translate(70 55) rotate(-8) translate(-70 -55)">
        <rect x="6" y="14" width="128" height="82" rx="6"
              fill={`url(#bar-${label}-${flavor})`} stroke="#15110E" strokeWidth="3"/>
        {/* wrapper twist pleats */}
        <path d="M0 30 L6 14 L6 96 L0 80 Z" fill={shade(color, -35)} stroke="#15110E" strokeWidth="2.5"/>
        <path d="M140 30 L134 14 L134 96 L140 80 Z" fill={shade(color, -35)} stroke="#15110E" strokeWidth="2.5"/>
        <rect x="6" y="14" width="128" height="14" fill="rgba(255,255,255,.18)"/>
        {/* label */}
        <text x="70" y="56" textAnchor="middle"
              fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="22"
              fill={accent}>{label}</text>
        <text x="70" y="78" textAnchor="middle"
              fontFamily="Bungee, system-ui" fontSize="11" fill="#fff">{flavor}</text>
      </g>
      <g transform="translate(118 26)">
        <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#FFD23F" stroke="#15110E" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function PkgCookie({ w = 140, h = 120, color = "#FFB300", accent = "#C7281D", label = "MAXX COOKIE", flavor = "CHOCO" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 140 120">
      <defs>
        <linearGradient id={`cook-${label}-${flavor}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 30)} />
          <stop offset="1" stopColor={shade(color, -15)} />
        </linearGradient>
      </defs>
      {/* pouch */}
      <path d="M10 24 q4 -10 10 -10 h100 q6 0 10 10 v72 q-4 10 -10 10 H20 q-6 0 -10 -10 Z"
            fill={`url(#cook-${label}-${flavor})`} stroke="#15110E" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M14 26 q4 -8 8 -8 h96 q4 0 8 8 v6 H14 Z" fill={shade(color, -20)} stroke="#15110E" strokeWidth="2"/>
      {/* label */}
      <g transform="translate(70 65) rotate(-4) translate(-70 -65)">
        <rect x="14" y="42" width="112" height="40" rx="5" fill="#15110E"/>
        <text x="70" y="64" textAnchor="middle"
              fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="18"
              fill={accent}>{label}</text>
        <text x="70" y="78" textAnchor="middle"
              fontFamily="Bungee, system-ui" fontSize="9" fill="#fff" opacity=".95">{flavor}</text>
      </g>
      {/* cookie illustration */}
      <g transform="translate(28 38)">
        <circle cx="0" cy="0" r="12" fill="#B07A00" stroke="#15110E" strokeWidth="2"/>
        <circle cx="-3" cy="-3" r="2" fill="#15110E"/>
        <circle cx="3" cy="2" r="2" fill="#15110E"/>
        <circle cx="-2" cy="4" r="1.5" fill="#15110E"/>
      </g>
    </svg>
  );
}

function PkgHealthy({ w = 110, h = 170, color = "#29C46B", accent = "#FFD23F", label = "MAXX FIT", flavor = "NOIX" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 110 170">
      <defs>
        <linearGradient id={`fit-${label}-${flavor}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 30)} />
          <stop offset="1" stopColor={shade(color, -25)} />
        </linearGradient>
      </defs>
      {/* tall pouch */}
      <path d="M10 18 q4 -6 10 -6 h70 q6 0 10 6 v138 q-4 6 -10 6 H20 q-6 0 -10 -6 Z"
            fill={`url(#fit-${label}-${flavor})`} stroke="#15110E" strokeWidth="3" strokeLinejoin="round"/>
      {/* top pleat */}
      <path d="M10 18 q4 -6 10 -6 h70 q6 0 10 6 v8 H10 Z" fill={shade(color, -25)} stroke="#15110E" strokeWidth="2"/>
      {/* label */}
      <g transform="translate(55 78) rotate(-6) translate(-55 -78)">
        <rect x="10" y="48" width="90" height="60" rx="5" fill="#15110E"/>
        <text x="55" y="74" textAnchor="middle"
              fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="18"
              fill={accent}>{label}</text>
        <text x="55" y="92" textAnchor="middle"
              fontFamily="Bungee, system-ui" fontSize="10" fill="#fff">{flavor}</text>
      </g>
      {/* leaf */}
      <g transform="translate(30 38) rotate(-25)">
        <path d="M0 0 Q8 -10 18 -4 Q12 6 0 0Z" fill={shade(color, 40)} stroke="#15110E" strokeWidth="1.8"/>
      </g>
      <g transform="translate(82 144)">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#FFD23F" stroke="#15110E" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function PkgBottle({ w = 90, h = 180, color = "#FF3D7F", accent = "#FFD23F", label = "MAXX", flavor = "BERRY" }) {
  return (
    <svg width={w} height={h} viewBox="0 0 90 180">
      <defs>
        <linearGradient id={`btl-${label}-${flavor}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0"  stopColor={shade(color, -15)} />
          <stop offset=".4" stopColor={shade(color, 25)} />
          <stop offset=".7" stopColor={color} />
          <stop offset="1"  stopColor={shade(color, -30)} />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="30" y="6" width="30" height="20" rx="3" fill="#15110E" stroke="#15110E" strokeWidth="2"/>
      <rect x="30" y="6" width="30" height="6" fill="#3A2F28"/>
      {/* neck */}
      <path d="M34 26 L34 44 Q34 50 28 56 L28 84 H62 V56 Q56 50 56 44 L56 26 Z"
            fill={`url(#btl-${label}-${flavor})`} stroke="#15110E" strokeWidth="2.5"/>
      {/* body */}
      <path d="M14 84 Q14 80 18 78 H72 Q76 80 76 84 V160 Q76 170 66 172 H24 Q14 170 14 160 Z"
            fill={`url(#btl-${label}-${flavor})`} stroke="#15110E" strokeWidth="3"/>
      {/* label */}
      <rect x="14" y="98" width="62" height="52" fill="#15110E"/>
      <text x="45" y="122" textAnchor="middle"
            fontFamily="Bowlby One, system-ui" fontStyle="italic" fontSize="20"
            fill={accent}>{label}</text>
      <text x="45" y="140" textAnchor="middle"
            fontFamily="Bungee, system-ui" fontSize="10" fill="#fff" opacity=".95">{flavor}</text>
    </svg>
  );
}

/* shade(): mix a hex toward white (+) or black (-) by % */
function shade(hex, pct) {
  const m = hex.replace("#", "").match(/.{2}/g).map(h => parseInt(h, 16));
  const t = pct >= 0 ? 255 : 0;
  const p = Math.abs(pct) / 100;
  const out = m.map(c => Math.round(c + (t - c) * p));
  return "#" + out.map(c => c.toString(16).padStart(2, "0")).join("");
}

/* Smart picker */
function SnackPackage({ kind, ...rest }) {
  switch (kind) {
    case "chips":   return <PkgChipsBag {...rest} />;
    case "can":     return <PkgCan {...rest} />;
    case "bar":     return <PkgBar {...rest} />;
    case "cookie":  return <PkgCookie {...rest} />;
    case "healthy": return <PkgHealthy {...rest} />;
    case "bottle":  return <PkgBottle {...rest} />;
    default:        return <PkgChipsBag {...rest} />;
  }
}

Object.assign(window, {
  PkgChipsBag, PkgCan, PkgBar, PkgCookie, PkgHealthy, PkgBottle, SnackPackage,
});
