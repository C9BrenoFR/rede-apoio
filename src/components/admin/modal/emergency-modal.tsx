import { useState } from "react";

type Emergency = {
    type: string,
    note: string
}

interface EmergencyModalProps {
    onClose: () => void
    onSubmit: (data: Emergency) => void
}

export default function EmergencyModal({ onClose, onSubmit }: EmergencyModalProps) {
    const [type, setType] = useState("Hipotermia / frio extremo");
    const [note, setNote] = useState("");

    function submit() {
        onSubmit({ type, note })
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
            <div role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-destructive">RF03 · Alerta crítico</div>
                        <h2 className="font-display text-xl font-extrabold">Sinalizar emergência</h2>
                    </div>
                    <button onClick={onClose} aria-label="Fechar" className="rounded-md p-1 text-muted-foreground hover:bg-secondary">✕</button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    GPS capturado: <strong>-21.7625, -43.3496</strong> (precisão 8 m)
                </p>
                <label className="mt-4 block text-sm font-medium">Tipo de urgência
                    <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5">
                        <option>Hipotermia / frio extremo</option>
                        <option>Emergência médica</option>
                        <option>Violência / agressão</option>
                        <option>Desabrigo coletivo</option>
                    </select>
                </label>
                <label className="mt-3 block text-sm font-medium">Descrição (opcional)
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5" />
                </label>
                <div className="mt-5 flex justify-end gap-2">
                    <button onClick={onClose} className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">Cancelar</button>
                    <button onClick={submit} className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground shadow-sm hover:opacity-95">
                        Disparar alerta
                    </button>
                </div>
            </div>
        </div>
    );
}