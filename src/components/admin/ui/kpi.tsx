interface KpiProps {
    label: string
    value: number | string
    tone?: "warn" | "danger"
    delta?: string
}

export default function Kpi({ label, value, tone, delta }: KpiProps) {
    const color = tone === "danger" ? "text-destructive" : tone === "warn" ? "text-food" : "text-foreground";
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className={`mt-1 font-display text-3xl font-extrabold ${color}`}>{value}</div>
            {delta && <div className="mt-1 text-[11px] text-muted-foreground">{delta}</div>}
        </div>
    );
}