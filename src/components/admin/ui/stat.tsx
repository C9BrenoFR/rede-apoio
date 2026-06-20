interface StatProps {
    label: string
    value: number
    tone?: "warn" | "danger"
}

export default function Stat({ label, value, tone }: StatProps) {
    const color = tone === "danger" ? "text-destructive" : tone === "warn" ? "text-food" : "text-foreground";
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className={`mt-1 font-display text-3xl font-extrabold ${color}`}>{value}</div>
        </div>
    );
}