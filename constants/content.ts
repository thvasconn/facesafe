// Dados estáticos de exemplo (região Têmpora), portados do protótipo "SafeHof Atlas v2".
// Conteúdo clínico de exemplo apenas — não é conteúdo validado, ver docs/requisitos.md.

export const REGIONS: { name: string; meta: string; free: boolean }[] = [
  { name: 'Frontal', meta: 'Toxina · Preench.', free: true },
  { name: 'Glabelar', meta: 'Toxina · Risco vascular', free: true },
  { name: 'Têmpora', meta: 'Preench. · US', free: true },
  { name: 'Periorbital', meta: 'Toxina · Preench.', free: true },
  { name: 'Infraorbital', meta: 'Preench. · US', free: false },
  { name: 'Nasal', meta: 'Preench. · Risco alto', free: false },
  { name: 'Malar', meta: 'Preench. · Bioest.', free: false },
  { name: 'Nasolabial', meta: 'Preench.', free: false },
  { name: 'Labial', meta: 'Preench. · Toxina', free: false },
  { name: 'Mentoniana', meta: 'Preench. · Toxina', free: false },
  { name: 'Mandibular', meta: 'Preench. · Bioest.', free: false },
  { name: 'Parotídeo-massetérica', meta: 'Toxina · US', free: false },
  { name: 'Cervical', meta: 'Toxina · Bioest.', free: false },
];

export const BLOCKS: { title: string; body: string; points: string[] }[] = [
  {
    title: 'Avaliação',
    body: 'Inspeção estática e dinâmica do terço superior, com atenção à depressão da fossa temporal e à projeção do arco zigomático.',
    points: [
      'Classificar a depressão em leve, moderada ou severa.',
      'Palpar o limite superior da linha temporal.',
      'Registrar assimetrias em foto padronizada.',
    ],
  },
  {
    title: 'Anatomia aplicada',
    body: 'Região organizada em planos bem definidos entre pele e osso temporal, com trajeto vascular relevante no plano superficial.',
    points: [
      'Artéria temporal superficial no plano subcutâneo.',
      'Fáscia temporal superficial e profunda como referências.',
      'Músculo temporal profundo ao folheto profundo.',
    ],
  },
  {
    title: 'Visualização de planos',
    body: 'Correlação entre o plano escolhido e o comportamento do produto no tecido.',
    points: [
      'Plano supraperiosteal para volumização estrutural.',
      'Subcutâneo superficial reservado a correções finas.',
    ],
  },
  {
    title: 'Ultrassonografia',
    body: 'Mapeamento pré-procedimento com transdutor linear de alta frequência.',
    points: ['Identificar trajeto arterial antes da punção.', 'Confirmar espessura do plano-alvo.'],
  },
  {
    title: 'Planejamento',
    body: 'Definição de volume total, número de pontos e sequência de aplicação por lado.',
    points: ['Documentar volume por lado antes de iniciar.', 'Planejar retorno de avaliação em 30 dias.'],
  },
  {
    title: 'Aplicação ilustrada',
    body: 'Sequência ilustrada dos pontos de entrada e da direção da agulha ou cânula.',
    points: ['Entrada única com progressão lenta.', 'Aspiração e injeção retrógrada quando aplicável.'],
  },
  {
    title: 'Erros comuns',
    body: 'Desvios de técnica mais relatados na região.',
    points: ['Injeção em plano intermediário mal definido.', 'Volume excessivo em sessão única.'],
  },
  {
    title: 'Reações esperadas',
    body: 'Achados normais no período imediato.',
    points: ['Edema discreto por 24–72h.', 'Sensibilidade local à palpação.'],
  },
  {
    title: 'Sinais de alerta',
    body: 'Achados que exigem interrupção imediata do procedimento.',
    points: ['Dor desproporcional durante a injeção.', 'Palidez ou livedo no território irrigado.'],
  },
  {
    title: 'Complicações',
    body: 'Eventos adversos descritos e conduta de referência.',
    points: ['Compressão ou oclusão vascular.', 'Nodulação persistente.'],
  },
  {
    title: 'Pós-procedimento',
    body: 'Orientações entregues ao paciente ao final do atendimento.',
    points: ['Evitar calor local e exercício por 24h.', 'Retorno fotográfico em 30 dias.'],
  },
  {
    title: 'Documentação',
    body: 'Registro clínico e material vinculado ao atendimento.',
    points: ['Termo de consentimento específico.', 'Lote e validade do produto utilizado.'],
  },
];

// kind: 0 = normal, 1 = destaque (bold), 2 = alerta (navy + bold)
export const FICHA: { k: string; v: string; kind: 0 | 1 | 2 }[] = [
  { k: 'Objetivo', v: 'Restaurar volume da fossa temporal e suporte do terço superior', kind: 1 },
  { k: 'Produto', v: 'AH de alta coesividade (G′ elevado)', kind: 0 },
  { k: 'Dispositivo', v: 'Agulha 27G 13 mm ou cânula 22G 50 mm', kind: 0 },
  { k: 'Entrada', v: 'Ponto único, 2 cm acima e 1 cm posterior à cauda do supercílio', kind: 0 },
  { k: 'Plano', v: 'Supraperiosteal (contato ósseo)', kind: 1 },
  { k: 'Direção / ângulo', v: 'Perpendicular à pele, 90°, injeção em bolus lento', kind: 0 },
  { k: 'Riscos', v: 'Artéria temporal superficial · veia sentinela', kind: 2 },
  { k: 'Ref. de ultrassom', v: 'Transdutor linear 18 MHz · mapear trajeto arterial', kind: 0 },
  { k: 'Reação normal', v: 'Edema leve 24–72h, sensibilidade à palpação', kind: 0 },
  { k: 'Sinal de alerta', v: 'Dor desproporcional, palidez, alteração visual', kind: 2 },
  { k: 'Pós', v: 'Sem calor local e sem exercício por 24h', kind: 0 },
  { k: 'Documentos', v: 'Consentimento · foto padronizada · lote do produto', kind: 0 },
];

