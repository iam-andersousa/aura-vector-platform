import {
  Bot,
  ChevronDown,
  Check,
  FileBarChart,
  FileText,
  MoreHorizontal,
  Network,
  Pencil,
  Plug,
  Plus,
  Repeat,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import aiBg from "@/assets/aura-vector-background.png";
import { VectorIcon } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

const links = [
  { label: "Agentes", icon: Bot },
  { label: "Rotinas", icon: Repeat },
  { label: "Enxames", icon: Network },
] as const;

const resourceLinks = [
  { label: "Plugins", icon: Plug },
  { label: "Relatórios", icon: FileBarChart },
  { label: "Documentos", icon: FileText },
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
  const [openGroup, setOpenGroup] = useState<"workflows" | "resources" | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menu === null && openGroup === null) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenu(null);
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menu, openGroup]);

  const used = 68;
  const groups = [
    { id: "workflows" as const, label: "Workflows", icon: Bot, items: links },
    { id: "resources" as const, label: "Recursos", icon: Plug, items: resourceLinks },
  ];

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

      <div className="space-y-1">
        {groups.map((group) => {
          const GroupIcon = group.icon;
          const expanded = openGroup === group.id;
          return (
            <div key={group.id} className="relative">
              <button
                onClick={() => setOpenGroup(expanded ? null : group.id)}
                aria-expanded={expanded}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  expanded && "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                <GroupIcon className="h-4 w-4 shrink-0" />
                {!collapsed ? <span className="flex-1 text-left">{group.label}</span> : null}
                {!collapsed ? (
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
                  />
                ) : null}
              </button>
              {expanded ? (
                <div
                  className={cn(
                    "surface absolute z-[100] w-52 p-1.5 shadow-2xl ring-1 ring-border/60",
                    collapsed ? "left-[calc(100%+10px)] top-0" : "left-0 top-[calc(100%+6px)]",
                  )}
                >
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => setOpenGroup(null)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ItemIcon className="h-3.5 w-3.5 shrink-0" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
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
            "relative flex w-full items-center gap-2 overflow-hidden rounded-xl px-3 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90",
            collapsed && "justify-center px-0",
          )}
        >
          <img
            src={aiBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/35" />
          <VectorIcon onDark className="relative h-3.5 w-3.5 shrink-0" />
          {!collapsed ? <span className="relative">+ Créditos</span> : null}
        </button>
      </div>
    </div>
  );
}
