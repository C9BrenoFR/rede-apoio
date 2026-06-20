export type PinCategory = "food" | "shelter" | "health" | "clothing";
export type PinSource = "scraped" | "official";
export type PinStatus = "pending" | "verified" | "rejected";

export interface MapPin {
    id: string;
    name: string;
    category: PinCategory;
    source: PinSource;
    status: PinStatus;
    address: string;
    entity: string;
    schedule: string;
    description: string;
    x: number;
    y: number;
    updatedAt: string;
}

export const CATEGORY_META: Record<PinCategory, { label: string; icon: string; token: string }> = {
    food: { label: "Alimentação", icon: "🍲", token: "food" },
    shelter: { label: "Abrigo", icon: "🏠", token: "shelter" },
    health: { label: "Saúde", icon: "➕", token: "health" },
    clothing: { label: "Vestuário", icon: "👕", token: "clothing" },
};

export const PINS: MapPin[] = [
    {
        id: "p1",
        name: "Restaurante Popular Centro",
        category: "food",
        source: "official",
        status: "verified",
        address: "Av. Getúlio Vargas, 200 — Centro",
        entity: "Prefeitura Municipal",
        schedule: "Seg–Sex, 11h às 14h",
        description: "Refeições a R$ 1,00. Distribuição de marmitas para população em situação de rua aos sábados.",
        x: 38, y: 52, updatedAt: "2026-06-18",
    },
    {
        id: "p2",
        name: "Centro POP Municipal",
        category: "shelter",
        source: "official",
        status: "verified",
        address: "Rua Halfeld, 1100 — Centro",
        entity: "Secretaria de Assistência Social",
        schedule: "24 horas",
        description: "Acolhimento institucional, banho, alimentação e encaminhamento para serviços públicos.",
        x: 46, y: 44, updatedAt: "2026-06-19",
    },
    {
        id: "p3",
        name: "Mutirão de Saúde — Praça da Estação",
        category: "health",
        source: "scraped",
        status: "pending",
        address: "Praça da Estação — Centro",
        entity: "ONG Mãos Solidárias",
        schedule: "Sábado, 22/06, 9h–13h",
        description: "Atendimento clínico, aferição de pressão, vacinação e distribuição de kits de higiene.",
        x: 55, y: 60, updatedAt: "2026-06-20",
    },
    {
        id: "p4",
        name: "Doação de Cobertores — Paróquia São José",
        category: "clothing",
        source: "scraped",
        status: "verified",
        address: "Rua Espírito Santo, 450",
        entity: "Pastoral do Povo da Rua",
        schedule: "Domingo, 23/06, 18h",
        description: "Entrega de cobertores, agasalhos e refeição quente em frente à paróquia.",
        x: 28, y: 35, updatedAt: "2026-06-17",
    },
    {
        id: "p5",
        name: "Casa de Passagem Esperança",
        category: "shelter",
        source: "official",
        status: "verified",
        address: "Rua Santa Rita, 80 — Bonfim",
        entity: "ONG Esperança",
        schedule: "Diariamente, entrada até 21h",
        description: "Pernoite, café da manhã e apoio psicossocial. 40 vagas masculinas e 15 femininas.",
        x: 70, y: 30, updatedAt: "2026-06-15",
    },
    {
        id: "p6",
        name: "Sopão Solidário — Viaduto Itamar Franco",
        category: "food",
        source: "scraped",
        status: "pending",
        address: "Viaduto Itamar Franco — Centro",
        entity: "Grupo Voluntários da Madrugada",
        schedule: "Quartas, 21h",
        description: "Distribuição semanal de sopa, pão e chá. Acolhimento por voluntários.",
        x: 60, y: 48, updatedAt: "2026-06-20",
    },
    {
        id: "p7",
        name: "Consultório na Rua — UBS São Pedro",
        category: "health",
        source: "official",
        status: "verified",
        address: "Rua Tomé de Souza, 220",
        entity: "Secretaria Municipal de Saúde",
        schedule: "Ter e Qui, 14h–18h",
        description: "Equipe multidisciplinar atende em campo. Procura ativa em pontos de concentração.",
        x: 22, y: 65, updatedAt: "2026-06-14",
    },
    {
        id: "p8",
        name: "Bazar Solidário Permanente",
        category: "clothing",
        source: "official",
        status: "verified",
        address: "Rua Batista de Oliveira, 75",
        entity: "Cruz Vermelha",
        schedule: "Seg–Sáb, 9h–17h",
        description: "Retirada gratuita de roupas, calçados e itens de higiene mediante encaminhamento.",
        x: 50, y: 22, updatedAt: "2026-06-16",
    },
];

