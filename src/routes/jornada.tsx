import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock, LayoutGrid, ListTree, Sparkles } from "lucide-react";
import { useState } from "react";

import {
  Chip,
  InsightsBlock,
  PageHeader,
  Panel,
  ProgressBar,
  RoundedBars,
  SectionTitle,
} from "@/components/aura/ui";

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Jornada - Aura Vector" },
      {
        name: "description",
        content:
          "Da aquisicao a expansao: metricas, gargalos, atrasos e acoes recomendadas em cada etapa da jornada.",
      },
      { property: "og:title", content: "Jornada - Aura Vector" },
      {
        property: "og:description",
        content: "Veja onde a receita esta travando na jornada de relacionamento.",
      },
    ],
  }),
  component: JornadaPage,
});

const stages = [
  {
    name: "Aquisicao",
    area: "Marketing",
    count: 4820,
    conv: 100,
    time: "-",
    status: "Saudavel",
    tone: "mkt",
  },
  {
    name: "Qualificacao",
    area: "Marketing",
    count: 1284,
    conv: 26.6,
    time: "3 dias",
    status: "Atencao",
    tone: "mkt",
  },
  {
    name: "Agendamento",
    area: "Vendas",
    count: 612,
    conv: 47.7,
    time: "5 dias",
    status: "Saudavel",
    tone: "sales",
  },
  {
    name: "Venda",
    area: "Vendas",
    count: 216,
    conv: 35.3,
    time: "12 dias",
    status: "Gargalo",
    tone: "sales",
  },
  {
    name: "Onboarding",
    area: "Apoio",
    count: 148,
    conv: 68.5,
    time: "14 dias",
    status: "Atencao",
    tone: "cs",
  },
  {
    name: "Suporte",
    area: "Apoio",
    count: 142,
    conv: 95.9,
    time: "continuo",
    status: "Saudavel",
    tone: "cs",
  },
  {
    name: "Retencao",
    area: "Apoio",
    count: 132,
    conv: 89.2,
    time: "continuo",
    status: "Atencao",
    tone: "cs",
  },
  {
    name: "Expansao",
    area: "Apoio",
    count: 41,
    conv: 31.1,
    time: "26 dias",
    status: "Oportunidade",
    tone: "cs",
  },
] as const;

const statusTone: Record<string, "success" | "warning" | "danger" | "sales"> = {
  Saudavel: "success",
  Atencao: "warning",
  Gargalo: "danger",
  Oportunidade: "sales",
};

const dotTone: Record<string, string> = {
  mkt: "bg-mkt",
  sales: "bg-sales",
  cs: "bg-cs",
};

function JornadaPage() {
  const [view, setView] = useState<"cards" | "timeline">("cards");

  return (
    <>
      <PageHeader
        eyebrow="Jornada"
        title="Todo contexto do cliente em uma unica tela."
        subtitle="Aquisicao -> Qualificacao -> Agendamento -> Venda -> Onboarding -> Suporte -> Retencao -> Expansao"
      />

      <section>
        <SectionTitle
          action={
            <div className="flex items-center gap-2">
              <Chip tone="danger">2 gargalos ativos</Chip>
              <div className="inline-flex rounded-xl bg-muted p-1">
                <button
                  onClick={() => setView("cards")}
                  aria-label="Ver em cards"
                  className={`rounded-lg p-1.5 ${
                    view === "cards" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("timeline")}
                  aria-label="Ver em timeline"
                  className={`rounded-lg p-1.5 ${
                    view === "timeline" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <ListTree className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          }
        >
          Etapas da jornada
        </SectionTitle>
        {view === "cards" ? (
          <div className="flex gap-4 overflow-x-auto pb-3">
            {stages.map((s, i) => (
              <div key={s.name} className="flex items-center gap-4">
                <div className="surface w-[220px] shrink-0 p-5">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">{s.area}</p>
                    <Chip tone={statusTone[s.status] ?? "neutral"}>{s.status}</Chip>
                  </div>
                  <p className="mt-3 text-lg font-display">{s.name}</p>
                  <p className="mt-1 text-2xl font-semibold">{s.count.toLocaleString("pt-BR")}</p>
                  <div className="mt-3 space-y-2">
                    <ProgressBar value={s.conv} tone={s.tone} />
                    <p className="text-xs text-muted-foreground">Conversao {s.conv}%</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {s.time}
                    </p>
                  </div>
                </div>
                {i < stages.length - 1 ? (
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <Panel>
            <div className="relative ml-2 space-y-4 before:absolute before:left-[9px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-border">
              {stages.map((s) => (
                <div key={s.name} className="relative flex gap-4">
                  <span
                    className={`relative z-10 mt-4 h-5 w-5 rounded-full border-4 border-card ${
                      dotTone[s.tone]
                    }`}
                  />
                  <div className="flex-1 rounded-xl bg-muted/50 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{s.name}</p>
                      <Chip tone={statusTone[s.status] ?? "neutral"}>{s.status}</Chip>
                      <span className="text-[11px] text-muted-foreground">{s.area}</span>
                    </div>
                    <div className="mt-2 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                      <span>{s.count.toLocaleString("pt-BR")} registros</span>
                      <span>{s.conv}% conversao</span>
                      <span>{s.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle>Perdas por etapa</SectionTitle>
          <RoundedBars
            data={[
              { label: "Qualif.", value: 3536 },
              { label: "Agend.", value: 672 },
              { label: "Venda", value: 396 },
              { label: "Onboard.", value: 68 },
              { label: "Retencao", value: 16 },
            ]}
            color="var(--cs)"
          />
        </Panel>
        <Panel>
          <SectionTitle>Gargalos e atrasos</SectionTitle>
          <div className="space-y-4">
            {[
              ["Venda", "12 dias em media - 3x acima da meta", "danger"],
              ["Onboarding", "14 dias com 4 contas paradas", "warning"],
              ["Qualificacao", "38% dos leads sem contato em 24h", "warning"],
            ].map(([stage, detail, tone]) => (
              <div key={stage} className="flex gap-3">
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    tone === "danger" ? "text-destructive" : "text-warning"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">{stage}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <SectionTitle action={<Sparkles className="h-4 w-4 text-sales" />}>
          Acoes recomendadas pela IA
        </SectionTitle>
        <InsightsBlock
          title="Remover gargalos da jornada ainda esta semana"
          body="Vector priorizou tres acoes para reduzir ciclo de venda, destravar onboarding e melhorar a qualificacao de leads pagos."
          items={[
            "Aplicar criterio de saida obrigatorio apos 7 dias sem interacao na etapa Venda.",
            "Padronizar kickoff de onboarding para as 4 contas sem agendamento.",
            "Adicionar 2 campos de fit no formulario de Meta Ads antes do envio ao SDR.",
          ]}
        />
      </section>
    </>
  );
}
