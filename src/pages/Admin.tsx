import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Download, LogOut, Search, ShieldAlert } from "lucide-react";

type Tab = "messages" | "devis" | "rdv" | "consultations";

const TABS: { id: Tab; label: string }[] = [
  { id: "messages", label: "Messages" },
  { id: "devis", label: "Demandes de devis" },
  { id: "rdv", label: "Rendez-vous" },
  { id: "consultations", label: "Consultations payantes" },
];

const COLUMNS: Record<Tab, { key: string; label: string }[]> = {
  messages: [
    { key: "created_at", label: "Date" },
    { key: "name", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "message", label: "Message" },
  ],
  devis: [
    { key: "created_at", label: "Date" },
    { key: "name", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "company", label: "Entreprise" },
    { key: "service", label: "Service" },
    { key: "budget", label: "Budget" },
    { key: "desired_date", label: "Date souhaitée" },
    { key: "description", label: "Description" },
  ],
  rdv: [
    { key: "created_at", label: "Date" },
    { key: "name", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "service", label: "Service" },
    { key: "appointment_date", label: "Date RDV" },
    { key: "appointment_time", label: "Heure" },
    { key: "status", label: "Statut" },
    { key: "comment", label: "Commentaire" },
  ],
  consultations: [
    { key: "created_at", label: "Date" },
    { key: "name", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "appointment_date", label: "Date RDV" },
    { key: "appointment_time", label: "Heure" },
    { key: "amount_usd", label: "Montant (USD)" },
    { key: "payment_method", label: "Paiement" },
    { key: "payer_number", label: "Numéro payeur" },
    { key: "proof_path", label: "Preuve" },
    { key: "payment_status", label: "Statut paiement" },
    { key: "comment", label: "Commentaire" },
  ],
};

const TABLE_NAME: Record<Tab, "contact_messages" | "quote_requests" | "appointments" | "consultation_payments"> = {
  messages: "contact_messages",
  devis: "quote_requests",
  rdv: "appointments",
  consultations: "consultation_payments",
};


const STATUS_LABEL: Record<string, string> = {
  en_attente: "En attente",
  valide: "Validé",
  refuse: "Refusé",
};

const fmt = (key: string, value: unknown) => {
  if (value === null || value === undefined || value === "") return "—";
  if (key === "created_at") return new Date(String(value)).toLocaleString("fr-FR");
  if (key === "payment_status") return STATUS_LABEL[String(value)] ?? String(value);
  return String(value);
};


const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>("messages");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      setIsAdmin(!!roles);
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    supabase
      .from(TABLE_NAME[tab])
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("Chargement impossible:", error.message);
        setRows((data as Record<string, unknown>[]) ?? []);
        setLoading(false);
      });
  }, [tab, isAdmin]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (q && !Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))) return false;
      const created = String(r.created_at ?? "").slice(0, 10);
      if (from && created < from) return false;
      if (to && created > to) return false;
      return true;
    });
  }, [rows, query, from, to]);

  const exportCsv = () => {
    const cols = COLUMNS[tab];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      cols.map((c) => escape(c.label)).join(","),
      ...filtered.map((r) => cols.map((c) => escape(r[c.key])).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `gestimmo-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Chargement…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-card border border-border rounded-xl p-8">
          <ShieldAlert className="mx-auto mb-4 text-primary" size={32} />
          <h1 className="font-display text-xl font-bold text-foreground mb-2">Accès réservé</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Votre compte n'a pas le rôle administrateur. Contactez le responsable du site pour obtenir l'accès.
          </p>
          <button onClick={signOut} className="text-primary text-sm font-semibold hover:underline">
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  const cols = COLUMNS[tab];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container px-4 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-primary">
            Gestimmo <span className="text-foreground">Admin</span>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </header>

      <main className="container px-4 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">Tableau de bord</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setQuery(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                tab === t.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-4 gap-3 mb-6">
          <div className="sm:col-span-2 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">{filtered.length} enregistrement(s)</p>
          <button onClick={exportCsv} disabled={!filtered.length}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
            <Download size={16} /> Exporter CSV
          </button>
        </div>

        <div className="overflow-x-auto border border-border rounded-xl bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {cols.map((c) => (
                  <th key={c.key} className="text-left font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={cols.length} className="px-4 py-8 text-center text-muted-foreground">Chargement…</td></tr>
              )}
              {!loading && !filtered.length && (
                <tr><td colSpan={cols.length} className="px-4 py-8 text-center text-muted-foreground">Aucune donnée</td></tr>
              )}
              {!loading && filtered.map((r, i) => (
                <tr key={String(r.id ?? i)} className="border-b border-border last:border-0 hover:bg-accent/40">
                  {cols.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-top text-muted-foreground max-w-xs">
                      <span className="line-clamp-3 whitespace-pre-wrap break-words">{fmt(c.key, r[c.key])}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
