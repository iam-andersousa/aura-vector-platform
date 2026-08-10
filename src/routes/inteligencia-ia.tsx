import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles } from "lucide-react";

import {
  AiCard,
  Chip,
  PageHeader,
  Panel,
  ProgressBar,
  SectionTitle,
  StatCard,
} from "@/components/aura/ui";
import { aiCapabilities } from "@/lib/aura-data";

export const Route = createFileRoute("/inteligencia-ia")({
  head: () => ({
    meta: [
      { title: "Inteligência IA — Aura Vector" },
      {
        name: "description",
        content:
          "Camada de IA para resumo de interações, priorização de leads, risco de churn e detecção de gargalos — sempre com controle humano.",
      },
      { property: "og:title", content: "Inteligência IA — Aura Vector" },
      {
        property: "og:description",
        content: "IA como apoio à decisão, não automação sem controle.",
      },
    ],
  }),
  component: IaPage,
});

function IaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inteligência IA"
        title="Apoio à decisão, com humano no comando."
        subtitle="Toda recomendação vem com contexto, justificativa e aprovação do time responsável."
      >
        <Chip tone="sales">
          <ShieldCheck className="h-3 w-3" /> Revisão humana obrigatória
        </Chip>
      </PageHeader>

      <section className="gradient-aura rounded-3xl p-[1.5px]">
        <div className="rounded-[calc(var(--radius-2xl))] bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <span className="gradient-aura inline-flex h-9 w-9 items-center justify-center rounded-full">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <h2 className="mt-4 text-2xl font-display">
                <span className="gradient-aura-text">Vector</span> lê o
                relacionamento inteiro
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sinais de campanha, conversas de venda e atendimento se combinam em
                recomendações claras: o que fazer, com quem e por quê.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Recomendações no mês" value="1.284" delta="+18%" up />
              <StatCard label="Aceitas pelo time" value="76%" delta="+5,1%" up />
              <StatCard label="Receita influenciada" value="R$ 940k" delta="+11%" up />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Capacidades</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aiCapabilities.map((c) => (
            <AiCard key={c.title} title={c.title} body={c.body} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Análise de sentimento por conta</SectionTitle>
          <div className="space-y-4">
            {[
              ["Delta Agro", 91, "success"],
              ["Clinix Saúde", 78, "success"],
              ["Belmar Retail", 61, "warning"],
              ["Orbita Log", 44, "danger"],
              ["Nova Lima Tech", 38, "danger"],
            ].map(([c, v, t]) => (
              <div key={c as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{c}</span>
                  <span className="text-muted-foreground">{v}/100</span>
                </div>
                <ProgressBar value={v as number} tone={t as "success"} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle>Resumo automático — última call</SectionTitle>
          <div className="rounded-2xl bg-muted/60 p-4 text-sm leading-relaxed">
            <p>
              Helena Duarte (Grupo Vertex) confirmou budget aprovado para o próximo
              trimestre. Principal risco: integração com Salesforce legado. Pediu
              proposta com dois cenários e um case do setor financeiro.
            </p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p className="eyebrow">Próximos passos sugeridos</p>
            {[
              "Enviar proposta com 2 cenários até quinta",
              "Anexar case Argo Fintech",
              "Envolver arquiteto de soluções na próxima call",
            ].map((s) => (
              <label key={s} className="flex items-center gap-2.5">
                <input type="checkbox" className="h-4 w-4 accent-primary" />
                <span className="text-sm">{s}</span>
              </label>
            ))}
          </div>
        </Panel>
      </section>
    </>
  );
}