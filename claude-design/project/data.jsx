// data.jsx — Snack Maxx catalog, machines, user state, history, votes, tickets

const CATEGORIES = [
  { id: "all",    label: "Tout"      },
  { id: "chips",  label: "Chips"     },
  { id: "choco",  label: "Choco"     },
  { id: "cookie", label: "Cookies"   },
  { id: "drinks", label: "Boissons"  },
  { id: "fit",    label: "Healthy"   },
];

const PRODUCTS = [
  // chips / savory
  { id: "p01", cat: "chips", kind: "chips",   name: "Maxx Inferno",   flavor: "Chili Hellfire", price: 2.20, stock: 7,  hot: true,  kcal: 240, color: "#FF3D14", accent: "#FFD23F", slot: "A2", tagline: "Pour les durs à cuire" },
  { id: "p02", cat: "chips", kind: "chips",   name: "Maxx Crunch",    flavor: "Salt & Vinegar", price: 2.00, stock: 12, kcal: 220, color: "#2BB4E8", accent: "#FFE4B0", slot: "A3", tagline: "Le claquement original" },
  { id: "p03", cat: "chips", kind: "chips",   name: "Maxx BBQ",       flavor: "Barbecue Boss",  price: 2.00, stock: 3,  low: true, kcal: 250, color: "#C7281D", accent: "#FFD23F", slot: "A5", tagline: "Fumé jusqu'à l'os" },

  // choco / bars
  { id: "p04", cat: "choco",  kind: "bar",     name: "Maxx Mega",      flavor: "Caramel Crunch", price: 1.80, stock: 18, kcal: 320, color: "#8B1A0E", accent: "#FFD23F", slot: "B1", tagline: "Triple couche, zéro pardon" },
  { id: "p05", cat: "choco",  kind: "bar",     name: "Maxx Choco-X",   flavor: "Dark Choco",     price: 1.60, stock: 9,  kcal: 280, color: "#3A2F28", accent: "#FF7A1F", slot: "B2", tagline: "Cacao 70%, attitude 100%" },
  { id: "p06", cat: "choco",  kind: "bar",     name: "Maxx Hazel",     flavor: "Noisette Folle", price: 1.80, stock: 0,  empty: true, kcal: 290, color: "#B07A00", accent: "#FFE4B0", slot: "B4", tagline: "Croquant signature" },

  // cookies
  { id: "p07", cat: "cookie", kind: "cookie",  name: "Maxx Cookie",    flavor: "Triple Choco",   price: 1.50, stock: 14, kcal: 260, color: "#FFB300", accent: "#C7281D", slot: "C1", tagline: "3 pépites par bouchée" },
  { id: "p08", cat: "cookie", kind: "cookie",  name: "Maxx Stuffd",    flavor: "Cœur Coulant",   price: 2.10, stock: 6,  hot: true, kcal: 330, color: "#FF7A1F", accent: "#FFE4B0", slot: "C2", tagline: "Avec un cœur fondant" },

  // drinks
  { id: "p09", cat: "drinks", kind: "can",     name: "Maxx Fuel",      flavor: "Energy Original",price: 2.50, stock: 22, kcal: 110, color: "#2BB4E8", accent: "#FFD23F", slot: "D1", tagline: "Plein gaz, zéro filtre" },
  { id: "p10", cat: "drinks", kind: "can",     name: "Maxx Volt",      flavor: "Lemon Voltage",  price: 2.50, stock: 11, hot: true, kcal: 95,  color: "#FFB300", accent: "#15110E", slot: "D2", tagline: "Acide & électrique" },
  { id: "p11", cat: "drinks", kind: "bottle",  name: "Maxx Berry",     flavor: "Fruits Rouges",  price: 2.30, stock: 4,  low: true, kcal: 80, color: "#FF3D7F", accent: "#FFE4B0", slot: "D4", tagline: "100% jus, 0% calme" },
  { id: "p12", cat: "drinks", kind: "can",     name: "Maxx Cola",      flavor: "Cola Classic",   price: 2.20, stock: 16, kcal: 140, color: "#C7281D", accent: "#FFD23F", slot: "D5", tagline: "Recette OG" },

  // healthy
  { id: "p13", cat: "fit",    kind: "healthy", name: "Maxx Fit",       flavor: "Noix & Miel",    price: 2.40, stock: 8,  kcal: 180, color: "#29C46B", accent: "#FFD23F", slot: "E1", tagline: "Pour rouler longtemps" },
  { id: "p14", cat: "fit",    kind: "healthy", name: "Maxx Proteine",  flavor: "Choco Whey",     price: 2.80, stock: 5,  low: true, kcal: 210, color: "#1376B8", accent: "#FFE4B0", slot: "E2", tagline: "22g de protéines" },
];

const MACHINES = [
  { id: "m01", name: "Lycée Voltaire — Hall A",  distance: 0.05, status: "live", products: 38, restock: "il y a 2h",   address: "12 av. de la République, 75011",  open: true, stockHealth: 94 },
  { id: "m02", name: "Gare du Nord — Quai 4",    distance: 1.30, status: "live", products: 42, restock: "il y a 6h",   address: "Niveau -1, près des taxis",        open: true, stockHealth: 86 },
  { id: "m03", name: "Skatepark Bercy",          distance: 2.40, status: "live", products: 28, restock: "hier, 21:30", address: "Quai de Bercy, 75012",             open: true, stockHealth: 72 },
  { id: "m04", name: "Université Tolbiac — B1",  distance: 3.10, status: "warn", products: 19, restock: "il y a 3 jours", address: "90 rue de Tolbiac, 75013",      open: true, stockHealth: 38 },
  { id: "m05", name: "Salle de muscu MaxxGym",   distance: 4.80, status: "live", products: 35, restock: "il y a 1h",   address: "Rue Oberkampf, 75011",             open: true, stockHealth: 91 },
];

