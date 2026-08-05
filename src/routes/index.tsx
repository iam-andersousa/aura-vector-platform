import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Sparkles } from "lucide-react";

import { RevOpsVenn } from "@/components/aura/RevOpsVenn";
import {
  AiCard,
  Chip,
  Panel,
  PageHeader,
  ProgressBar,
  RoundedBars,
  SectionTitle,
  StatCard,
  TrendArea,
} from "@/components/aura/ui";
import { aiInsights, funnel, kpis, nextActions } from "@/lib/aura-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Center — Aura Vector" },
      {
        name: "description",
        content:
          "Visão executiva de receita influenciada, pipeline, risco de churn e próximas ações recomendadas.",
      },
      { property: "og:title", content: "Command Center — Aura Vector" },
      {
        property: "og:description",
        content: "Todo contexto do cliente em uma única tela.",
      },
    ],
  }),
  component: CommandCenter,
});

const revenueTrend = [
  { label: "Jan", value: 420 },
  { label: "Fev", value: 480 },
  { label: "Mar", value: 512 },
  { label: "Abr", value: 604 },
  { label: "Mai", value: 588 },
  { label: "Jun", value: 712 },
  { label: "Jul", value: 806 },
];

const areaTone: Record<string, "mkt" | "sales" | "cs"> = {
  Marketing: "mkt",
  Vendas: "sales",
  "Apoio ao Cliente": "cs",
};

function CommandCenter() {
  return (
    <>
      <PageHeader
        eyebrow="Command Center"
        title="Clareza para vender, atender e crescer."
        subtitle="Marketing, vendas e apoio ao cliente na mesma visão de receita e relacionamento."
      >
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-4 w-4" />
          Últimos 90 dias
        </button>
        <Link
          to="/jornada"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Ver jornada 360
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section>
        <SectionTitle>Indicadores da operação</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <StatCard key={k.label} {...k} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle action={<Chip tone="sales">Camada de apoio à decisão</Chip>}>
          Inteligência artificial
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aiInsights.map((i) => (
            <AiCard key={i.title} {...i} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={<Chip tone="sales">R$ 4,82M</Chip>}>
            Receita influenciada por mês
          </SectionTitle>
          <TrendArea data={revenueTrend} />
        </Panel>
        <Panel>
          <SectionTitle>Conversão por etapa</SectionTitle>
          <div className="space-y-4">
            {funnel.map((f) => (
              <div key={f.stage}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span>{f.stage}</span>
                  <span className="text-muted-foreground">
                    {f.value.toLocaleString("pt-BR")} · {f.conv}%
                  </span>
                </div>
                <ProgressBar value={f.conv} tone={f.conv < 35 ? "warning" : "sales"} />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <SectionTitle>Interseção RevOps</SectionTitle>
        <RevOpsVenn />
      </section>

      <section>
        <SectionTitle action={<Chip>5 pendências hoje</Chip>}>
          Próximas ações recomendadas
        </SectionTitle>
        <Panel className="p-0 sm:p-0">
          <div className="divide-y divide-border">
            {nextActions.map((a) => (
              <div
                key={a.what}
                className="flex flex-wrap items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[11px] font-medium">
                  {a.who
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{a.what}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.who} · {a.when}
                  </p>
                </div>
                <Chip tone={areaTone[a.area] ?? "neutral"}>{a.area}</Chip>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                  <Sparkles className="h-3 w-3" />
                  Ver contexto
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Leads por canal</SectionTitle>
          <RoundedBars
            data={[
              { label: "LinkedIn", value: 312 },
              { label: "Google", value: 428 },
              { label: "Meta", value: 596 },
              { label: "RD", value: 184 },
              { label: "Orgânico", value: 141 },
            ]}
            highlight={2}
          />
        </Panel>
        <Panel>
          <SectionTitle>Tempo médio por etapa (dias)</SectionTitle>
          <RoundedBars
            data={[
              { label: "Qualif.", value: 3 },
              { label: "Agend.", value: 5 },
              { label: "Negoc.", value: 12 },
              { label: "Proposta", value: 9 },
              { label: "Onboard.", value: 14 },
            ]}
            color="var(--cs)"
          />
        </Panel>
      </section>
    </>
  );
}
