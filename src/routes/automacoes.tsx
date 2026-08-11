import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Plus, Zap } from "lucide-react";
import { useState } from "react";

import { AiCard, Chip, PageHeader, Panel, SectionTitle, StatCard } from "@/components/aura/ui";
import { automations } from "@/lib/aura-data";

export const Route = createFileRoute("/automacoes")({
  head: () => ({
    meta: [
      { title: "Automações — Aura Vector" },
      {
        name: "description",
        content:
          "Fluxos simples de RevOps: alertas de speed to lead, risco de churn, follow-ups e oportunidades de expansão.",
      },
      { property: "og:title", content: "Automações — Aura Vector" },
      {
        property: "og:description",
        content: "Menos burocracia, mais ação no tempo certo.",
      },
    ],
  }),
  component: AutomacoesPage,
});

const areaTone: Record<string, "mkt" | "sales" | "cs"> = {
  Marketing: "mkt",
  Vendas: "sales",
  "Apoio ao Cliente": "cs",
};

function AutomacoesPage() {
  const [active, setActive] = useState(() => automations.map((a) => a.active));

  return (
    <>
      <PageHeader
        eyebrow="Automações"
        title="Menos burocracia, mais ação no tempo certo."
        subtitle="Fluxos simples que criam tarefas, alertam times e sinalizam risco automaticamente."
      >
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" />
          Nova automação
        </button>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Fluxos ativos" value="5" hint="de 6 configurados" />
        <StatCard label="Execuções no mês" value="845" delta="+22%" up />
        <StatCard label="Tarefas geradas" value="428" delta="+14%" up />
        <StatCard label="Alertas críticos" value="96" delta="-8" up hint="speed to lead" />
      </section>

      <section>
        <SectionTitle>Fluxos configurados</SectionTitle>
        <div className="space-y-3">
          {automations.map((a, i) => (
            <Panel key={a.name} className="flex flex-wrap items-center gap-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Zap className="h-4 w-4 text-sales" />
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-sm font-medium">{a.name}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5">{a.when}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="rounded-md bg-muted px-2 py-0.5">{a.then}</span>
                </p>
              </div>
              <Chip tone={areaTone[a.area] ?? "neutral"}>{a.area}</Chip>
              <span className="text-xs text-muted-foreground">{a.runs} execuções</span>
              <button
                onClick={() => setActive((prev) => prev.map((v, j) => (i === j ? !v : v)))}
                aria-label="Ativar automação"
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  active[i] ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${
                    active[i] ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </Panel>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Automações sugeridas pela IA</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AiCard
            tag="Vendas"
            title="Rodízio inteligente de leads"
            body="Distribuir leads de alto score para vendedores com melhor win rate no segmento."
          />
          <AiCard
            tag="Apoio ao Cliente"
            title="Alerta de queda de uso"
            body="Se o uso cair 30% em 14 dias, criar tarefa de checagem para o CS responsável."
          />
          <AiCard
            tag="Marketing"
            title="Feedback de qualidade para mídia"
            body="Enviar semanalmente o score médio por campanha para o time de mídia."
          />
        </div>
      </section>
    </>
  );
}
