import {
  ArrowUp,
  Check,
  ChevronDown,
  Coins,
  Gauge,
  Mic,
  Paperclip,
  Plug,
  Plus,
  Sliders,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import profilePic from "@/assets/profile-user.png.asset.json";
import { VectorIcon, VectorSurface } from "@/components/aura/ui";
import { integrations } from "@/lib/aura-data";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "user" | "assistant"; text: string };
export type UserProfile = { name: string; email: string; role: string; avatar: string };

const suggestions = [
  "Quais contas estão em risco de churn esta semana?",
  "Resuma as negociações paradas há mais de 7 dias",
  "Onde o funil está travando receita agora?",
  "Crie uma rotina de follow-up para leads sem contato",
];

const modes = [
  {
    id: "foco",
    label: "Foco",
    desc: "Raciocínio profundo, mais lento",
    icon: Gauge,
  },
  { id: "veloz", label: "Veloz", desc: "Mais rápido e menos elaborado", icon: Zap },
] as const;

const connectedApps = integrations
  .flatMap((g) => g.items.map(([name, status]) => ({ name, status })))
  .filter((i) => i.status === "Conectado")
  .slice(0, 12);

function Popover({
  label,
  icon: Icon,
  children,
  active,
}: {
  label: string;
  icon: typeof Plug;
  children: React.ReactNode;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors",
          open || active
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open ? (
        <div className="surface absolute bottom-[calc(100%+8px)] left-0 z-50 w-72 p-2 shadow-xl">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function ChatView({
  userProfile = {
    name: "Marina Souza",
    email: "marina@auravector.com",
    role: "Head de RevOps",
    avatar: profilePic.url,
  },
}: {
  userProfile?: UserProfile;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<string>("foco");
  const [tokenMode, setTokenMode] = useState<"auto" | "manual">("auto");
  const [manualUnit, setManualUnit] = useState<"dinheiro" | "tokens">("dinheiro");
  const [budget, setBudget] = useState(40);
  const [apps, setApps] = useState<string[]>(["HubSpot", "WhatsApp", "Slack"]);
  const [files, setFiles] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const selectedMode = modes.find((m) => m.id === mode) ?? modes[0];
  const hasInput = input.trim().length > 0;

  useEffect(() => {
    taRef.current?.focus();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const id = Date.now();
    setMessages((m) => [
      ...m,
      { id, role: "user", text: value },
      {
        id: id + 1,
        role: "assistant",
        text:
          mode === "foco"
            ? "Analisei marketing, vendas e apoio ao cliente do período selecionado. Três contas concentram o risco: Nova Lima Tech (health 48), Orbita Log (52) e Grupo Vertex (74, negociação parada há 9 dias). Recomendo QBR de resgate nas duas primeiras e proposta com dois cenários na terceira. Posso criar as tarefas nos apps conectados."
            : "Resumo rápido: 3 contas em risco (Nova Lima Tech, Orbita Log, Grupo Vertex) e 12 oportunidades sem follow-up. Quer que eu crie as tarefas?",
      },
    ]);
    setInput("");
    setFiles([]);
    requestAnimationFrame(() => taRef.current?.focus());
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] w-full max-w-3xl flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <VectorIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-display">Como posso ajudar hoje?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              O Vector lê marketing, vendas e apoio ao cliente para responder com contexto de
              receita e relacionamento.
            </p>
            <div className="mt-7 grid w-full gap-2 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="surface px-4 py-3 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end gap-3">
                  <p className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.text}
                  </p>
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/85">
                    <VectorIcon onDark className="h-5 w-5" />
                  </span>
                  <VectorSurface className="max-w-[85%]" contentClassName="p-3.5">
                    <p className="text-sm leading-relaxed text-white/90">{m.text}</p>
                  </VectorSurface>
                </div>
              ),
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="surface mt-4 p-3">
        {files.length ? (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {files.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                <Paperclip className="h-3 w-3" />
                {f}
              </span>
            ))}
          </div>
        ) : null}
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={2}
          placeholder="Pergunte ao Vector sobre contas, pipeline, campanhas ou atendimento…"
          className="w-full resize-none bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Anexar documentos e imagens"
            className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Paperclip className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Criar rotina / agente
          </button>

          <Popover label={`Apps (${apps.length})`} icon={Plug} active={apps.length > 0}>
            <p className="px-2 pb-1 pt-1 text-[11px] text-muted-foreground">
              Executar ações nos apps conectados
            </p>
            <div className="max-h-56 overflow-y-auto">
              {connectedApps.map((a) => {
                const on = apps.includes(a.name);
                return (
                  <button
                    key={a.name}
                    onClick={() =>
                      setApps((p) => (on ? p.filter((x) => x !== a.name) : [...p, a.name]))
                    }
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors hover:bg-muted"
                  >
                    <span className={on ? "text-foreground" : "text-muted-foreground"}>
                      {a.name}
                    </span>
                    {on ? <Check className="h-3.5 w-3.5 text-primary" /> : null}
                  </button>
                );
              })}
            </div>
          </Popover>

          <Popover label={selectedMode.label} icon={selectedMode.icon}>
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted"
              >
                <m.icon
                  className={cn(
                    "mt-0.5 h-4 w-4",
                    mode === m.id ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span>
                  <span className="block text-xs font-medium">{m.label}</span>
                  <span className="block text-[11px] text-muted-foreground">{m.desc}</span>
                </span>
                {mode === m.id ? (
                  <Check className="ml-auto mt-0.5 h-3.5 w-3.5 text-primary" />
                ) : null}
              </button>
            ))}
          </Popover>

          <Popover
            label={tokenMode === "auto" ? "Tokenomics: automatico" : "Tokenomics: manual"}
            icon={tokenMode === "auto" ? Coins : Sliders}
          >
            <div className="space-y-2 p-1">
              <button
                onClick={() => setTokenMode("auto")}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted",
                  tokenMode === "auto" && "bg-primary/10",
                )}
              >
                <Coins className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <span className="block text-xs font-medium">Automático (recomendado)</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Aumenta ou reduz o consumo conforme a complexidade da tarefa
                  </span>
                </span>
              </button>
              <button
                onClick={() => setTokenMode("manual")}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted",
                  tokenMode === "manual" && "bg-primary/10",
                )}
              >
                <Sliders className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>
                  <span className="block text-xs font-medium">Manual</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Defina o limite por dinheiro ou por tokens
                  </span>
                </span>
              </button>
              {tokenMode === "manual" ? (
                <div className="rounded-xl bg-muted/60 p-3">
                  <div className="flex gap-1.5">
                    {(["dinheiro", "tokens"] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setManualUnit(u)}
                        className={cn(
                          "flex-1 rounded-lg px-2 py-1.5 text-[11px] capitalize transition-colors",
                          manualUnit === u
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground",
                        )}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="mt-3 w-full accent-primary"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Limite por tarefa:{" "}
                    <span className="font-medium text-foreground">
                      {manualUnit === "dinheiro"
                        ? `R$ ${budget.toFixed(2).replace(".", ",")}`
                        : `${(budget * 1000).toLocaleString("pt-BR")} tokens`}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
          </Popover>

          <button
            onClick={() => send(input)}
            aria-label={hasInput ? "Enviar mensagem" : "Gravar audio"}
            className={cn(
              "ml-auto flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              hasInput
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {hasInput ? <ArrowUp className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
