"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { formatCOP, parseCOPInput } from "@/lib/format";

/* ─── Types ─── */

interface Debt {
  id?: string;
  name: string;
  balance: number;
  monthly_payment: number;
  interest_rate: number;
  debt_type: string;
}

interface OnboardingData {
  monthly_income_range: string;
  monthly_income_estimate: number;
  liquid_assets: number;
  has_debts: boolean;
  debts: Debt[];
  fixed_expenses: number;
  financial_concern: string;
}

const INCOME_RANGES = [
  { label: "Menos de $1.5M", value: "0-1500000", estimate: 1000000 },
  { label: "$1.5M – $3M", value: "1500000-3000000", estimate: 2250000 },
  { label: "$3M – $5M", value: "3000000-5000000", estimate: 4000000 },
  { label: "$5M – $8M", value: "5000000-8000000", estimate: 6500000 },
  { label: "$8M – $12M", value: "8000000-12000000", estimate: 10000000 },
  { label: "$12M – $20M", value: "12000000-20000000", estimate: 16000000 },
  { label: "Más de $20M", value: "20000000+", estimate: 25000000 },
];

const DEBT_TYPES = [
  { label: "Tarjeta de crédito", value: "tarjeta" },
  { label: "Crédito hipotecario", value: "hipoteca" },
  { label: "Crédito vehículo", value: "vehiculo" },
  { label: "Libre inversión", value: "libre_inversion" },
  { label: "Otro", value: "otro" },
];

const TOTAL_STEPS = 5;

/* ─── Helpers ─── */

