export const kpis = [
  { label: "Receita influenciada", value: "R$ 4,82M", delta: "+12,4%", up: true, hint: "últimos 90 dias" },
  { label: "Leads ativos", value: "1.284", delta: "+8,1%", up: true, hint: "em jornada" },
  { label: "Oportunidades abertas", value: "216", delta: "+3,6%", up: true, hint: "R$ 9,1M em pipeline" },
  { label: "Clientes em risco", value: "7", delta: "+2", up: false, hint: "health score < 60" },
  { label: "Tickets críticos", value: "13", delta: "-4", up: true, hint: "SLA em risco: 3" },
  { label: "Health score médio", value: "78", delta: "+1,9", up: true, hint: "base ativa" },
  { label: "Speed to Lead", value: "6m 12s", delta: "-1m 40s", up: true, hint: "meta: 5 min" },
  { label: "Show-up rate", value: "72%", delta: "+4,2%", up: true, hint: "reuniões agendadas" },
];

export const funnel = [
  { stage: "Aquisição", value: 4820, conv: 100 },
  { stage: "Qualificação", value: 1284, conv: 26.6 },
  { stage: "Agendamento", value: 612, conv: 47.7 },
  { stage: "Venda", value: 216, conv: 35.3 },
  { stage: "Onboarding", value: 148, conv: 68.5 },
  { stage: "Retenção", value: 132, conv: 89.2 },
  { stage: "Expansão", value: 41, conv: 31.1 },
];

export const aiInsights = [
  {
    title: "Queda na qualidade dos leads pagos",
    body: "Leads de campanhas pagas caíram 18% em score médio nas últimas 2 semanas. Revise segmentação de Meta Ads.",
    tag: "Marketing",
  },
  {
    title: "3 clientes com risco de churn",
    body: "Nova Lima Tech, Grupo Vertex e Orbita Log combinam queda de uso e tickets recorrentes.",
    tag: "Apoio ao Cliente",
  },
  {
    title: "12 oportunidades precisam de follow-up hoje",
    body: "Negociações paradas há mais de 7 dias somando R$ 1,4M em pipeline.",
    tag: "Vendas",
  },
  {
    title: "LinkedIn e Google Ads lideram receita atribuída",
    body: "68% da receita influenciada no trimestre veio destes dois canais. Sugestão: realocar 15% do budget.",
    tag: "Marketing",
  },
];

export const nextActions = [
  { who: "Marina Souza", what: "Ligar para Helena Duarte — lead prioritário", when: "Hoje, 14:00", area: "Vendas" },
  { who: "Rafael Lima", what: "Enviar proposta revisada — Grupo Vertex", when: "Hoje, 16:30", area: "Vendas" },
  { who: "Camila Reis", what: "Reunião de resgate — Orbita Log", when: "Amanhã, 09:00", area: "Apoio ao Cliente" },
  { who: "Diego Alves", what: "Pausar público frio de Meta Ads", when: "Hoje", area: "Marketing" },
  { who: "Ana Prado", what: "Concluir onboarding — Clinix Saúde", when: "Sex, 11:00", area: "Apoio ao Cliente" },
];

export type Stakeholder = {
  id: string;
  name: string;
  company: string;
  type: "Lead" | "Cliente" | "Usuário" | "Parceiro" | "Decisor";
  status: string;
  origin: string;
  journey: string;
  owner: string;
  health: number;
  value: string;
  lastTouch: string;
  priority: "Alta" | "Média" | "Baixa";
  ai?: string | undefined;
};

