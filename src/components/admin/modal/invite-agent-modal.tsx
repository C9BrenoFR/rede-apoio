import { type Agent } from "@/lib/mock-data";
import { useState } from "react";

interface InviteAgentModalProps {
    onClose: () => void
    onSubmit: (data: Omit<Agent, "id" | "status" | "validations">) => void
}

export default function InviteAgentModal({ onClose, onSubmit }: InviteAgentModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [zone, setZone] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const canSubmit = name.trim() && email.trim() && org.trim() && zone.trim();

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 id="invite-title" className="font-display text-lg font-bold">Cadastrar novo agente</h2>
                    <button onClick={onClose} aria-label="Fechar" className="rounded-md p-1 text-muted-foreground hover:bg-secondary">✕</button>
                </div>

                <form
                    className="space-y-4 p-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!canSubmit) return;
                        onSubmit({ name: name.trim(), email: email.trim(), org: org.trim(), zone: zone.trim(), is_admin: isAdmin });
                    }}
                >
                    <Field label="Nome completo" required>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex.: Maria da Silva"
                        />
                    </Field>

                    <Field label="E-mail institucional" required>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            placeholder="nome@pjf.mg.gov.br"
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Organização" required>
                            <input
                                value={org}
                                onChange={(e) => setOrg(e.target.value)}
                                required
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ex.: CRAS Norte"
                            />
                        </Field>

                        <Field label="Zona de atuação" required>
                            <input
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                required
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ex.: Centro / Bonfim"
                            />
                        </Field>
                    </div>

                    <div>
                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Perfil de acesso</span>
                        <div className="inline-flex rounded-xl border border-border bg-background p-1">
                            <button
                                type="button"
                                onClick={() => setIsAdmin(false)}
                                aria-pressed={!isAdmin}
                                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${!isAdmin ? "bg-health text-white" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Agente Social
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdmin(true)}
                                aria-pressed={isAdmin}
                                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${isAdmin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Administrador Municipal
                            </button>
                        </div>
                        <p className="mt-1.5 text-[11px] text-muted-foreground">
                            {isAdmin
                                ? "Acesso completo: gerencia equipe, audita ações e cadastra pontos oficiais."
                                : "Acesso operacional: valida dados, registra alertas e cadastra pontos em campo."}
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Enviar convite
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label} {required && <span className="text-destructive">*</span>}
            </span>
            {children}
        </label>
    );
}