"use client";

import { useMemo, useState } from "react";
import { PINS, CATEGORY_META, type MapPin, type PinCategory } from "@/lib/mock-data";

const ALL_CATS: PinCategory[] = ["food", "shelter", "health", "clothing"];

const tokenBg: Record<PinCategory, string> = {
    food: "bg-food",
    shelter: "bg-shelter",
    health: "bg-health",
    clothing: "bg-clothing",
};

export function MapView() {
    const [active, setActive] = useState<Record<PinCategory, boolean>>({
        food: true, shelter: true, health: true, clothing: true,
    });
    const [selected, setSelected] = useState<MapPin | null>(PINS[1]);
    const [showPending, setShowPending] = useState(true);

    const visible = useMemo(
        () => PINS.filter((p) => active[p.category] && (showPending || p.status !== "pending")),
        [active, showPending],
    );

    const toggle = (c: PinCategory) => setActive((s) => ({ ...s, [c]: !s[c] }));

    return (
        <section className="grid gap-4 lg:grid-cols-[300px_1fr_340px]">
            {/* Filters */}
            <aside className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <h2 className="font-display text-base font-bold">Filtros</h2>
                <p className="mt-1 text-xs text-muted-foreground">Selecione o tipo de auxílio que deseja localizar.</p>

                <div className="mt-4 space-y-2">
                    {ALL_CATS.map((c) => {
                        const meta = CATEGORY_META[c];
                        const on = active[c];
                        return (
                            <button
                                key={c}
                                onClick={() => toggle(c)}
                                aria-pressed={on}
                                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all ${on ? "border-transparent bg-secondary" : "border-border bg-background opacity-60"
                                    }`}
                            >
                                <span className={`grid h-9 w-9 place-items-center rounded-lg text-white shadow-sm ${tokenBg[c]}`} aria-hidden>
                                    <span className="text-lg leading-none">{meta.icon}</span>
                                </span>
                                <span className="flex-1">
                                    <span className="block text-sm font-semibold">{meta.label}</span>
                                    <span className="block text-xs text-muted-foreground">
                                        {PINS.filter((p) => p.category === c).length} pontos
                                    </span>
                                </span>
                                <span className={`h-5 w-9 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
                                    <span className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 rounded-xl bg-secondary/60 p-3">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={showPending}
                            onChange={(e) => setShowPending(e.target.checked)}
                            className="h-4 w-4 rounded border-input accent-(--color-primary)"
                        />
                        Mostrar pontos coletados automaticamente (pendentes de validação)
                    </label>
                </div>

                <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                    <Legend swatch="bg-verified" label="Oficial / Verificado" />
                    <Legend ring label="Coletado por scraping (a validar)" />
                    <Legend swatch="bg-emergency" pulse label="Alerta de emergência ativo" />
                </div>
            </aside>

            {/* Map */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <MapArea pins={visible} selectedId={selected?.id} onSelect={setSelected} />
                <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium shadow">
                    Juiz de Fora · Centro
                </div>
                <div className="pointer-events-none absolute right-4 top-4 rounded-lg bg-background/90 px-3 py-1.5 text-xs shadow">
                    {visible.length} pontos visíveis
                </div>
            </div>

            {/* Details */}
            <aside className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                {selected ? <PinDetail pin={selected} /> : (
                    <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                        Selecione um ponto no mapa para ver detalhes.
                    </div>
                )}
            </aside>
        </section>
    );
}

function Legend({ swatch, ring, pulse, label }: { swatch?: string; ring?: boolean; pulse?: boolean; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`inline-block h-3 w-3 rounded-full ${swatch ?? ""} ${ring ? "border-2 border-dashed border-muted-foreground" : ""
                    } ${pulse ? "animate-pulse" : ""}`}
            />
            <span>{label}</span>
        </div>
    );
}

function MapArea({
    pins, selectedId, onSelect,
}: { pins: MapPin[]; selectedId?: string; onSelect: (p: MapPin) => void }) {
    return (
        <div
            className="relative h-130 w-full"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 30% 30%, oklch(0.93 0.04 200 / 0.5), transparent 40%), radial-gradient(circle at 70% 70%, oklch(0.92 0.04 90 / 0.5), transparent 40%), linear-gradient(0deg, oklch(0.96 0.01 80), oklch(0.98 0.01 80))",
            }}
            role="img"
            aria-label="Mapa esquemático com pontos de auxílio"
        >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <g stroke="oklch(0.88 0.01 80)" strokeWidth="0.6" fill="none">
                    <path d="M0 30 L100 25" />
                    <path d="M0 55 L100 50" />
                    <path d="M0 80 L100 78" />
                    <path d="M25 0 L30 100" />
                    <path d="M55 0 L60 100" />
                    <path d="M80 0 L78 100" />
                </g>
                <g stroke="oklch(0.55 0.13 200 / 0.4)" strokeWidth="0.4" fill="none">
                    <path d="M0 65 C 30 60, 60 70, 100 62" />
                </g>
            </svg>

            {pins.map((p) => {
                const meta = CATEGORY_META[p.category];
                const selected = p.id === selectedId;
                const pending = p.status === "pending";
                return (
                    <button
                        key={p.id}
                        onClick={() => onSelect(p)}
                        className="group absolute -translate-x-1/2 -translate-y-full"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        aria-label={`${meta.label}: ${p.name}`}
                    >
                        <span
                            className={`relative grid h-10 w-10 place-items-center rounded-full text-white shadow-lg ring-4 transition-all ${tokenBg[p.category]
                                } ${selected ? "scale-110 ring-foreground/20" : "ring-white/80"} ${pending ? "outline-2 outline-dashed outline-offset-2 outline-muted-foreground" : ""
                                }`}
                        >
                            <span className="text-lg leading-none">{meta.icon}</span>
                            <span
                                className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 ${tokenBg[p.category]}`}
                                aria-hidden
                            />
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background shadow group-hover:block">
                            {p.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function PinDetail({ pin }: { pin: MapPin }) {
    const meta = CATEGORY_META[pin.category];
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start gap-3">
                <span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${tokenBg[pin.category]}`} aria-hidden>
                    <span className="text-xl">{meta.icon}</span>
                </span>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{meta.label}</span>
                        {pin.source === "official" ? (
                            <span className="rounded-full bg-verified/15 px-2 py-0.5 text-[11px] font-semibold text-verified">
                                ✓ Oficial
                            </span>
                        ) : pin.status === "pending" ? (
                            <span className="rounded-full border border-dashed border-muted-foreground px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                                Coletado · a validar
                            </span>
                        ) : (
                            <span className="rounded-full bg-verified/15 px-2 py-0.5 text-[11px] font-semibold text-verified">
                                ✓ Verificado por agente
                            </span>
                        )}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold leading-tight">{pin.name}</h3>
                </div>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
                <Row label="Endereço" value={pin.address} />
                <Row label="Responsável" value={pin.entity} />
                <Row label="Atendimento" value={pin.schedule} />
                <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descrição</dt>
                    <dd className="mt-1 text-foreground">{pin.description}</dd>
                </div>
            </dl>

            <div className="mt-auto flex gap-2 pt-5">
                <button className="flex-1 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95">
                    Como chegar
                </button>
                <button className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-medium hover:bg-secondary" aria-label="Compartilhar">
                    ⤴
                </button>
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
                Atualizado em {new Date(pin.updatedAt).toLocaleDateString("pt-BR")}
            </p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="flex-1">{value}</dd>
        </div>
    );
}