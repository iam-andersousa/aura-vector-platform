import { createFileRoute } from "@tanstack/react-router";
import { Filter, LayoutGrid, Search, SplitSquareHorizontal } from "lucide-react";
import { useState } from "react";

import {
  Chip,
  HealthDots,
  Modal,
  PageHeader,
  ProgressBar,
  VectorSurface,
} from "@/components/aura/ui";
import { kanbanCards, kanbanColumns, type Stakeholder } from "@/lib/aura-data";

export const Route = createFileRoute("/kanban")({
  head: () => ({
    meta: [
      { title: "Kanban RevOps — Aura Vector" },
      {
        name: "description",
        content:
          "Do novo lead à expansão: um fluxo único de relacionamento entre marketing, vendas e apoio ao cliente.",
      },
      { property: "og:title", content: "Kanban RevOps — Aura Vector" },
      {
        property: "og:description",
        content: "Um fluxo, todos os times, o mesmo contexto.",
      },
    ],
  }),
  component: KanbanPage,
});

const accentBar: Record<string, string> = {
  mkt: "bg-mkt",
  sales: "bg-sales",
  cs: "bg-cs",
};

const accentBorder: Record<string, string> = {
  mkt: "border-mkt/55",
  sales: "border-sales/55",
  cs: "border-cs/55",
};

const stageBorder = [
  "border-mkt/55",
  "border-mkt/35",
  "border-sales/45",
  "border-sales/65",
  "border-sales/80",
  "border-success/65",
  "border-cs/45",
  "border-cs/65",
  "border-destructive/60",
  "border-cs/80",
] as const;

const prioTone: Record<string, "danger" | "warning" | "neutral"> = {
  Alta: "danger",
  Média: "warning",
  Baixa: "neutral",
};

function KanbanPage() {
  const [query, setQuery] = useState("");
  const [board, setBoard] = useState<Record<string, Stakeholder[]>>(() =>
    Object.fromEntries(kanbanColumns.map((c) => [c.title, [...(kanbanCards[c.title] ?? [])]])),
  );
  const [dragging, setDragging] = useState<{ from: string; id: string } | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);
  const [active, setActive] = useState<Stakeholder | null>(null);
  const [outlineMode, setOutlineMode] = useState<"area" | "stage">("area");

  const drop = (to: string) => {
    setOverCol(null);
    if (!dragging || dragging.from === to) return setDragging(null);
    setBoard((prev) => {
      const card = prev[dragging.from]?.find((c) => c.id === dragging.id);
      if (!card) return prev;
      return {
        ...prev,
        [dragging.from]: (prev[dragging.from] ?? []).filter((c) => c.id !== dragging.id),
        [to]: [{ ...card, status: to }, ...(prev[to] ?? [])],
      };
    });
    setDragging(null);
  };

  return (
    <>
      <PageHeader
        eyebrow="Kanban RevOps"
        title="Um fluxo, todos os times."
        subtitle="Leads, negociações, onboarding e expansão no mesmo quadro operacional."
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar cards"
            className="h-10 w-56 rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-4 w-4" />
          Meus cards
        </button>
        <div className="inline-flex rounded-xl bg-muted p-1">
          <button
            onClick={() => setOutlineMode("area")}
            aria-label="Contorno por área"
            className={`rounded-lg p-1.5 ${
              outlineMode === "area" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOutlineMode("stage")}
            aria-label="Contorno por etapa"
            className={`rounded-lg p-1.5 ${
              outlineMode === "stage" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            <SplitSquareHorizontal className="h-4 w-4" />
          </button>
        </div>
      </PageHeader>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanColumns.map((col, index) => {
          const cards = (board[col.title] ?? []).filter((c) =>
            (c.name + c.company).toLowerCase().includes(query.toLowerCase()),
          );
          return (
            <div
              key={col.title}
              className={`w-[280px] shrink-0 rounded-2xl border p-2 ${
                outlineMode === "area" ? accentBorder[col.accent] : stageBorder[index]
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col.title);
              }}
              onDragLeave={() => setOverCol((c) => (c === col.title ? null : c))}
              onDrop={() => drop(col.title)}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accentBar[col.accent]}`} />
                <p className="text-xs font-medium uppercase tracking-[0.14em]">{col.title}</p>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {cards.length}
                </span>
              </div>
              <div
                className={`min-h-[120px] space-y-3 rounded-2xl border border-dashed p-2 transition-colors ${
                  overCol === col.title
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-muted/40"
                }`}
              >
                {cards.map((c) => (
                  <article
                    key={c.id}
                    draggable
                    onDragStart={() => setDragging({ from: col.title, id: c.id })}
                    onDragEnd={() => setDragging(null)}
                    onClick={() => setActive(c)}
                    className={`surface cursor-grab p-4 transition-transform hover:-translate-y-0.5 active:cursor-grabbing ${
                      dragging?.id === c.id ? "opacity-40" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.company}</p>
                      </div>
                      <Chip tone={prioTone[c.priority] ?? "neutral"}>{c.priority}</Chip>
                    </div>
                    <p className="mt-3 text-lg font-display">{c.value}</p>
                    <div className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
                      <p>Origem: {c.origin}</p>
                      <p>Resp.: {c.owner}</p>
                      <p>Última interação: {c.lastTouch}</p>
                    </div>
                    {c.ai ? (
                      <VectorSurface
                        className="mt-3"
                        contentClassName="p-3"
                        iconClassName="h-4 w-4"
                      >
                        <p className="text-[11px] leading-relaxed text-white/85">{c.ai}</p>
                      </VectorSurface>
                    ) : (
                      <p className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
                        Próxima ação: registrar interação
                      </p>
                    )}
                  </article>
                ))}
                {cards.length === 0 ? (
                  <p className="p-4 text-[11px] text-muted-foreground">Sem cards</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.name ?? ""}
        subtitle={active ? `${active.company} · ${active.status}` : undefined}
        footer={
          <>
            <button
              onClick={() => setActive(null)}
              className="rounded-xl border border-border px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Fechar
            </button>
            <button className="rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Registrar interação
            </button>
          </>
        }
      >
        {active ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Chip tone={prioTone[active.priority] ?? "neutral"}>
                Prioridade {active.priority}
              </Chip>
              <Chip tone="sales">{active.value}</Chip>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Origem", active.origin],
                ["Jornada", active.journey],
                ["Responsável", active.owner],
                ["Última interação", active.lastTouch],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted/60 p-3">
                  <p className="text-[11px] text-muted-foreground">{k}</p>
                  <p className="mt-1 text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow">Saúde do relacionamento</p>
              <div className="mt-3 space-y-3">
                <HealthDots value={active.health} />
                <ProgressBar value={active.health} />
              </div>
            </div>
            {active.ai ? (
              <VectorSurface contentClassName="p-4">
                <>
                  <p className="text-sm font-display">Leitura do Vector</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{active.ai}</p>
                </>
              </VectorSurface>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </>
  );
}
