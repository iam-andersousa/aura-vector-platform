import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart } from "lucide-react";

import {
  Chip,
  PageHeader,
  Panel,
  ProgressBar,
  RoundedBars,
  SectionTitle,
  TrendArea,
} from "@/components/aura/ui";
import { reports } from "@/lib/aura-data";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Aura Vector" },
      {
        name: "description",
        content:
          "Receita por canal, conversão por etapa, gargalos, retenção, churn e produtividade por time.",
      },
      { property: "og:title", content: "Relatórios — Aura Vector" },
      {
        property: "og:description",
        content: "Do dado ao próximo passo, sem planilha no meio.",
      },
    ],
  }),
  component: RelatoriosPage,
});

const areaTone: Record<string, "mkt" | "sales" | "cs" | "neutral"> = {
  Marketing: "mkt",
  Vendas: "sales",
  "Apoio ao Cliente": "cs",
  RevOps: "neutral",
  IA: "neutral",
};

function RelatoriosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Relatórios"
        title="Do dado ao próximo passo, sem planilha no meio."
        subtitle="Relatórios prontos por time, com exportação e agendamento automático."
      >
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground">
          <Download className="h-4 w-4" />
          Exportar tudo
        </button>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle action={<Chip tone="sales">R$ mil</Chip>}>
            Receita por canal
          </SectionTitle>
          <RoundedBars
            data={[
              { label: "LinkedIn", value: 1420 },
              { label: "Google", value: 1180 },
              { label: "Orgânico", value: 540 },
              { label: "Meta", value: 320 },
              { label: "RD", value: 260 },
            ]}
          />
        </Panel>
        <Panel>
          <SectionTitle>Retenção e churn</SectionTitle>
          <TrendArea
            data={[
              { label: "Fev", value: 96 },
              { label: "Mar", value: 95 },
              { label: "Abr", value: 93 },
              { label: "Mai", value: 94 },
              { label: "Jun", value: 96 },
              { label: "Jul", value: 97 },
            ]}
            color="var(--cs)"
            height={180}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Churn de receita: 3,1% · Net revenue retention: 112%
          </p>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Tempo médio de resposta por canal</SectionTitle>
          <div className="space-y-4">
            {[
              ["WhatsApp", "3m 20s", 88],
              ["Telefone", "6m 12s", 72],
              ["E-mail", "1h 44m", 46],
              ["Chat do produto", "12m 05s", 61],
            ].map(([c, t, v]) => (
              <div key={c as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{c}</span>
                  <span className="text-muted-foreground">{t}</span>
                </div>
                <ProgressBar value={v as number} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle>Produtividade por time</SectionTitle>
          <RoundedBars
            data={[
              { label: "Marketing", value: 312 },
              { label: "SDR", value: 486 },
              { label: "Closers", value: 274 },
              { label: "CS", value: 358 },
            ]}
            color="var(--cs)"
            height={200}
          />
        </Panel>
      </section>

      <section>
        <SectionTitle>Biblioteca de relatórios</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reports.map((r) => (
            <Panel key={r.name} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <FileBarChart className="h-4 w-4 text-muted-foreground" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                <div className="mt-3">
                  <Chip tone={areaTone[r.area] ?? "neutral"}>{r.area}</Chip>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </section>
    </>
  );
}