import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  AiCard,
  Chip,
  Heatmap,
  AnalyticsFilters,
  PageHeader,
  Panel,
  ProgressBar,
  Donut,
  SectionTitle,
  StatCard,
} from "@/components/aura/ui";
import { campaigns, channelMatrix } from "@/lib/aura-data";

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
  const [sector, setSector] = useState<string>("Todos");
  const filters = (
    <AnalyticsFilters period={period} onPeriod={setPeriod} sector={sector} onSector={setSector} />
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
        />
        <StatCard
          label="Qualidade média do lead"
          value="71"
          delta="-4,1"
          hint="score 0-100"
          accent="mkt"
        />
        <StatCard label="Receita atribuída" value="R$ 3,72M" delta="+14,2%" up accent="mkt" />
        <StatCard
          label="CPL médio"
          value="R$ 38"
          delta="-6,5%"
          up
          accent="mkt"
          hint="CAC estimado: R$ 4,1k"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={filters}>Canais de aquisição</SectionTitle>
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
                {["Campanha", "Canal", "Leads", "Qualidade", "CPL", "Receita", "Status"].map(
                  (h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {campaigns.map((c) => (
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
        <SectionTitle>Sugestões de IA para campanhas</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AiCard
            tag="Meta Ads"
            title="Pausar retargeting de público frio"
            body="Score médio 41 e conversão 5,4%. Realocar R$ 12k/mês para LinkedIn Ads."
          />
          <AiCard
            tag="LinkedIn Ads"
            title="Escalar campanha Front Office"
            body="Melhor receita por lead da base (R$ 4,5k). Espaço para +25% de budget sem saturação."
          />
          <AiCard
            tag="Conteúdo"
            title="Repetir webinar Jornada 360"
            body="Score 88 e R$ 540k atribuídos com custo zero de mídia."
          />
        </div>
      </section>
    </>
  );
}
