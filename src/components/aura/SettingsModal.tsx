import { useState } from "react";

import profilePic from "@/assets/profile-user.png.asset.json";
import { useTheme } from "@/components/aura/theme";
import { Modal } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Alternar"
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all",
          on ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {desc ? <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p> : null}
      </div>
      {children}
    </div>
  );
}

const tabs = ["Interface", "Usuário"] as const;

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Interface");
  const [compact, setCompact] = useState(false);
  const [aiHints, setAiHints] = useState(true);
  const [sla, setSla] = useState(true);
  const [digest, setDigest] = useState(true);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Configurações"
      subtitle="Interface e conta do usuário"
    >
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-xs transition-colors",
              tab === t
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Interface" ? (
        <div className="mt-4 divide-y divide-border">
          <Row title="Modo escuro" desc={`Tema atual: ${theme === "dark" ? "escuro" : "claro"}`}>
            <Toggle on={theme === "dark"} onClick={toggle} />
          </Row>
          <Row title="Densidade compacta" desc="Reduz espaçamentos das tabelas e listas">
            <Toggle on={compact} onClick={() => setCompact((v) => !v)} />
          </Row>
          <Row title="Sugestões do Vector nos cards" desc="Exibe badge e recomendação no Kanban">
            <Toggle on={aiHints} onClick={() => setAiHints((v) => !v)} />
          </Row>
          <Row title="Idioma" desc="Interface e relatórios">
            <span className="text-sm font-medium">Português (BR)</span>
          </Row>
          <Row title="Fuso horário">
            <span className="text-sm font-medium">America/Sao_Paulo</span>
          </Row>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center gap-3.5">
            <img
              src={profilePic.url}
              alt="Marina Souza"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Marina Souza</p>
              <p className="text-xs text-muted-foreground">
                Head de RevOps · marina@auravector.com
              </p>
            </div>
          </div>
          <div className="mt-3 divide-y divide-border">
            <Row title="Alertas de speed to lead" desc="Notifica após 5 minutos sem contato">
              <Toggle on={sla} onClick={() => setSla((v) => !v)} />
            </Row>
            <Row title="Resumo diário por e-mail" desc="Enviado às 8h">
              <Toggle on={digest} onClick={() => setDigest((v) => !v)} />
            </Row>
            <Row title="Plano" desc="Aura Vector Business · 12 assentos">
              <span className="text-sm font-medium text-primary">Fazer upgrade</span>
            </Row>
            <Row title="Senha" desc="Última alteração há 3 meses">
              <button className="rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                Alterar
              </button>
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
}
