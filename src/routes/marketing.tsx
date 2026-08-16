import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

import {
  Chip,
  Heatmap,
  AnalyticsFilters,
  InsightsBlock,
  PageHeader,
  Panel,
  ProgressBar,
  Donut,
  SectionTitle,
  StatCard,
} from "@/components/aura/ui";
import { campaigns, channelMatrix } from "@/lib/aura-data";

type CampaignSort = "leads" | "quality" | "cpl" | "revenue";

function moneyValue(value: string) {
  const multiplier = value.toLowerCase().includes("m")
    ? 1000000
    : value.toLowerCase().includes("k")
      ? 1000
      : 1;
  return Number(value.replace(/[^\d,.-]/g, "").replace(",", ".")) * multiplier;
}

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing — Aura Vector" },
      {
        name: "description",
        content:
          "Campanhas, canais, qualidade de lead, CAC, CPL e receita atribuída com recomendações de otimização por IA.",
      },
      { property: "og:title", content: "Marketing — Aura Vector" },
      {
        property: "og:description",
        content: "Saiba qual campanha realmente gera receita.",
      },
    ],
  }),
  component: MarketingPage,
});

function MarketingPage() {
  const [period, setPeriod] = useState<string>("Este mês");
  const [channelsPeriod, setChannelsPeriod] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: CampaignSort; dir: "asc" | "desc" }>({
    key: "revenue",
    dir: "desc",
  });
  const setPagePeriod = (value: string) => {
    setPeriod(value);
    setChannelsPeriod(null);
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
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const read = (c: (typeof campaigns)[number]) =>
      sort.key === "cpl" || sort.key === "revenue" ? moneyValue(c[sort.key]) : c[sort.key];
    const delta = Number(read(a)) - Number(read(b));
    return sort.dir === "asc" ? delta : -delta;
  });
  const sortButton = (key: CampaignSort, label: string) => (
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
        eyebrow="Marketing"
        title="Demanda que vira receita, não só volume."
        subtitle="Qualidade de lead, atribuição e eficiência de canal em uma leitura só."
      >
        <Chip tone="mkt">
          <span className="h-2 w-2 rounded-full bg-mkt" /> 5 campanhas ativas
        </Chip>
        {filters}
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Leads gerados"
          value="1.661"
          delta="+9,4%"
          up
          accent="mkt"
          hint="90 dias"
          modalFilters={filters}
        />
        <StatCard
          label="Qualidade média do lead"
          value="71"
          delta="-4,1"
          hint="score 0-100"
          accent="mkt"
          modalFilters={filters}
        />
        <StatCard
          label="Receita atribuída"
          value="R$ 3,72M"
          delta="+14,2%"
          up
          accent="mkt"
          modalFilters={filters}
        />
        <StatCard
          label="CPL médio"
          value="R$ 38"
          delta="-6,5%"
          up
          accent="mkt"
          hint="CAC estimado: R$ 4,1k"
          modalFilters={filters}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={timeFilter(channelsPeriod ?? period, setChannelsPeriod)}>
            Canais de aquisição
          </SectionTitle>
          <Donut
            centerLabel="leads"
            data={campaigns.map((c) => ({ label: c.channel, value: c.leads }))}
          />
        </Panel>
        <Panel>
          <SectionTitle>Conversão por canal</SectionTitle>
          <div className="space-y-4">
            {[
              ["LinkedIn Ads", 18.4],
              ["Google Ads", 15.1],
              ["Orgânico", 22.6],
              ["RD Station", 11.8],
              ["Meta Ads", 5.4],
            ].map(([c, v]) => (
              <div key={c as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{c}</span>
                  <span className="text-muted-foreground">{v}%</span>
                </div>
                <ProgressBar value={(v as number) * 4} tone="mkt" />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <SectionTitle action={<Chip>Heatmap de campanhas</Chip>}>
          Matriz canal x qualidade do lead
        </SectionTitle>
        <Panel>
          <Heatmap
            rows={channelMatrix}
            cols={["Score 0-25", "26-50", "51-75", "76-100"]}
            tone="var(--mkt)"
          />
        </Panel>
      </section>

      <section>
        <SectionTitle>Campanhas ativas</SectionTitle>
        <Panel className="overflow-x-auto p-0 sm:p-0">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Campanha</th>
                <th className="px-5 py-3 font-medium">Canal</th>
                <th className="px-5 py-3 font-medium">{sortButton("leads", "Leads")}</th>
                <th className="px-5 py-3 font-medium">{sortButton("quality", "Qualidade")}</th>
                <th className="px-5 py-3 font-medium">{sortButton("cpl", "CPL")}</th>
                <th className="px-5 py-3 font-medium">{sortButton("revenue", "Receita")}</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedCampaigns.map((c) => (
                <tr key={c.name} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium">{c.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.channel}</td>
                  <td className="px-5 py-4">{c.leads}</td>
                  <td className="w-40 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={c.quality} tone={c.quality < 50 ? "danger" : "mkt"} />
                      <span className="text-xs text-muted-foreground">{c.quality}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">{c.cpl}</td>
                  <td className="px-5 py-4">{c.revenue}</td>
                  <td className="px-5 py-4">
                    <Chip tone={c.status === "Ativa" ? "success" : "warning"}>{c.status}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </section>

      <section>
        <SectionTitle>Sugestoes de IA para campanhas</SectionTitle>
        <InsightsBlock
          title="Otimizar verba para canais com maior receita atribuida"
          body="Vector encontrou sinais para reduzir desperdicio em publico frio, escalar LinkedIn Ads e repetir o webinar Jornada."
          items={[
            "Pausar retargeting de publico frio e realocar R$ 12k/mes para LinkedIn Ads.",
            "Escalar a campanha Front Office em 25% sem saturar a audiencia.",
            "Repetir o webinar Jornada com foco em leads de score acima de 80.",
          ]}
        />
      </section>
    </>
  );
}