export const stakeholders: Stakeholder[] = [
  { id: "1", name: "Helena Duarte", company: "Grupo Vertex", type: "Decisor", status: "Em negociação", origin: "LinkedIn Ads", journey: "Venda", owner: "Marina Souza", health: 74, value: "R$ 320k", lastTouch: "há 2 dias", priority: "Alta", ai: "Enviar case do setor financeiro" },
  { id: "2", name: "Tiago Meireles", company: "Nova Lima Tech", type: "Cliente", status: "Em risco", origin: "Indicação", journey: "Retenção", owner: "Camila Reis", health: 48, value: "R$ 180k/ano", lastTouch: "há 9 dias", priority: "Alta", ai: "Agendar QBR de resgate" },
  { id: "3", name: "Paula Andrade", company: "Clinix Saúde", type: "Usuário", status: "Onboarding", origin: "Google Ads", journey: "Onboarding", owner: "Ana Prado", health: 82, value: "R$ 96k/ano", lastTouch: "ontem", priority: "Média" },
  { id: "4", name: "Bruno Kaminski", company: "Orbita Log", type: "Cliente", status: "Em risco", origin: "Webinar", journey: "Suporte", owner: "Camila Reis", health: 52, value: "R$ 210k/ano", lastTouch: "há 5 dias", priority: "Alta", ai: "3 tickets em 7 dias — escalar" },
  { id: "5", name: "Sofia Mendes", company: "Belmar Retail", type: "Lead", status: "Qualificado", origin: "Meta Ads", journey: "Qualificação", owner: "Rafael Lima", health: 66, value: "R$ 140k", lastTouch: "há 1 dia", priority: "Média", ai: "Melhor canal: WhatsApp" },
  { id: "6", name: "Eduardo Rocha", company: "Prisma Consult", type: "Parceiro", status: "Ativo", origin: "Parceria", journey: "Expansão", owner: "Marina Souza", health: 91, value: "R$ 75k", lastTouch: "há 3 dias", priority: "Baixa" },
  { id: "7", name: "Larissa Fontes", company: "Argo Fintech", type: "Lead", status: "Novo lead", origin: "Google Ads", journey: "Aquisição", owner: "Não atribuído", health: 58, value: "R$ 90k", lastTouch: "há 12 min", priority: "Alta", ai: "Speed to Lead crítico" },
  { id: "8", name: "Marcos Vieira", company: "Delta Agro", type: "Cliente", status: "Cliente ativo", origin: "Outbound", journey: "Expansão", owner: "Rafael Lima", health: 88, value: "R$ 260k/ano", lastTouch: "há 4 dias", priority: "Média", ai: "Oportunidade de upsell: +2 squads" },
];

export const timeline = [
  { when: "Hoje, 10:12", channel: "WhatsApp", who: "Marina Souza", text: "Confirmou interesse no módulo de RevOps e pediu proposta com 2 cenários." },
  { when: "Ontem, 16:40", channel: "Call", who: "Marina Souza", text: "Call de descoberta (38 min). Objeção: integração com Salesforce legado." },
  { when: "3 dias atrás", channel: "E-mail", who: "Automação", text: "Sequência de nutrição — abriu 4 de 5 e-mails." },
  { when: "6 dias atrás", channel: "LinkedIn Ads", who: "Marketing", text: "Converteu no formulário da campanha Front Office Intelligence." },
];

export const kanbanColumns = [
  { title: "Novo lead", accent: "mkt" },
  { title: "Qualificado", accent: "mkt" },
  { title: "Agendado", accent: "sales" },
  { title: "Em negociação", accent: "sales" },
  { title: "Proposta enviada", accent: "sales" },
  { title: "Cliente fechado", accent: "sales" },
  { title: "Onboarding", accent: "cs" },
  { title: "Cliente ativo", accent: "cs" },
  { title: "Em risco", accent: "cs" },
  { title: "Expansão", accent: "cs" },
] as const;

const sk = (i: number) => stakeholders[i]!;

export const kanbanCards: Record<string, Stakeholder[]> = {
  "Novo lead": [sk(6)],
  Qualificado: [sk(4)],
  Agendado: [{ ...sk(4), id: "9", name: "Rodrigo Paz", company: "Ativa Seguros", value: "R$ 110k", status: "Agendado", priority: "Média", ai: undefined }],
  "Em negociação": [sk(0)],
  "Proposta enviada": [{ ...sk(0), id: "10", name: "Juliana Beck", company: "Nexa Energia", value: "R$ 420k", status: "Proposta enviada", ai: "Follow-up recomendado hoje" }],
  "Cliente fechado": [{ ...sk(7), id: "11", name: "Felipe Ramos", company: "Setta Educação", value: "R$ 155k/ano", status: "Cliente fechado", ai: undefined }],
  Onboarding: [sk(2)],
  "Cliente ativo": [sk(7)],
  "Em risco": [sk(1), sk(3)],
  Expansão: [sk(5)],
};

