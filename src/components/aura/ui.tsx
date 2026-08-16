import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import aiBg from "@/assets/aura-vector-background.png";
import vectorIconDark from "@/assets/vector-ai-dark.png";
import vectorIconLight from "@/assets/vector-ai-light.png";
import { useTheme } from "@/components/aura/theme";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4", className)}>
      <path
        fill="currentColor"
        d="M12 0c.7 4.6 2.9 7.6 7.3 8.9L24 12l-4.7 3.1C14.9 16.4 12.7 19.4 12 24c-.7-4.6-2.9-7.6-7.3-8.9L0 12l4.7-3.1C9.1 7.6 11.3 4.6 12 0Z"
      />
    </svg>
  );
}

/** Ícone oficial do Vector. `onDark` força a versão clara. */
export function VectorIcon({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const { theme } = useTheme();
  const src = onDark || theme === "dark" ? vectorIconLight : vectorIconDark;
  return <img src={src} alt="Vector" className={cn("h-6 w-6 object-contain", className)} />;
}

export function VectorSurface({
  children,
  className,
  contentClassName,
  iconClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <img src={aiBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className={cn("relative flex items-start gap-3 p-4 text-white", contentClassName)}>
        <VectorIcon onDark className={cn("mt-0.5 h-5 w-5 shrink-0", iconClassName)} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h1 className="mt-1.5 text-3xl font-display sm:text-4xl">{eyebrow}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="eyebrow">{children}</h2>
      {action}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("surface p-5 sm:p-6", className)}>{children}</div>;
}

const segmentName: Record<string, string> = {
  mkt: "Marketing",
  sales: "Vendas",
  cs: "Apoio ao Cliente",
};

const segmentTone: Record<string, string> = {
  mkt: "text-mkt",
  sales: "text-sales",
  cs: "text-cs",
};

export function StatCard({
  label,
  value,
  delta,
  up,
  hint,
  accent,
  trend,
  modalFilters,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  hint?: string;
  accent?: "mkt" | "sales" | "cs";
  trend?: number[];
  modalFilters?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const series = trend ?? [12, 18, 15, 22, 26, 24, 31];
  return (
    <>
      <div className="surface group relative overflow-hidden p-5">
        {trend ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%]">
            <MiniTrend data={trend} up={up !== false} />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-card) 22%, color-mix(in oklab, var(--color-card) 55%, transparent) 62%, transparent 100%)",
              }}
            />
          </div>
        ) : null}
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{label}</p>
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
          <div className="mt-2 flex items-center gap-2 pr-9 text-xs">
            {delta ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                  up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                )}
              >
                {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {delta}
              </span>
            ) : null}
            {hint ? <span className="text-muted-foreground">{hint}</span> : null}
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label={`Ver detalhes de ${label}`}
          className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <MetricModal
        open={open}
        onClose={() => setOpen(false)}
        label={label}
        value={value}
        delta={delta}
        up={up}
        hint={hint}
        accent={accent}
        series={series}
        filters={modalFilters}
      />
    </>
  );
}

function MetricModal({
  open,
  onClose,
  label,
  value,
  delta,
  up,
  hint,
  accent,
  series,
  filters,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  value: string;
  delta?: string | undefined;
  up?: boolean | undefined;
  hint?: string | undefined;
  accent?: "mkt" | "sales" | "cs" | undefined;
  series: number[];
  filters?: React.ReactNode;
}) {
  const months = ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];
  const data = series.map((v, i) => ({ label: months[i % months.length] ?? `P${i}`, value: v }));
  const avg = series.reduce((s, v) => s + v, 0) / Math.max(1, series.length);
  const tone = accent ? `var(--${accent})` : "var(--sales)";
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={label}
      className="max-w-2xl overflow-hidden p-5 sm:p-6"
      bodyClassName="mt-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
          {delta ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {up ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {delta}
            </span>
          ) : null}
          {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
          {accent ? <Chip tone={accent}>{segmentName[accent]}</Chip> : null}
        </div>
        {filters}
      </div>
      <p className="eyebrow mt-4">Evolução do indicador</p>
      <div className="mt-2">
        <TrendArea data={data} color={tone} height={150} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          ["Média do período", avg.toFixed(1)],
          ["Máximo", Math.max(...series).toString()],
          ["Mínimo", Math.min(...series).toString()],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-muted/60 px-3 py-2.5">
            <p className="text-[11px] text-muted-foreground">{k}</p>
            <p className="mt-1 text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <VectorSurface className="mt-4" contentClassName="p-3.5">
        <>
          <p className="text-sm font-medium">Leitura do Vector</p>
          <p className="mt-1 text-xs leading-relaxed text-white/82">
            {up === false
              ? `${label} está abaixo da média do período (${avg.toFixed(1)}). Recomendo revisar as etapas com maior tempo de resposta e acionar o responsável da área hoje.`
              : `${label} segue acima da média do período (${avg.toFixed(1)}). Mantenha o ritmo atual e replique a prática nas contas de mesmo perfil.`}
          </p>
        </>
      </VectorSurface>
    </Modal>
  );
}

