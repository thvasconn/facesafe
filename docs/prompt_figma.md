# Prompt para Figma (protótipo inicial do app)

> Baseado na paleta extraída de drfabiobarros.com.br (ver docs/requisitos.md) e no escopo do Atlas confirmado na call de 31/08/2026.

---

Quero um protótipo inicial (mobile app, iOS/Android) para um aplicativo de referência clínica chamado **SafeHof** (nome provisório, ainda não fechado entre "SafeHof" e "HoffSafe" — usar como placeholder de marca, não desenhar em torno do nome).

## Sobre o produto

É um **atlas clínico digital** para profissionais de saúde habilitados (dentistas e médicos) que atuam com Harmonização Orofacial (preenchimento, toxina botulínica, bioestimuladores, ultrassonografia). O usuário é o **profissional**, não o paciente — a interface precisa ser rápida de escanear e consultar durante ou entre atendimentos, não uma experiência "de consumo" lenta. Pense em algo entre um app de referência médica (tipo UpToDate) e um atlas visual bem cuidado — sério, confiável, sem infantilizar.

O app tem uma função secundária chamada **SOS**: um botão de emergência que, ao ser clicado, abre uma conversa de WhatsApp com um especialista (não é chat dentro do app, é deep link mesmo).

## Identidade visual (extraída do site oficial da clínica do idealizador do projeto)

**Paleta:**
- Azul-marinho `#1C4670` — cor primária, usar em elementos de destaque, cabeçalhos, botões principais, ícone ativo
- Taupe/bege acinzentado `#9f9b93` — cor secundária, usar em elementos de apoio, tags, estados inativos
- Branco `#FFFFFF` — fundo dominante
- Preto `#000000` — texto principal e fundo de destaque em imagens clínicas (fotos antes/depois usam fundo preto sólido)

Não usar amarelo, vermelho vibrante ou cores saturadas como acento — a marca de origem é deliberadamente neutra e discreta.

**Tipografia:** títulos em uma sans-serif condensada (referência: Open Sans Condensed), corpo em sans-serif regular (referência: Open Sans). Se preferir, pode sugerir uma fonte nativa mobile equivalente (ex: SF Pro Condensed / Inter) desde que mantenha o peso condensado nos títulos.

**Estilo visual geral:** clínico, premium, minimalista. Fotografia real (não ilustração cartoon, não emoji) quando envolver o consultório ou antes/depois. Ilustrações anatômicas técnicas (estilo atlas médico) são aceitáveis e esperadas nas telas de anatomia. Cantos arredondados moderados em botões e cards (não excessivamente arredondado). Pouco ruído visual — hierarquia clara, muito espaço em branco.

## Telas do protótipo (escopo desta primeira fase — só o Atlas, sem telas de SOS elaborado)

1. **Splash / Login** — tela de entrada simples com o logo, login/cadastro do profissional.
2. **Home** — dois caminhos de navegação igualmente visíveis: "por região da face" (mapa ou grade visual das regiões: frontal, glabelar, temporal, periorbital, infraorbital, nasal, malar, nasolabial, labial, mentoniana, mandibular, parotídeo-massetérica, cervical) e "por procedimento" (toxina botulínica, preenchimento facial, bioestimuladores, ultrassonografia aplicada). Incluir busca no topo.
3. **Tela de região (usar "Têmpora" como exemplo de conteúdo)** — estrutura fixa em abas ou scroll vertical com 12 blocos: Avaliação, Anatomia aplicada, Visualização de planos, Ultrassonografia, Planejamento, Aplicação ilustrada, Erros comuns, Reações esperadas, Sinais de alerta, Complicações, Pós-procedimento, Documentação. Cada bloco é um card/seção expansível.
4. **Ficha rápida** — card resumido e escaneável (aberto a partir da tela de região): objetivo, produto, dispositivo, entrada, plano, direção/ângulo, riscos, referência de ultrassom, reação normal, sinal de alerta, pós, documentos vinculados. Deve parecer "consulta de 10 segundos", não uma página de texto corrido.
5. **Anatomia em camadas** — visualização de corte anatômico com toggles para ativar/ocultar camadas (pele, subcutâneo, músculo, fáscia, vaso, nervo, osso). Interface de toggle/checklist lateral ou inferior.
6. **Paywall / upgrade** — comparação simples entre plano **Free** (acesso a algumas regiões) e plano **Full** (todas as regiões + acesso ao SOS).
7. **Perfil / conta** — dados do profissional, plano atual, favoritos salvos.
8. **Botão e modal do SOS** — botão fixo/flutuante visível nas telas principais; ao clicar, abre um modal de confirmação simples antes de redirecionar para o WhatsApp do especialista.

## Fora de escopo neste protótipo
Não desenhar: fluxo de teleconsulta em vídeo, marketplace de especialistas, sistema de triagem por nível de urgência, checkout de pagamento detalhado. Esses são funcionalidades de fases futuras do produto — o protótipo agora é só o Atlas + o botão simples de SOS.