export const campaigns = [
  { name: "Front Office Intelligence", channel: "LinkedIn Ads", leads: 312, quality: 82, cpl: "R$ 68", revenue: "R$ 1,42M", status: "Ativa" },
  { name: "RevOps para Enterprise", channel: "Google Ads", leads: 428, quality: 74, cpl: "R$ 51", revenue: "R$ 1,18M", status: "Ativa" },
  { name: "Retargeting — Demo", channel: "Meta Ads", leads: 596, quality: 41, cpl: "R$ 22", revenue: "R$ 320k", status: "Atenção" },
  { name: "Newsletter RevOps", channel: "RD Station", leads: 184, quality: 69, cpl: "R$ 12", revenue: "R$ 260k", status: "Ativa" },
  { name: "Webinar Jornada 360", channel: "Orgânico", leads: 141, quality: 88, cpl: "R$ 0", revenue: "R$ 540k", status: "Ativa" },
];

export const channelMatrix = [
  { channel: "LinkedIn Ads", cells: [12, 28, 46, 82] },
  { channel: "Google Ads", cells: [18, 34, 52, 71] },
  { channel: "Meta Ads", cells: [46, 38, 22, 14] },
  { channel: "RD Station", cells: [22, 31, 44, 58] },
  { channel: "Orgânico", cells: [8, 19, 51, 88] },
];

export const sellers = [
  { name: "Marina Souza", deals: 18, win: 34, revenue: "R$ 1,24M", speed: "4m 20s", showup: 79 },
  { name: "Rafael Lima", deals: 15, win: 28, revenue: "R$ 940k", speed: "7m 05s", showup: 71 },
  { name: "Vitor Nunes", deals: 12, win: 22, revenue: "R$ 610k", speed: "11m 42s", showup: 62 },
  { name: "Bianca Alves", deals: 9, win: 31, revenue: "R$ 580k", speed: "5m 58s", showup: 76 },
];

export const objections = [
  { label: "Preço acima do budget", pct: 32 },
  { label: "Integração com CRM legado", pct: 24 },
  { label: "Timing / orçamento anual", pct: 19 },
  { label: "Falta de sponsor interno", pct: 15 },
  { label: "Comparação com concorrente", pct: 10 },
];

export const accounts = [
  { company: "Nova Lima Tech", health: 48, tickets: 5, sla: "78%", nps: 21, stage: "Retenção", risk: "Alto" },
  { company: "Orbita Log", health: 52, tickets: 3, sla: "84%", nps: 34, stage: "Suporte", risk: "Alto" },
  { company: "Clinix Saúde", health: 82, tickets: 1, sla: "97%", nps: 62, stage: "Onboarding", risk: "Baixo" },
  { company: "Delta Agro", health: 88, tickets: 0, sla: "99%", nps: 71, stage: "Expansão", risk: "Baixo" },
  { company: "Belmar Retail", health: 66, tickets: 2, sla: "91%", nps: 48, stage: "Adoção", risk: "Médio" },
];

