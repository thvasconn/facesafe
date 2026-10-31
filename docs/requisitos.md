# FaceSafe — Levantamento de Requisitos

> Baseado em `Projeto_Completo_FaceSafe.docx` e `Dossie_Protecao_Juridica_FaceSafe.docx` (Dr. Fabio Ricardo Barros, 17/08/2026).
> Escopo deste levantamento: **Atlas + SOS completo** (por decisão de 19/08/2026), com fases de entrega recomendadas na seção 11 — levantar tudo não significa construir tudo de uma vez.
>
> **Atualizado em 31/08/2026 após call com o cliente** (João Victor, Thiago Vasconcellos, Dr. Fábio Barros). Nome de trabalho "FaceSafe" foi descartado pelo cliente — marca ainda não definida, ver seção 12. Decisões fechadas na call estão marcadas ✅ nas seções abaixo; o texto original do documento do cliente foi mantido como referência onde ainda vale.

## 1. Visão geral

Duas frentes de produto sob uma mesma marca:

- **Atlas** — enciclopédia clínica interativa de Harmonização Orofacial (HOF), navegável por região da face ou por procedimento, com conteúdo padronizado por região.
- **SOS** — rede de teleinterconsulta profissional-profissional, com triagem, credenciamento de especialistas e encaminhamento para emergência real quando aplicável.

Não é curso, não é prontuário completo, não promete socorro emergencial fora de estrutura real de plantão.

## 2. Personas

| Persona | Necessidade |
|---|---|
| Profissional habilitado (dentista/médico) iniciante em HOF | Consulta rápida de anatomia/técnica/riscos por região |
| Profissional em situação de dúvida/intercorrência | Triagem e teleinterconsulta com especialista verificado |
| Especialista credenciado (SOS) | Receber solicitações, atender, ser remunerado |
| Clínica (plano multiusuário) | Gerenciar acesso da equipe |
| Administrador de conteúdo (equipe FaceSafe) | Publicar/atualizar atlas sem depender de dev |
| Revisor/compliance | Auditar credenciamento, incidentes, dados |

## 3. Escopo funcional — Atlas

### 3.1 Navegação
- Entrada dupla: **por região da face** (13 regiões listadas no doc: frontal, glabelar, temporal, periorbital, infraorbital, nasal, malar, nasolabial, labial, mentoniana, mandibular, parotídeo-massetérica, cervical) e **por procedimento** (toxina, preenchimento, bioestimuladores, USG aplicada).
- Mesmo conteúdo acessível pelos dois caminhos (ex.: toxina na glabela aparece em "Glabela" e em "Toxina botulínica").
- Busca e favoritos.

### 3.2 Estrutura fixa por região (12 blocos — recorrente em todo o conteúdo)
1. Avaliação (indicações, contraindicações, quando não tratar)
2. Anatomia aplicada
3. Visualização de planos (camadas ativáveis/ocultáveis)
4. Ultrassonografia (imagem normal, Doppler, correlação)
5. Planejamento (objetivo, produto, dispositivo, marcação)
6. Aplicação ilustrada (profundidade, direção, trajetória)
7. Erros comuns
8. Reações esperadas
9. Sinais de alerta
10. Complicações
11. Pós-procedimento
12. Documentação (termos, ficha, consentimento)

### 3.3 Ficha rápida
Card resumido e escaneável por procedimento/região: objetivo, produto, dispositivo, entrada, plano, direção/ângulo, riscos, USG, normal, alerta, pós, documentos. **Este é o artefato de uso mais frequente — candidato natural a região piloto e a MVP.**

### 3.4 Anatomia em camadas
Visualização interativa de corte anatômico com toggle de camadas (pele, subcutâneo, músculo, fáscia, vaso, nervo, osso).

### 3.5 Documentos
Anamnese, termo de consentimento (por procedimento/região quando aplicável), termo de uso de imagem, ficha de marcação/aplicação, orientação pós, ficha de retorno, registro de intercorrência. Modelos editáveis, sujeitos a revisão jurídica — **não podem ser tratados como conteúdo definitivo até essa revisão**.

### 3.6 Base de produtos/dispositivos (complementar)
Priorizar característica técnica (categoria, reologia, plano compatível) sobre marca comercial. Base de marcas é opcional/complementar e exige atualização frequente com identificação de fabricante/registro/versão/data.

