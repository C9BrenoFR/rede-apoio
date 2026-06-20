import { type PinCategory } from "@/lib/mock-data";

type Category = {
    key: PinCategory
    label: string
    icon: string
    count: number
}

type Stats = {
    byCategory: Category[]
    total: number
}

interface OverviewTabProps {
    stats: Stats
}

const TOKEN_BG: Record<PinCategory, string> = {
    food: "bg-food", shelter: "bg-shelter", health: "bg-health", clothing: "bg-clothing",
};

export default function OverviewTab({ stats }: OverviewTabProps) {
    const maxCount = Math.max(...stats.byCategory.map((c) => c.count), 1);
    return (
        <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="font-display text-lg font-bold">Pontos oficiais por categoria</h2>
                <p className="text-xs text-muted-foreground">Distribuição atual da rede municipal de auxílio.</p>
                <ul className="mt-4 space-y-3">
                    {stats.byCategory.map((c) => (
                        <li key={c.key}>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 font-medium">
                                    <span aria-hidden>{c.icon}</span> {c.label}
                                </span>
                                <span className="text-muted-foreground">{c.count} ponto{c.count === 1 ? "" : "s"}</span>
                            </div>
                            <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                                <div className={`h-full ${TOKEN_BG[c.key]}`} style={{ width: `${(c.count / maxCount) * 100}%` }} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}