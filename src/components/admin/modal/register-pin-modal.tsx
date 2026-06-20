import { CATEGORY_META, type MapPin, type PinCategory } from "@/lib/mock-data";
import { useState } from "react";

interface RegisterPinModalProps {
    onClose: () => void
    onSubmit: (pin: MapPin) => void
}

export default function RegisterPinModal({ onClose, onSubmit }: RegisterPinModalProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState<PinCategory>("food");
    const [address, setAddress] = useState("");
    const [entity, setEntity] = useState("");
    const [schedule, setSchedule] = useState("");
    const [description, setDescription] = useState("");
    const [useGps, setUseGps] = useState(true);

    const canSubmit = name.trim() && address.trim() && entity.trim();

    const submit = () => {
        if (!canSubmit) return;
        const today = new Date().toISOString().slice(0, 10);
        onSubmit({
            id: `p-${Math.random().toString(36).slice(2, 8)}`,
            name: name.trim(),
            category,
            source: "official",
            status: "verified",
            address: address.trim(),
            entity: entity.trim(),
            schedule: schedule.trim() || "Horário não informado",
            description: description.trim() || "Sem descrição adicional.",
            x: 30 + Math.random() * 50,
            y: 25 + Math.random() * 50,
            updatedAt: today,
        });
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
            <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">RF05 · Novo ponto</div>
                        <h2 className="font-display text-xl font-extrabold">Cadastrar ponto de auxílio</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Será publicado como <strong>oficial</strong> e fixado no mapa público.</p>
                    </div>
                    <button onClick={onClose} aria-label="Fechar" className="rounded-md p-1 text-muted-foreground hover:bg-secondary">✕</button>
                </div>

                <div className="mt-4 grid gap-3">
                    <label className="block text-sm font-medium">Nome do ponto
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Restaurante Popular Centro" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                    </label>

                    <div>
                        <span className="block text-sm font-medium">Categoria</span>
                        <div className="mt-1.5 grid grid-cols-4 gap-2">
                            {(Object.keys(CATEGORY_META) as PinCategory[]).map((c) => {
                                const meta = CATEGORY_META[c];
                                const active = category === c;
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setCategory(c)}
                                        className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold transition ${active ? "border-primary bg-primary/10 text-primary" : "border-input bg-background text-muted-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        <span className="text-lg" aria-hidden>{meta.icon}</span>
                                        {meta.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <label className="block text-sm font-medium">Endereço
                        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número — bairro" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block text-sm font-medium">Entidade responsável
                            <input value={entity} onChange={(e) => setEntity(e.target.value)} placeholder="ONG, secretaria, paróquia…" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                        </label>
                        <label className="block text-sm font-medium">Horário de funcionamento
                            <input value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Ex: Seg–Sex, 11h–14h" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                        </label>
                    </div>

                    <label className="block text-sm font-medium">Descrição
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Serviços oferecidos, observações de acesso…" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-2 text-sm">
                        <input type="checkbox" checked={useGps} onChange={(e) => setUseGps(e.target.checked)} />
                        Usar minha localização atual ({useGps ? <strong>-21.7625, -43.3496</strong> : <span className="text-muted-foreground">desativado</span>})
                    </label>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <button onClick={onClose} className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">Cancelar</button>
                    <button
                        onClick={submit}
                        disabled={!canSubmit}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Publicar ponto
                    </button>
                </div>
            </div>
        </div>
    );
}