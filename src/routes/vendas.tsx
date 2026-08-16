import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpDown, PhoneCall } from "lucide-react";

import {
  Chip,
  Gauge,
  InsightsBlock,
  AnalyticsFilters,
  PageHeader,
  Panel,
  ProgressBar,
  Donut,
  SectionTitle,
  StatCard,
  TrendArea,
} from "@/components/aura/ui";
import { objections, sellers } from "@/lib/aura-data";

type SellerSort = "deals" | "win" | "revenue" | "speed";

function moneyValue(value: string) {
  const multiplier = value.toLowerCase().includes("m")
    ? 1000000
    : value.toLowerCase().includes("k")
      ? 1000
      : 1;
  return Number(value.replace(/[^\d,.-]/g, "").replace(",", ".")) * multiplier;
}

function minutesValue(value: string) {
  const [minutes = "0", seconds = "0"] = value.replace("s", "").split("m");
  return Number(minutes.trim()) * 60 + Number(seconds.trim());
}

export const Route = createFileRoute("/vendas")({
  head: () => ({
    meta: [
      { title: "Vendas — Aura Vector" },
      {
        name: "description",
        content:
          "Pipeline comercial, speed to lead, show-up rate, objeções recorrentes e previsão de receita.",
      },
      { property: "og:title", content: "Vendas — Aura Vector" },
      {
        property: "og:description",
        content: "Seu time focado no que realmente move receita.",
      },
    ],
  }),
  component: VendasPage,
});

const pipeline = [
  { label: "Qualificado", value: 2100 },
  { label: "Agendado", value: 1750 },
  { label: "Negociação", value: 2900 },
  { label: "Proposta", value: 1600 },
  { label: "Fechamento", value: 750 },
];

const forecast = [
  { label: "Sem 1", value: 320 },
  { label: "Sem 2", value: 410 },
  { label: "Sem 3", value: 380 },
  { label: "Sem 4", value: 520 },
  { label: "Sem 5", value: 610 },
];

function VendasPage() {
  const [period, setPeriod] = useState<string>("Este mês");
  const [pipelinePeriod, setPipelinePeriod] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: SellerSort; dir: "asc" | "desc" }>({
    key: "revenue",
    dir: "desc",
  });
  const setPagePeriod = (value: string) => {
    setPeriod(value);
    setPipelinePeriod(null);
  };
  const filters = (
    <AnalyticsFilters
      period={period}
      onPeriod={setPagePeriod}
      sector="Todos"
      onSector={() => undefined}
      showSector={false}
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
  const sortedSellers = [...sellers].sort((a, b) => {
    const read = (s: (typeof sellers)[number]) => {
      if (sort.key === "revenue") return moneyValue(s.revenue);
      if (sort.key === "speed") return minutesValue(s.speed);
      return s[sort.key];
    };
    const delta = Number(read(a)) - Number(read(b));
    return sort.dir === "asc" ? delta : -delta;
  });
  const sortButton = (key: SellerSort, label: string) => (
    <button
      onClick={() =>
        setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }))
      }
      className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
  return (
    <>
      <PageHeader
        eyebrow="Vendas"
        title="Pipeline com contexto, não com achismo."
        subtitle="Cada oportunidade traz origem, histórico e o próximo passo recomendado."
      >
        <Chip tone="sales">216 oportunidades abertas</Chip>
        {filters}
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pipeline total"
          value="R$ 9,1M"
          delta="+6,2%"
          up
          accent="sales"
          modalFilters={filters}
        />
        <StatCard
          label="Speed to Lead"
          value="6m 12s"
          delta="-1m 40s"
          up
          hint="meta: 5 min"
          accent="sales"
          modalFilters={filters}
        />
        <StatCard
          label="Show-up rate"
          value="72%"
          delta="+4,2%"
          up
          accent="sales"
          modalFilters={filters}
        />
        <StatCard
          label="Taxa de fechamento"
          value="29,4%"
          delta="+1,8%"
          up
          accent="sales"
          modalFilters={filters}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={timeFilter(pipelinePeriod ?? period, setPipelinePeriod)}>
            Pipeline comercial por etapa
          </SectionTitle>
          <Donut data={pipeline} centerLabel="R$ mil" />
        </Panel>
        <Panel>
          <SectionTitle>Previsão de receita</SectionTitle>
          <TrendArea data={forecast} height={180} />
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Comprometido: R$ 1,4M</span>
            <span>Melhor caso: R$ 2,2M</span>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Conversão por vendedor</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 font-medium">Vendedor</th>
                  <th className="py-3 font-medium">{sortButton("deals", "Deals")}</th>
                  <th className="py-3 font-medium">{sortButton("win", "Win rate")}</th>
                  <th className="py-3 font-medium">{sortButton("revenue", "Receita")}</th>
                  <th className="py-3 font-medium">{sortButton("speed", "Speed")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedSellers.map((s) => (
                  <tr key={s.name}>
                    <td className="py-4 font-medium">{s.name}</td>
                    <td className="py-4">{s.deals}</td>
                    <td className="w-32 py-4">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={s.win * 2.5} />
                        <span className="text-xs text-muted-foreground">{s.win}%</span>
                      </div>
                    </td>
                    <td className="py-4">{s.revenue}</td>
                    <td className="py-4 text-muted-foreground">{s.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <SectionTitle>Objeções recorrentes</SectionTitle>
          <div className="space-y-4">
            {objections.map((o) => (
              <div key={o.label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{o.label}</span>
                  <span className="text-muted-foreground">{o.pct}%</span>
                </div>
                <ProgressBar value={o.pct * 3} tone="cs" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6 border-t border-border pt-6">
            <Gauge value={72} label="Show-up rate" />
            <div className="text-sm">
              <p className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-sales" /> 128 calls analisadas
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Tempo médio de fala do vendedor: 58% — meta abaixo de 45%.
              </p>
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={<Chip tone="warning">12 atrasados</Chip>}>
            Follow-ups pendentes
          </SectionTitle>
          <div className="divide-y divide-border">
            {[
              ["Juliana Beck", "Nexa Energia", "R$ 420k", "9 dias sem interação"],
              ["Helena Duarte", "Grupo Vertex", "R$ 320k", "Proposta aguardando retorno"],
              ["Rodrigo Paz", "Ativa Seguros", "R$ 110k", "Reunião remarcada 2x"],
              ["Sofia Mendes", "Belmar Retail", "R$ 140k", "Aguardando sponsor"],
            ].map(([n, c, v, s]) => (
              <div key={n} className="flex flex-wrap items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {n} <span className="text-muted-foreground">· {c}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{s}</p>
                </div>
                <Chip tone="sales">{v}</Chip>
                <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                  Agir agora
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <InsightsBlock
          title="Priorizar leads quentes e ajustar narrativa enterprise"
          body="Vector cruzou sinais de intencao, WhatsApp e chamadas para orientar o time nas proximas abordagens."
          items={[
            "Acionar os 4 leads com visita a pagina de preco e resposta rapida em WhatsApp.",
            "Apresentar ROI em 90 dias antes da faixa de investimento nas contas enterprise.",
            "Registrar a objecao principal nos deals parados ha mais de 7 dias.",
          ]}
        />
      </section>
    </>
  );
}
