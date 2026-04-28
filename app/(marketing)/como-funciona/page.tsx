"use client";

import {
  IconChat,
  IconChart,
  IconBolt,
  IconShield,
  IconSparkles,
  IconScale,
} from "../../components/shared";

const steps = [
  {
    step: "01",
    icon: <IconChat />,
    title: "Onboarding conversacional",
    description:
      "Cuéntale a FAMA sobre tus ingresos, gastos, deudas y metas en una conversación guiada de 5 minutos. Todo en español colombiano, sin tecnicismos.",
    detail: "5 pasos simples, una pregunta por pantalla. Guardado automático — si sales, retomas donde quedaste.",
  },
  {
    step: "02",
    icon: <IconChart />,
    title: "Radiografía financiera",
    description:
      "Recibe un diagnóstico claro de tu situación actual: liquidez, presión de deuda y margen mensual. Sin fórmulas, en lenguaje humano.",
    detail: "Indicadores cualitativos (sana/frágil, baja/alta, holgado/en riesgo) para que entiendas en segundos.",
  },
  {
    step: "03",
    icon: <IconSparkles />,
    title: "Proyección a 12 meses",
    description:
      "Visualiza cómo evolucionan tus finanzas mes a mes con tu flujo actual. Dashboard con gráficas claras de liquidez, deuda y patrimonio.",
    detail: "Datos actualizados en tiempo real cada vez que cambias un dato o simulas un escenario.",
  },
  {
    step: "04",
    icon: <IconBolt />,
    title: "Simulador \"¿Qué pasa si...?\"",
    description:
      "Pregunta en lenguaje natural: ¿qué pasa si pago más a la tarjeta? ¿Si pierdo ingresos 3 meses? ¿Si compro carro a crédito? FAMA lo simula al instante.",
    detail: "Compara tu situación actual (baseline) vs el escenario simulado, lado a lado.",
  },
  {
    step: "05",
    icon: <IconScale />,
    title: "Módulo deuda vs liquidez",
    description:
      "Compara escenarios lado a lado: ¿pagar más o mantener colchón? FAMA te dice cuándo conviene cada opción según tu situación real.",
    detail: "Recomendaciones basadas en datos, no en reglas genéricas. Personalizado para ti.",
  },
];

const features = [
  {
    icon: <IconChat />,
    title: "Onboarding conversacional",
    description: "5 pasos guiados donde registras ingresos, gastos fijos, deudas, metas y tu perfil financiero.",
  },
  {
    icon: <IconChart />,
    title: "Dashboard con proyección 12 meses",
    description: "Visualiza tu flujo de caja, deuda total y patrimonio neto proyectado mes a mes.",
  },
  {
    icon: <IconSparkles />,
    title: "Simulador de escenarios",
    description: "Pregunta en lenguaje natural y ve al instante cómo cambia tu proyección. Sin fórmulas.",
  },
  {
    icon: <IconScale />,
    title: "Módulo deuda vs liquidez",
    description: "Compara escenarios lado a lado: ¿pagar más o mantener colchón? FAMA te dice cuándo conviene cada opción.",
  },
  {
    icon: <IconBolt />,
    title: "Insights automáticos",
    description: "Alertas y recomendaciones basadas en tus datos. FAMA detecta riesgos y oportunidades antes de que tú los veas.",
  },
  {
    icon: <IconShield />,
    title: "Datos seguros",
    description: "Tu información financiera está encriptada y nunca se comparte con terceros. Privacidad total.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Cómo funciona <span className="text-accent">FAMA</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            En 5 pasos simples, FAMA te da claridad financiera total. Sin conectar cuentas bancarias, sin tecnicismos, sin estrés.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="relative rounded-xl border border-border bg-background p-6 sm:p-8">
                <span className="absolute -top-4 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-background">
                  {item.step}
                </span>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted/70">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-24">
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
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
              >
                {item.icon}
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            ¿Listo para tomar mejores decisiones?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Empieza tu prueba gratis de 7 días. Sin tarjeta de crédito.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/signup"
              className="w-full rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
            >
              Crear cuenta gratis
            </a>
            <a
              href="/login"
              className="w-full rounded-lg border border-border px-6 py-3.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              Ya tengo cuenta
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
