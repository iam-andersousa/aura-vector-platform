import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { useState } from "react";

import { Chip, PageHeader, Panel, SectionTitle } from "@/components/aura/ui";
import { integrations } from "@/lib/aura-data";

export const Route = createFileRoute("/integracoes")({
  head: () => ({
    meta: [
      { title: "Integrações — Aura Vector" },
      {
        name: "description",
        content:
          "Conecte CRM, mídia, analytics, comunicação, atendimento, ERP e dados em uma única camada de relacionamento.",
      },
      { property: "og:title", content: "Integrações — Aura Vector" },
      {
        property: "og:description",
        content: "Seus dados de receita conversando entre si.",
      },
    ],
  }),
  component: IntegracoesPage,
});

const statusTone: Record<string, "success" | "sales" | "neutral" | "warning"> = {
  Conectado: "success",
  Disponível: "sales",
  "Em breve": "neutral",
  "Requer configuração": "warning",
};

const filters = ["Todos", "Conectado", "Disponível", "Requer configuração", "Em breve"];

function IntegracoesPage() {
  const [filter, setFilter] = useState("Todos");

  return (
    <>
      <PageHeader
        eyebrow="Integrações"
        title="Seus dados de receita conversando entre si."
        subtitle="28 conectores nativos para unificar marketing, vendas e apoio ao cliente."
      >
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHeader>

      {integrations.map((group) => {
        const items = group.items.filter(
          ([, status]) => filter === "Todos" || status === filter,
        );
        if (items.length === 0) return null;
        return (
          <section key={group.group}>
            <SectionTitle>{group.group}</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {items.map(([name, status]) => (
                <Panel key={name} className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                      <Plug className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <Chip tone={statusTone[status] ?? "neutral"}>{status}</Chip>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {status === "Conectado"
                        ? "Sincronizado há 4 min"
                        : status === "Requer configuração"
                          ? "Mapear campos obrigatórios"
                          : status === "Em breve"
                            ? "Em desenvolvimento"
                            : "Pronto para conectar"}
                    </p>
                  </div>
                  <button
                    disabled={status === "Em breve"}
                    className="mt-auto rounded-xl border border-border py-2 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                  >
                    {status === "Conectado"
                      ? "Gerenciar"
                      : status === "Em breve"
                        ? "Avise-me"
                        : "Conectar"}
                  </button>
                </Panel>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}