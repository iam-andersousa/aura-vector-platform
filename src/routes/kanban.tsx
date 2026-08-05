import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

import { AiBadge, Chip, PageHeader } from "@/components/aura/ui";
import { kanbanCards, kanbanColumns } from "@/lib/aura-data";

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

const prioTone: Record<string, "danger" | "warning" | "neutral"> = {
  Alta: "danger",
  Média: "warning",
  Baixa: "neutral",
};

function KanbanPage() {
  const [query, setQuery] = useState("");

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
      </PageHeader>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanColumns.map((col) => {
          const cards = (kanbanCards[col.title] ?? []).filter((c) =>
            (c.name + c.company).toLowerCase().includes(query.toLowerCase()),
          );
          return (
            <div key={col.title} className="w-[280px] shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accentBar[col.accent]}`} />
                <p className="text-xs font-medium uppercase tracking-[0.14em]">
                  {col.title}
                </p>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {cards.length}
                </span>
              </div>
              <div className="space-y-3 rounded-2xl bg-muted/40 p-2">
                {cards.map((c) => (
                  <article
                    key={c.id}
                    className="surface cursor-grab p-4 transition-transform hover:-translate-y-0.5"
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
                      <div className="mt-3 border-t border-border pt-3">
                        <AiBadge>IA</AiBadge>
                        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                          {c.ai}
                        </p>
                      </div>
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
    </>
  );
}