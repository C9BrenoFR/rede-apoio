import InfoCard from "@/components/public/info-card";
import { MapView } from "@/components/public/map-view";
import Link from "next/link";
import { FaHandsHelping, FaSatelliteDish, FaShieldAlt } from "react-icons/fa";

export const metadata = {
  title: "Mapa — Rede de Apoio",
  description: "Mapa interativo com pontos de alimentação, abrigo, saúde e vestuário para pessoas em situação de rua.",
};

export default function Home() {
  return (
    <main className="flex-1">
      <section className="border-b border-border bg-linear-to-b from-secondary/40 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-health" /> Dados atualizados a cada 4 horas
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Onde ajudar quem precisa,<br className="hidden sm:block" /> agora mesmo.
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                Encontre abrigos, restaurantes populares, mutirões de saúde e doações verificadas
                próximos a você — sem cadastro, em segundos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/emergencia" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary">
                Contatos de emergência
              </Link>
              <Link href="/eventos" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95">
                Próximos eventos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <MapView />

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <InfoCard
            Icon={FaHandsHelping}
            title="Ajude com segurança"
            text="Todos os pontos exibidos com selo ✓ foram validados por agentes sociais ou são equipamentos públicos oficiais."
          />
          <InfoCard
            Icon={FaSatelliteDish}
            title="Coleta automática"
            text="Nosso robô varre portais de notícia a cada 4h e mapeia automaticamente novas ações no município."
          />
          <InfoCard
            Icon={FaShieldAlt}
            title="Acesso institucional"
            text="Assistentes sociais e gestores acessam o painel restrito para validar dados e abrir alertas de emergência."
          />
        </section>
      </div>
    </main>
  );
}

