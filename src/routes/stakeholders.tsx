import { createFileRoute } from "@tanstack/react-router";
import { Building2, Mail, MessageSquare, PanelRightOpen, Phone, Plus, Search } from "lucide-react";
import { useState } from "react";

import {
  AiBadge,
  Chip,
  HealthDots,
  Modal,
  PageHeader,
  Panel,
  ProgressBar,
  SectionTitle,
  VectorSurface,
} from "@/components/aura/ui";
import { stakeholders, timeline } from "@/lib/aura-data";

export const Route = createFileRoute("/stakeholders")({
  head: () => ({
    meta: [
      { title: "Stakeholders — Aura Vector" },
      {
        name: "description",
        content:
          "Perfil completo de leads, clientes, usuários, parceiros e decisores em uma visão única de relacionamento.",
      },
      { property: "og:title", content: "Stakeholders — Aura Vector" },
      { property: "og:description", content: "Entenda cada relação antes de agir." },
    ],
  }),
  component: StakeholdersPage,
});

const typeTones: Record<string, "mkt" | "sales" | "cs" | "neutral"> = {
  Lead: "mkt",
  Cliente: "cs",
  Usuário: "neutral",
  Parceiro: "neutral",
  Decisor: "sales",
};

function StakeholdersPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todos");
  const [selectedId, setSelectedId] = useState(stakeholders[0]!.id);
  const [openNew, setOpenNew] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = stakeholders.filter(
    (s) =>
      (type === "Todos" || s.type === type) &&
      (s.name + s.company + s.status).toLowerCase().includes(query.toLowerCase()),
  );
  const selected = stakeholders.find((s) => s.id === selectedId) ?? stakeholders[0]!;

  return (
    <>
      <PageHeader
        eyebrow="Stakeholders"
        title="Entenda cada relação antes de agir."
        subtitle="Aura Vector não enxerga apenas “lead” ou “cliente” — enxerga cada stakeholder relevante para a receita."
      >
        <button
          onClick={() => setOpenNew(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Novo stakeholder
        </button>
      </PageHeader>

      <Modal
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Novo stakeholder"
        subtitle="Cadastre um lead, cliente, usuário, parceiro ou decisor."
        footer={
          <>
            <button
              onClick={() => setOpenNew(false)}
              className="rounded-xl border border-border px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              onClick={() => setOpenNew(false)}
              className="rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Salvar stakeholder
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Nome completo", "Ex.: Helena Duarte"],
            ["Empresa", "Ex.: Grupo Vertex"],
            ["E-mail", "nome@empresa.com"],
            ["Telefone", "+55 11 90000-0000"],
            ["Origem do contato", "Ex.: LinkedIn Ads"],
            ["Valor potencial", "Ex.: R$ 320k"],
          ].map(([label, ph]) => (
            <label key={label} className="block text-xs">
              <span className="text-muted-foreground">{label}</span>
              <input
                placeholder={ph}
                className="mt-1.5 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ))}
          <label className="block text-xs">
            <span className="text-muted-foreground">Tipo</span>
            <select className="mt-1.5 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40">
              {["Lead", "Cliente", "Usuário", "Parceiro", "Decisor"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-xs">
            <span className="text-muted-foreground">Responsável</span>
            <select className="mt-1.5 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40">
              {["Marina Souza", "Rafael Lima", "Camila Reis", "Ana Prado"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      </Modal>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">
        <Panel className="p-0 sm:p-0">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, empresa ou status"
                className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Todos", "Lead", "Cliente", "Usuário", "Parceiro", "Decisor"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                    type === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-[620px] divide-y divide-border overflow-y-auto">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedId(s.id);
                  setDetailsOpen(false);
                }}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors ${
                  s.id === selected.id ? "bg-accent/60" : "hover:bg-muted/50"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium">
                  {s.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.company} · {s.status}
                  </p>
                </div>
                <Chip tone={typeTones[s.type] ?? "neutral"}>{s.type}</Chip>
              </button>
            ))}
            {filtered.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">Nenhum stakeholder encontrado.</p>
            ) : null}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="gradient-aura flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-medium text-white">
                  {selected.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <h2 className="text-2xl font-display">{selected.name}</h2>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {selected.company}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip tone={typeTones[selected.type] ?? "neutral"}>{selected.type}</Chip>
                <Chip tone={selected.status === "Em risco" ? "danger" : "sales"}>
                  {selected.status}
                </Chip>
                <button
                  onClick={() => setDetailsOpen((open) => !open)}
                  aria-label="Abrir detalhes do stakeholder"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
                >
                  <PanelRightOpen className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {detailsOpen ? (
              <div className="mt-4 rounded-2xl border border-border bg-muted/35 p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Responsavel", selected.owner],
                    [
                      "E-mail",
                      `${selected.name.split(" ")[0].toLowerCase()}@${selected.company
                        .toLowerCase()
                        .replace(/\s+/g, "")
                        .replace(/[^a-z]/g, "")}.com.br`,
                    ],
                    ["Telefone", "+55 11 90000-0000"],
                    ["Negocio", `${selected.value} · ${selected.origin}`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-card/70 p-3">
                      <p className="text-[11px] text-muted-foreground">{k}</p>
                      <p className="mt-1 truncate text-sm font-medium">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Origem do contato", selected.origin],
                ["Jornada atual", selected.journey],
                ["Responsável", selected.owner],
                ["Valor potencial", selected.value],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted/60 p-3">
                  <p className="text-[11px] text-muted-foreground">{k}</p>
                  <p className="mt-1 text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Saúde do relacionamento</p>
                <div className="mt-3 space-y-3">
                  <HealthDots value={selected.health} />
                  <ProgressBar
                    value={selected.health}
                    tone={
                      selected.health >= 80
                        ? "success"
                        : selected.health >= 60
                          ? "warning"
                          : "danger"
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Última interação {selected.lastTouch} · prioridade{" "}
                    {selected.priority.toLowerCase()}
                  </p>
                </div>
              </div>
              <VectorSurface className="h-full" contentClassName="h-full p-4">
                <>
                  <p className="text-sm font-display">Próximo passo sugerido</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/82">
                    {selected.ai ?? "Registrar interação e confirmar próximo marco da jornada."}
                  </p>
                </>
              </VectorSurface>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Priorizar", selected.priority, "Ajustar cadencia pelo nivel de prioridade."],
                [
                  "Avancar jornada",
                  selected.journey,
                  "Confirmar o proximo marco com o responsavel.",
                ],
                [
                  "Proteger valor",
                  selected.value,
                  selected.ai ?? "Registrar interacao e revisar risco.",
                ],
              ].map(([title, meta, action]) => (
                <button
                  key={title}
                  className="rounded-xl bg-muted/60 p-3 text-left transition-colors hover:bg-muted"
                >
                  <p className="text-[11px] font-medium text-muted-foreground">{meta}</p>
                  <p className="mt-2 text-sm font-medium">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{action}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                [Phone, "Registrar call"],
                [Mail, "Enviar e-mail"],
                [MessageSquare, "WhatsApp"],
              ].map(([Icon, label], i) => {
                const I = Icon as typeof Phone;
                return (
                  <button
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <I className="h-3.5 w-3.5" />
                    {label as string}
                  </button>
                );
              })}
            </div>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-3">
            <Panel>
              <SectionTitle>Oportunidades</SectionTitle>
              <div className="space-y-3">
                {[
                  ["Plano RevOps Enterprise", selected.value, "Em negociação"],
                  ["Módulo Front Office", "R$ 85k", "Proposta enviada"],
                ].map(([n, v, s]) => (
                  <div key={n} className="rounded-xl bg-muted/60 p-3">
                    <p className="text-sm">{n}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {v} · {s}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <SectionTitle>Tickets</SectionTitle>
              <div className="space-y-3">
                {[
                  ["Integração Salesforce", "Aberto · SLA 82%", "danger"],
                  ["Dúvida sobre relatórios", "Resolvido", "success"],
                ].map(([n, s, tone]) => (
                  <div key={n} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm">{n}</p>
                      <p className="text-xs text-muted-foreground">{s}</p>
                    </div>
                    <Chip tone={tone as "danger" | "success"}>
                      {tone === "danger" ? "Crítico" : "OK"}
                    </Chip>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <SectionTitle>Tarefas abertas</SectionTitle>
              <div className="space-y-3 text-sm">
                {[
                  "Enviar proposta revisada",
                  "Agendar call técnica",
                  "Confirmar sponsor interno",
                ].map((t) => (
                  <label key={t} className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </Panel>
          </div>

          <Panel>
            <SectionTitle action={<AiBadge>Resumo automático</AiBadge>}>
              Histórico de interações
            </SectionTitle>
            <VectorSurface className="mb-5" contentClassName="p-3.5" iconClassName="h-4 w-4">
              <p className="text-xs leading-relaxed text-white/85">
                Vector detectou interesse ativo, objeção de integração e melhor resposta por
                WhatsApp.
              </p>
            </VectorSurface>
            <div className="space-y-5">
              {timeline.map((t) => (
                <div key={t.when} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-sales" />
                    <span className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <div className="pb-1">
                    <p className="text-xs text-muted-foreground">
                      {t.when} · {t.channel} · {t.who}
                    </p>
                    <p className="mt-1 text-sm">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