### 3.7 Painel administrativo
Atualização de conteúdo sem depender do desenvolvedor — CMS interno para as 12 seções por região, versionamento de documentos/termos, gestão de produtos/dispositivos.

## 4. Escopo funcional — SOS

> ✅ **Decisão da call (31/08/2026): o SOS do MVP é muito mais simples do que descrito abaixo.** Para a Fase 3, o botão SOS abre diretamente uma conversa de WhatsApp com o número da clínica do Dr. Fábio (Ipanema) ou da Dra. Carolina (Tijuca/Niterói) — sem triagem estruturada no app, sem marketplace de especialistas, sem fila de prioridade automatizada. O cliente reconheceu e aceitou o risco de que usuários que cancelem a assinatura continuem contatando os dois profissionais diretamente pelo WhatsApp, contornando o paywall — não há como impedir isso tecnicamente nessa versão. **Implicação prática: não vender/orçar o SOS como fonte de receita recorrente protegida — é feature de retenção/valor percebido do plano full, não um produto isolado.** O marketplace completo de especialistas credenciados (seções 4.1-4.4 abaixo) permanece como visão de longo prazo ("profissional pagando luva para ficar disponível"), mas é fase muito posterior, sem prazo definido.

### 4.1 Classificação de atendimento (triagem) — visão original de longo prazo, não é o MVP do SOS
| Nível | Exemplo | Destino |
|---|---|---|
| Confirmação | Reação esperada, dúvida de retorno | Teleinterconsulta regular |
| Prioridade | Dor fora do padrão, suspeita vascular | Fila prioritária |
| Emergência real | Alteração visual súbita, dispneia, sinal neurológico | Acionamento imediato do SAMU (192) — suporte remoto só em paralelo, nunca substitui |

A regra de emergência é inegociável: o sistema **nunca** pode fazer o usuário esperar um especialista quando os critérios de emergência real são atingidos.

### 4.2 Fluxo do solicitante
1. Selecionar região/procedimento/tipo de situação
2. Informar produto, marca, lote, quantidade, data/hora
3. Registrar sintomas/evolução/sinais
4. Anexar fotos/vídeo/USG (mediante autorização)
5. Responder triagem de emergência
6. Selecionar especialista (online ou horário agendado)
7. Pagar ou usar crédito do plano
8. Videochamada + registro da orientação/encaminhamento

### 4.3 Perfil e credenciamento do especialista
- Perfil público: nome, conselho, formação, áreas, experiência, disponibilidade, preço, tempo de resposta, avaliações.
- Credenciamento (independente de pagamento): identidade + registro profissional ativo, diplomas/especialidades, certidão de regularidade, experiência comprovada em HOF/intercorrências, capacitação em USG se anunciada, aceite de regulamento clínico/ético/dados, recertificação periódica.
- Linguagem obrigatória: "especialista verificado e credenciado pela plataforma" — nunca sugerir que pagamento por si só habilita.

### 4.4 Atendimento
- Agenda/presença online do especialista.
- Videochamada + mensagens + anexos seguros.
- Registro do atendimento: solicitante, consultor, data/hora, orientação, encaminhamento.
- Avaliação pós-atendimento.

## 5. Perfis de acesso (RBAC)

- Assinante individual (profissional)
- Conta de clínica (multiusuário, gestão de equipe/licenças)
- Especialista SOS
- Administrador de conteúdo
- Revisor/compliance/auditoria
- Superadmin

## 6. Requisitos não funcionais

### 6.1 Segurança e dados (crítico — dados de saúde são sensíveis pela LGPD)
- Consentimento explícito para dados/imagens do paciente, base legal por finalidade.
- Minimização de dados; separação entre dados cadastrais e dados clínicos.
- Criptografia em trânsito/repouso, MFA (obrigatório para especialistas e admin), controle de acesso por função, logs de auditoria imutáveis.
- Política de retenção/descarte, canal do encarregado (DPO), plano de resposta a incidentes.
- Registro do aceite de termos: nome, CPF, registro profissional, data/hora, IP, versão do termo + hash, checkbox não pré-marcado.

### 6.2 Proteção de conteúdo (do dossiê jurídico)
- Marca d'água individual (nome/registro do assinante) em imagens/documentos.
- Streaming protegido para vídeos (sem download direto).
- Links temporários para arquivos.
- Limite de sessões simultâneas por conta.
- Detecção de scraping/automação/volume anormal.
- Bloqueio de exportação em massa (DLP) para conteúdo interno.