/* ── USER + loyalty ──────────────────────────────────────── */
const USER = {
  name: "Jules Bouniol",
  firstName: "Jules",
  email: "jules@snackmaxx.com",
  initials: "JB",
  city: "Paris 11e",
  // M4 loyalty
  tier: "silver",            // bronze | silver | gold
  streak: 4,                 // current streak in days
  bestStreak: 12,
  monthSpend: 18.40,
  monthSaved: 2.10,
  nextPerkPts: 60,           // points until next perk
  perksThisMonth: ["Boisson offerte (Bronze)", "Accès au drop Maxx Inferno"],
};

const LOYALTY_TIERS = [
  { id: "bronze", label: "Bronze", color: "#B5734A", bg: "#F5E8D8",
    perks: ["1 boisson offerte / mois", "Restock alerts"] },
  { id: "silver", label: "Silver", color: "#7A6F62", bg: "#ECE7DC",
    perks: ["1 boisson offerte / mois", "Accès anticipé aux nouveautés", "Pas de frais sur les bundles"] },
  { id: "gold",   label: "Gold",   color: "#B07A00", bg: "#FBEFCB",
    perks: ["Tout Silver", "Snack offert / semaine", "Bundles exclusifs", "Vote x2"] },
];

/* ── M8: Purchase history ─────────────────────────────────── */
const PURCHASES = [
  { id: "h01", productId: "p09", machineId: "m01", date: "Auj. · 14:22", relative: "il y a 1h",  price: 2.50, paid: "Apple Pay" },
  { id: "h02", productId: "p07", machineId: "m01", date: "Auj. · 09:08", relative: "ce matin",   price: 1.50, paid: "Apple Pay" },
  { id: "h03", productId: "p09", machineId: "m02", date: "Hier · 18:40", relative: "hier",       price: 2.50, paid: "Carte" },
  { id: "h04", productId: "p04", machineId: "m01", date: "Hier · 12:11", relative: "hier",       price: 1.80, paid: "Apple Pay" },
  { id: "h05", productId: "p10", machineId: "m03", date: "Lun · 17:02",  relative: "lundi",      price: 2.50, paid: "Apple Pay" },
  { id: "h06", productId: "p09", machineId: "m01", date: "Lun · 09:14",  relative: "lundi",      price: 2.50, paid: "Apple Pay" },
  { id: "h07", productId: "p07", machineId: "m02", date: "Dim · 19:30",  relative: "dim.",       price: 1.50, paid: "Carte" },
];

/* aggregate top usual product based on history */
function getUsuals() {
  const counts = {};
  for (const h of PURCHASES) counts[h.productId] = (counts[h.productId] || 0) + 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, n]) => ({ product: PRODUCTS.find(p => p.id === id), times: n }));
}

/* ── M3: Voting requests per machine ──────────────────────── */
const VOTES = [
  { id: "v01", name: "Kinder Bueno",          brand: "Ferrero",       cat: "choco",  votes: 47, voted: true,  trend: "+12" },
  { id: "v02", name: "Pringles Sour Cream",   brand: "Pringles",      cat: "chips",  votes: 32, voted: false, trend: "+5" },
  { id: "v03", name: "Red Bull Sugarfree",    brand: "Red Bull",      cat: "drinks", votes: 28, voted: false, trend: "+8" },
  { id: "v04", name: "Granola Honey & Nuts",  brand: "Belvita",       cat: "cookie", votes: 19, voted: false, trend: "+3" },
  { id: "v05", name: "Oreo Original",         brand: "Mondelēz",      cat: "cookie", votes: 14, voted: true,  trend: "+2" },
  { id: "v06", name: "Coca-Cola Zero",        brand: "Coca-Cola",     cat: "drinks", votes: 11, voted: false, trend: "+1" },
];

const VOTE_FULFILLED = [
  { id: "f01", name: "Maxx Inferno",  date: "il y a 2 semaines", machine: "Lycée Voltaire" },
  { id: "f02", name: "Maxx Volt",     date: "il y a 1 mois",     machine: "Gare du Nord" },
];

/* ── M5: Tickets (issue reports) ──────────────────────────── */
const TICKET_TYPES = [
  { id: "jam",     label: "Machine bloquée",       icon: "alert" },
  { id: "empty",   label: "Slot vide alors qu'affiché plein", icon: "package" },
  { id: "wrong",   label: "Mauvais produit livré", icon: "shuffle" },
  { id: "expired", label: "Produit périmé",        icon: "clock" },
  { id: "payment", label: "Problème de paiement",  icon: "credit" },
  { id: "other",   label: "Autre",                 icon: "info" },
];

const PAST_TICKETS = [
  { id: "t01", date: "Hier · 19:00", machine: "Skatepark Bercy", type: "Slot vide",     status: "Remboursé", color: "ok"   },
  { id: "t02", date: "Lun · 11:32",  machine: "Lycée Voltaire",  type: "Mauvais produit", status: "En cours", color: "warn" },
];

Object.assign(window, {
  CATEGORIES, PRODUCTS, MACHINES,
  USER, LOYALTY_TIERS, PURCHASES, getUsuals,
  VOTES, VOTE_FULFILLED,
  TICKET_TYPES, PAST_TICKETS,
});