function SaveIndicator({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  if (status === "idle") return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${
      status === "saving" ? "text-muted" :
      status === "saved" ? "text-accent" :
      "text-alert"
    }`}>
      {status === "saving" && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {status === "saving" ? "Guardando..." : status === "saved" ? "Guardado" : "Error al guardar"}
    </span>
  );
}

function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span>Paso {step + 1} de {TOTAL_STEPS}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function COPInput({
  value,
  onChange,
  placeholder,
  id,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  id?: string;
}) {
  const [display, setDisplay] = useState(value > 0 ? formatCOP(value) : "");

  useEffect(() => {
    if (value === 0 && display === "") return;
    if (value > 0 && display === "") setDisplay(formatCOP(value));
  }, [value, display]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const num = parseCOPInput(raw);
    setDisplay(raw);
    onChange(num);
  }

  function handleBlur() {
    if (value > 0) setDisplay(formatCOP(value));
    else setDisplay("");
  }

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder || "$0 COP"}
      className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    />
  );
}

/* ─── Main Component ─── */

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "1";
  const [supabase] = useState(() => createClient());

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [userId, setUserId] = useState<string | null>(null);

  const [data, setData] = useState<OnboardingData>({
    monthly_income_range: "",
    monthly_income_estimate: 0,
    liquid_assets: 0,
    has_debts: false,
    debts: [],
    fixed_expenses: 0,
    financial_concern: "",
  });

  // Debt form state
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [debtErrors, setDebtErrors] = useState<Record<string, string>>({});

  /* ─── Load existing data ─── */
  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUserId(user.id);

    // Load profile to get onboarding step
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_step, onboarding_complete")
      .eq("id", user.id)
      .single();

    if (profile?.onboarding_complete && !isEditMode) {
      router.push("/radiografia");
      return;
    }

    // Load snapshot
    const { data: snapshot } = await supabase
      .from("financial_snapshots")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // Load debts
    const { data: debts } = await supabase
      .from("debts")
      .select("*")
      .eq("user_id", user.id);

    if (snapshot) {
      setData((prev) => ({
        ...prev,
        monthly_income_range: snapshot.monthly_income_range || "",
        monthly_income_estimate: snapshot.monthly_income_estimate || 0,
        liquid_assets: snapshot.liquid_assets || 0,
        has_debts: snapshot.has_debts || false,
        fixed_expenses: snapshot.fixed_expenses || 0,
        financial_concern: snapshot.financial_concern || "",
        debts: debts || [],
      }));
    }

    if (profile?.onboarding_step) {
      setStep(Math.min(profile.onboarding_step, TOTAL_STEPS - 1));
    }

    setLoading(false);
  }, [supabase, router, isEditMode]);

  useEffect(() => { loadData(); }, [loadData]);

  /* ─── Save step data ─── */

  async function saveStep(nextStep?: number) {
    if (!userId) return;
    setSaveStatus("saving");

    try {
      // Upsert financial snapshot
      const { error: snapErr } = await supabase
        .from("financial_snapshots")
        .upsert({
          user_id: userId,
          monthly_income_range: data.monthly_income_range,
          monthly_income_estimate: data.monthly_income_estimate,
          liquid_assets: data.liquid_assets,
          has_debts: data.has_debts,
          fixed_expenses: data.fixed_expenses,
          financial_concern: data.financial_concern,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (snapErr) throw snapErr;

      // Update profile step
      const stepToSave = nextStep !== undefined ? nextStep : step;
      await supabase
        .from("profiles")
        .update({ onboarding_step: stepToSave, updated_at: new Date().toISOString() })
        .eq("id", userId);

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  }

  /* ─── Save debts ─── */

  async function saveDebts(debts: Debt[]) {
    if (!userId) return;

    // Delete existing debts and re-insert
    await supabase.from("debts").delete().eq("user_id", userId);

    if (debts.length > 0) {
      const rows = debts.map((d) => ({
        user_id: userId,
        name: d.name,
        balance: d.balance,
        monthly_payment: d.monthly_payment,
        interest_rate: d.interest_rate,
        debt_type: d.debt_type,
      }));
      await supabase.from("debts").insert(rows);
    }
  }

  /* ─── Complete onboarding ─── */

  async function completeOnboarding() {
    if (!userId) return;
    setSaveStatus("saving");

    try {
      await saveStep(TOTAL_STEPS);
      await supabase
        .from("profiles")
        .update({ onboarding_complete: true, updated_at: new Date().toISOString() })
        .eq("id", userId);

      router.push("/radiografia");
    } catch {
      setSaveStatus("error");
    }
  }

  /* ─── Navigation ─── */

  function canAdvance(): boolean {
    switch (step) {
      case 0: return data.monthly_income_range !== "";
      case 1: return data.liquid_assets >= 0;
      case 2: return !data.has_debts || data.debts.length > 0;
      case 3: return data.fixed_expenses > 0;
      case 4: return true; // concern is optional
      default: return false;
    }
  }

  async function handleNext() {
    if (step === 2 && data.has_debts) {
      await saveDebts(data.debts);
    }
    if (step < TOTAL_STEPS - 1) {
      const next = step + 1;
      setStep(next);
      await saveStep(next);
    } else {
      await completeOnboarding();
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  /* ─── Debt helpers ─── */

  function startAddDebt() {
    setEditingDebt({ name: "", balance: 0, monthly_payment: 0, interest_rate: 0, debt_type: "tarjeta" });
    setDebtErrors({});
  }

  function validateDebt(d: Debt): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!d.name.trim()) errs.name = "Nombre requerido";
    if (d.balance <= 0) errs.balance = "El saldo debe ser mayor a 0";
    if (d.monthly_payment <= 0) errs.monthly_payment = "La cuota debe ser mayor a 0";
    if (d.interest_rate < 0) errs.interest_rate = "La tasa no puede ser negativa";
    return errs;
  }

  function confirmDebt() {
    if (!editingDebt) return;
    const errs = validateDebt(editingDebt);
    if (Object.keys(errs).length > 0) { setDebtErrors(errs); return; }
    setData((prev) => ({ ...prev, debts: [...prev.debts, editingDebt] }));
    setEditingDebt(null);
    setDebtErrors({});
  }

  function removeDebt(idx: number) {
    setData((prev) => ({ ...prev, debts: prev.debts.filter((_, i) => i !== idx) }));
  }

  /* ─── Loading state ─── */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">Cargando tu información...</p>
        </div>
      </div>
    );
  }

  /* ─── Render steps ─── */

  function renderStep() {
    switch (step) {
      /* Step 0: Income range */
      case 0:
        return (
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">¿Cuál es tu ingreso mensual?</h2>
            <p className="mt-2 text-sm text-muted">
              No necesitamos el número exacto — un rango nos basta para darte una buena radiografía.
            </p>
            <div className="mt-6 grid gap-3">
              {INCOME_RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setData((prev) => ({ ...prev, monthly_income_range: r.value, monthly_income_estimate: r.estimate }))}
                  className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                    data.monthly_income_range === r.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-surface hover:border-accent/30"
                  }`}
                >
                  {r.label}
                  <span className="ml-2 text-xs text-muted">COP/mes</span>
                </button>
              ))}
            </div>
          </div>
        );

      /* Step 1: Liquid assets */
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">¿Cuánta liquidez tienes hoy?</h2>
            <p className="mt-2 text-sm text-muted">
              Suma todo lo que puedes usar rápidamente: ahorros, cuentas corrientes, CDTs de fácil acceso. No incluyas bienes como tu casa o vehículo.
            </p>
            <div className="mt-6">
              <label htmlFor="liquid" className="mb-1 block text-xs font-medium text-muted">
                Liquidez actual en COP
              </label>
              <COPInput
                id="liquid"
                value={data.liquid_assets}
                onChange={(v) => setData((prev) => ({ ...prev, liquid_assets: Math.max(0, v) }))}
                placeholder="Ej: $5.000.000"
              />
              {data.liquid_assets < 0 && (
                <p className="mt-1 text-xs text-alert">El valor no puede ser negativo</p>
              )}
              <p className="mt-3 text-xs text-muted">
                Incluye: cuenta de ahorros, corriente, fondos de fácil acceso, efectivo disponible.
              </p>
            </div>
          </div>
        );

      /* Step 2: Debts */
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">¿Tienes deudas actualmente?</h2>
            <p className="mt-2 text-sm text-muted">
              Tarjetas de crédito, créditos, préstamos... todo cuenta. Esto nos ayuda a calcular tu presión de deuda.
            </p>

            {/* Yes/No toggle */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setData((prev) => ({ ...prev, has_debts: true }))}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  data.has_debts ? "border-accent bg-accent/10 text-accent" : "border-border bg-surface hover:border-accent/30"
                }`}
              >
                Sí, tengo deudas
              </button>
              <button
                onClick={() => setData((prev) => ({ ...prev, has_debts: false, debts: [] }))}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  !data.has_debts ? "border-accent bg-accent/10 text-accent" : "border-border bg-surface hover:border-accent/30"
                }`}
              >
                No tengo deudas
              </button>
            </div>

            {data.has_debts && (
              <div className="mt-6 space-y-4">
                {/* Existing debts list */}
                {data.debts.map((d, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs text-muted">
                        Saldo: <span className="font-mono">{formatCOP(d.balance)}</span> · Cuota: <span className="font-mono">{formatCOP(d.monthly_payment)}</span>/mes
                      </p>
                    </div>
                    <button onClick={() => removeDebt(i)} className="text-xs text-alert hover:underline">Eliminar</button>
                  </div>
                ))}

                {/* Add/Edit debt form */}
                {editingDebt ? (
                  <div className="space-y-3 rounded-xl border border-accent/30 bg-surface p-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">Nombre de la deuda</label>
                      <input
                        type="text"
                        value={editingDebt.name}
                        onChange={(e) => setEditingDebt({ ...editingDebt, name: e.target.value })}
                        placeholder="Ej: Tarjeta Bancolombia"
                        className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                      {debtErrors.name && <p className="mt-1 text-xs text-alert">{debtErrors.name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted">Saldo total</label>
                        <COPInput
                          value={editingDebt.balance}
                          onChange={(v) => setEditingDebt({ ...editingDebt, balance: v })}
                          placeholder="$0"
                        />
                        {debtErrors.balance && <p className="mt-1 text-xs text-alert">{debtErrors.balance}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted">Cuota mensual</label>
                        <COPInput
                          value={editingDebt.monthly_payment}
                          onChange={(v) => setEditingDebt({ ...editingDebt, monthly_payment: v })}
                          placeholder="$0/mes"
                        />
                        {debtErrors.monthly_payment && <p className="mt-1 text-xs text-alert">{debtErrors.monthly_payment}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted">Tasa aprox. mensual (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editingDebt.interest_rate || ""}
                          onChange={(e) => setEditingDebt({ ...editingDebt, interest_rate: parseFloat(e.target.value) || 0 })}
                          placeholder="Ej: 1.8"
                          className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                        {debtErrors.interest_rate && <p className="mt-1 text-xs text-alert">{debtErrors.interest_rate}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted">Tipo</label>
                        <select
                          value={editingDebt.debt_type}
                          onChange={(e) => setEditingDebt({ ...editingDebt, debt_type: e.target.value })}
                          className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                          {DEBT_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={confirmDebt} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:opacity-90">
                        Agregar deuda
                      </button>
                      <button onClick={() => { setEditingDebt(null); setDebtErrors({}); }} className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:bg-surface-2">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={startAddDebt}
                    className="w-full rounded-xl border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-accent/30 hover:text-accent"
                  >
                    + Agregar {data.debts.length > 0 ? "otra " : ""}deuda
                  </button>
                )}
              </div>
            )}
          </div>
        );

      /* Step 3: Fixed expenses */
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">¿Cuánto gastas fijo cada mes?</h2>
            <p className="mt-2 text-sm text-muted">
              Suma tus gastos mensuales obligatorios. No incluyas las cuotas de deuda — eso ya lo tenemos.
            </p>
            <div className="mt-6">
              <label htmlFor="expenses" className="mb-1 block text-xs font-medium text-muted">
                Gastos fijos mensuales en COP
              </label>
              <COPInput
                id="expenses"
                value={data.fixed_expenses}
                onChange={(v) => setData((prev) => ({ ...prev, fixed_expenses: Math.max(0, v) }))}
                placeholder="Ej: $2.500.000"
              />
              <div className="mt-4 rounded-lg bg-surface-2 p-3">
                <p className="mb-2 text-xs font-medium text-muted">Incluye cosas como:</p>
                <div className="flex flex-wrap gap-2">
                  {["Arriendo/Hipoteca", "Servicios públicos", "Internet/Celular", "Mercado", "Transporte", "Suscripciones", "Seguros", "Colegio/Universidad"].map((ex) => (
                    <span key={ex} className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted">{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      /* Step 4: Financial concern */
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">¿Qué te preocupa de tu plata?</h2>
            <p className="mt-2 text-sm text-muted">
              Cuéntanos tranquilamente. Esto nos ayuda a personalizar tu radiografía y enfocarnos en lo que de verdad importa para ti.
            </p>
            <div className="mt-6">
              <textarea
                value={data.financial_concern}
                onChange={(e) => setData((prev) => ({ ...prev, financial_concern: e.target.value.slice(0, 500) }))}
                rows={4}
                placeholder='Ej: "No sé si debería pagar más a mi tarjeta de crédito o guardar plata por si pierdo el trabajo..."'
                className="w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-right text-xs text-muted">{data.financial_concern.length}/500</p>
              <p className="mt-2 text-xs text-muted">
                Este paso es opcional, pero nos ayuda mucho a darte mejores insights.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <a href="/" className="mb-6 block text-center text-2xl font-bold tracking-tight">
          FAMA<span className="text-accent">.</span>
        </a>

        <ProgressBar step={step} />

        {/* Step content */}
        <div className="min-h-[320px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2"
              >
                Atrás
              </button>
            )}
            <SaveIndicator status={saveStatus} />
          </div>
          <button
            onClick={handleNext}
            disabled={!canAdvance() || saveStatus === "saving"}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {step === TOTAL_STEPS - 1 ? "Ver mi radiografía" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
}