export const integrations = [
  { group: "CRMs", items: [["HubSpot", "Conectado"], ["Salesforce", "Requer configuração"], ["Pipedrive", "Disponível"]] },
  { group: "Marketing", items: [["Google Ads", "Conectado"], ["Meta Ads", "Conectado"], ["LinkedIn Ads", "Conectado"], ["RD Station", "Disponível"]] },
  { group: "Analytics", items: [["Google Analytics", "Conectado"], ["Looker", "Disponível"], ["Power BI", "Em breve"]] },
  { group: "Comunicação", items: [["WhatsApp", "Conectado"], ["Gmail", "Conectado"], ["Outlook", "Disponível"], ["Slack", "Conectado"], ["Teams", "Requer configuração"]] },
  { group: "Atendimento", items: [["Zendesk", "Conectado"], ["Intercom", "Disponível"], ["Freshdesk", "Em breve"]] },
  { group: "Calendário", items: [["Google Calendar", "Conectado"], ["Outlook Calendar", "Disponível"]] },
  { group: "Financeiro / ERP", items: [["Stripe", "Conectado"], ["SAP", "Em breve"], ["TOTVS", "Disponível"], ["Oracle", "Em breve"]] },
  { group: "Dados", items: [["CSV", "Conectado"], ["API", "Conectado"], ["Webhooks", "Requer configuração"], ["MCP", "Em breve"]] },
] as const;

export const automations = [
  { name: "Novo lead → tarefa para SDR", when: "Quando um novo lead entra", then: "Cria tarefa para o SDR do rodízio", area: "Vendas", active: true, runs: 428 },
  { name: "Speed to Lead crítico", when: "Se o lead não for contatado em 5 minutos", then: "Alerta o gestor no Slack", area: "Vendas", active: true, runs: 96 },
  { name: "Risco de churn por tickets", when: "Se o cliente abrir 3 tickets em 7 dias", then: "Marca risco de churn e notifica CS", area: "Apoio ao Cliente", active: true, runs: 34 },
  { name: "Oportunidade parada", when: "Se a oportunidade ficar 7 dias sem interação", then: "Sugere follow-up com mensagem gerada por IA", area: "Vendas", active: true, runs: 212 },
  { name: "Health score alto → expansão", when: "Se o cliente tiver health score acima de 85", then: "Cria oportunidade de expansão", area: "Apoio ao Cliente", active: false, runs: 58 },
  { name: "Campanha com leads ruins", when: "Se a campanha gerar score médio abaixo de 50", then: "Alerta o time de marketing", area: "Marketing", active: true, runs: 17 },
];

export const aiCapabilities = [
  { title: "Resumo automático de interações", body: "Calls, e-mails e chats condensados em contexto acionável." },
  { title: "Sugestão de próximo passo", body: "Recomendação por stakeholder, com justificativa." },
  { title: "Priorização de leads", body: "Score combinando intenção, fit e velocidade de resposta." },
  { title: "Risco de churn", body: "Sinais de uso, suporte e sentimento em um único índice." },
  { title: "Análise de sentimento", body: "Tom de cada interação por conta e por período." },
  { title: "Geração de mensagens", body: "Rascunhos contextualizados — revisão humana obrigatória." },
  { title: "Canal ideal", body: "Onde cada stakeholder responde mais rápido." },
  { title: "Gargalos da jornada", body: "Etapas onde receita está travando agora." },
  { title: "Análise de objeções", body: "Padrões de objeção por segmento e vendedor." },
  { title: "Sugestão de automações", body: "Fluxos propostos a partir do comportamento do time." },
];

export const reports = [
  { name: "Receita por canal", desc: "Atribuição multicanal por período", area: "Marketing" },
  { name: "Conversão por etapa", desc: "Funil completo de aquisição a expansão", area: "Vendas" },
  { name: "Gargalos da jornada", desc: "Tempo médio e perdas por etapa", area: "RevOps" },
  { name: "Performance de marketing", desc: "CPL, CAC e qualidade de lead", area: "Marketing" },
  { name: "Performance comercial", desc: "Pipeline, win rate e previsão", area: "Vendas" },
  { name: "Performance de CS", desc: "Health score, SLA e retenção", area: "Apoio ao Cliente" },
  { name: "Tempo médio de resposta", desc: "Por canal, time e horário", area: "RevOps" },
  { name: "Retenção e churn", desc: "Coortes mensais e receita perdida", area: "Apoio ao Cliente" },
  { name: "Produtividade por time", desc: "Atividades, tarefas e SLA interno", area: "RevOps" },
  { name: "Ações recomendadas pela IA", desc: "Backlog priorizado de recomendações", area: "IA" },
];