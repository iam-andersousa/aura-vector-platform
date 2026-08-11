import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertOctagon } from "lucide-react";

import {
  AiCard,
  Chip,
  Gauge,
  HealthDots,
  AnalyticsFilters,
  PageHeader,
  Panel,
  ProgressBar,
  RoundedBars,
  SectionTitle,
  StatCard,
} from "@/components/aura/ui";
import { accounts } from "@/lib/aura-data";

export const Route = createFileRoute("/apoio-ao-cliente")({
  head: () => ({
    meta: [
      { title: "Apoio ao Cliente — Aura Vector" },
      {
        name: "description",
        content:
          "CS, CX, suporte, atendimento e onboarding: health score, SLA, risco de churn e oportunidades de expansão.",
      },
      { property: "og:title", content: "Apoio ao Cliente — Aura Vector" },
      {
        property: "og:description",
        content: "Retenção começa por enxergar o cliente inteiro.",
      },
    ],
  }),
  component: ApoioPage,
});

const riskTone: Record<string, "danger" | "warning" | "success"> = {
  Alto: "danger",
  Médio: "warning",
  Baixo: "success",
};

function ApoioPage() {
  const [period, setPeriod] = useState<string>("Este mês");
  const [sector, setSector] = useState<string>("Todos");
  const filters = (
    <AnalyticsFilters
      period={period}
      onPeriod={setPeriod}
      sector={sector}
      onSector={setSector}
    />
  );
  return (
    <>
      <PageHeader
        eyebrow="Apoio ao Cliente"
        title="Retenção, experiência e expansão no mesmo lugar."
        subtitle="CS, CX, suporte, atendimento e onboarding operando com o mesmo contexto de vendas e marketing."
      >
        <Chip tone="cs">132 clientes ativos</Chip>
        {filters}
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clientes ativos" value="132" delta="+6" up accent="cs" />
        <StatCard label="Tickets abertos" value="48" delta="-11" up hint="13 críticos" accent="cs" />
        <StatCard label="SLA de resposta" value="93%" delta="+2,4%" up accent="cs" />
        <StatCard label="Risco de churn" value="7 contas" delta="+2" hint="R$ 1,1M em ARR" accent="cs" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel>
          <SectionTitle>Health score da base</SectionTitle>
          <Gauge value={78} label="média da base ativa" tone="var(--cs)" />
          <div className="mt-6 space-y-3">
            {[
              ["Saudável (80-100)", 68, "success"],
              ["Atenção (60-79)", 24, "warning"],
              ["Crítico (<60)", 8, "danger"],
            ].map(([l, v, t]) => (
              <div key={l as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{l}</span>
                  <span className="text-muted-foreground">{v}%</span>
                </div>
                <ProgressBar value={v as number} tone={t as "success"} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle>NPS / CSAT</SectionTitle>
          <div className="flex items-center gap-8">
            <Gauge value={54} label="NPS" tone="var(--cs)" />
            <Gauge value={87} label="CSAT" tone="var(--sales)" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Promotores: 62% · Neutros: 30% · Detratores: 8%
          </p>
        </Panel>
        <Panel>
          <SectionTitle>Solicitações recorrentes</SectionTitle>
          <div className="space-y-4">
            {[
              ["Exportação de relatórios", 34],
              ["Permissões por time", 26],
              ["Integração com ERP", 21],
              ["Alertas por WhatsApp", 19],
            ].map(([l, v]) => (
              <div key={l as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{l}</span>
                  <span className="text-muted-foreground">{v} pedidos</span>
                </div>
                <ProgressBar value={(v as number) * 2.5} tone="cs" />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2 overflow-x-auto">
          <SectionTitle action={<Chip tone="danger">2 contas críticas</Chip>}>
            Contas em acompanhamento
          </SectionTitle>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                {["Conta", "Health", "Tickets", "SLA", "NPS", "Etapa", "Risco"].map((h) => (
                  <th key={h} className="py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {accounts.map((a) => (
                <tr key={a.company} className="transition-colors hover:bg-muted/40">
                  <td className="py-4 font-medium">{a.company}</td>
                  <td className="py-4">
                    <HealthDots value={a.health} />
                  </td>
                  <td className="py-4">{a.tickets}</td>
                  <td className="py-4">{a.sla}</td>
                  <td className="py-4">{a.nps}</td>
                  <td className="py-4 text-muted-foreground">{a.stage}</td>
                  <td className="py-4">
                    <Chip tone={riskTone[a.risk] ?? "neutral"}>{a.risk}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel>
          <SectionTitle>Onboarding em andamento</SectionTitle>
          <div className="space-y-5">
            {[
              ["Clinix Saúde", 72, "Etapa 3 de 5"],
              ["Setta Educação", 40, "Etapa 2 de 5"],
              ["Ativa Seguros", 18, "Kickoff pendente"],
            ].map(([c, v, s]) => (
              <div key={c as string}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium">{c}</span>
                  <span className="text-muted-foreground">{s}</span>
                </div>
                <ProgressBar value={v as number} tone="cs" />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-destructive/8 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertOctagon className="h-4 w-4" /> Alertas de contas críticas
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Nova Lima Tech e Orbita Log: queda de uso + tickets recorrentes nos últimos 7 dias.
            </p>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle>Tickets por semana</SectionTitle>
          <RoundedBars
            data={[
              { label: "S1", value: 62 },
              { label: "S2", value: 55 },
              { label: "S3", value: 71 },
              { label: "S4", value: 48 },
              { label: "S5", value: 41 },
            ]}
            color="var(--cs)"
          />
        </Panel>
        <div className="grid gap-4">
          <AiCard
            tag="Retenção"
            title="Plano de resgate para Nova Lima Tech"
            body="Agendar QBR com sponsor, revisar adoção do módulo de relatórios e oferecer trilha de treinamento."
          />
          <AiCard
            tag="Expansão"
            title="Delta Agro pronto para upsell"
            body="Health 88 e uso acima do plano contratado — oportunidade de +2 squads."
          />
        </div>
      </section>
    </>
  );
}