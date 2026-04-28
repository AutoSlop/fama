"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [supabase] = useState(() => createClient());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (err) {
        const msg =
          err.message === "Invalid login credentials"
            ? "Correo o contraseña incorrectos"
            : err.message === "Email not confirmed"
            ? "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada."
            : err.message;
        setError(msg);
        setLoading(false);
        return;
      }

      // Hard navigation to ensure proxy middleware sees the new session cookies
      window.location.href = "/onboarding";
    } catch {
      setError("Error de conexión. Verifica tu internet e intenta de nuevo.");
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Ingresa tu correo electrónico primero");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }

      setResetSent(true);
      setLoading(false);
    } catch {
      setError("Error de conexión. Verifica tu internet e intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 block text-center text-2xl font-bold tracking-tight">
          FAMA<span className="text-accent">.</span>
        </a>

        {showReset ? (
          <>
            <h1 className="mb-2 text-center text-xl font-bold">Recupera tu contraseña</h1>
            <p className="mb-8 text-center text-sm text-muted">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>

            {resetSent ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-accent/10 px-4 py-3 text-center text-sm text-accent">
                  Revisa tu correo. Te enviamos un enlace para restablecer tu contraseña.
                </div>
                <button
                  onClick={() => { setShowReset(false); setResetSent(false); setError(""); }}
                  className="w-full rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Volver a iniciar sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="mb-1 block text-xs font-medium text-muted">
                    Correo electrónico
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="tu@correo.com"
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
                  {loading ? "Enviando..." : "Enviar enlace"}
                </button>

                <button
                  type="button"
                  onClick={() => { setShowReset(false); setError(""); }}
                  className="w-full rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Volver a iniciar sesión
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            <h1 className="mb-2 text-center text-xl font-bold">Inicia sesión</h1>
            <p className="mb-8 text-center text-sm text-muted">
              Accede a tu copiloto financiero
            </p>

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
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-medium text-muted">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setError(""); }}
                    className="text-xs text-accent hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="••••••••"
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
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              ¿No tienes cuenta?{" "}
              <a href="/signup" className="font-medium text-accent hover:underline">
                Regístrate gratis
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
