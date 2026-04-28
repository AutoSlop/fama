"use client";

import { DashboardMockup, IconBolt, IconScale, IconSparkles, IconChart } from "../../components/shared";

const useCases = [
  {
    question: "¿Qué pasa si pago $500K más a la tarjeta cada mes?",
    baseline: "Liquidas la deuda en 24 meses, pagas $3.8M en intereses.",
    scenario: "Liquidas en 16 meses, pagas $2.6M en intereses. Ahorras $1.2M.",
    tag: "Deuda",
    tagColor: "bg-alert/20 text-alert",
  },
  {
    question: "¿Qué pasa si pierdo ingresos por 3 meses?",
    baseline: "Tu colchón cubre 2.1 meses de gastos fijos.",
    scenario: "FAMA te muestra qué gastos recortar y cómo renegociar deudas para sobrevivir los 3 meses.",
    tag: "Emergencia",
    tagColor: "bg-accent-secondary/20 text-accent-secondary",
  },
  {
    question: "¿Me conviene comprar carro con crédito a 48 meses?",
    baseline: "Sin crédito, tu margen mensual es $1.8M.",
    scenario: "Con cuota de $890K/mes, tu margen baja a $910K. Pagas $8.4M extra en intereses totales.",
    tag: "Compra grande",
    tagColor: "bg-accent/20 text-accent",
  },
  {
    question: "¿Qué pasa si ahorro $300K más cada mes?",
    baseline: "En 12 meses acumulas $2M en liquidez.",
    scenario: "Con $300K adicionales, llegas a $5.6M. Tu colchón pasa de 2.1 a 5.8 meses.",
    tag: "Ahorro",
    tagColor: "bg-accent/20 text-accent",
  },
  {
    question: "¿Debería pagar la deuda o mantener liquidez?",
    baseline: "Liquidez actual: 2.1 meses. Deuda total: $12M.",
    scenario: "FAMA compara ambos caminos y te dice cuál maximiza tu patrimonio neto en 12 meses.",
    tag: "Deuda vs Liquidez",
    tagColor: "bg-accent-secondary/20 text-accent-secondary",
  },
  {
    question: "¿Qué pasa si me suben el arriendo un 10%?",
    baseline: "Gastos fijos actuales: $2.8M/mes. Margen: $1.2M.",
    scenario: "Tu margen baja a $920K. FAMA te muestra cómo ajustar otros gastos para compensar.",
    tag: "Gastos",
    tagColor: "bg-alert/20 text-alert",
  },
];

const capabilities = [
  {
    icon: <IconSparkles />,
    title: "Lenguaje natural",
    description: "Pregunta como le hablarías a un amigo. FAMA entiende contexto y te responde con datos.",
  },
  {
    icon: <IconChart />,
    title: "Comparación visual",
    description: "Ve tu situación actual vs el escenario simulado en gráficas claras, lado a lado.",
  },
  {
    icon: <IconScale />,
    title: "Deuda vs Liquidez",
    description: "Módulo especializado que te dice cuándo conviene pagar más y cuándo guardar efectivo.",
  },
  {
    icon: <IconBolt />,
    title: "Resultados al instante",
    description: "Sin esperas. Simula escenarios ilimitados y ve el impacto en tu proyección a 12 meses.",
  },
];

export default function SimuladorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Simulador{" "}
                <span className="text-accent">&ldquo;¿Qué pasa si...?&rdquo;</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                Pregunta en lenguaje natural y ve al instante cómo cambia tu proyección financiera a 12 meses. Compara tu situación actual con cualquier escenario antes de decidir.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="/signup"
                  className="w-full rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Prueba el simulador gratis
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

      {/* Capabilities */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Un simulador que habla tu idioma
            </h2>
            <p className="mt-3 text-muted">
              Sin fórmulas, sin hojas de cálculo. Solo preguntas y respuestas claras.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
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

      {/* Use cases: baseline vs scenario */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Casos de uso reales
            </h2>
            <p className="mt-3 text-muted">
              Ejemplos de preguntas que puedes hacerle a FAMA y las respuestas que obtienes.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
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
                <div className="mt-4 space-y-3 flex-1">
                  <div className="rounded-lg bg-surface-2 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted mb-1">Situación actual</p>
                    <p className="text-xs leading-relaxed text-foreground/80">{item.baseline}</p>
                  </div>
                  <div className="rounded-lg bg-accent/5 border border-accent/20 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-accent mb-1">Con escenario</p>
                    <p className="text-xs leading-relaxed text-foreground/80">{item.scenario}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empty state info */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <IconSparkles />
            </div>
            <h3 className="text-lg font-semibold">Tu simulador te espera</h3>
            <p className="mt-2 text-sm text-muted">
              Completa el onboarding de 5 minutos para que FAMA conozca tu situación financiera. Después, podrás simular todos los escenarios que quieras.
            </p>
            <a
              href="/signup"
              className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Crear cuenta gratis
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
