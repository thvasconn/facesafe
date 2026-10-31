# Backend — app HOF (Dr. Fábio Barros)

Boilerplate inicial: Express + Mongoose + auth JWT (access + refresh) com controle de
sessões simultâneas. Cobre o modelo GUIA do Atlas (Fase 1). SOS aqui é só o modelo
`SOSContact` — o deep link pro WhatsApp é resolvido no app, não no backend.

## Rodando local

1. Suba o Mongo local:
   ```bash
   docker compose up -d
   ```
2. Copie o `.env.example` pra `.env` e ajuste os secrets:
   ```bash
   cp .env.example .env
   ```
3. Instale as dependências e rode:
   ```bash
   npm install
   npm run dev
   ```
4. Teste: `GET http://localhost:3000/health` deve responder `{ "status": "ok" }`.

## Estrutura

```
src/
  config/       conexão com o banco
  middlewares/  auth (JWT), RBAC, error handler
  models/       schema Mongoose — todas as entidades (index.js)
  modules/      um módulo por recurso: routes.js + controller.js + service.js
    auth/       register, login, refresh, logout
    regions/    CRUD de região (referência pra criar os próximos módulos)
```

## Próximos módulos a implementar (mesma estrutura de `regions/`)

- `content/` — RegionContent (os 12 blocos) + QuickReferenceCard + publish flow
- `documents/` — templates + ConsentRecord (aceite com hash/IP)
- `billing/` — Subscription (freemium) + Payment + webhook Mercado Pago
- `sos/` — leitura pública de SOSContact (fase 3)
- `admin/` — AuditLog, Incident

## O que NÃO está implementado de propósito

Os modelos `SpecialistProfile`, `SOSRequest`, `SOSSession`, `CreditPackage` existem no
schema mas não têm módulo — são a visão de marketplace de longo prazo, sem prazo definido.
Não expor rota pra eles até isso virar prioridade real.

## Pendências de infra (não travam o desenvolvimento local)

- Hospedagem definitiva do backend: aguardando resolução de titularidade (CNPJ conjunto).
- Repositório está temporariamente sob conta pessoal — migrar quando a empresa/CNPJ existir.
