"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

/* ──────────────────────── Icons (inline SVG helpers) ──────────────────────── */

function IconChat() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function IconScale() {
  return (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/* ──────────────────────── Dashboard Mockup ──────────────────────── */

function DashboardMockup() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface p-4 shadow-2xl shadow-accent/5 sm:p-6">
      {/* Title bar */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-alert" />
        <span className="h-3 w-3 rounded-full bg-accent-secondary" />
        <span className="h-3 w-3 rounded-full bg-accent" />
        <span className="ml-2 text-xs text-muted">dashboard.fama.co</span>
      </div>
      {/* Chart area */}
      <div className="mb-4 rounded-xl bg-surface-2 p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs font-medium text-muted">Proyección 12 meses</span>
          <span className="text-sm font-bold text-accent">+$2.4M COP</span>
        </div>
        {/* Faux bar chart */}
        <div className="flex items-end gap-1.5">
          {[35, 42, 38, 55, 48, 62, 58, 70, 65, 78, 82, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-accent/30"
              style={{ height: `${h}px` }}
            >
              <div
                className="w-full rounded-t bg-accent"
                style={{ height: `${h * 0.7}px` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted">
          <span>Ene</span>
          <span>Jun</span>
          <span>Dic</span>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-surface-2 p-3 text-center">
          <p className="text-[10px] text-muted">Liquidez</p>
          <p className="text-sm font-bold text-accent">$8.2M</p>
        </div>
        <div className="rounded-lg bg-surface-2 p-3 text-center">
          <p className="text-[10px] text-muted">Deuda</p>
          <p className="text-sm font-bold text-alert">$3.1M</p>
        </div>
        <div className="rounded-lg bg-surface-2 p-3 text-center">
          <p className="text-[10px] text-muted">Ahorro</p>
          <p className="text-sm font-bold text-accent-secondary">$5.1M</p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── FAQ Item ──────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="pr-4 text-sm font-medium text-foreground sm:text-base">{question}</span>
        <IconChevron open={open} />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-muted">{answer}</p>}
    </div>
  );
}

/* ──────────────────────── CTA Form ──────────────────────── */

function CTAForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
        <p className="text-lg font-semibold text-accent">¡Listo!</p>
        <p className="mt-1 text-sm text-muted">
          Te avisaremos cuando la beta privada esté disponible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="flex-1 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Empieza tu prueba gratis
      </button>
    </form>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
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
                    href="/auth/signup"
                    className="w-full rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Empieza tu prueba gratis de 7 días
                  </a>
                  <a
                    href="#como-funciona"
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

        {/* ─── Cómo funciona ─── */}
        <section id="como-funciona" className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Cómo funciona
              </h2>
              <p className="mt-3 text-muted">
                En 3 pasos simples, FAMA te da claridad financiera total.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: <IconChat />,
                  title: "Onboarding conversacional",
                  description:
                    "Cuéntale a FAMA sobre tus ingresos, gastos, deudas y metas en una conversación guiada de 5 minutos.",
                },
                {
                  step: "02",
                  icon: <IconChart />,
                  title: "Radiografía financiera",
                  description:
                    "Recibe un dashboard con tu situación actual y proyección a 12 meses. Todo visual, claro y accionable.",
                },
                {
                  step: "03",
                  icon: <IconBolt />,
                  title: "Simulador \"¿Qué pasa si...?\"",
                  description:
                    "Pregunta en lenguaje natural: ¿qué pasa si pago más a la tarjeta? ¿Si pierdo ingresos 3 meses? FAMA lo simula al instante.",
                },
              ].map((item) => (
                <div key={item.step} className="relative rounded-xl border border-border bg-surface p-6">
                  <span className="absolute -top-4 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-background">
                    {item.step}
                  </span>
                  <div className="mt-2">{item.icon}</div>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features del MVP ─── */}
        <section id="features" className="border-t border-border bg-surface py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Todo lo que necesitas para decidir mejor
              </h2>
              <p className="mt-3 text-muted">
                Funcionalidades diseñadas para darte claridad, no más complejidad.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <IconChat />,
                  title: "Onboarding conversacional",
                  description:
                    "5 pasos guiados donde registras ingresos, gastos fijos, deudas, metas y tu perfil financiero.",
                },
                {
                  icon: <IconChart />,
                  title: "Dashboard con proyección 12 meses",
                  description:
                    "Visualiza tu flujo de caja, deuda total y patrimonio neto proyectado mes a mes.",
                },
                {
                  icon: <IconSparkles />,
                  title: "Simulador de escenarios",
                  description:
                    "Pregunta en lenguaje natural y ve al instante cómo cambia tu proyección. Sin fórmulas.",
                },
                {
                  icon: <IconScale />,
                  title: "Módulo deuda vs liquidez",
                  description:
                    "Compara escenarios lado a lado: ¿pagar más o mantener colchón? FAMA te dice cuándo conviene cada opción.",
                },
                {
                  icon: <IconBolt />,
                  title: "Insights automáticos",
                  description:
                    "Alertas y recomendaciones basadas en tus datos. FAMA detecta riesgos y oportunidades antes de que tú los veas.",
                },
                {
                  icon: <IconShield />,
                  title: "Datos seguros",
                  description:
                    "Tu información financiera está encriptada y nunca se comparte con terceros. Privacidad total.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/30"
                >
                  {item.icon}
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
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
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="border-t border-border bg-surface py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Un plan simple, sin letra pequeña
              </h2>
              <p className="mt-3 text-muted">
                Prueba FAMA gratis por 7 días. Sin tarjeta de crédito.
              </p>
            </div>
            <div className="mx-auto mt-14 max-w-md">
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
                  {[
                    "Onboarding conversacional completo",
                    "Dashboard con proyección a 12 meses",
                    "Simulador de escenarios ilimitado",
                    "Módulo deuda vs liquidez",
                    "Insights y alertas automáticas",
                    "Datos encriptados y privados",
                    "Soporte por chat",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <IconCheck />
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/auth/signup"
                  className="mt-8 block w-full rounded-lg bg-accent py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  Empieza tu prueba gratis
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="mt-10">
              <FAQItem
                question="¿Qué es FAMA exactamente?"
                answer="FAMA es un copiloto financiero personal con inteligencia artificial. Te ayuda a simular decisiones financieras (pagos, compras, deudas) y ver cómo impactan tu situación a 12 meses. Pensado específicamente para Colombia."
              />
              <FAQItem
                question="¿Es seguro ingresar mis datos financieros?"
                answer="Sí. Toda tu información está encriptada de extremo a extremo. No compartimos tus datos con terceros, bancos ni entidades financieras. Tú tienes el control total."
              />
              <FAQItem
                question="¿Necesito conectar mis cuentas bancarias?"
                answer="No. FAMA funciona con la información que tú ingresas manualmente durante el onboarding. No necesitas vincular cuentas bancarias ni compartir credenciales."
              />
              <FAQItem
                question="¿Para quién es FAMA?"
                answer="Para cualquier persona en Colombia que quiera tomar mejores decisiones financieras: empleados, independientes, freelancers. Especialmente útil si estás entre pagar deuda o mantener liquidez."
              />
              <FAQItem
                question="¿Puedo cancelar en cualquier momento?"
                answer="Sí. No hay contratos, no hay cláusulas. Cancelas cuando quieras desde tu cuenta y no se te cobra más."
              />
              <FAQItem
                question="¿Qué pasa después de los 7 días de prueba?"
                answer="Si decides continuar, se activa el plan FAMA Premium a $29.900 COP/mes. Si no, simplemente se desactiva tu cuenta sin cobro alguno."
              />
            </div>
          </div>
        </section>

        {/* ─── CTA Final ─── */}
        <section id="cta-final" className="border-t border-border bg-surface py-20 sm:py-24">
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
      </main>

      <Footer />
    </>
  );
}
