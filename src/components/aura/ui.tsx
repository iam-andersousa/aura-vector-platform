import { ArrowDownRight, ArrowUpRight, Sparkles, X } from "lucide-react";
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

import aiBg from "@/assets/ai-bg.png.asset.json";
import { cn } from "@/lib/utils";

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
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-display sm:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
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

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("surface p-5 sm:p-6", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  delta,
  up,
  hint,
  accent,
  trend,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  hint?: string;
  accent?: "mkt" | "sales" | "cs";
  trend?: number[];
}) {
  const toneVar =
    accent === "mkt" ? "var(--mkt)" : accent === "cs" ? "var(--cs)" : "var(--sales)";
  return (
    <div className="surface p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          {label}
        </p>
        {accent ? <Dot accent={accent} /> : null}
      </div>
      <p className="mt-3 text-2xl font-display tracking-tight">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              up
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {delta}
          </span>
        ) : null}
        {hint ? <span className="text-muted-foreground">{hint}</span> : null}
      </div>
      {trend ? (
        <div className="mt-3">
          <Sparkline data={trend} color={toneVar} />
        </div>
      ) : null}
    </div>
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
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string | undefined;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="surface relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-display">{title}</h3>
            {subtitle ? (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
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
  return (
    <span className={cn("h-2 w-2 rounded-full", map[accent], className)} />
  );
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

export function AiCard({
  title,
  body,
  tag,
  className,
}: {
  title: string;
  body: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gradient-aura rounded-2xl p-[1.5px] shadow-sm transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-card">
        <img
          src={aiBg.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-card/78 backdrop-blur-[2px]" />
        <div className="relative p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="gradient-aura inline-flex h-7 w-7 items-center justify-center rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            {tag ? <Chip>{tag}</Chip> : null}
          </div>
          <p className="mt-4 text-sm font-display leading-snug">{title}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AiBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="gradient-aura inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white">
      <Sparkles className="h-2.5 w-2.5" />
      {children}
    </span>
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
  const avg =
    data.reduce((s, d) => s + Number(d[dataKey] ?? 0), 0) / Math.max(1, data.length);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="var(--color-border)"
            strokeDasharray="3 6"
          />
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
  const avg =
    data.reduce((s, d) => s + Number(d["value"] ?? 0), 0) / Math.max(1, data.length);
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
          <CartesianGrid
            vertical={false}
            stroke="var(--color-border)"
            strokeDasharray="3 6"
          />
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
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="8"
        />
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
  const tone =
    value >= 80 ? "bg-success" : value >= 60 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-2 rounded-full",
            i < filled ? tone : "bg-muted",
          )}
        />
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
          className="grid gap-2 pl-36 text-[11px] text-muted-foreground"
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
            <div key={row.channel} className="flex items-center gap-2">
              <span className="w-36 shrink-0 truncate text-xs">{row.channel}</span>
              <div
                className="grid flex-1 gap-2"
                style={{
                  gridTemplateColumns: `repeat(${row.cells.length}, minmax(0,1fr))`,
                }}
              >
                {row.cells.map((v, i) => (
                  <div
                    key={i}
                    className="flex h-10 items-center justify-center rounded-xl text-[11px] font-medium"
                    style={{
                      backgroundColor: tone,
                      opacity: 0.12 + (v / 100) * 0.85,
                      color: v > 55 ? "#fff" : "var(--color-foreground)",
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