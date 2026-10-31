# Insumos para Análise de Pontos de Função (APF)

> Levantamento bruto de funcionalidades, dados e integrações do projeto, para servir de
> base à contagem de Pontos de Função (IFPUG) e derivação do valor da proposta.
> Este documento reúne o insumo — a contagem/classificação (EI/EO/EQ/ILF/EIF, DETs,
> RETs, complexidade) é a etapa seguinte, feita em cima do que está aqui.

## 1. Cliente

- **Contratante:** Dr. Fábio Ricardo Barros, cirurgião-dentista, especialista em
  Harmonização Orofacial (HOF), clínica própria.
- **Perfil do contrato:** projeto individual/pequeno porte — não é contratação
  institucional nem licitação pública. Relação pré-existente (indicação pessoal).
- **Escala esperada de uso no MVP:** baixa — uso inicial por Dr. Fábio, Dra. Carolina e
  profissionais convidados/assinantes iniciais. Não é sistema de alto volume
  transacional.

## 2. Descrição do produto

App móvel nativo (iOS + Android) para profissionais de Harmonização Orofacial, com dois
eixos:

- **Atlas** — enciclopédia clínica interativa, navegável por região da face (13 regiões)
  ou por procedimento (4 categorias: toxina, preenchimento, bioestimulador, USG
  aplicada), com conteúdo clínico estruturado em 12 blocos fixos por região
  (avaliação, anatomia aplicada, visualização de planos em camadas, ultrassonografia,
  planejamento, aplicação ilustrada, erros comuns, reações esperadas, sinais de alerta,
  complicações, pós-procedimento, documentação).
- **SOS** — botão de contato direto (deep link WhatsApp) com especialista de referência,
  sem triagem estruturada no app (escopo simplificado, decisão de 31/08/2026).

Modelo de acesso: freemium (algumas regiões grátis, catálogo completo + SOS no plano
pago), com conta de clínica multiusuário.

Telas do app (protótipo já implementado): login, home, wizard de navegação, conduta,
histórico, tela de região, ficha rápida, visualizador de anatomia em camadas, paywall,
perfil.

## 3. Inventário de funcionalidades (por módulo)

Cada linha é uma função candidata a Entrada Externa (EI), Saída Externa (EO) ou Consulta
Externa (EQ) na contagem IFPUG. Classificação final (tipo + complexidade) fica pra
próxima etapa.

### Autenticação e conta
1. Cadastrar profissional (credenciais + registro no conselho)
2. Login (com verificação de credencial e limite de sessões simultâneas)
3. Renovar sessão (refresh token)
4. Logout (revogação de sessão)

### Atlas — Região e Procedimento
5. Listar regiões publicadas
6. Consultar região por identificador
7. Cadastrar região
8. Atualizar região
9. (Mesmo padrão se replicar para Procedimento, hoje só modelado, sem rota própria)

### Atlas — Conteúdo clínico
10. Listar conteúdo publicado (com filtro por região/procedimento)
11. Consultar conteúdo por identificador (com dado relacionado de camadas anatômicas e
    documentos)
12. Criar conteúdo (rascunho)
13. Atualizar conteúdo (com histórico de versão)
14. Publicar conteúdo (gera/atualiza a Ficha Rápida derivada — função com
    processamento/cálculo, não é cópia simples)
15. Consultar histórico de alterações do conteúdo

### Documentos e consentimento
16. Listar documentos publicados
17. Consultar documento por identificador
18. Criar documento (rascunho)
19. Atualizar documento (bloqueado após aprovação jurídica)
20. Aprovar revisão jurídica do documento
21. Publicar documento (com validação de regra de negócio — só publica se aprovado)
22. Registrar aceite de termo (com geração de hash do conteúdo, IP e timestamp)
23. Consultar meus aceites de termo

### Assinatura e pagamento
24. Consultar minha assinatura
25. Iniciar contratação/checkout
26. Receber notificação de pagamento (webhook do gateway)
27. Comprar documento avulso

### SOS
28. Listar contatos de especialista ativos
29. Cadastrar contato de especialista
30. Atualizar contato de especialista (inclui janelas de indisponibilidade)

### Administração e compliance
31. Consultar log de auditoria (com filtro)
32. Consultar incidentes registrados (com filtro)
33. Registrar incidente

**Total preliminar: 33 funções transacionais candidatas** (antes de aplicar
DETs/FTRs/complexidade).

## 4. Arquivos lógicos internos (ILF candidatos)

Agrupamentos de dado mantidos pelo próprio sistema:

1. Usuário / credencial profissional
2. Clínica (conta multiusuário)
3. Sessão ativa (controle de acesso simultâneo)
4. Região da face
5. Procedimento
6. Camada anatômica
7. Conteúdo clínico por região (os 12 blocos + histórico de versão)
8. Ficha rápida (derivada do conteúdo, mas persistida à parte)
9. Produto / dispositivo (catálogo técnico)
10. Documento (termo, POP, orientação — versionado)
11. Registro de consentimento
12. Assinatura
13. Pagamento
14. Log de auditoria
15. Incidente
16. Contato SOS

**16 ILFs candidatos.** (Entidades de marketplace de especialista — perfil de
especialista, solicitação/sessão de SOS estruturado, pacote de crédito — existem só como
referência de schema, fora de escopo atual, não entram na contagem.)

## 5. Interfaces externas (EIF candidatos) e integrações

- **Gateway de pagamento (Mercado Pago)** — hoje simulado/mockado; quando integrado de
  verdade, os dados de cobrança cujo "dono" é o gateway (status de transação,
  identificadores) contam como EIF.
- **Consulta a registro profissional (CFO/CFM)** — mencionada como integração desejável
  no levantamento original; sem API confirmada, não implementada. Incluir como EIF só
  se confirmado que entra no MVP.
- **Deep link WhatsApp** — não é integração de sistema (não há troca de dado
  estruturado, é abertura de link externo). Não conta como EIF; conta como saída simples
  de uma função.
- **Armazenamento de mídia** (imagens/vídeo/USG, com marca d'água e link temporário) —
  ainda não implementado; se usar serviço externo (S3 ou equivalente), é integração
  técnica a considerar no ajuste de complexidade, não necessariamente EIF.
- **Notificações push/e-mail/SMS** — mencionadas como necessárias no levantamento
  original; escopo/fornecedor ainda não confirmado para o MVP.
- Videochamada com SDK, split de pagamento e KYC de especialista — pertencem à visão de
  marketplace de longo prazo, **fora do escopo atual**, não entram na contagem do MVP.

## 6. Como será cobrado

- Cobrança por fase de entrega (Fase 1 — Atlas completo; Fase 2 — compras avulsas; Fase
  3 — SOS), não por hora.
- Pagamento via PIX, à vista por fase ou parcelado mensalmente dentro do período de cada
  fase (condição a escolher pelo cliente).
- A ideia de usar Pontos de Função aqui é derivar o **tamanho funcional** do sistema de
  forma defensável e, a partir disso, aplicar um valor por Ponto de Função (ou uma
  produtividade em horas/PF × taxa) — em vez de estimar hora "no olho".

---

*Próximo passo: classificar cada função da seção 3 (EI/EO/EQ) e cada arquivo da seção 4
(ILF/EIF) por complexidade (DETs/RETs/FTRs), somar os Pontos de Função não ajustados, e
aplicar o Fator de Ajuste (características gerais do sistema) para chegar ao total
ajustado.*