### 6.3 Disponibilidade/operação
- SLA de disponibilidade do SOS ligado diretamente à segurança do paciente — não pode prometer 24h sem plantão real por trás.
- Backups e plano de continuidade.

## 7. Modelo de dados (entidades de alto nível)

```
User (perfil, papel, credenciais)
Clinic (conta multiusuário) —< ClinicMember >— User
Region (13 regiões faciais)
Procedure (toxina, preenchimento, bioestimulador, USG...)
RegionContent (os 12 blocos, por Region x Procedure)
QuickReferenceCard (ficha rápida, derivada de RegionContent)
AnatomyLayer (asset por camada, vinculado a RegionContent)
Product / Device (catálogo técnico, opcionalmente vinculado a marcas)
Document (template versionado: termo, consentimento, checklist)
ConsentRecord (aceite do documento, hash, timestamp, ator)
SpecialistProfile (credenciamento, documentos, status de verificação)
SOSRequest (solicitação, nível de triagem, anexos, status)
SOSSession (videochamada, registro de orientação/encaminhamento)
Payment / Subscription / CreditPackage
AuditLog
Incident (registro de intercorrência)
```

## 8. Integrações necessárias

- Pagamentos/assinaturas (gateway com suporte a marketplace/split para repasse ao especialista)
- Videochamada (SDK com gravação opcional e criptografia)
- Armazenamento de mídia protegido (imagens/vídeos/USG) com marca d'água e link temporário
- Verificação de identidade/documento (KYC do especialista)
- Consulta a registro profissional (CFO/CFM ou equivalente, quando houver API/base pública)
- Notificações (push/e-mail/SMS para triagem prioritária e emergência)

## 9. Modelo de negócio (requisitos de billing)

> ✅ **Decisão da call (31/08/2026):** modelo **freemium**. Lançamento com 3-4 meses gratuitos (estratégia de divulgação/aquisição), depois transição para cobrança. Dois planos:
> - **Free**: acesso a algumas regiões do atlas (a definir quais).
> - **Full**: acesso a todas as regiões + central de complicação (SOS).
>
> Compras avulsas confirmadas para fase posterior ao MVP (dentro do app, não assinatura): termo de consentimento pronto (~R$10/termo), POPs da Anvisa, orientações pós-operatórias. Gateway: **Mercado Pago**, usando o CNPJ da clínica atual do Dr. Fábio até que ele crie um CNPJ conjunto com a Dra. Carolina para o projeto — ver risco na seção 13.
>
> Itens abaixo (do documento original) seguem como possibilidades de médio/longo prazo, não confirmadas para a v1:

Assinatura do Atlas · Plano Clínica (multiusuário) · Teleinterconsulta avulsa · Pacote de créditos · Mensalidade do especialista · Taxa de plataforma sobre teleinterconsulta · Licenciamento institucional (faculdades/distribuidores).

→ Implica: catálogo de planos (free/full), cobrança recorrente, compras avulsas in-app, nota fiscal. Split de pagamento (specialist payout) só entra quando o marketplace de especialistas sair do papel — não é requisito do MVP.

## 10. Fora de escopo (explícito no documento do cliente)

- Não é plataforma de aulas/grade curricular obrigatória.
- Não substitui capacitação prática, avaliação clínica ou responsabilidade profissional.
- Não armazena prontuário completo na primeira versão.
- Não promete atendimento emergencial sem equipe/escala real.
- Não patenteia o modelo de negócio em si (só possível solução técnica nova, ex.: processamento de USG).

## 11. Fases de entrega recomendadas