export function MiniTrend({ data, up = true }: { data: number[]; up?: boolean }) {
  const gid = useId().replace(/:/g, "");
  const color = up ? "var(--success)" : "var(--destructive)";
  const points = data.map((value, i) => ({ i, value }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={points} margin={{ top: 18, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`mini-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#mini-${gid})`}
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({
  data,
  color = "var(--sales)",
  height = 34,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const points = data.map((value, i) => ({ i, value }));
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className,
  bodyClassName,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string | undefined;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="overlay-dim absolute inset-0" onClick={onClose} />
      <div
        className={cn(
          "surface relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-hidden p-6 shadow-2xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-display">{title}</h3>
            {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className={cn("mt-5", bodyClassName)}>{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

export function SegmentedFilter({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1",
        className,
      )}
    >
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-xs transition-colors",
            value === o
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Dot({
  accent = "sales",
  className,
}: {
  accent?: "mkt" | "sales" | "cs" | "success" | "warning" | "destructive";
  className?: string;
}) {
  const map: Record<string, string> = {
    mkt: "bg-mkt",
    sales: "bg-sales",
    cs: "bg-cs",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  };
  return <span className={cn("h-2 w-2 rounded-full", map[accent], className)} />;
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "mkt" | "sales" | "cs" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground",
    mkt: "bg-mkt/15 text-foreground",
    sales: "bg-sales/12 text-sales",
    cs: "bg-cs/12 text-cs",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/12 text-destructive",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Bloco único de insights do Vector: imagem de fundo com gradiente suave,
 * ícone oficial no canto superior esquerdo, resumo e seta para o modal
 * com as ações em formato de checklist.
 */
export function InsightsBlock({
  title,
  body,
  items,
  className,
}: {
  title: string;
  body: string;
  items: string[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  return (
    <>
      <div className={cn("relative overflow-hidden rounded-2xl", className)}>
        <img
          src={aiBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, oklch(0.18 0.03 265 / 18%) 0%, oklch(0.16 0.03 265 / 46%) 60%, oklch(0.14 0.02 265 / 66%) 100%)",
          }}
        />
        <div className="relative flex flex-col gap-5 p-6 sm:p-7">
          <VectorIcon onDark className="h-8 w-8" />
          <div className="max-w-2xl">
            <p className="text-xl font-display leading-snug text-white sm:text-2xl">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{body}</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            aria-label="Ver insights em detalhes"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        subtitle="Insights e ações recomendadas pelo Vector"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        <p className="eyebrow mt-6">Checklist de ações</p>
        <ul className="mt-3 space-y-2">
          {items.map((i) => {
            const checked = done.includes(i);
            return (
              <li key={i}>
                <button
                  onClick={() => setDone((p) => (checked ? p.filter((x) => x !== i) : [...p, i]))}
                  className="flex w-full items-start gap-3 rounded-xl bg-muted/60 px-3.5 py-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border",
                      checked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border",
                    )}
                  >
                    {checked ? <Check className="h-3 w-3" /> : null}
                  </span>
                  <span className={checked ? "text-muted-foreground line-through" : undefined}>
                    {i}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}

export function AiBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden rounded-full">
      <img src={aiBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-black/35" />
      <span className="relative inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium text-white">
        <VectorIcon onDark className="h-3 w-3" />
        {children}
      </span>
    </span>
  );
}

function useOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);
  return ref;
}

const iconTrigger =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-muted px-2.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground";

export const datePresets = [
  "Esta semana",
  "Este mês",
  "Este ano",
  "Período personalizado",
] as const;

function formatShortDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function DateFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const ref = useOutside(() => {
    setOpen(false);
    setCustom(false);
  });

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className={iconTrigger}>
        <CalendarDays className="h-4 w-4" />
        <span className="hidden sm:inline">{value}</span>
      </button>
      {open ? (
        <div className="surface absolute right-0 top-[calc(100%+8px)] z-50 w-[22rem] p-1.5 shadow-xl">
          {datePresets.map((p) => (
            <button
              key={p}
              onClick={() => {
                if (p === datePresets[3]) {
                  setCustom(true);
                  return;
                }
                onChange(p);
                setCustom(false);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted",
                value === p ? "text-primary" : "text-muted-foreground",
              )}
            >
              {p}
              {value === p ? <Check className="h-3.5 w-3.5" /> : null}
            </button>
          ))}
          {custom ? (
            <div className="mt-1 rounded-lg bg-muted/60 p-2">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                className="bg-transparent p-1 [--cell-size:2.15rem]"
              />
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <p className="text-[11px] text-muted-foreground">
                  {range?.from
                    ? range.to
                      ? `${formatShortDate(range.from)} - ${formatShortDate(range.to)}`
                      : `${formatShortDate(range.from)} - ...`
                    : "Selecione inicio e fim"}
                </p>
                <button
                  onClick={() => setRange(undefined)}
                  className="rounded-lg px-2 py-1 text-[11px] text-muted-foreground hover:bg-card"
                >
                  Limpar
                </button>
              </div>
              <button
                disabled={!range?.from || !range?.to}
                onClick={() => {
                  if (!range?.from || !range?.to) return;
                  onChange(`${formatShortDate(range.from)} - ${formatShortDate(range.to)}`);
                  setOpen(false);
                  setCustom(false);
                }}
                className="mt-2 w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
              >
                Aplicar intervalo
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export const sectorOptions = ["Todos", "Marketing", "Vendas", "Apoio ao Cliente"] as const;

export function CategoryFilter({
  value,
  onChange,
  options = sectorOptions,
}: {
  value: string;
  onChange: (v: string) => void;
  options?: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className={iconTrigger}>
        <Tag className="h-4 w-4" />
        <span className="hidden sm:inline">{value}</span>
      </button>
      {open ? (
        <div className="surface absolute right-0 top-[calc(100%+8px)] z-50 w-52 p-1.5 shadow-xl">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted",
                value === o ? "text-primary" : "text-muted-foreground",
              )}
            >
              {o}
              {value === o ? <Check className="h-3.5 w-3.5" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AnalyticsFilters({
  period,
  onPeriod,
  sector,
  onSector,
  showSector = true,
  className,
}: {
  period: string;
  onPeriod: (v: string) => void;
  sector: string;
  onSector: (v: string) => void;
  showSector?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex shrink-0 items-center gap-1.5", className)}>
      <DateFilter value={period} onChange={onPeriod} />
      {showSector ? <CategoryFilter value={sector} onChange={onSector} /> : null}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "sales",
}: {
  value: number;
  tone?: "mkt" | "sales" | "cs" | "success" | "warning" | "danger";
}) {
  const tones: Record<string, string> = {
    mkt: "bg-mkt",
    sales: "bg-sales",
    cs: "bg-cs",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

const chartTooltip = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    fontSize: 12,
    color: "var(--color-card-foreground)",
  },
  labelStyle: { color: "var(--color-muted-foreground)" },
};

export function RoundedBars({
  data,
  dataKey = "value",
  labelKey = "label",
  color = "var(--sales)",
  height = 240,
  highlight,
}: {
  data: Array<Record<string, string | number>>;
  dataKey?: string;
  labelKey?: string;
  color?: string;
  height?: number;
  highlight?: number;
}) {
  const avg = data.reduce((s, d) => s + Number(d[dataKey] ?? 0), 0) / Math.max(1, data.length);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 6" />
          <XAxis
            dataKey={labelKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <Tooltip cursor={{ fill: "var(--color-muted)" }} {...chartTooltip} />
          <ReferenceLine
            y={avg}
            stroke="var(--color-muted-foreground)"
            strokeDasharray="4 5"
            label={{
              value: "média",
              position: "insideTopRight",
              fill: "var(--color-muted-foreground)",
              fontSize: 10,
            }}
          />
          <Bar dataKey={dataKey} radius={[10, 10, 10, 10]} barSize={26}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={highlight === i ? "var(--cs)" : color}
                opacity={highlight === undefined || highlight === i ? 1 : 0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendArea({
  data,
  color = "var(--sales)",
  height = 220,
}: {
  data: Array<Record<string, string | number>>;
  color?: string;
  height?: number;
}) {
  const avg = data.reduce((s, d) => s + Number(d["value"] ?? 0), 0) / Math.max(1, data.length);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="auraArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 6" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <Tooltip {...chartTooltip} />
          <ReferenceLine
            y={avg}
            stroke="var(--color-muted-foreground)"
            strokeDasharray="4 5"
            label={{
              value: "média",
              position: "insideTopRight",
              fill: "var(--color-muted-foreground)",
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill="url(#auraArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Gauge({
  value,
  label,
  tone = "var(--sales)",
}: {
  value: number;
  label: string;
  tone?: string;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`}
        />
      </svg>
      <div>
        <p className="text-2xl font-display">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

const donutPalette = [
  "var(--sales)",
  "color-mix(in oklab, var(--sales) 72%, white)",
  "color-mix(in oklab, var(--sales) 48%, white)",
  "var(--cs)",
  "var(--mkt)",
  "var(--success)",
];

export function Donut({
  data,
  height = 260,
  centerLabel,
  unit = "",
}: {
  data: Array<{ label: string; value: number }>;
  height?: number;
  centerLabel?: string;
  unit?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative" style={{ height, width: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip {...chartTooltip} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={4}
              cornerRadius={12}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={donutPalette[i % donutPalette.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-display">
            {total.toLocaleString("pt-BR")}
            {unit}
          </p>
          <p className="eyebrow mt-1">{centerLabel ?? "Total"}</p>
        </div>
      </div>
      <ul className="min-w-[150px] flex-1 space-y-2.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: donutPalette[i % donutPalette.length] }}
            />
            <span className="flex-1 truncate">{d.label}</span>
            <span className="text-muted-foreground">
              {total ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HealthDots({ value }: { value: number }) {
  const filled = Math.round(value / 20);
  const tone = value >= 80 ? "bg-success" : value >= 60 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={cn("h-2 w-2 rounded-full", i < filled ? tone : "bg-muted")} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{value}</span>
    </div>
  );
}

export function Heatmap({
  rows,
  cols,
  tone = "var(--sales)",
}: {
  rows: Array<{ channel: string; cells: number[] }>;
  cols: string[];
  tone?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        <div
          className="grid gap-1.5 pl-32 text-[10px] text-muted-foreground"
          style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0,1fr))` }}
        >
          {cols.map((c) => (
            <span key={c} className="text-center">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-2 space-y-2">
          {rows.map((row) => (
            <div key={row.channel} className="flex items-center gap-1.5">
              <span className="w-32 shrink-0 truncate text-xs">{row.channel}</span>
              <div
                className="grid flex-1 gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${row.cells.length}, minmax(0,1fr))`,
                }}
              >
                {row.cells.map((v, i) => (
                  <div
                    key={i}
                    className="flex h-8 items-center justify-center rounded-lg text-[11px] font-semibold"
                    style={{
                      backgroundColor: tone,
                      opacity: 0.12 + (v / 100) * 0.85,
                      color: v > 38 ? "#fff" : "var(--color-foreground)",
                    }}
                  >
                    {v}%
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
