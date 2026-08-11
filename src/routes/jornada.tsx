import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock, Sparkles } from "lucide-react";

import {
  AiCard,
  Chip,
  PageHeader,
  Panel,
  ProgressBar,
  RoundedBars,
  SectionTitle,
} from "@/components/aura/ui";

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Jornada 360 — Aura Vector" },
      {
        name: "description",
        content:
          "Da aquisição à expansão: métricas, gargalos, atrasos e ações recomendadas em cada etapa da jornada.",
      },
      { property: "og:title", content: "Jornada 360 — Aura Vector" },
      {
        property: "og:description",
        content: "Veja onde a receita está travando na jornada de relacionamento.",
      },
    ],
  }),
  component: JornadaPage,
});

const stages = [
  {
    name: "Aquisição",
    area: "Marketing",
    count: 4820,
    conv: 100,
    time: "—",
    status: "Saudável",
    tone: "mkt",
  },
  {
    name: "Qualificação",
    area: "Marketing",
    count: 1284,
    conv: 26.6,
    time: "3 dias",
    status: "Atenção",
    tone: "mkt",
  },
  {
    name: "Agendamento",
    area: "Vendas",
    count: 612,
    conv: 47.7,
    time: "5 dias",
    status: "Saudável",
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
    status: "Atenção",
    tone: "cs",
  },
  {
    name: "Suporte",
    area: "Apoio",
    count: 142,
    conv: 95.9,
    time: "contínuo",
    status: "Saudável",
    tone: "cs",
  },
  {
    name: "Retenção",
    area: "Apoio",
    count: 132,
    conv: 89.2,
    time: "contínuo",
    status: "Atenção",
    tone: "cs",
  },
  {
    name: "Expansão",
    area: "Apoio",
    count: 41,
    conv: 31.1,
    time: "26 dias",
    status: "Oportunidade",
    tone: "cs",
  },
] as const;

const statusTone: Record<string, "success" | "warning" | "danger" | "sales"> = {
  Saudável: "success",
  Atenção: "warning",
  Gargalo: "danger",
  Oportunidade: "sales",
};

function JornadaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jornada 360"
        title="Todo contexto do cliente em uma única tela."
        subtitle="Aquisição → Qualificação → Agendamento → Venda → Onboarding → Suporte → Retenção → Expansão"
      />

      <section>
        <SectionTitle action={<Chip tone="danger">2 gargalos ativos</Chip>}>
          Etapas da jornada
        </SectionTitle>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {stages.map((s, i) => (
            <div key={s.name} className="flex items-center gap-4">
              <div className="surface w-[220px] shrink-0 p-5">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{s.area}</p>
                  <Chip tone={statusTone[s.status] ?? "neutral"}>{s.status}</Chip>
                </div>
                <p className="mt-3 text-lg font-display">{s.name}</p>
                <p className="mt-1 text-2xl font-display">{s.count.toLocaleString("pt-BR")}</p>
                <div className="mt-3 space-y-2">
                  <ProgressBar value={s.conv} tone={s.tone} />
                  <p className="text-xs text-muted-foreground">Conversão {s.conv}%</p>
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
              { label: "Retenção", value: 16 },
            ]}
            color="var(--cs)"
          />
        </Panel>
        <Panel>
          <SectionTitle>Gargalos e atrasos</SectionTitle>
          <div className="space-y-4">
            {[
              ["Venda", "12 dias em média — 3x acima da meta", "danger"],
              ["Onboarding", "14 dias com 4 contas paradas", "warning"],
              ["Qualificação", "38% dos leads sem contato em 24h", "warning"],
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
          Ações recomendadas pela IA
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AiCard
            tag="Vendas"
            title="Reduzir ciclo da etapa Venda"
            body="Aplicar critério de saída obrigatório após 7 dias sem interação. Impacto estimado: -3 dias no ciclo."
          />
          <AiCard
            tag="Apoio ao Cliente"
            title="Padronizar kickoff de onboarding"
            body="4 contas sem kickoff agendado. Template automático reduz tempo de ativação em 22%."
          />
          <AiCard
            tag="Marketing"
            title="Reforçar qualificação de leads pagos"
            body="Adicionar 2 campos de fit no formulário de Meta Ads antes de enviar ao SDR."
          />
        </div>
      </section>
    </>
  );
}
