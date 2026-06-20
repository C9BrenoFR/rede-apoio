import { type Agent } from "@/lib/mock-data";
import { RoleBadge, StatusBadge } from "../ui/badges";

interface TeamTabProps {
    agents: Agent[]
    onToggle: (id: string) => void
    onInvite: () => void
}

export default function TeamTab({ agents, onToggle, onInvite }: TeamTabProps) {
    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-border p-4">
                <div>
                    <h2 className="font-display text-lg font-bold">Equipe de agentes sociais</h2>
                    <p className="text-xs text-muted-foreground">Gestão de permissões, zonas de atuação e status.</p>
                </div>
                <button onClick={onInvite} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                    + Convidar agente
                </button>
            </div>
            <ul className="divide-y divide-border">
                {agents.map((a) => (
                    <li key={a.id} className="grid items-center gap-3 p-4 sm:grid-cols-[1fr_auto_auto]">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-display text-sm font-bold">{a.name}</span>
                                <RoleBadge is_admin={a.is_admin} />
                                <StatusBadge status={a.status} />
                            </div>
                            <div className="text-xs text-muted-foreground">{a.email} · {a.org} · Zona: {a.zone}</div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                            <div className="font-display text-base font-bold text-foreground">{a.validations}</div>
                            validações
                        </div>
                        <div className="flex gap-2 justify-self-end">
                            <button onClick={() => onToggle(a.id)} className="rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold hover:bg-secondary">
                                {a.status === "ativo" ? "Pausar" : "Ativar"}
                            </button>
                            <button className="rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold hover:bg-secondary">
                                Permissões
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}