"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("clarice@pjf.mg.gov.br");
    const [password, setPassword] = useState("••••••••");
    const [error, setError] = useState<string | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Informe um e-mail institucional válido.");
            return;
        }
        if (password.length < 4) {
            setError("Senha inválida.");
            return;
        }
        router.push("/dashboard");
    };

    return (
        <main className="flex flex-1 items-center justify-center px-4 py-12">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-2">
                <div className="hidden bg-linear-to-br from-primary to-accent p-10 text-primary-foreground md:block">
                    <div className="font-display text-sm uppercase tracking-widest opacity-80">Acesso institucional</div>
                    <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight">
                        Painel da rede municipal de assistência social.
                    </h1>
                    <p className="mt-4 text-sm opacity-90">
                        Valide pontos coletados automaticamente, registre ações oficiais e abra alertas
                        de emergência georreferenciados.
                    </p>
                </div>
                <form onSubmit={submit} className="p-8 sm:p-10">
                    <h2 className="font-display text-2xl font-extrabold tracking-tight">Entrar</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Use sua credencial institucional.</p>

                    <label className="mt-6 block text-sm font-medium">E-mail institucional
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                        />
                    </label>

                    <label className="mt-4 block text-sm font-medium">Senha
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                        />
                    </label>

                    {error && (
                        <div role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95">
                        Acessar painel
                    </button>

                    <p className="mt-4 text-xs text-muted-foreground">
                        Protótipo: qualquer e-mail e senha entram no painel.
                    </p>
                </form>
            </div>
        </main>
    );
}