"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    PINS,
    CATEGORY_META,
    type PinCategory,
    type Agent,
    AGENTS,
    type AuditEntry,
    AUDIT
} from "@/lib/mock-data";
import Kpi from "@/components/admin/ui/kpi";
import OverviewTab from "@/components/admin/tabs/overview-tab";
import TeamTab from "@/components/admin/tabs/team-tab";
import AuditTab from "@/components/admin/tabs/audit-tab";
import InviteAgentModal from "@/components/admin/modal/invite-agent-modal";

type TabId = "visao" | "equipe" | "auditoria";

export default function AdminPage() {
    const [tab, setTab] = useState<TabId>("visao");
    const [agents, setAgents] = useState<Agent[]>(AGENTS);
    const [toast, setToast] = useState<string | null>(null);
    const [inviteOpen, setInviteOpen] = useState(false);

    const stats = useMemo(() => {
        const verified = PINS.filter((p) => p.status === "verified").length;
        const pending = PINS.filter((p) => p.status === "pending").length;
        const byCategory = (Object.keys(CATEGORY_META) as PinCategory[]).map((c) => ({
            key: c,
            label: CATEGORY_META[c].label,
            icon: CATEGORY_META[c].icon,
            count: PINS.filter((p) => p.category === c && p.status === "verified").length,
        }));
        const total = byCategory.reduce((s, c) => s + c.count, 0) || 1;
        return { verified, pending, byCategory, total };
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const handleInvite = (data: Omit<Agent, "id" | "status" | "validations">) => {
        const newAgent: Agent = {
            ...data,
            id: `a${Date.now()}`,
            status: "convidado",
            validations: 0,
        };
        setAgents((arr) => [...arr, newAgent]);
        setInviteOpen(false);
        showToast(`Convite enviado para ${data.name} (${data.is_admin ? "Administrador Municipal" : "Agente Social"}).`);
    };

    return (
        <div className="flex min-h-[calc(100vh-140px)] flex-col bg-secondary/30">
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Painel administrativo</div>
                        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Bem-vindo, Dr. Marco Aurélio</h1>
                        <p className="text-sm text-muted-foreground">Administrador Municipal · Secretaria de Assistência Social — PJF</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary">
                            Sair
                        </Link>
                    </div>
                </div>

                <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Kpi label="Pontos oficiais" value={stats.verified} delta="+3 esta semana" />
                    <Kpi label="Aguardando validação" value={stats.pending} tone="warn" delta="2 há +24h" />
                    <Kpi label="Tempo médio de validação" value="2h 14m" delta="−12% vs. semana anterior" />
                    <Kpi label="Alertas no mês" value={14} tone="danger" delta="−18% vs. mai" />
                </section>

                <div className="mt-6 inline-flex flex-wrap rounded-xl border border-border bg-background p-1 shadow-sm">
                    {([
                        ["visao", "Visão geral"],
                        ["equipe", "Equipe de agentes"],
                        ["auditoria", "Auditoria"],
                    ] as [TabId, string][]).map(([id, label]) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    {tab === "visao" && <OverviewTab stats={stats} />}
                    {tab === "equipe" && (
                        <TeamTab
                            agents={agents}
                            onToggle={(id) => {
                                setAgents((arr) => arr.map((a) => a.id === id ? { ...a, status: a.status === "ativo" ? "pausado" : "ativo" } : a));
                                showToast("Status do agente atualizado.");
                            }}
                            onInvite={() => setInviteOpen(true)}
                        />
                    )}
                    {tab === "auditoria" && <AuditTab />}
                </div>
            </main>

            {inviteOpen && <InviteAgentModal onClose={() => setInviteOpen(false)} onSubmit={handleInvite} />}

            {toast && (
                <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
}

