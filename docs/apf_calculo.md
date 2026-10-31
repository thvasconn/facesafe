# Cálculo de Pontos de Função (APF) — App HOF

> Contagem aplicada sobre o insumo levantado em `docs/insumos_apf.md`, seguindo o método
> IFPUG (funções de dados ILF/EIF + funções transacionais EI/EO/EQ, complexidade por
> DET/RET/FTR, ajuste por Características Gerais do Sistema).
>
> **Nota de método:** contar Pontos de Função exige julgamento em alguns pontos — em
> especial em documentos aninhados como o conteúdo clínico (`RegionContent`, com 12
> blocos), onde a fronteira entre "subgrupo conta como RET" ou "só contribui DETs" é uma
> zona cinzenta mesmo na literatura IFPUG. Os números abaixo são uma estimativa
> defensável, não uma contagem auditada por um CFPS (Certified Function Point
> Specialist).

## 1. Funções de dados (ILF / EIF)

| # | Arquivo lógico | RET | DET | Complexidade | PF |
|---|---|---|---|---|---|
| 1 | Usuário / credencial profissional | 3 | 18 | Baixa | 7 |
| 2 | Clínica | 1 | 7 | Baixa | 7 |
| 3 | Sessão ativa | 1 | 8 | Baixa | 7 |
| 4 | Região da face | 1 | 7 | Baixa | 7 |
| 5 | Procedimento | 1 | 5 | Baixa | 7 |
| 6 | Camada anatômica | 1 | 7 | Baixa | 7 |
| 7 | Conteúdo clínico por região (12 blocos + histórico) | 14 | 46 | **Alta** | 15 |
| 8 | Ficha rápida | 1 | 13 | Baixa | 7 |
| 9 | Produto / dispositivo | 2 | 11 | Baixa | 7 |
| 10 | Documento | 2 | 14 | Baixa | 7 |
| 11 | Registro de consentimento | 1 | 12 | Baixa | 7 |
| 12 | Assinatura | 1 | 12 | Baixa | 7 |
| 13 | Pagamento | 1 | 11 | Baixa | 7 |
| 14 | Log de auditoria | 1 | 7 | Baixa | 7 |
| 15 | Incidente | 1 | 8 | Baixa | 7 |
| 16 | Contato SOS | 2 | 9 | Baixa | 7 |

**Subtotal ILF: 120 PF.**

**EIF condicional** — dados de cobrança cujo "dono" é o gateway (Mercado Pago): 5 PF
(Baixa), **só entra na contagem quando a integração real for implementada** — hoje é
mockada, não conta.

## 2. Funções transacionais (EI / EO / EQ)

| # | Função | Tipo | FTR | DET | Complex. | PF |
|---|---|---|---|---|---|---|
| 1 | Cadastrar profissional | EI | 1 | 8 | Baixa | 3 |
| 2 | Login | EI | 2 | 7 | Média | 4 |
| 3 | Renovar sessão (refresh) | EI | 2 | 2 | Baixa | 3 |
| 4 | Logout | EI | 1 | 1 | Baixa | 3 |
| 5 | Listar regiões | EQ | 1 | 7 | Baixa | 3 |
| 6 | Consultar região | EQ | 1 | 8 | Baixa | 3 |
| 7 | Cadastrar região | EI | 1 | 8 | Baixa | 3 |
| 8 | Atualizar região | EI | 1 | 8 | Baixa | 3 |
| 9 | Listar conteúdo publicado | EQ | 3 | 7 | Média | 4 |
| 10 | Consultar conteúdo por id | EQ | 3 | 22 | **Alta** | 6 |
| 11 | Criar conteúdo | EI | 1 | 17 | Média | 4 |
| 12 | Atualizar conteúdo | EI | 1 | 17 | Média | 4 |
| 13 | Publicar conteúdo | EO | 3 | 13 | Média | 5 |
| 14 | Consultar histórico do conteúdo | EQ | 1 | 4 | Baixa | 3 |
| 15 | Listar documentos | EQ | 1 | 10 | Baixa | 3 |
| 16 | Consultar documento | EQ | 1 | 14 | Baixa | 3 |
| 17 | Criar documento | EI | 1 | 8 | Baixa | 3 |
| 18 | Atualizar documento | EI | 1 | 8 | Baixa | 3 |
| 19 | Aprovar revisão jurídica | EI | 2 | 6 | Média | 4 |
| 20 | Publicar documento | EI | 2 | 5 | Média | 4 |
| 21 | Registrar consentimento | EI | 3 | 10 | **Alta** | 6 |
| 22 | Consultar meus aceites | EQ | 1 | 10 | Baixa | 3 |
| 23 | Consultar minha assinatura | EQ | 2 | 10 | Média | 4 |
| 24 | Iniciar checkout | EI | 2 | 10 | Média | 4 |
| 25 | Receber webhook de pagamento | EI | 3 | 10 | **Alta** | 6 |
| 26 | Comprar documento avulso | EI | 2 | 8 | Média | 4 |
| 27 | Listar contatos SOS | EQ | 1 | 8 | Baixa | 3 |
| 28 | Cadastrar contato SOS | EI | 1 | 5 | Baixa | 3 |
| 29 | Atualizar contato SOS | EI | 1 | 5 | Baixa | 3 |
| 30 | Consultar audit logs | EQ | 1 | 13 | Baixa | 3 |
| 31 | Consultar incidentes | EQ | 1 | 8 | Baixa | 3 |
| 32 | Registrar incidente | EI | 1 | 10 | Baixa | 3 |

