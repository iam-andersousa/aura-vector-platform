import {
  Bot,
  BookOpen,
  Check,
  FileBarChart,
  MoreHorizontal,
  Pencil,
  Plug,
  Plus,
  Repeat,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { StarMark } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

const links = [
  { label: "Recursos", icon: BookOpen },
  { label: "Agentes", icon: Bot },
  { label: "Rotinas", icon: Repeat },
  { label: "Relatórios", icon: FileBarChart },
  { label: "Plugins", icon: Plug },
] as const;

const initialChats = [
  "Contas em risco de churn",
  "Negociações paradas há 7 dias",
  "Plano de reativação Q3",
  "Campanhas com CPL alto",
  "Resumo semanal de RevOps",
];

export function ChatSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const [chats, setChats] = useState<string[]>(initialChats);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menu === null) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menu]);

  const used = 68;

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 p-3" ref={ref}>
      <button
        onClick={() => {
          setChats((c) => ["Nova conversa", ...c]);
          setActive(0);
        }}
        className={cn(
          "flex items-center gap-2.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
          collapsed && "justify-center px-0",
        )}
      >
        <Plus className="h-4 w-4 shrink-0" />
        {!collapsed ? "Nova conversa" : null}
      </button>

      <div className="space-y-0.5">
        {links.map((l) => (
          <button
            key={l.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <l.icon className="h-4 w-4 shrink-0" />
            {!collapsed ? l.label : null}
          </button>
        ))}
      </div>

      {!collapsed ? (
        <div className="min-h-0 flex-1 overflow-y-auto pt-2">
          <p className="eyebrow px-3 pb-2">Histórico</p>
          <div className="space-y-0.5">
            {chats.map((c, i) => (
              <div key={`${c}-${i}`} className="group relative">
                {editing === i ? (
                  <div className="flex items-center gap-1 px-1.5">
                    <input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setChats((p) => p.map((x, j) => (j === i ? draft || x : x)));
                          setEditing(null);
                        }
                        if (e.key === "Escape") setEditing(null);
                      }}
                      className="h-9 w-full rounded-lg bg-muted px-2.5 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <button
                      onClick={() => {
                        setChats((p) => p.map((x, j) => (j === i ? draft || x : x)));
                        setEditing(null);
                      }}
                      aria-label="Salvar nome"
                      className="rounded-lg p-1.5 text-primary"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-3 py-2 pr-8 text-left text-xs transition-colors",
                      active === i
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span className="truncate">{c}</span>
                  </button>
                )}
                {editing === i ? null : (
                  <button
                    onClick={() => setMenu(menu === i ? null : i)}
                    aria-label="Opções da conversa"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                )}
                {menu === i ? (
                  <div className="surface absolute right-1 top-[calc(100%-4px)] z-50 w-40 p-1.5 shadow-xl">
                    <button
                      onClick={() => {
                        setDraft(c);
                        setEditing(i);
                        setMenu(null);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Renomear
                    </button>
                    <button
                      onClick={() => {
                        setChats((p) => p.filter((_, j) => j !== i));
                        setMenu(null);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="shrink-0 space-y-2.5 border-t border-border/60 pt-3">
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Tokens usados</span>
              <span className="font-medium text-foreground">{used}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${used}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Budget restante: R$ 320,00 · 1,6M tokens
            </p>
          </div>
        ) : null}
        <button
          className={cn(
            "flex w-full items-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15",
            collapsed && "justify-center px-0",
          )}
        >
          <StarMark className="h-3.5 w-3.5 shrink-0" />
          {!collapsed ? "+ Créditos" : null}
        </button>
      </div>
    </div>
  );
}