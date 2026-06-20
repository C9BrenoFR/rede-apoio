"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Mapa" },
    { href: "/eventos", label: "Eventos" },
    { href: "/emergencia", label: "Emergência" },
    { href: "/sobre", label: "Sobre" },
];

export function SiteNavBar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
                            <circle cx="12" cy="10" r="2.5" />
                        </svg>
                    </span>
                    <div className="leading-tight">
                        <div className="font-display text-lg font-bold tracking-tight">Rede de Apoio</div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Assistência colaborativa</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="/login"
                        className="hidden rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-secondary sm:inline-flex"
                    >
                        Entrar
                    </Link>
                    <a
                        href="tel:192"
                        className="inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground shadow-sm transition-transform hover:scale-[1.02]"
                    >
                        <span aria-hidden>☎</span> SAMU 192
                    </a>
                </div>
            </div>
        </header>
    );
}

export function SiteFooter() {
    return (
        <footer className="border-t border-border bg-secondary/40">
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm sm:grid-cols-3 sm:px-6">
                <div>
                    <div className="font-display font-bold">Rede de Apoio</div>
                    <p className="mt-1 text-muted-foreground">
                        Plataforma acadêmica de IHC — DCC174/UFJF.
                    </p>
                </div>
                <div>
                    <div className="font-semibold">Importante</div>
                    <p className="mt-1 text-muted-foreground">
                        Em emergências com risco de vida, ligue 192 (SAMU) ou 193 (Bombeiros).
                    </p>
                </div>
                <div className="text-muted-foreground sm:text-right">
                    Conforme WCAG 2.1 AA · Dados públicos verificados
                </div>
            </div>
        </footer>
    );
}