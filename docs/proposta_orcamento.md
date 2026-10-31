# Proposta de Desenvolvimento — App HOF (Dr. Fábio Barros)

**Proposta nº** 001/2026 · **Data:** 01/09/2026 · **Validade:** 30 dias

**Contratante:** Dr. Fábio Ricardo Barros
**Contratados:** Thiago Vasconcellos e João Victor
**Objeto:** Desenvolvimento do aplicativo de Harmonização Orofacial descrito nesta proposta

---

## 1. Visão geral do projeto

Aplicativo profissional voltado a dentistas e médicos que atuam com Harmonização
Orofacial (HOF), estruturado em duas frentes:

- **Atlas** — enciclopédia clínica interativa, navegável por região da face ou por
  procedimento, com conteúdo padronizado (indicações, anatomia, planejamento, técnica,
  riscos, pós-procedimento) para cada uma das 13 regiões faciais.
- **SOS** — canal de contato direto com especialista de referência em caso de dúvida ou
  intercorrência durante o atendimento.

O produto é nativo (iOS e Android), com modelo de acesso freemium (algumas regiões
gratuitas, conteúdo completo mediante assinatura).

## 2. Estrutura de entrega, por fase

O projeto é entregue em fases sequenciais. Cada fase só começa depois que a anterior
está concluída e validada.

### Fase 0 — Piloto (em andamento)

Uma região completa (temporal, procedimento de preenchimento) construída de ponta a
ponta — telas, backend e conteúdo — servindo de molde para todas as demais. Objetivo:
validar o formato de dado e de tela antes de replicar em escala.

### Fase 1 — Atlas completo (MVP / lançamento)

Todas as 13 regiões faciais no formato validado pelo piloto, incluindo:

- Cadastro e login de profissional, com upload de credencial (CRO/CRM)
- Controle de sessões simultâneas por conta (proteção contra compartilhamento de login)
- Navegação por região e por procedimento, com busca e favoritos
- Estrutura fixa de conteúdo por região (12 blocos: avaliação, anatomia aplicada,
  visualização de planos anatômicos em camadas, ultrassonografia, planejamento,
  aplicação ilustrada, erros comuns, reações esperadas, sinais de alerta, complicações,
  pós-procedimento, documentação)
- Ficha rápida — card resumido de consulta ágil por procedimento/região
- Visualizador de anatomia em camadas (pele, subcutâneo, músculo, fáscia, vaso, nervo,
  osso — ativáveis/ocultáveis individualmente)
- Conta de clínica multiusuário (mais de um profissional sob a mesma assinatura)
- Modelo de assinatura freemium, com período de teste gratuito de lançamento
- Painel para publicação e edição de conteúdo pela equipe, sem depender de alteração de
  código a cada atualização de região
- Registro de auditoria de ações sensíveis (publicação de conteúdo, mudança de
  assinatura)

**Esta é a versão considerada "pronta para lançamento".**

### Fase 2 — Compras avulsas

Documentos clínicos comprados avulsamente dentro do app: termo de consentimento, POPs
da Anvisa, orientação pós-operatória. Inclui:

- Fluxo de revisão jurídica obrigatória de cada documento antes da publicação (nenhum
  documento pode ser vendido sem aprovação formal)
- Registro de aceite de termo com hash do conteúdo, IP e timestamp — evidência com
  valor probatório em caso de disputa
- Cobrança avulsa integrada ao gateway de pagamento

### Fase 3 — SOS

Botão de contato direto via WhatsApp com o especialista de plantão configurado. Mais
simples tecnicamente que as fases anteriores, mas colocado por último porque depende de
revisão jurídica/LGPD formal antes de lidar com dado de paciente — **etapa com escopo e
prazo ainda não fechados**, ver seção 5.

## 3. O que já foi entregue

Para deixar claro que a proposta não parte do zero:

- Protótipo navegável do app (10 telas: login, home, wizard de navegação, conduta,
  histórico, tela de região, ficha rápida, visualizador de anatomia, paywall, perfil),
  testado sem erros de console
- Backend da Fase 1 majoritariamente implementado: autenticação, controle de acesso por
  papel (5 perfis distintos), módulo de conteúdo (com fluxo de rascunho → publicação →
  histórico de versões), módulo de documentos, módulo de assinatura/pagamento
  (integração real com gateway ainda pendente — hoje simulada para permitir testar o
  restante do sistema), módulo de SOS, módulo de auditoria
- Coleção de testes de API organizada, cobrindo todos os fluxos acima

## 4. Por que a complexidade é maior do que parece

Um app "de conteúdo" costuma parecer simples de fora. Este não é, por alguns motivos
concretos:

- **Dado sensível de saúde.** LGPD exige tratamento diferenciado: base legal por
  operação, política de retenção, consentimento registrado com evidência (hash + IP +
  timestamp), não apenas um checkbox.
- **Documento com peso jurídico.** Termos e consentimentos não podem ir ao ar sem
  aprovação formal — o sistema precisa impedir isso estruturalmente, não só de boa fé.
