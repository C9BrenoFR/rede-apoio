import { type AuditEntry, AUDIT } from "@/lib/mock-data";

export default function AuditTab() {
    const toneCls: Record<AuditEntry["tone"], string> = {
        ok: "bg-verified/15 text-verified",
        warn: "bg-food/15 text-food",
        danger: "bg-destructive/15 text-destructive",
        info: "bg-primary/15 text-primary",
    };
    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-4">
                <h2 className="font-display text-lg font-bold">Trilha de auditoria</h2>
                <p className="text-xs text-muted-foreground">Cada ação dos agentes e do sistema é registrada e assinada digitalmente (LGPD).</p>
            </div>
            <ul className="divide-y divide-border">
                {AUDIT.map((l) => (
                    <li key={l.id} className="grid gap-2 p-4 sm:grid-cols-[140px_140px_1fr_auto] sm:items-center">
                        <span className="text-xs text-muted-foreground">{l.when}</span>
                        <span className="text-sm font-semibold">{l.who}</span>
                        <span className="text-sm">
                            <span className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${toneCls[l.tone]}`}>{l.action}</span>
                            {l.target}
                        </span>
                        <button className="justify-self-end text-xs font-semibold text-primary hover:underline">Ver detalhes</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}