> ✅ **Fases confirmadas na call (31/08/2026)**, substituindo o plano de 4 fases original:
>
> 1. **Protótipo de 1 região** — usada como molde/template de todo o padrão de tela e dado. Cliente concordou que não faz sentido lançar com uma região só, mas topou construir uma primeiro para validar o formato antes de replicar.
> 2. **Fase 1 — Atlas completo**: todas as 13 regiões, no formato validado pelo protótipo, com o modelo freemium (free = algumas regiões, full = todas). **Esta é a versão "pronta para baixar" que o cliente considera o lançamento real.**
> 3. **Fase 2 — Compras internas**: termos de consentimento avulsos, POPs da Anvisa, orientações pós-operatórias.
> 4. **Fase 3 — SOS**: botão de deep link para WhatsApp (ver seção 4) — a mais simples tecnicamente, mas colocada por último por decisão do cliente e por causa da LGPD.
>
> **Prazo-alvo do cliente: até o fim do ano (31/12/2026) — cerca de 4 meses a partir da call.** Ele não tem data rígida ("não tô com pressa"), mas é a meta verbalizada. **Ressalva importante para o orçamento**: esse prazo cobre um escopo bem maior do que a estimativa original de 2-3 meses para 1 região piloto — agora são 13 regiões completas na Fase 1. O fator decisivo não é o desenvolvimento (uma vez o molde pronto, replicar região é repetitivo), é o **conteúdo clínico saindo do Dr. Fábio + Mirianinha para as 13 regiões**, que ainda não começou a ser produzido. Deixar isso explícito na proposta protege o prazo de vocês — o relógio da Fase 1 deveria contar a partir da entrega do conteúdo de cada região, não da assinatura do contrato.

Plano original do documento do cliente (referência, substituído pelo acima):

1. ~~Protótipo — estrutura-padrão de 1 região piloto (temporal, sugerida no doc), navegável.~~
2. ~~Atlas MVP — 3–5 regiões, ficha rápida, normal x alerta, documentos, pós.~~
3. ~~Piloto SOS — grupo pequeno de especialistas, horários delimitados, após revisão jurídica/ética/dados formal.~~
4. ~~Escala — mais regiões/procedimentos, planos institucionais, IA sobre conteúdo validado.~~

## 12. Perguntas em aberto para o Dr. Fábio

### Resolvidas na call de 31/08/2026
- [x] Plataforma: nativo confirmado (não web).
- [x] Região piloto: uma região qualquer serve de molde, mas o lançamento real (Fase 1) é com todas as 13 regiões.
- [x] Modelo de cobrança da v1: freemium (free = algumas regiões, full = todas + SOS). Créditos, mensalidade de especialista e taxa de plataforma ficam para quando o marketplace de especialistas existir (sem prazo).
- [x] Formato do SOS: deep link para WhatsApp, não teleinterconsulta estruturada (ver seção 4).
- [x] CNPJ: usar o da clínica atual por ora, migrar para CNPJ conjunto com a Dra. Carolina depois.

### Ainda em aberto — cobrar no questionário/próxima call
- [ ] Nome definitivo da marca: "SafeHof" ou "HoffSafe" — nenhum fechado, nem pesquisado no INPI/domínio ainda.
- [ ] Escopo de marcas comerciais no atlas: só características técnicas ou já entrar com marcas comerciais?
- [ ] Quais regiões entram no plano **free** vs. exclusivas do **full**?
- [ ] Critérios para convidar especialistas fundadores do futuro marketplace SOS (sem prazo definido, mas vale já perguntar a visão dele).
- [ ] Orçamento: cliente pediu para entender como o custo pode ser diluído (parcelamento/fases pagas) — pendente de resposta de vocês, não dele.

## 13. Riscos e dependências

- **Jurídico bloqueia o SOS**: revisão de advogado especializado em PI/saúde digital/LGPD é pré-requisito antes de lançar teleinterconsulta (não antes de *desenvolver*, mas antes de operar com usuários reais).
- **Conteúdo clínico depende do Dr. Fabio**: imagens anatômicas, USG, casos anonimizados, protocolos — sem isso não há atlas, é o gargalo de conteúdo, não de engenharia.
- **Titularidade de ativos**: repositório, domínio, contas de hospedagem devem ser abertos em nome da empresa do FaceSafe desde o dia 1 (não no nome pessoal do dev) — decisão administrativa a alinhar antes de criar as contas de infra. **Atualização 31/08/2026**: por decisão do cliente, o gateway de pagamento (Mercado Pago) e provavelmente domínio/hospedagem vão usar o CNPJ da clínica atual dele por ora, com plano de migrar para um CNPJ conjunto com a Dra. Carolina mais adiante. Registrar isso por escrito (e-mail/orçamento) como pendência do cliente — é exatamente o risco que o dossiê jurídico dele mesmo alertava, então não deve virar problema do dev se ficar destrinchar titularidade depois.
- **Dados de saúde = tratamento sensível**: qualquer atraso na governança de dados (DPO, base legal, retenção) trava o SOS mesmo com o produto pronto.
