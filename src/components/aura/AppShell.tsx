import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  ChevronLeft,
  FileBarChart,
  Gauge,
  HelpCircle,
  KanbanSquare,
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
import { useTheme } from "@/components/aura/theme";
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
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

function Logo({ collapsed }: { collapsed: boolean }) {
  const { theme } = useTheme();
  if (collapsed) {
    return (
      <img
        src={theme === "dark" ? markWhite.url : markDark.url}
        alt="Aura Vector"
        className="h-10 w-10"
      />
    );
  }
  return (
    <img
      src={theme === "dark" ? logoLight.url : logoDark.url}
      alt="Aura Vector"
      className="h-10 w-auto"
    />
  );
}

function UserMenu() {
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
    { label: "Configurações", icon: Settings, to: "/configuracoes" },
    { label: "Fazer upgrade", icon: Rocket },
    { label: "Ajuda & suporte", icon: HelpCircle },
    { label: "Sair", icon: LogOut },
  ] as const;

  return (
    <div className="relative pl-1" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-muted"
      >
        <img
          src={profilePic.url}
          alt="Marina Souza"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="hidden pr-1 text-left leading-tight xl:block">
          <p className="text-xs font-medium">Marina Souza</p>
          <p className="text-[11px] text-muted-foreground">Head de RevOps</p>
        </div>
      </button>
      {open ? (
        <div className="surface absolute right-0 top-[calc(100%+10px)] z-50 w-56 overflow-hidden p-1.5 shadow-xl">
          {items.map((item) =>
            "to" in item && item.to ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 p-3">
      {nav.map((item) => {
        const active =
          item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
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
      <div className="mt-auto">
        {!collapsed ? (
          <div className="gradient-aura rounded-2xl p-[1.5px]">
            <div className="rounded-[15px] bg-card p-4">
              <p className="text-xs font-display leading-snug">
                Clareza para vender, atender e crescer.
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                RevOps Intelligence
              </p>
            </div>
          </div>
        ) : null}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-3 hidden w-full items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex"
        >
          <ChevronLeft
            className={cn("h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")}
          />
          {!collapsed ? "Recolher" : null}
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            className="rounded-lg p-2 hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link to="/" className="hidden lg:flex" style={{ width: collapsed ? 44 : 232 }}>
            <Logo collapsed={collapsed} />
          </Link>
          <div className="lg:hidden">
            <Logo collapsed={false} />
          </div>

          <div className="relative ml-auto hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar stakeholders, contas, campanhas…"
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-16 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button className="relative rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cs" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova ação</span>
            </button>
            <div className="flex items-center gap-2 pl-1">
              <span className="gradient-aura flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white">
                MS
              </span>
              <div className="hidden leading-tight xl:block">
                <p className="text-xs font-medium">Marina Souza</p>
                <p className="text-[11px] text-muted-foreground">Head de RevOps</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className="sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-border bg-sidebar lg:block"
          style={{ width: collapsed ? 76 : 260 }}
        >
          {sidebar}
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
          <div className="mx-auto max-w-[1400px] space-y-10">{children}</div>
        </main>
      </div>
    </div>
  );
}