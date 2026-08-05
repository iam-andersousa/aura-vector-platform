import { Sparkles } from "lucide-react";

const intersections = [
  {
    title: "Marketing + Vendas",
    label: "Geração e conversão de demanda",
    body: "Qualidade de lead, speed to lead e receita atribuída no mesmo painel.",
    tone: "from-mkt/15 to-sales/15",
  },
  {
    title: "Vendas + Apoio ao Cliente",
    label: "Handoff, onboarding e expansão",
    body: "Contexto da venda segue para o onboarding sem retrabalho.",
    tone: "from-sales/15 to-cs/15",
  },
  {
    title: "Marketing + Apoio ao Cliente",
    label: "Experiência, voz do cliente e retenção",
    body: "Sinais de suporte e NPS realimentam mensagem e segmentação.",
    tone: "from-cs/15 to-mkt/15",
  },
];

export function RevOpsVenn() {
  return (
    <div className="surface grid gap-8 p-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:p-8">
      <div className="relative mx-auto aspect-square w-full max-w-[400px]">
        <div className="absolute left-1/2 top-0 h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-mkt/45 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 left-0 h-[62%] w-[62%] rounded-full bg-sales/45 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 right-0 h-[62%] w-[62%] rounded-full bg-cs/45 mix-blend-multiply dark:mix-blend-screen" />

        <span className="absolute left-1/2 top-[8%] -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80">
          Marketing
        </span>
        <span className="absolute bottom-[10%] left-[4%] text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80">
          Vendas
        </span>
        <span className="absolute bottom-[10%] right-[2%] text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80">
          Apoio
        </span>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border bg-card text-center shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-sales" />
          <p className="mt-1 px-2 text-[10px] leading-tight font-display">
            Inteligência de relacionamento e receita
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <p className="text-lg font-display">
          A plataforma que conecta relacionamento, receita e retenção.
        </p>
        {intersections.map((i) => (
          <div
            key={i.title}
            className={`rounded-2xl bg-gradient-to-r ${i.tone} p-4`}
          >
            <p className="eyebrow">{i.title}</p>
            <p className="mt-1.5 text-sm font-display">{i.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}