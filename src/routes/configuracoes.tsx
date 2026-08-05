import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Chip, PageHeader, Panel, SectionTitle } from "@/components/aura/ui";
import { useTheme } from "@/components/aura/theme";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Aura Vector" },
      {
        name: "description",
        content:
          "Times, permissões, SLA, preferências de IA e aparência da plataforma Aura Vector.",
      },
      { property: "og:title", content: "Configurações — Aura Vector" },
      {
        property: "og:description",
        content: "Ajuste a plataforma ao jeito da sua operação.",
      },
    ],
  }),
  component: ConfigPage,
});

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Alternar"
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function ConfigPage() {
  const { theme, toggle } = useTheme();
  const [prefs, setPrefs] = useState([true, true, false, true]);

  const prefLabels = [
    ["Sugestões de IA no Kanban", "Exibe badge e recomendação nos cards"],
    ["Alertas de speed to lead", "Notifica gestor após 5 minutos sem contato"],
    ["Envio automático de mensagens", "Mantido desativado: revisão humana obrigatória"],
    ["Resumo diário por e-mail", "Enviado às 8h para líderes de time"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Configurações"
        title="Ajuste a plataforma ao jeito da sua operação."
        subtitle="Times, SLA, aparência e limites da camada de inteligência."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Aparência</SectionTitle>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Modo escuro</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Tema atual: {theme === "dark" ? "escuro" : "claro"}
              </p>
            </div>
            <Toggle on={theme === "dark"} onClick={toggle} />
          </div>
        </Panel>
        <Panel>
          <SectionTitle>Workspace</SectionTitle>
          <div className="space-y-3 text-sm">
            {[
              ["Organização", "Aura Vector Demo"],
              ["Fuso horário", "America/Sao_Paulo"],
              ["Moeda", "BRL (R$)"],
              ["SLA padrão de resposta", "5 minutos"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <SectionTitle>Preferências de inteligência</SectionTitle>
        <Panel className="p-0 sm:p-0">
          <div className="divide-y divide-border">
            {prefLabels.map(([title, desc], i) => (
              <div key={title} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
                <Toggle
                  on={prefs[i] ?? false}
                  onClick={() => setPrefs((p) => p.map((v, j) => (i === j ? !v : v)))}
                />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <SectionTitle>Times e permissões</SectionTitle>
        <Panel className="overflow-x-auto p-0 sm:p-0">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                {["Pessoa", "Time", "Perfil", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Marina Souza", "RevOps", "Administrador", "Ativo"],
                ["Diego Alves", "Marketing", "Editor", "Ativo"],
                ["Rafael Lima", "Vendas", "Editor", "Ativo"],
                ["Camila Reis", "Apoio ao Cliente", "Editor", "Ativo"],
                ["Ana Prado", "Onboarding", "Operacional", "Convite pendente"],
              ].map(([n, t, p, s]) => (
                <tr key={n} className="transition-colors hover:bg-muted/40">
                  <td className="px-5 py-4 font-medium">{n}</td>
                  <td className="px-5 py-4 text-muted-foreground">{t}</td>
                  <td className="px-5 py-4">{p}</td>
                  <td className="px-5 py-4">
                    <Chip tone={s === "Ativo" ? "success" : "warning"}>{s}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </section>
    </>
  );
}