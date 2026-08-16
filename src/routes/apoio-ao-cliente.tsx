import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertOctagon, ArrowUpDown } from "lucide-react";

import {
  Chip,
  Gauge,
  InsightsBlock,
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

type AccountSort = "health" | "tickets" | "sla" | "nps";

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
  const [sort, setSort] = useState<{ key: AccountSort; dir: "asc" | "desc" }>({
    key: "health",
    dir: "asc",
  });
  const setPagePeriod = (value: string) => {
    setPeriod(value);
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
  const sortedAccounts = [...accounts].sort((a, b) => {
    const read = (account: (typeof accounts)[number]) =>
      sort.key === "sla" ? Number(account.sla.replace("%", "")) : account[sort.key];
    const delta = Number(read(a)) - Number(read(b));
    return sort.dir === "asc" ? delta : -delta;
  });
  const sortButton = (key: AccountSort, label: string) => (
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
        eyebrow="Apoio ao Cliente"
        title="Retenção, experiência e expansão no mesmo lugar."
        subtitle="CS, CX, suporte, atendimento e onboarding operando com o mesmo contexto de vendas e marketing."
      >
        <Chip tone="cs">132 clientes ativos</Chip>
        {filters}
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Clientes ativos"
          value="132"
          delta="+6"
          up
          accent="cs"
          modalFilters={filters}
        />
        <StatCard
          label="Tickets abertos"
          value="48"
          delta="-11"
          up
          hint="13 críticos"
          accent="cs"
          modalFilters={filters}
        />
        <StatCard
          label="SLA de resposta"
          value="93%"
          delta="+2,4%"
          up
          accent="cs"
          modalFilters={filters}
        />
        <StatCard
          label="Risco de churn"
          value="7 contas"
          delta="+2"
          hint="R$ 1,1M em ARR"
          accent="cs"
          modalFilters={filters}
        />
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Panel>
            <SectionTitle>NPS</SectionTitle>
            <Gauge value={54} label="score atual" tone="var(--cs)" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                ["Promotores", "62%"],
                ["Neutros", "30%"],
                ["Detratores", "8%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted/60 px-2 py-2">
                  <p className="font-medium">{v}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <SectionTitle>CSAT</SectionTitle>
            <Gauge value={87} label="satisfação" tone="var(--sales)" />
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-muted/60 px-3 py-2">
                <p className="font-medium">4,6/5</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Nota média</p>
              </div>
              <div className="rounded-xl bg-muted/60 px-3 py-2">
                <p className="font-medium">312</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Respostas</p>
              </div>
            </div>
          </Panel>
        </div>
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
                <th className="py-3 font-medium">Conta</th>
                <th className="py-3 font-medium">{sortButton("health", "Health")}</th>
                <th className="py-3 font-medium">{sortButton("tickets", "Tickets")}</th>
                <th className="py-3 font-medium">{sortButton("sla", "SLA")}</th>
                <th className="py-3 font-medium">{sortButton("nps", "NPS")}</th>
                <th className="py-3 font-medium">Etapa</th>
                <th className="py-3 font-medium">Risco</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedAccounts.map((a) => (
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
        <InsightsBlock
          title="Proteger contas criticas e abrir espaco para expansao"
          body="Vector recomenda um plano de resgate para Nova Lima Tech e uma abordagem de upsell para Delta Agro."
          items={[
            "Agendar QBR com sponsor da Nova Lima Tech e revisar adocao do modulo de relatorios.",
            "Oferecer trilha de treinamento para reduzir tickets recorrentes.",
            "Abrir oportunidade de +2 squads para Delta Agro pelo uso acima do plano contratado.",
          ]}
        />
      </section>
    </>
  );
}
