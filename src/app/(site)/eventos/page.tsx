import { EventCard } from "@/components/public/cards";
import { EVENTS } from "@/lib/mock-data";

export const metadata = {
    title: "Eventos — Rede de Apoio",
    description: "Cronograma de mutirões de saúde, campanhas do agasalho e eventos de assistência comunitária.",
};

export default function EventsPage() {
    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
            <header>
                <h1 className="font-display text-3xl font-extrabold tracking-tight">Próximos eventos</h1>
                <p className="mt-2 text-muted-foreground">Mutirões, campanhas e ações coordenadas da rede.</p>
            </header>

            <ol className="mt-8 space-y-3">
                {EVENTS.map((e) => (
                    <EventCard key={e.id} event={e} />
                ))}
            </ol>
        </main>
    );
}