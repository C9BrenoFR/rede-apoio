"use client";

import { useState } from "react";
import Link from "next/link";
import { PINS, CATEGORY_META, type MapPin } from "@/lib/mock-data";
import { PiSirenFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import Stat from "@/components/admin/ui/stat";
import StatusBadge from "@/components/admin/ui/status-badge";
import EmergencyModal from "@/components/admin/modal/emergency-modal";
import RegisterPinModal from "@/components/admin/modal/register-pin-modal";

const tokenBg: Record<string, string> = {
    food: "bg-food",
    shelter: "bg-shelter",
    health: "bg-health",
    clothing: "bg-clothing",
};

// Nova tipagem para as emergências
interface EmergencyAlert {
    id: string;
    type: string;
    note: string;
    time: string;
}

export default function DashboardPage() {
    const [items, setItems] = useState<MapPin[]>(PINS);
    const [emergencies, setEmergencies] = useState<EmergencyAlert[]>([]); // Novo estado para emergências
    const [tab, setTab] = useState<"pendentes" | "todos" | "emergencias">("pendentes");

    const [emergencyOpen, setEmergencyOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const pending = items.filter((p) => p.status === "pending");
    const list = tab === "pendentes" ? pending : tab === "todos" ? items : [];

    const update = (id: string, status: MapPin["status"]) => {
        setItems((arr) => arr.map((p) => (p.id === id ? { ...p, status } : p)));
        setToast(status === "verified" ? "Ponto validado e publicado." : "Ponto rejeitado e arquivado.");
        setTimeout(() => setToast(null), 2500);
    };

    const resolveEmergency = (id: string) => {
        setEmergencies((arr) => arr.filter((e) => e.id !== id));
        setToast("Emergência resolvida e encerrada.");
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <div className="flex min-h-screen flex-col bg-secondary/30">
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Painel restrito</div>
                        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Bem-vinda, Clarice</h1>
                        <p className="text-sm text-muted-foreground">Assistente Social · ONG Acolher</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setEmergencyOpen(true)}
                            className="flex items-center justify-center gap-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground shadow-sm hover:opacity-95"
                        >
                            <PiSirenFill /> Sinalizar emergência
                        </button>
                        <button
                            onClick={() => setRegisterOpen(true)}
                            className="flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
                        >
                            <IoIosAddCircle /> Cadastrar ponto de auxílio
                        </button>
                        <Link href="/" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary">
                            Sair
                        </Link>
                    </div>
                </div>

                <section className="mt-6 grid gap-3 sm:grid-cols-4">
                    <Stat label="Pontos ativos" value={items.filter((i) => i.status === "verified").length} />
                    <Stat label="A validar" value={pending.length} tone="warn" />
                    {/* Alteramos o número de alertas de emergência para ser dinâmico também */}
                    <Stat label="Alertas ativos" value={emergencies.length} tone={emergencies.length > 0 ? "danger" : undefined} />
                    <Stat label="Atualizações 24h" value={11} />
                </section>

                <div className="mt-6 inline-flex rounded-xl border border-border bg-background p-1 shadow-sm">
                    {[
                        ["pendentes", "Fila de validação"],
                        ["todos", "Todos os pontos"],
                        ["emergencias", "Emergências ativas"],
                    ].map(([id, label]) => (
                        <button
                            key={id}
                            onClick={() => setTab(id as typeof tab)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {tab === "emergencias" ? (
                    emergencies.length === 0 ? (
                        <div className="mt-4 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm">
                            Nenhum alerta de emergência em aberto. Use o botão &quot;Sinalizar emergência&quot; para abrir um chamado.
                        </div>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {emergencies.map((em) => (
                                <li key={em.id} className="grid gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:items-center">
                                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive text-white shadow-sm" aria-hidden>
                                        <PiSirenFill className="text-2xl" />
                                    </span>
                                    <div>
                                        <h3 className="font-display text-base font-bold text-destructive">{em.type}</h3>
                                        <p className="text-sm text-muted-foreground">{em.note || "Nenhuma descrição adicional."}</p>
                                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-destructive/80">
                                            <span>Aberto às {em.time}</span>
                                            <span>·</span>
                                            <span>GPS: -21.7625, -43.3496</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => resolveEmergency(em.id)}
                                        className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary"
                                    >
                                        Resolver
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )
                ) : (
                    <ul className="mt-4 space-y-3">
                        {list.map((p) => {
                            const meta = CATEGORY_META[p.category];
                            return (
                                <li key={p.id} className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:items-center">
                                    <span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${tokenBg[p.category]}`} aria-hidden>
                                        <span className="text-xl">{meta.icon}</span>
                                    </span>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-display text-base font-bold">{p.name}</h3>
                                            <StatusBadge status={p.status} source={p.source} />
                                        </div>
                                        <p className="text-sm text-muted-foreground">{p.address} · {p.entity}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {p.status === "pending" ? (
                                            <>
                                                <button onClick={() => update(p.id, "rejected")} className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary">
                                                    Rejeitar
                                                </button>
                                                <button onClick={() => update(p.id, "verified")} className="rounded-lg bg-health px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95">
                                                    Validar
                                                </button>
                                            </>
                                        ) : (
                                            <button className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary">
                                                Editar
                                            </button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                        {list.length === 0 && (
                            <li className="rounded-2xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
                                Nada por aqui ✨
                            </li>
                        )}
                    </ul>
                )}
            </main>

            {emergencyOpen && (
                <EmergencyModal
                    onClose={() => setEmergencyOpen(false)}
                    onSubmit={(data) => {
                        setEmergencyOpen(false);
                        // Cria um novo alerta e adiciona ao começo da lista
                        const novoAlerta: EmergencyAlert = {
                            id: Math.random().toString(36).substring(7),
                            type: data.type,
                            note: data.note,
                            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                        };
                        setEmergencies(prev => [novoAlerta, ...prev]);

                        setToast("Alerta enviado para agentes num raio de 5 km.");
                        setTimeout(() => setToast(null), 3000);
                    }}
                />
            )}

            {registerOpen && (
                <RegisterPinModal
                    onClose={() => setRegisterOpen(false)}
                    onSubmit={(pin) => {
                        setItems((arr) => [pin, ...arr]);
                        setRegisterOpen(false);
                        setToast("Ponto de auxílio cadastrado como oficial e publicado no mapa.");
                        setTimeout(() => setToast(null), 3000);
                    }}
                />
            )}

            {toast && (
                <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
}