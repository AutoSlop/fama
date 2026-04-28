"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { formatCOP } from "@/lib/format";

/* ─── Types ─── */

interface Snapshot {
  monthly_income_estimate: number;
  liquid_assets: number;
  fixed_expenses: number;
  has_debts: boolean;
}

interface Debt {
  name: string;
  balance: number;
  monthly_payment: number;
  interest_rate: number;
  debt_type: string;
}

interface Indicator {
  label: string;
  value: string;
  tag: string;
  tagColor: string;
  explanation: string;
  numericValue: number;
}

/* ─── Calculations ─── */

function calcLiquidity(liquidAssets: number, fixedExpenses: number): Indicator {
  const months = fixedExpenses > 0 ? liquidAssets / fixedExpenses : 0;
  let tag: string, tagColor: string, explanation: string;

  if (months >= 6) {
    tag = "Sana";
    tagColor = "text-accent bg-accent/10 border-accent/30";
    explanation = `Tienes ${months.toFixed(1)} meses de colchón. Eso te da tranquilidad y margen para tomar decisiones sin presión.`;
  } else if (months >= 3) {
    tag = "Media";
    tagColor = "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30";
    explanation = `Tienes ${months.toFixed(1)} meses de colchón. Estás en un punto intermedio: podrías cubrir una emergencia corta, pero conviene fortalecer tu reserva.`;
  } else {
    tag = "Frágil";
    tagColor = "text-alert bg-alert/10 border-alert/30";
    explanation = `Solo tienes ${months.toFixed(1)} meses de colchón. Si algo inesperado pasa, tu liquidez se agotaría rápido. Prioriza construir un fondo de emergencia.`;
  }

  return {
    label: "Liquidez",
    value: `${months.toFixed(1)} meses`,
    tag,
    tagColor,
    explanation,
    numericValue: months,
  };
}

function calcDebtPressure(totalPayment: number, income: number): Indicator {
  const ratio = income > 0 ? totalPayment / income : 0;
  const pct = ratio * 100;
  let tag: string, tagColor: string, explanation: string;

  if (pct <= 15) {
    tag = "Baja";
    tagColor = "text-accent bg-accent/10 border-accent/30";
    explanation = `Tus cuotas de deuda representan solo el ${pct.toFixed(0)}% de tu ingreso. Tienes buen control y espacio para maniobrar.`;
  } else if (pct <= 30) {
    tag = "Media";
    tagColor = "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30";
    explanation = `El ${pct.toFixed(0)}% de tu ingreso va a cuotas de deuda. Es manejable, pero ten cuidado de no sumar más obligaciones.`;
  } else if (pct <= 50) {
    tag = "Alta";
    tagColor = "text-alert bg-alert/10 border-alert/30";
    explanation = `El ${pct.toFixed(0)}% de tu ingreso se va en deuda. Esto limita tu capacidad de ahorro y maniobra. Conviene buscar formas de reducir esta carga.`;
  } else {
    tag = "Crítica";
    tagColor = "text-alert bg-alert/10 border-alert/30";
    explanation = `El ${pct.toFixed(0)}% de tu ingreso se destina a pagar deudas. Esta es una situación de riesgo alto. Es urgente reestructurar tus obligaciones.`;
  }

  return {
    label: "Presión de deuda",
    value: `${pct.toFixed(0)}%`,
    tag,
    tagColor,
    explanation,
    numericValue: pct,
  };
}

function calcMargin(income: number, fixedExpenses: number, totalPayment: number): Indicator {
  const margin = income - fixedExpenses - totalPayment;
  let tag: string, tagColor: string, explanation: string;
  const pct = income > 0 ? (margin / income) * 100 : 0;

  if (margin > 0 && pct >= 20) {
    tag = "Holgado";
    tagColor = "text-accent bg-accent/10 border-accent/30";
    explanation = `Te sobran ${formatCOP(margin)} al mes después de cubrir gastos fijos y deudas. Tienes espacio para ahorrar, invertir o darte gustos con tranquilidad.`;
  } else if (margin > 0) {
    tag = "Ajustado";
    tagColor = "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30";
    explanation = `Te quedan ${formatCOP(margin)} al mes. No estás en riesgo, pero cualquier gasto imprevisto puede ser un problema. Busca optimizar tus gastos.`;
  } else {
    tag = "En riesgo";
    tagColor = "text-alert bg-alert/10 border-alert/30";
    explanation = margin === 0
      ? "Tu ingreso solo alcanza justo para cubrir gastos y deudas. No hay margen para imprevistos."
      : `Estás gastando ${formatCOP(Math.abs(margin))} más de lo que ganas cada mes. Es necesario hacer ajustes urgentes en tus gastos o deudas.`;
  }

  return {
    label: "Margen mensual",
    value: formatCOP(margin),
    tag,
    tagColor,
    explanation,
    numericValue: margin,
  };
}

