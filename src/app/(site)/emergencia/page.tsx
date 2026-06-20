import { ContactCard } from "@/components/public/cards";
import { EMERGENCY_CONTACTS } from "@/lib/mock-data";


export const metadata = {
    title: "Emergência — Rede de Apoio",
    description: "Telefones úteis e canais oficiais para emergências envolvendo pessoas em situação de rua.",
};

export default function EmergencyPage() {
    return (
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 sm:px-6">
            <header>
                <h1 className="font-display text-3xl font-extrabold tracking-tight">Contatos de emergência</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Em situações de risco, ligue diretamente para o canal mais próximo do problema. Toque para chamar.
                </p>
            </header>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {EMERGENCY_CONTACTS.map((c) => (
                    <ContactCard key={c.number} contact={c} />
                ))}
            </div>
        </main>
    );
}