export const FICHA_TAGS = ['Preenchedor', 'Supraperiosteal', 'Risco vascular'];

export const LAYERS: { name: string; color: string; height: number }[] = [
  { name: 'Pele', color: '#d8cfc6', height: 34 },
  { name: 'Subcutâneo', color: '#c2b3a4', height: 52 },
  { name: 'Fáscia superficial', color: '#9f9b93', height: 24 },
  { name: 'Músculo temporal', color: '#8a5f5a', height: 78 },
  { name: 'Fáscia profunda', color: '#7d8790', height: 22 },
  { name: 'Vaso', color: '#1C4670', height: 18 },
  { name: 'Nervo', color: '#c9c2b6', height: 16 },
  { name: 'Osso', color: '#e7e2d8', height: 46 },
];

export const SYMPTOMS: { key: string; label: string; defaultOn: boolean }[] = [
  { key: 'dor', label: 'Dor intensa', defaultOn: true },
  { key: 'palidez', label: 'Palidez', defaultOn: true },
  { key: 'livedo', label: 'Livedo', defaultOn: true },
  { key: 'edema', label: 'Edema', defaultOn: true },
  { key: 'visual', label: 'Alteração visual', defaultOn: true },
  { key: 'necrose', label: 'Necrose', defaultOn: false },
];

export const SEVERITIES = [
  { key: 'leve', title: 'Leve', subtitle: 'Sintomas leves' },
  { key: 'moderada', title: 'Moderada', subtitle: 'Sintomas moderados' },
  { key: 'grave', title: 'Grave', subtitle: 'Sintomas intensos' },
] as const;

export const RESOLUCAO = [
  'Sintomas controlados',
  'Perfusão restabelecida',
  'Sem sinais de progressão',
  'Paciente orientado e em acompanhamento',
];

export const STEP_NAMES = ['Tipo de intercorrência', 'Sinais e sintomas', 'Gravidade', 'Conduta', 'Resolução'];

export const CATEGORIES: { key: string; title: string; subtitle: string }[] = [
  { key: 'acido', title: 'Ácido hialurônico', subtitle: 'Intercorrências com preenchedores' },
  { key: 'toxina', title: 'Toxina botulínica', subtitle: 'Ptose, assimetrias, difusão' },
  { key: 'bio', title: 'Bioestimuladores', subtitle: 'Nódulos, pápulas, inflamação tardia' },
  { key: 'us', title: 'Ultrassonografia', subtitle: 'Diagnóstico e mapeamento vascular' },
  { key: 'fios', title: 'Fios de sustentação', subtitle: 'Extrusão, dimpling, infecção' },
];

export const CONDUTA_ITEMS: { title: string; body: string; opensSos?: boolean }[] = [
  {
    title: 'Ação imediata',
    body: 'Interrompa o procedimento. Avalie perfusão e inicie as medidas imediatas.',
  },
  {
    title: 'Sinais de alerta',
    body: 'Dor intensa, livedo, palidez e alteração visual sugerem comprometimento vascular.',
  },
  {
    title: 'Materiais necessários',
    body: 'Hialuronidase, lidocaína, AAS, nitroglicerina, oxigênio, doppler (se disponível).',
  },
  {
    title: 'Quando encaminhar',
    body: 'Encaminhe se não houver melhora em até 60 minutos ou se houver piora do quadro.',
    opensSos: true,
  },
  {
    title: 'Acompanhamento',
    body: 'Reavaliar em 24h, 48h e 7 dias. Registrar evolução com fotos padronizadas.',
  },
];

export const FAVORITES = [
  { name: 'Têmpora', meta: 'Ficha rápida · preenchedor', route: '/ficha' as const },
  { name: 'Oclusão vascular', meta: 'Conduta · ácido hialurônico', route: '/conduta' as const },
  { name: 'Periorbital', meta: 'Anatomia em camadas', route: '/anatomy' as const },
];

export const HISTORICO = [
  { title: 'Oclusão vascular · Têmpora', meta: 'Ácido hialurônico · gravidade moderada', date: 'Hoje', severity: 'grave' as const },
  { title: 'Ptose palpebral', meta: 'Toxina botulínica · gravidade leve', date: '12 ago', severity: 'leve' as const },
  { title: 'Nódulo tardio · Malar', meta: 'Bioestimulador · gravidade leve', date: '02 ago', severity: 'leve' as const },
];

export const ACCOUNT_ROWS = [
  { k: 'Registro profissional', v: 'CRO-SP 88.412' },
  { k: 'Especialidade', v: 'HOF' },
  { k: 'Notificações', v: 'Ativas' },
  { k: 'Sair da conta', v: '' },
];
