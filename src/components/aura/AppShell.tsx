import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  ChevronLeft,
  ChevronUp,
  FileBarChart,
  Gauge,
  HelpCircle,
  KanbanSquare,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Megaphone,
  Menu,
  Moon,
  Plug,
  Plus,
  Route as RouteIcon,
  Rocket,
  Search,
  Settings,
  Sun,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";
import markDark from "@/assets/aura-mark-dark.png.asset.json";
import markWhite from "@/assets/aura-mark-white.png.asset.json";
import profilePic from "@/assets/profile-user.png.asset.json";
import { ChatView } from "@/components/aura/ChatView";
import { ChatSidebar } from "@/components/aura/ChatSidebar";
import { SettingsModal } from "@/components/aura/SettingsModal";
import { useTheme } from "@/components/aura/theme";
import { StarMark } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Command Center", icon: LayoutGrid },
  { to: "/stakeholders", label: "Stakeholders", icon: Users },
  { to: "/jornada", label: "Jornada 360", icon: RouteIcon },
  { to: "/marketing", label: "Marketing", icon: Megaphone },
  { to: "/vendas", label: "Vendas", icon: Gauge },
  { to: "/apoio-ao-cliente", label: "Apoio ao Cliente", icon: LifeBuoy },
  { to: "/kanban", label: "Kanban RevOps", icon: KanbanSquare },
  { to: "/inteligencia-ia", label: "Inteligência IA", icon: Bot },
  { to: "/integracoes", label: "Integrações", icon: Plug },
  { to: "/automacoes", label: "Automações", icon: Workflow },
  { to: "/relatorios", label: "Relatórios", icon: FileBarChart },
] as const;

function Logo({ collapsed }: { collapsed: boolean }) {
  const { theme } = useTheme();
  if (collapsed) {
    return (
      <img
        src={theme === "dark" ? markWhite.url : markDark.url}
        alt="Aura Vector"
        className="h-14 w-14"
      />
    );
  }
  return (
    <img
      src={theme === "dark" ? logoLight.url : logoDark.url}
      alt="Aura Vector"
      className="h-[72px] w-auto max-w-full object-contain object-left"
    />
  );
}