export interface EmergencyContact {
    name: string;
    number: string;
    description: string;
    tone: "primary" | "destructive" | "accent";
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
    { name: "SAMU", number: "192", description: "Emergências médicas — atendimento pré-hospitalar.", tone: "destructive" },
    { name: "Defesa Civil", number: "199", description: "Frio extremo, chuvas, riscos estruturais na rua.", tone: "destructive" },
    { name: "Centro POP", number: "(32) 3690-7700", description: "Acolhimento institucional e triagem social.", tone: "primary" },
    { name: "Disque Direitos Humanos", number: "100", description: "Denúncias de violência contra populações vulneráveis.", tone: "accent" },
    { name: "Bombeiros", number: "193", description: "Resgate, salvamento e incêndios.", tone: "destructive" },
    { name: "Conselho Tutelar", number: "(32) 3690-8181", description: "Crianças e adolescentes em situação de rua.", tone: "accent" },
];

export interface CommunityEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    place: string;
    organizer: string;
    category: PinCategory;
    description: string;
}

export const EVENTS: CommunityEvent[] = [
    {
        id: "e1",
        title: "Mutirão de Saúde da População de Rua",
        date: "Sáb, 22 Jun",
        time: "09h–13h",
        place: "Praça da Estação",
        organizer: "ONG Mãos Solidárias + UBS Centro",
        category: "health",
        description: "Clínica geral, odontologia, vacinação e testes rápidos.",
    },
    {
        id: "e2",
        title: "Campanha do Agasalho — Inverno Solidário",
        date: "Dom, 23 Jun",
        time: "18h",
        place: "Paróquia São José",
        organizer: "Pastoral do Povo da Rua",
        category: "clothing",
        description: "Entrega de cobertores, agasalhos e refeição quente.",
    },
    {
        id: "e3",
        title: "Café com Histórias",
        date: "Qua, 26 Jun",
        time: "08h",
        place: "Centro POP",
        organizer: "Voluntários do Centro POP",
        category: "food",
        description: "Café da manhã coletivo e escuta qualificada.",
    },
    {
        id: "e4",
        title: "Sopão da Madrugada",
        date: "Qua, 26 Jun",
        time: "21h",
        place: "Viaduto Itamar Franco",
        organizer: "Voluntários da Madrugada",
        category: "food",
        description: "Distribuição de sopa, pão e chá.",
    },
];

export interface Agent {
    id: string;
    name: string;
    email: string;
    org: string;
    zone: string;
    is_admin: boolean;
    status: "ativo" | "pausado" | "convidado";
    validations: number;
}

export const AGENTS: Agent[] = [
    { id: "a1", name: "Clarice Mendes", email: "clarice.mendes@acolher.org", org: "ONG Acolher", zone: "Centro", is_admin: false, status: "ativo", validations: 47 },
    { id: "a2", name: "Rogério Tavares", email: "rogerio.tavares@pjf.mg.gov.br", org: "Centro POP", zone: "Centro / Bonfim", is_admin: false, status: "ativo", validations: 31 },
    { id: "a3", name: "Marina Lopes", email: "marina.lopes@pjf.mg.gov.br", org: "SMS — Consultório na Rua", zone: "São Pedro", is_admin: false, status: "ativo", validations: 22 },
    { id: "a4", name: "Pe. João Batista", email: "joao.batista@pastoral.org", org: "Pastoral do Povo da Rua", zone: "Centro", is_admin: false, status: "pausado", validations: 12 },
    { id: "a5", name: "Helena Duarte", email: "helena.duarte@pjf.mg.gov.br", org: "CRAS Norte", zone: "Bonfim", is_admin: true, status: "convidado", validations: 0 },
];

export interface AuditEntry {
    id: string;
    when: string;
    who: string;
    action: string;
    target: string;
    tone: "ok" | "warn" | "danger" | "info";
}

export const AUDIT: AuditEntry[] = [
    { id: "l1", when: "Hoje, 14:22", who: "Clarice Mendes", action: "Validou", target: "Mutirão de Saúde — Praça da Estação", tone: "ok" },
    { id: "l2", when: "Hoje, 13:08", who: "Rogério Tavares", action: "Rejeitou", target: "Doação anônima (sem entidade)", tone: "danger" },
    { id: "l3", when: "Hoje, 11:40", who: "Sistema", action: "Coletou (scraping)", target: "3 novos eventos no portal PJF", tone: "info" },
    { id: "l4", when: "Ontem, 21:14", who: "Marina Lopes", action: "Abriu alerta", target: "Hipotermia · Viaduto Itamar Franco", tone: "warn" },
    { id: "l5", when: "Ontem, 18:02", who: "Admin Municipal", action: "Cadastrou ponto", target: "Casa de Passagem Esperança", tone: "ok" },
    { id: "l6", when: "18/06, 09:30", who: "Helena Duarte", action: "Convite enviado", target: "novo agente CRAS Norte", tone: "info" },
];
