import { AboutCard } from "@/components/public/cards";

export const metadata = {
    title: "Sobre o sistema — Rede de Apoio",
    description: "Objetivos, perfis de usuários e metas de design da plataforma Rede de Apoio.",
};

export default function AboutPage() {
    return (
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">Sobre a Rede de Apoio</h1>
            <p className="mt-3 text-muted-foreground">
                Plataforma de apoio à assistência de pessoas em situação de rua, projetada como trabalho da
                disciplina DCC174 (IHC) — UFJF. Centraliza informações dispersas em portais públicos e fornece
                canais oficiais para triagem de demandas e eventos comunitários.
            </p>

            <section className="mt-10 grid gap-4 sm:grid-cols-2">
                <AboutCard title="Voluntário Civil" tag="Primário" body="Cidadão que consulta o mapa anonimamente para ajudar — sem cadastro, em modo leitura." />
                <AboutCard title="Agente Social" tag="Primário" body="Profissional autenticado que valida pontos coletados e abre alertas de emergência em campo." />
                <AboutCard title="Administrador Municipal" tag="Primário" body="Gestor da prefeitura que controla credenciais, audita dados e modera perfis institucionais." />
                <AboutCard title="População em situação de rua" tag="Secundário" body="Beneficiário indireto das ações coordenadas pela plataforma." />
            </section>
        </main>
    );
}

