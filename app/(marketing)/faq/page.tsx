"use client";

import { FAQItem } from "../../components/shared";

const faqs = [
  {
    question: "¿Qué es FAMA exactamente?",
    answer: "FAMA es un copiloto financiero personal con inteligencia artificial. Te ayuda a simular decisiones financieras (pagos, compras, deudas) y ver cómo impactan tu situación a 12 meses. Pensado específicamente para Colombia.",
  },
  {
    question: "¿Es seguro ingresar mis datos financieros?",
    answer: "Sí. Toda tu información está encriptada de extremo a extremo. No compartimos tus datos con terceros, bancos ni entidades financieras. Tú tienes el control total. FAMA no es una entidad financiera y no ofrece asesoría de inversión ni crédito.",
  },
  {
    question: "¿Necesito conectar mis cuentas bancarias?",
    answer: "No. FAMA funciona con la información que tú ingresas manualmente durante el onboarding. No necesitas vincular cuentas bancarias ni compartir credenciales. Tus datos los controlas tú.",
  },
  {
    question: "¿Cómo calcula FAMA las proyecciones?",
    answer: "FAMA usa modelos deterministas basados en los datos que ingresas: ingresos, gastos fijos, deudas (con tasas de interés) y activos líquidos. Las proyecciones a 12 meses se calculan mes a mes considerando pagos de deuda, intereses y tu flujo de caja. No son predicciones — son proyecciones basadas en tu información actual.",
  },
  {
    question: "¿Para quién es FAMA?",
    answer: "Para cualquier persona en Colombia que quiera tomar mejores decisiones financieras: empleados, independientes, freelancers. Especialmente útil si estás entre pagar deuda o mantener liquidez, si quieres simular una compra grande, o si simplemente quieres entender tu situación financiera a futuro.",
  },
  {
    question: "¿Qué pasa con la prueba gratis de 7 días?",
    answer: "Durante los 7 días tienes acceso completo a todas las funcionalidades de FAMA: onboarding, dashboard, simulador, módulo deuda vs liquidez e insights. No necesitas tarjeta de crédito para empezar. Al terminar, puedes continuar con FAMA Premium ($29.900 COP/mes) o tu cuenta se pausa sin cobro.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer: "Sí. No hay contratos, no hay cláusulas. Cancelas cuando quieras desde tu cuenta y no se te cobra más. Tus datos se mantienen seguros y puedes reactivar cuando lo desees.",
  },
  {
    question: "¿El simulador tiene límite de escenarios?",
    answer: "No. Con FAMA Premium puedes simular escenarios ilimitados. Pregunta todo lo que quieras: qué pasa si pagas más a la deuda, si pierdes ingresos, si compras algo a crédito, si ahorras más, etc.",
  },
  {
    question: "¿FAMA funciona con pesos colombianos (COP)?",
    answer: "Sí. FAMA está diseñado específicamente para Colombia. Todos los montos, rangos y formatos están en pesos colombianos (COP) con separadores locales. Los rangos de ingresos, ejemplos de gastos y referencias son 100% colombianos.",
  },
  {
    question: "¿FAMA es un banco o una entidad financiera?",
    answer: "No. FAMA es una herramienta de simulación y proyección financiera personal. No ofrecemos crédito, inversiones, seguros ni productos financieros. No captamos dinero ni realizamos operaciones bancarias. FAMA es un software que te ayuda a entender tu situación financiera y simular escenarios — las decisiones siempre son tuyas.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Preguntas <span className="text-accent">frecuentes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Todo lo que necesitas saber sobre FAMA, tu seguridad, tus datos y cómo funciona.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            ¿Tienes otra pregunta?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Escríbenos a{" "}
            <a href="mailto:info@example.com" className="text-accent hover:underline">
              info@example.com
            </a>
            {" "}o empieza tu prueba gratis y explora FAMA por ti mismo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/registro"
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
