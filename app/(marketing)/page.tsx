"use client";

import { DashboardMockup, CTAForm } from "../components/shared";

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Gradient orb */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Próximamente beta privada en Colombia
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Antes de pagar, comprar o endeudarte,{" "}
                <span className="text-accent">simúlalo a 12 meses</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                Tu copiloto financiero personal con IA. Decide entre liquidez y deuda con
                escenarios claros antes de tomar cualquier decisión.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="/signup"
                  className="w-full rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Empieza tu prueba gratis de 7 días
                </a>
                <a
                  href="/como-funciona"
                  className="w-full rounded-lg border border-border px-6 py-3.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
                >
                  Ver cómo funciona
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problema / Dolor ─── */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Te suena familiar?
            </h2>
            <p className="mt-3 text-muted">
              La mayoría de colombianos toman decisiones financieras importantes sin visibilidad real.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                emoji: "📊",
                title: "Excel no alcanza",
                description:
                  "Hojas de cálculo que se desactualizan, fórmulas rotas y cero proyección a futuro. Tu plata merece algo mejor.",
              },
              {
                emoji: "🔮",
                title: "Cero visibilidad futura",
                description:
                  "No sabes cómo lucirá tu situación financiera en 3, 6 o 12 meses si tomas esa decisión hoy.",
              },
              {
                emoji: "😰",
                title: "Ansiedad: ¿deuda o liquidez?",
                description:
                  "¿Pago más a la tarjeta o guardo efectivo? ¿Me endeudo por el carro? Decidir sin datos genera estrés.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Beneficios / Escenarios concretos ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Simula antes de decidir
            </h2>
            <p className="mt-3 text-muted">
              Ejemplos reales de escenarios que puedes explorar con FAMA.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                question: "¿Qué pasa si pago $500K más a la tarjeta cada mes?",
                insight:
                  "Liquidarías tu deuda 8 meses antes y ahorrarías $1.2M en intereses. Tu liquidez baja temporalmente pero tu patrimonio neto sube.",
                tag: "Deuda",
                tagColor: "bg-alert/20 text-alert",
              },
              {
                question: "¿Qué pasa si pierdo ingresos por 3 meses?",
                insight:
                  "Tu colchón actual cubre 2.1 meses de gastos fijos. FAMA te muestra qué gastos recortar y cómo renegociar deudas para sobrevivir.",
                tag: "Emergencia",
                tagColor: "bg-accent-secondary/20 text-accent-secondary",
              },
              {
                question: "¿Me conviene comprar carro con crédito a 48 meses?",
                insight:
                  "Con tasa del 1.2% mensual, pagarías $8.4M extra en intereses. FAMA compara: ¿crédito, leasing o ahorro programado?",
                tag: "Compra grande",
                tagColor: "bg-accent/20 text-accent",
              },
            ].map((item) => (
              <div
                key={item.question}
                className="flex flex-col rounded-xl border border-border bg-surface p-6"
              >
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <h3 className="mt-4 text-sm font-semibold sm:text-base">{item.question}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.insight}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/simulador"
              className="inline-flex rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Conoce el simulador
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Toma el control de tus finanzas
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Regístrate para acceder a la beta privada. Prueba gratis por 7 días, sin tarjeta de
            crédito.
          </p>
          <div className="mt-8">
            <CTAForm />
          </div>
          <p className="mt-4 text-xs text-muted">
            Hecho para Colombia. Tu copiloto financiero personal.
          </p>
        </div>
      </section>
    </>
  );
}
