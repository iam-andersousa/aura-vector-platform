import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import aiBg from "@/assets/aura-vector-background.png";
import {
  AnalyticsFilters,
  Chip,
  Donut,
  InsightsBlock,
  Panel,
  PageHeader,
  ProgressBar,
  RoundedBars,
  SectionTitle,
  StatCard,
  TrendArea,
  VectorIcon,
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
  const [period, setPeriod] = useState<string>("Este mês");
  const [sector, setSector] = useState<string>("Todos");
  const [kpiPeriod, setKpiPeriod] = useState<string | null>(null);
  const [revenuePeriod, setRevenuePeriod] = useState<string | null>(null);
  const [funnelPeriod, setFunnelPeriod] = useState<string | null>(null);
  const [leadsPeriod, setLeadsPeriod] = useState<string | null>(null);
  const [cyclePeriod, setCyclePeriod] = useState<string | null>(null);

  const setPagePeriod = (value: string) => {
    setPeriod(value);
    setKpiPeriod(null);
    setRevenuePeriod(null);
    setFunnelPeriod(null);
    setLeadsPeriod(null);
    setCyclePeriod(null);
  };
  const filters = (
    <AnalyticsFilters
      period={period}
      onPeriod={setPagePeriod}
      sector={sector}
      onSector={setSector}
    />
  );
  const timeFilter = (value: string, onChange: (v: string) => void) => (
    <AnalyticsFilters
      period={value}
      onPeriod={onChange}
      sector="Todos"
      onSector={() => undefined}
      showSector={false}
    />
  );

  const visibleKpis = kpis.filter((k) => sector === "Todos" || k.area === sector);
  const visibleInsights = aiInsights.filter((i) => sector === "Todos" || i.tag === sector);

  return (
    <>
      <PageHeader
        eyebrow="Command Center"
        title="Clareza para vender, atender e crescer."
        subtitle="Marketing, vendas e apoio ao cliente na mesma visão de receita e relacionamento."
      >
        {filters}
        <Link
          to="/jornada"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Ver jornada
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section>
        <SectionTitle action={timeFilter(kpiPeriod ?? period, setKpiPeriod)}>
          Indicadores da operação
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {visibleKpis.map((k) => (
            <StatCard
              key={k.label}
              {...k}
              modalFilters={timeFilter(kpiPeriod ?? period, setKpiPeriod)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle action={<Chip tone="sales">Camada de apoio à decisão</Chip>}>
          Inteligência artificial
        </SectionTitle>
        <InsightsBlock
          title={visibleInsights[0]?.title ?? "Prioridades do Vector para este periodo"}
          body={
            visibleInsights[0]?.body ??
            "Acompanhe gargalos de receita, risco de churn e proximas acoes em uma unica leitura."
          }
          items={visibleInsights.flatMap((i) => i.actions)}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={timeFilter(revenuePeriod ?? period, setRevenuePeriod)}>
            Receita influenciada por mês
          </SectionTitle>
          <TrendArea data={revenueTrend} />
        </Panel>
        <Panel>
          <SectionTitle action={timeFilter(funnelPeriod ?? period, setFunnelPeriod)}>
            Conversão por etapa
          </SectionTitle>
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
                <button className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90">
                  <img
                    src={aiBg}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-black/35" />
                  <VectorIcon onDark className="relative h-3 w-3" />
                  <span className="relative">Ver contexto</span>
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle action={timeFilter(leadsPeriod ?? period, setLeadsPeriod)}>
            Leads por canal
          </SectionTitle>
          <Donut
            centerLabel="leads"
            data={[
              { label: "Meta Ads", value: 596 },
              { label: "Google Ads", value: 428 },
              { label: "LinkedIn Ads", value: 312 },
              { label: "RD Station", value: 184 },
              { label: "Orgânico", value: 141 },
            ]}
          />
        </Panel>
        <Panel>
          <SectionTitle action={timeFilter(cyclePeriod ?? period, setCyclePeriod)}>
            Tempo médio por etapa (dias)
          </SectionTitle>
          <RoundedBars
            data={[
              { label: "Qualif.", value: 3 },
              { label: "Agend.", value: 5 },
              { label: "Negoc.", value: 12 },
              { label: "Proposta", value: 9 },
              { label: "Onboard.", value: 14 },
            ]}
            color="var(--sales)"
          />
        </Panel>
      </section>
    </>
  );
}
