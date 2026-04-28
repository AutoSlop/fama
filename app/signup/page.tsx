"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/onboarding"), 1000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 block text-center text-2xl font-bold tracking-tight">
          FAMA<span className="text-accent">.</span>
        </a>
        <h1 className="mb-2 text-center text-xl font-bold">Crea tu cuenta</h1>
        <p className="mb-8 text-center text-sm text-muted">
          Empieza tu prueba gratis de 7 días
        </p>

        {success ? (
          <div className="rounded-lg bg-accent/10 px-4 py-3 text-center text-sm text-accent">
            Cuenta creada. Redirigiendo...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-muted">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-muted">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-xs font-medium text-muted">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Repite tu contraseña"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-alert/10 px-3 py-2 text-xs text-alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Empezar prueba gratis"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-muted">
          Sin tarjeta de crédito. Cancela cuando quieras.
        </p>

        <p className="mt-6 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="font-medium text-accent hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
