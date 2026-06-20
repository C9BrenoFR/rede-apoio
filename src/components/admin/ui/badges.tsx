import { type Agent } from "@/lib/mock-data";

interface BadgeProps {
    tone: "ok" | "warn" | "danger"
    children: React.ReactNode
}

export function Badge({ tone, children }: BadgeProps) {
    const cls =
        tone === "ok" ? "bg-verified/15 text-verified" :
            tone === "warn" ? "bg-food/15 text-food" :
                "bg-destructive/15 text-destructive";
    return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{children}</span>;
}

export function RoleBadge({ is_admin }: { is_admin: boolean }) {
    return (
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${is_admin ? "bg-primary/15 text-primary" : "bg-health/15 text-health"}`}>
            {is_admin ? "Administrador Municipal" : "Agente Social"}
        </span>
    );
}

export function StatusBadge({ status }: { status: Agent["status"] }) {
    const map: Record<Agent["status"], string> = {
        ativo: "bg-verified/15 text-verified",
        pausado: "bg-food/15 text-food",
        convidado: "bg-primary/15 text-primary",
    };
    return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${map[status]}`}>{status}</span>;
}