function UserMenu({
  collapsed,
  onSettings,
}: {
  collapsed?: boolean;
  onSettings: () => void;
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

  const items = [
    { label: "Configurações", icon: Settings, action: onSettings },
    { label: "Fazer upgrade", icon: Rocket },
    { label: "Ajuda & suporte", icon: HelpCircle },
    { label: "Sair", icon: LogOut },
  ] as const;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-muted",
          collapsed && "justify-center",
        )}
      >
        <img
          src={profilePic.url}
          alt="Marina Souza"
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        {!collapsed ? (
          <>
            <div className="min-w-0 flex-1 text-left leading-tight">
              <p className="truncate text-xs font-medium">Marina Souza</p>
              <p className="truncate text-[11px] text-muted-foreground">Head de RevOps</p>
            </div>
            <ChevronUp className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </>
        ) : null}
      </button>
      {open ? (
        <div className="surface absolute bottom-[calc(100%+10px)] left-0 z-50 w-56 overflow-hidden p-1.5 shadow-xl">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setOpen(false);
                if ("action" in item && item.action) item.action();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<"dashboard" | "chat">("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const dashboardSidebar = (
    <nav className="flex h-full flex-col gap-1 p-3">
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 shrink-0 border-t border-border/60 pt-3">
        <UserMenu collapsed={collapsed} onSettings={() => setSettingsOpen(true)} />
      </div>
    </nav>
  );

  const sidebar =
    view === "chat" ? (
      <div className="flex h-full flex-col">
        <div className="min-h-0 flex-1">
          <ChatSidebar collapsed={collapsed} />
        </div>
        <div className="shrink-0 border-t border-border/60 p-3">
          <UserMenu collapsed={collapsed} onSettings={() => setSettingsOpen(true)} />
        </div>
      </div>
    ) : (
      dashboardSidebar
    );

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-header sticky top-0 z-40">
        <div className="flex h-20 items-center gap-3 px-4 sm:px-6">
          <button
            className="rounded-lg p-2 hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link
            to="/"
            className="hidden items-center lg:flex"
            style={{ width: collapsed ? 52 : 232 }}
          >
            <Logo collapsed={collapsed} />
          </Link>
          <div className="lg:hidden">
            <Logo collapsed={false} />
          </div>

          <div className="relative ml-auto hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Buscar stakeholders, contas, campanhas…"
              className="relative z-50 h-10 w-full rounded-xl border border-border bg-card pl-9 pr-16 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
            {searchOpen ? (
              <div className="surface absolute left-0 right-0 top-[calc(100%+8px)] z-50 p-2 shadow-2xl">
                <p className="eyebrow px-2 py-1.5">Resultados</p>
                {[
                  ["Nova Lima Tech", "Conta · health 48"],
                  ["Grupo Vertex", "Negociação · R$ 184 mil"],
                  ["Campanha LinkedIn ABM", "Marketing · CPL R$ 92"],
                  ["Marina Souza", "Pessoa · RevOps"],
                ]
                  .filter(([n]) =>
                    (n as string).toLowerCase().includes(search.trim().toLowerCase()),
                  )
                  .map(([n, d]) => (
                    <button
                      key={n}
                      className="flex w-full flex-col items-start rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted"
                    >
                      <span className="text-sm">{n}</span>
                      <span className="text-[11px] text-muted-foreground">{d}</span>
                    </button>
                  ))}
              </div>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="flex items-center gap-1 rounded-xl bg-muted p-1">
              <button
                onClick={() => setView("dashboard")}
                aria-label="Visão de dashboard"
                className={cn(
                  "rounded-lg p-1.5 transition-colors",
                  view === "dashboard"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("chat")}
                aria-label="Visão de chat com o Vector"
                className={cn(
                  "rounded-lg p-1.5 transition-colors",
                  view === "chat"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <StarMark className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="rounded-xl bg-muted p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative z-50">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notificações"
                className="relative rounded-xl bg-muted p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cs" />
              </button>
              {notifOpen ? (
                <div className="surface absolute right-0 top-[calc(100%+8px)] w-80 p-2 shadow-2xl">
                  <p className="eyebrow px-2 py-1.5">Notificações</p>
                  {[
                    ["Speed to lead estourado", "3 leads sem contato há 12 min"],
                    ["Health score em queda", "Orbita Log caiu para 52"],
                    ["Proposta aceita", "Grupo Vertex · R$ 184 mil"],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-lg px-2.5 py-2 transition-colors hover:bg-muted">
                      <p className="text-sm">{t}</p>
                      <p className="text-[11px] text-muted-foreground">{d}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova ação</span>
            </button>
          </div>
        </div>
      </header>

      {searchOpen || notifOpen ? (
        <div
          className="overlay-dim fixed inset-0 z-30"
          onClick={() => {
            setSearchOpen(false);
            setNotifOpen(false);
          }}
        />
      ) : null}

      <div className="flex">
        <aside
          className="sticky top-20 hidden h-[calc(100vh-5rem)] shrink-0 border-r border-border bg-sidebar lg:block"
          style={{ width: collapsed ? 76 : 260 }}
        >
          {sidebar}
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            className="absolute -right-3.5 top-1/2 z-30 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary lg:flex"
          >
            <ChevronLeft
              className={cn("h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")}
            />
          </button>
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/30"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-sidebar shadow-xl">
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo collapsed={false} />
                <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="h-[calc(100%-65px)] overflow-y-auto">{sidebar}</div>
            </div>
          </div>
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] space-y-10">
            {view === "chat" ? <ChatView /> : children}
          </div>
        </main>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
