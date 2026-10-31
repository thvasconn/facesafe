/**
 * SCHEMA DO BANCO — Projeto clínica Dr. Fábio (nome de marca ainda não definido)
 * Stack: MongoDB + Mongoose
 *
 * ORGANIZAÇÃO POR ESCOPO (pra você saber o que priorizar):
 *   [FASE 1 - MVP]     -> Atlas (guia por região/procedimento) + auth/RBAC + billing freemium
 *   [FASE 2]           -> Compras avulsas de documentos
 *   [FASE 3]           -> SOS simplificado (deep link WhatsApp) — quase não usa schema, é UI
 *   [FUTURO/SEM PRAZO] -> Marketplace de especialistas (credenciamento, triagem estruturada,
 *                         SOSRequest/SOSSession completos, split de pagamento)
 *
 * Os modelos de [FUTURO] estão incluídos porque a seção 7 do levantamento já mapeia essas
 * entidades como visão de longo prazo — mas não precisam ser implementados/expostos agora.
 * Deixei como referência pra não ter que redesenhar do zero quando o marketplace sair do papel.
 */

const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

/* ============================================================
 * 1. AUTENTICAÇÃO / USUÁRIOS / RBAC          [FASE 1 - MVP]
 * ============================================================ */

const ROLES = [
  'profissional',       // assinante individual (dentista/médico)
  'especialista_sos',   // futuro marketplace, mas o campo já existe pro Dr. Fábio/Dra. Carolina
  'admin_conteudo',
  'revisor_compliance',
  'superadmin',
];

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },

    role: { type: String, enum: ROLES, default: 'profissional', required: true },

    // Credenciais do profissional cadastrado — obrigatório mesmo no MVP (usado em
    // ConsentRecord e, futuramente, em SpecialistProfile pro credenciamento do SOS)
    professionalCredentials: {
      council: { type: String }, // ex: CRO, CRM
      registrationNumber: { type: String },
      state: { type: String }, // UF do conselho
      cpf: { type: String, select: false }, // sensível — nunca retornar por padrão
      verifiedAt: { type: Date, default: null },
      verificationSource: { type: String }, // ex: "CFO API", "manual"
    },

    // Segurança (seção 6.1 do levantamento — MFA obrigatório pra especialista/admin)
    mfa: {
      enabled: { type: Boolean, default: false },
      secret: { type: String, select: false },
    },

    // Vínculo com conta de clínica multiusuário (seção 5)
    clinic: { type: Types.ObjectId, ref: 'Clinic', default: null },
    clinicRole: { type: String, enum: ['owner', 'member'], default: null },

    status: { type: String, enum: ['active', 'suspended', 'pending_verification'], default: 'pending_verification' },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

/* ============================================================
 * 2. CLÍNICA (conta multiusuário)             [FASE 1 - MVP]
 * ============================================================ */

const ClinicSchema = new Schema(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true }, // nota: usando CNPJ da clínica atual do Dr. Fábio por ora
    ownerUser: { type: Types.ObjectId, ref: 'User', required: true },
    seatsLimit: { type: Number, default: 1 }, // quantas licenças o plano da clínica permite
    subscription: { type: Types.ObjectId, ref: 'Subscription' },
  },
  { timestamps: true }
);

const Clinic = model('Clinic', ClinicSchema);

/* ============================================================
 * 3. SESSÕES ATIVAS (limite simultâneo / anti-scraping) [FASE 1]
 * ============================================================ */

const ActiveSessionSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    deviceInfo: { type: String },
    ip: { type: String },
    lastActivityAt: { type: Date, default: Date.now },

    // hash do refresh token emitido pra essa sessão — permite revogar sem
    // guardar o token em texto puro. Ver módulo auth/service.js.
    refreshTokenHash: { type: String, required: true, select: false },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const ActiveSession = model('ActiveSession', ActiveSessionSchema);

/* ============================================================
 * 4. REGIÃO / PROCEDIMENTO                    [FASE 1 - MVP]
 * ============================================================ */

const REGION_SLUGS = [
  'frontal', 'glabelar', 'temporal', 'periorbital', 'infraorbital', 'nasal',
  'malar', 'nasolabial', 'labial', 'mentoniana', 'mandibular',
  'parotideo_masseterica', 'cervical',
];