/* ─── Indicator Card ─── */

function IndicatorCard({ indicator }: { indicator: Indicator }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{indicator.label}</span>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${indicator.tagColor}`}>
          {indicator.tag}
        </span>
      </div>
      <p className="mt-2 font-mono text-2xl font-bold">{indicator.value}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{indicator.explanation}</p>
    </div>
  );
}

/* ─── Page ─── */

export default function RadiografiaPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      // Check onboarding is complete
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", user.id)
        .single();

      if (!profile?.onboarding_complete) {
        router.push("/onboarding");
        return;
      }

      const { data: snap } = await supabase
        .from("financial_snapshots")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const { data: userDebts } = await supabase
        .from("debts")
        .select("*")
        .eq("user_id", user.id);

      if (!snap) { router.push("/onboarding"); return; }

      const s: Snapshot = {
        monthly_income_estimate: snap.monthly_income_estimate || 0,
        liquid_assets: snap.liquid_assets || 0,
        fixed_expenses: snap.fixed_expenses || 0,
        has_debts: snap.has_debts || false,
      };
      setSnapshot(s);
      setDebts(userDebts || []);

      const totalDebtPayment = (userDebts || []).reduce((sum: number, d: Debt) => sum + d.monthly_payment, 0);

      setIndicators([
        calcLiquidity(s.liquid_assets, s.fixed_expenses),
        calcDebtPressure(totalDebtPayment, s.monthly_income_estimate),
        calcMargin(s.monthly_income_estimate, s.fixed_expenses, totalDebtPayment),
      ]);

      setLoading(false);
    }
    load();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">Calculando tu radiografía...</p>
        </div>
      </div>
    );
  }

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <a href="/" className="mb-8 block text-center text-2xl font-bold tracking-tight">
          FAMA<span className="text-accent">.</span>
        </a>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Tu radiografía financiera</h1>
          <p className="mt-2 text-sm text-muted">
            Así luce tu situación con los datos que nos compartiste. Sin fórmulas complicadas — solo lo que importa.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted">Ingreso</p>
            <p className="mt-1 font-mono text-sm font-bold text-accent">{formatCOP(snapshot?.monthly_income_estimate || 0)}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted">Liquidez</p>
            <p className="mt-1 font-mono text-sm font-bold text-accent">{formatCOP(snapshot?.liquid_assets || 0)}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted">Gastos fijos</p>
            <p className="mt-1 font-mono text-sm font-bold text-accent-secondary">{formatCOP(snapshot?.fixed_expenses || 0)}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted">Deuda total</p>
            <p className="mt-1 font-mono text-sm font-bold text-alert">{formatCOP(totalDebt)}</p>
          </div>
        </div>

        {/* Indicators */}
        <div className="space-y-4">
          {indicators.map((ind) => (
            <IndicatorCard key={ind.label} indicator={ind} />
          ))}
        </div>

        {/* Debts detail */}
        {debts.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-bold">Tus deudas</h2>
            <div className="space-y-3">
              {debts.map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted">
                      {DEBT_TYPE_LABELS[d.debt_type] || d.debt_type} · {d.interest_rate}% mensual
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold">{formatCOP(d.balance)}</p>
                    <p className="font-mono text-xs text-muted">{formatCOP(d.monthly_payment)}/mes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/dashboard"
            className="w-full rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
          >
            Ir al dashboard
          </a>
          <a
            href="/onboarding?edit=1"
            className="w-full rounded-lg border border-border px-6 py-3 text-center text-sm font-medium text-muted transition-colors hover:bg-surface-2 sm:w-auto"
          >
            Editar mis datos
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Tu copiloto financiero personal. Hecho para Colombia.
        </p>
      </div>
    </div>
  );
}

const DEBT_TYPE_LABELS: Record<string, string> = {
  tarjeta: "Tarjeta de crédito",
  hipoteca: "Hipoteca",
  vehiculo: "Crédito vehículo",
  libre_inversion: "Libre inversión",
  otro: "Otro",
};