- **Controle de acesso granular.** Cinco perfis de usuário diferentes (profissional,
  especialista, administrador de conteúdo, revisor de compliance, superadmin), cada um
  com permissões distintas sobre as mesmas informações.
- **Conteúdo versionado, não estático.** Toda alteração de conteúdo clínico gera
  histórico rastreável — necessário para poder provar o que estava publicado em
  determinada data, caso questionado.
- **App nativo em duas lojas.** Processo de submissão, revisão e conformidade com as
  políticas da Apple e do Google, distinto de publicar uma aplicação web.
- **Conta multiusuário por clínica.** Mais de um profissional compartilhando uma
  assinatura, com controle de quantos assentos o plano permite.
- **Modelo de cobrança misto.** Assinatura recorrente (Fase 1) e compra avulsa (Fase 2)
  convivendo no mesmo sistema de pagamento.

## 5. Fora do escopo desta proposta

- **Produção do conteúdo clínico** (textos, indicações, riscos, protocolos) — de
  responsabilidade do Dr. Fábio e equipe (Mirianinha). O cronograma da Fase 1 depende
  diretamente do ritmo de entrega desse conteúdo, região por região.
- **Revisão jurídica formal dos documentos e termos** — recomendamos profissional
  especializado; não está incluída como serviço de desenvolvimento.
- **Taxas de terceiros**: conta de desenvolvedor Apple (cobrança anual), taxa única de
  registro Google Play, taxas de processamento do gateway de pagamento, custo de
  hospedagem/infraestrutura recorrente. Nenhuma dessas é receita da equipe de
  desenvolvimento — são repasses diretos aos respectivos provedores.
- **Fase 3 (SOS)** entra no valor total como estimativa, sujeita a ajuste quando o
  formato final for definido após a revisão jurídica (ver seção 2).

## 6. Cronograma

O prazo da Fase 1 é medido a partir da **entrega do conteúdo de cada região**, não da
assinatura desta proposta — o fator limitante é a produção de conteúdo clínico, não o
desenvolvimento. Com entrega de conteúdo em ritmo constante, estimamos a Fase 1
completa em até 4 meses.

## 7. Investimento

<table style="table-layout: fixed; width: 100%;">
<colgroup>
<col style="width: 15%;"><col style="width: 60%;"><col style="width: 25%;">
</colgroup>
<tr><th>Fase</th><th>Entregável</th><th>Valor</th></tr>
<tr><td>Fase 1</td><td>Atlas completo (13 regiões) + assinatura</td><td>R$ 7.000</td></tr>
<tr><td>Fase 2</td><td>Compras avulsas de documentos</td><td>R$ 2.500</td></tr>
<tr><td>Fase 3</td><td>SOS (estimativa, sujeita a ajuste)</td><td>R$ 2.000</td></tr>
<tr><td><strong>Total</strong></td><td></td><td><strong>R$ 11.500</strong></td></tr>
</table>

**Condição de pagamento** — a escolher pelo contratante:

- **Por fase**: pagamento na entrega/aceite de cada fase (Fase 1 ao publicar o Atlas
  completo, Fase 2 ao ativar compras avulsas, Fase 3 ao ativar o SOS).
- **Parcelado**: valor de cada fase dividido em mensalidades iguais durante o período de
  desenvolvimento daquela fase.

Pagamento via PIX, para a conta a ser informada pelos contratados.

## 8. Titularidade e propriedade intelectual

- O código-fonte, banco de dados, documentação técnica e demais artefatos produzidos são
  cedidos integralmente ao contratante mediante o pagamento de cada fase — sem retenção
  de titularidade pelos contratados após a entrega.
- O repositório de código já está sob controle acessível ao contratante desde o início do
  projeto.
- Recomenda-se que as contas de hospedagem, domínio, banco de dados, gateway de
  pagamento e lojas de aplicativo sejam abertas no nome da empresa titular do projeto
  (e não em nome pessoal de terceiros), conforme já orientado no dossiê de proteção
  jurídica do próprio contratante.
- Bibliotecas e serviços de terceiros usados no projeto (frameworks, SDKs) permanecem sob
  suas licenças originais — nenhuma delas impõe restrição de uso comercial ao projeto.

## 9. Suporte e alterações

- Inclusas, dentro de cada fase: correções de bugs e pequenos ajustes de tela/texto
  identificados até 15 dias após a entrega da fase.
- Alterações de escopo (novas funcionalidades, mudança de fluxo já aprovado) são tratadas
  como adicional, orçado à parte.
- Fora desse período, manutenção e evolução contínua podem ser contratadas
  separadamente, a combinar.

---

## Aceite

De acordo com o escopo, prazo e valores descritos nesta proposta:

&nbsp;

**Dr. Fábio Ricardo Barros** — Contratante　　　　　　　　Data: ______/______/________

&nbsp;

**Thiago Vasconcellos / João Victor** — Contratados　　　　Data: ______/______/________

---

*Proposta válida por 30 dias a partir da data acima.*