const RegionSchema = new Schema(
  {
    slug: { type: String, enum: REGION_SLUGS, required: true, unique: true },
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
    isPilot: { type: Boolean, default: false }, // marca a região usada como molde
    accessTier: { type: String, enum: ['free', 'full'], default: 'full' }, // seção 9 — freemium
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

const Region = model('Region', RegionSchema);

const PROCEDURE_SLUGS = ['toxina', 'preenchimento', 'bioestimulador', 'usg_aplicada'];

const ProcedureSchema = new Schema(
  {
    slug: { type: String, enum: PROCEDURE_SLUGS, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

const Procedure = model('Procedure', ProcedureSchema);

/* ============================================================
 * 5. ANATOMIA EM CAMADAS                      [FASE 1 - MVP]
 * ============================================================ */

const AnatomyLayerSchema = new Schema(
  {
    region: { type: Types.ObjectId, ref: 'Region', required: true },
    layerType: {
      type: String,
      enum: ['pele', 'subcutaneo', 'musculo', 'fascia', 'vaso', 'nervo', 'osso'],
      required: true,
    },
    assetUrl: { type: String, required: true }, // SVG/imagem da camada, toggleável
    order: { type: Number, default: 0 },
    description: { type: String },
  },
  { timestamps: true }
);

const AnatomyLayer = model('AnatomyLayer', AnatomyLayerSchema);

/* ============================================================
 * 6. CONTEÚDO DA REGIÃO — os 12 blocos         [FASE 1 - MVP]
 *    (núcleo do Atlas — Region x Procedure)
 * ============================================================ */

const RegionContentSchema = new Schema(
  {
    region: { type: Types.ObjectId, ref: 'Region', required: true },
    procedure: { type: Types.ObjectId, ref: 'Procedure', required: true },

    version: { type: Number, default: 1 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: { type: Date },

    blocks: {
      avaliacao: {
        indicacoes: [String],
        contraindicacoes: [String],
        quandoNaoTratar: [String],
      },
      anatomiaAplicada: {
        texto: String,
        mediaUrls: [String],
      },
      visualizacaoPlanos: {
        layers: [{ type: Types.ObjectId, ref: 'AnatomyLayer' }],
      },
      ultrassonografia: {
        imagemNormalUrl: String,
        dopplerUrl: String,
        correlacaoTexto: String,
        imagemAlteradaUrl: String, // achado relevante, quando existir
      },
      planejamento: {
        objetivo: String,
        produtoCategoria: String, // categoria técnica, não marca (seção 3.6)
        dispositivo: String,
        marcacao: String,
      },
      aplicacaoIlustrada: {
        profundidade: String,
        direcao: String,
        angulo: String,
        trajetoria: String,
        mediaUrls: [String],
      },
      errosComuns: [
        {
          erro: String,
          motivo: String,
          comoPrevenir: String,
        },
      ],
      reacoesEsperadas: [
        {
          descricao: String,
          duracaoEsperada: String,
          orientacaoPaciente: String,
        },
      ],
      sinaisAlerta: [
        {
          descricao: String,
          acaoRecomendada: String,
        },
      ],
      complicacoes: [
        {
          apresentacaoClinica: String,
          urgencia: { type: String, enum: ['baixa', 'moderada', 'alta'] },
          encaminhamento: String,
        },
      ],
      posProcedimento: {
        cuidadosImediatos: [String],
        orientacaoDomiciliar: [String],
        retorno: String,
      },
      documentacao: {
        documents: [{ type: Types.ObjectId, ref: 'Document' }],
        notasEspecificas: String, // ex: termo/checklist particular dessa região
      },
    },

    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
    changeLog: [
      {
        version: Number,
        editedBy: { type: Types.ObjectId, ref: 'User' },
        editedAt: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  { timestamps: true }
);

RegionContentSchema.index({ region: 1, procedure: 1 }, { unique: true });

const RegionContent = model('RegionContent', RegionContentSchema);

/* ============================================================
 * 7. FICHA RÁPIDA (derivada, denormalizada p/ leitura rápida) [FASE 1]
 * ============================================================ */

const QuickReferenceCardSchema = new Schema(
  {
    regionContent: { type: Types.ObjectId, ref: 'RegionContent', required: true, unique: true },
    objetivo: String,
    produto: String,
    dispositivo: String,
    entrada: String,
    plano: String,
    direcaoAngulo: String,
    riscos: [String],
    usgNormal: String,
    alerta: [String],
    pos: [String],
    documentos: [String],
    generatedAt: { type: Date, default: Date.now }, // timestamp da última sincronização com RegionContent
  },
  { timestamps: true }
);

const QuickReferenceCard = model('QuickReferenceCard', QuickReferenceCardSchema);

/* ============================================================
 * 8. PRODUTO / DISPOSITIVO (catálogo técnico) [FASE 1 - complementar]
 * ============================================================ */

const ProductDeviceSchema = new Schema(
  {
    type: { type: String, enum: ['product', 'device'], required: true },
    category: { type: String, required: true }, // ex: toxina, preenchedor, bioestimulador
    reologia: { type: String }, // só aplicável a produto injetável
    planoCompativel: [String], // camadas/planos onde é indicado

    // Marca comercial é opcional/complementar (seção 3.6) — exige atualização frequente
    brand: {
      manufacturer: String,
      registrationNumber: String, // registro ANVISA
      version: String,
      lastUpdatedAt: Date,
    },

    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

const ProductDevice = model('ProductDevice', ProductDeviceSchema);

/* ============================================================
 * 9. DOCUMENTOS (templates versionados)        [FASE 1 estrutura / FASE 2 uso]
 * ============================================================ */

const DocumentSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        'anamnese',
        'termo_consentimento',
        'termo_uso_imagem',
        'ficha_marcacao',
        'orientacao_pos',
        'ficha_retorno',
        'registro_intercorrencia',
      ],
      required: true,
    },
    region: { type: Types.ObjectId, ref: 'Region' }, // opcional — nem todo doc é por região
    procedure: { type: Types.ObjectId, ref: 'Procedure' },

    title: { type: String, required: true },
    bodyText: { type: String }, // ou contentUrl se for arquivo
    contentUrl: { type: String },
    version: { type: Number, default: 1 },

    // IMPORTANTE: modelos editáveis, sujeitos a revisão jurídica.
    // Não tratar como definitivo até isso ficar true.
    legalReview: {
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      reviewedBy: String,
      reviewedAt: Date,
    },

    // Preço, quando for item de compra avulsa (Fase 2 — ex: termo pronto ~R$10)
    priceCents: { type: Number, default: null },

    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  },
  { timestamps: true }
);

const Document = model('Document', DocumentSchema);

/* ============================================================
 * 10. REGISTRO DE ACEITE DE TERMO              [FASE 1 - MVP]
 *     (seção 6.1 — exigência legal específica)
 * ============================================================ */

const ConsentRecordSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    document: { type: Types.ObjectId, ref: 'Document', required: true },
    documentVersion: { type: Number, required: true },
    documentHash: { type: String, required: true }, // hash do conteúdo aceito, imutável

    nameAtAcceptance: { type: String, required: true },
    cpfAtAcceptance: { type: String, required: true, select: false },
    professionalRegistrationAtAcceptance: { type: String },

    ip: { type: String, required: true },
    acceptedAt: { type: Date, default: Date.now, required: true },
    checkboxPreChecked: { type: Boolean, default: false, immutable: true }, // deve ser sempre false
  },
  { timestamps: true }
);

const ConsentRecord = model('ConsentRecord', ConsentRecordSchema);

/* ============================================================
 * 11. BILLING — freemium + compras avulsas     [FASE 1 - MVP / FASE 2]
 * ============================================================ */

const SubscriptionSchema = new Schema(
  {
    // dono da assinatura: usuário individual OU clínica (um dos dois)
    user: { type: Types.ObjectId, ref: 'User', default: null },
    clinic: { type: Types.ObjectId, ref: 'Clinic', default: null },

    plan: { type: String, enum: ['free', 'full'], required: true },
    status: { type: String, enum: ['trialing', 'active', 'past_due', 'canceled'], default: 'trialing' },

    gateway: { type: String, default: 'mercado_pago' },
    gatewayCustomerId: { type: String },
    gatewaySubscriptionId: { type: String },
    cnpjUsed: { type: String }, // registrar qual CNPJ processou (clínica atual vs. futuro CNPJ conjunto)

    trialEndsAt: { type: Date }, // janela de 3-4 meses grátis de lançamento
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

const Subscription = model('Subscription', SubscriptionSchema);

const PaymentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['subscription', 'avulso'], required: true },

    subscription: { type: Types.ObjectId, ref: 'Subscription', default: null },
    document: { type: Types.ObjectId, ref: 'Document', default: null }, // quando type = avulso

    amountCents: { type: Number, required: true },
    gateway: { type: String, default: 'mercado_pago' },
    gatewayTransactionId: { type: String },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  },
  { timestamps: true }
);

const Payment = model('Payment', PaymentSchema);

/* ============================================================
 * 12. AUDITORIA (log imutável)                 [FASE 1 - MVP]
 * ============================================================ */

const AuditLogSchema = new Schema(
  {
    actor: { type: Types.ObjectId, ref: 'User' },
    action: { type: String, required: true }, // ex: "content.publish", "consent.accept"
    entityType: { type: String, required: true },
    entityId: { type: Types.ObjectId, required: true },
    ip: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // append-only, nunca atualiza
);

const AuditLog = model('AuditLog', AuditLogSchema);

/* ============================================================
 * 13. INCIDENTE (registro de intercorrência)   [FASE 1 - MVP]
 * ============================================================ */

const IncidentSchema = new Schema(
  {
    reportedBy: { type: Types.ObjectId, ref: 'User', required: true },
    region: { type: Types.ObjectId, ref: 'Region' },
    procedure: { type: Types.ObjectId, ref: 'Procedure' },
    description: { type: String, required: true },
    severity: { type: String, enum: ['baixa', 'moderada', 'alta'] },
    relatedSOSRequest: { type: Types.ObjectId, ref: 'SOSRequest', default: null },
  },
  { timestamps: true }
);

const Incident = model('Incident', IncidentSchema);

/* ============================================================
 * 14. SOS — versão simplificada (Fase 3)       [FASE 3]
 *     Deep link direto pro WhatsApp do Dr. Fábio (Ipanema) ou
 *     Dra. Carolina (Tijuca/Niterói). NÃO tem triagem estruturada
 *     nem marketplace nessa fase — é basicamente config estático.
 * ============================================================ */

const SOSContactSchema = new Schema(
  {
    name: { type: String, required: true }, // "Dr. Fábio Barros" | "Dra. Carolina Peron"
    location: { type: String }, // "Ipanema" | "Tijuca/Niterói"
    whatsappNumber: { type: String, required: true },
    unavailableWindows: [
      {
        dayOfWeek: Number, // 0-6
        startTime: String, // "HH:mm"
        endTime: String,
      },
    ],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SOSContact = model('SOSContact', SOSContactSchema);

/* ============================================================
 * [FUTURO / SEM PRAZO] — Marketplace de especialistas completo
 * Mantido só como referência de modelagem. Não implementar/expor
 * na API até o marketplace virar prioridade real.
 * ============================================================ */

const SpecialistProfileSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    formacao: [String],
    areasAtuacao: [String],
    experienciaAnos: Number,
    precoPorConsulta: Number,
    tempoRespostaMedioMin: Number,
    avaliacaoMedia: Number,

    credentialing: {
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
      documentsSubmitted: [String], // urls
      capacitacaoUSG: { type: Boolean, default: false },
      recertificationDueAt: Date,
    },
  },
  { timestamps: true }
);

const SpecialistProfile = model('SpecialistProfile', SpecialistProfileSchema);

const SOSRequestSchema = new Schema(
  {
    solicitante: { type: Types.ObjectId, ref: 'User', required: true },
    region: { type: Types.ObjectId, ref: 'Region' },
    procedure: { type: Types.ObjectId, ref: 'Procedure' },
    situationType: String,

    productInfo: { produto: String, marca: String, lote: String, quantidade: String, dataHora: Date },
    symptoms: [String],
    evolutionNotes: String,
    attachments: [String], // urls protegidas, com marca d'água/link temporário

    triageLevel: { type: String, enum: ['confirmacao', 'prioridade', 'emergencia_real'] },
    assignedSpecialist: { type: Types.ObjectId, ref: 'SpecialistProfile', default: null },
    status: { type: String, enum: ['open', 'assigned', 'in_session', 'closed'], default: 'open' },
  },
  { timestamps: true }
);

const SOSRequest = model('SOSRequest', SOSRequestSchema);

const SOSSessionSchema = new Schema(
  {
    request: { type: Types.ObjectId, ref: 'SOSRequest', required: true },
    solicitante: { type: Types.ObjectId, ref: 'User', required: true },
    consultor: { type: Types.ObjectId, ref: 'SpecialistProfile', required: true },
    startedAt: Date,
    endedAt: Date,
    orientationNotes: String,
    encaminhamento: String,
    recordingUrl: String, // opcional, criptografado
  },
  { timestamps: true }
);

const SOSSession = model('SOSSession', SOSSessionSchema);

const CreditPackageSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    creditsRemaining: { type: Number, default: 0 },
    lastPurchase: { type: Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

const CreditPackage = model('CreditPackage', CreditPackageSchema);

module.exports = {
  User,
  Clinic,
  ActiveSession,
  Region,
  Procedure,
  AnatomyLayer,
  RegionContent,
  QuickReferenceCard,
  ProductDevice,
  Document,
  ConsentRecord,
  Subscription,
  Payment,
  AuditLog,
  Incident,
  SOSContact,
  // futuro / marketplace — referência, não expor na API ainda
  SpecialistProfile,
  SOSRequest,
  SOSSession,
  CreditPackage,
};