**Subtotal transacional: 116 PF.**

Não contabilizadas por não estarem implementadas/confirmadas: CRUD de Procedimento
(replicaria o padrão de Região, +~12 PF se entrar em escopo), notificações
push/e-mail/SMS, consulta a registro profissional externo (CFO/CFM).

## 3. Pontos de Função Não Ajustados (UFP)

```
ILF ........... 120 PF
EI + EO + EQ ... 116 PF
─────────────────────
UFP total ...... 236 PF
```

## 4. Fator de Ajuste (Características Gerais do Sistema)

| # | Característica | Nota (0-5) | Justificativa |
|---|---|---|---|
| 1 | Comunicação de dados | 4 | API REST online, cliente-servidor completo |
| 2 | Processamento distribuído | 1 | Backend único, sem distribuição real |
| 3 | Performance | 2 | Sem requisito crítico de tempo de resposta definido |
| 4 | Configuração altamente utilizada | 0 | Sem restrição de hardware/infra definida |
| 5 | Volume de transações | 1 | Uso inicial baixo (poucos usuários no MVP) |
| 6 | Entrada de dados online | 5 | Toda entrada é via API, sem processo em lote |
| 7 | Eficiência para o usuário final | 4 | Ficha rápida, busca e favoritos priorizam agilidade |
| 8 | Atualização online | 4 | Updates diretos via API |
| 9 | Complexidade de processamento | 4 | RBAC de 5 papéis, gate de revisão jurídica, versionamento, hash de consentimento |
| 10 | Reusabilidade | 3 | Módulos seguem o mesmo padrão routes/controller/service |
| 11 | Facilidade de implantação | 2 | Publicação em duas lojas de app, processo padrão |
| 12 | Facilidade operacional | 2 | Backup/monitoramento ainda não formalizados |
| 13 | Múltiplos locais | 0 | Cliente único, um ambiente |
| 14 | Facilidade de mudanças | 4 | Conteúdo administrável sem alterar código |

```
TDI (soma das 14 notas) ... 36
VAF = 0,65 + (TDI × 0,01) .. 1,01
```

## 5. Pontos de Função Ajustados

```
PF ajustado = UFP × VAF = 236 × 1,01 ≈ 238 PF
```

## 6. De Pontos de Função para valor — a variável que falta

Ponto de Função mede **tamanho**, não **preço**. Pra chegar num valor, falta multiplicar
por uma produtividade (horas por PF) e por uma taxa (R$/hora) — e isso depende de vocês,
não é algo que dá pra cravar por fora. Não vou inventar um "valor de mercado por PF"
porque essa referência varia demais (contratos públicos brasileiros usam faixas bem mais
altas que projeto privado/freelancer, por exemplo) e citar um número errado aqui seria
pior que não citar nenhum.

Fórmula: **PF ajustado × horas/PF × taxa horária = valor total**

| Cenário | Horas/PF | Se taxa = R$ 80/h | Se taxa = R$ 120/h |
|---|---|---|---|
| Produtividade alta (stack moderna + apoio de IA no desenvolvimento) | 3h/PF | R$ 57.120 | R$ 85.680 |
| Produtividade média (desenvolvimento tradicional) | 6h/PF | R$ 114.240 | R$ 171.360 |

Esses dois eixos (horas/PF e taxa) são os números que faltam vir de vocês — me diga
qual taxa horária faz sentido pro contexto de vocês (ou qual produtividade acha realista
dado o que já foi observado no projeto) que eu calculo o valor final e já reflito na
proposta.
