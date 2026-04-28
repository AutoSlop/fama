"use client";

import { IconCheck } from "../../components/shared";

const included = [
  "Onboarding conversacional completo",
  "Dashboard con proyección a 12 meses",
  "Simulador de escenarios ilimitado",
  "Módulo deuda vs liquidez",
  "Insights y alertas automáticas",
  "Datos encriptados y privados",
  "Soporte por chat",
];

const freeVsPremium = [
  { feature: "Onboarding conversacional", free: true, premium: true },
  { feature: "Radiografía financiera", free: true, premium: true },
  { feature: "Dashboard con proyección 12 meses", free: false, premium: true },
  { feature: "Simulador de escenarios", free: false, premium: true },
  { feature: "Módulo deuda vs liquidez", free: false, premium: true },
  { feature: "Insights automáticos", free: false, premium: true },
  { feature: "Soporte por chat", free: false, premium: true },
];

export default function PreciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Un plan simple, <span className="text-accent">sin letra pequeña</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Prueba FAMA gratis por 7 días. Sin tarjeta de crédito. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-2xl border border-accent/40 bg-background p-8 shadow-lg shadow-accent/5">
            <div className="text-center">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                7 días gratis
              </span>
              <h3 className="mt-4 text-xl font-bold">FAMA Premium</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight">$29.900</span>
                <span className="text-muted"> COP/mes</span>
              </div>
              <p className="mt-2 text-xs text-muted">
                Después de tu prueba gratis. Cancela cuando quieras.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {included.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <IconCheck />
                  <span className="text-sm text-muted">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="/signup"
              className="mt-8 block w-full rounded-lg bg-accent py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Empieza tu prueba gratis
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              Sin tarjeta de crédito. Sin compromisos.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Qué incluye cada etapa?
            </h2>
            <p className="mt-3 text-muted">
              Durante el trial tienes acceso completo. Después, todo sigue con FAMA Premium.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-medium text-foreground">Funcionalidad</th>
                  <th className="px-4 py-3 text-center font-medium text-muted">Trial (7 días)</th>
                  <th className="px-4 py-3 text-center font-medium text-accent">Premium</th>
                </tr>
              </thead>
              <tbody>
                {freeVsPremium.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-muted">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {row.free ? (
                        <span className="text-accent">✓</span>
                      ) : (
                        <span className="text-accent">✓</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-accent">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            El trial de 7 días incluye acceso completo a todas las funcionalidades. Al terminar, puedes continuar con FAMA Premium o tu cuenta se pausa sin cobro.
          </p>
        </div>
      </section>

      {/* What happens after trial */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            ¿Qué pasa al terminar el trial?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-background p-6">
              <h3 className="text-base font-semibold text-accent">Si continúas</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Se activa FAMA Premium a $29.900 COP/mes. Mantienes acceso completo a dashboard, simulador, insights y todo tu historial.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="text-base font-semibold text-foreground">Si no continúas</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tu cuenta se pausa. Tus datos se mantienen seguros. No se te cobra nada. Puedes reactivar cuando quieras.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <a
              href="/signup"
              className="inline-flex rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Empezar prueba gratis de 7 días
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
