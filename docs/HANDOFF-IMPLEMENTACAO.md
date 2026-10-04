# HANDOFF — Implementação Academia Área 51

> Documento de continuidade. Se a conversa cair, este arquivo é a fonte de estado operacional para retomar sem mudar a direção aprovada.

## Atualização operacional — 04/10/2026

Estado atual:
- branch: `feat/area51-v1`;
- estrutura visual e narrativa completas;
- Hero, horários, transição, estrutura, movimento, rotina, planos, loja, contato e encerramento implementados;
- menu mobile com lock de scroll, Escape e focus trap;
- Three.js restrito ao halo do Hero e desativado em mobile/reduced motion;
- layout mobile revisado para evitar preços, CTAs e detalhes sobrepostos;
- grid genérico da seção de horários substituído por linguagem de órbita/halo da marca;
- `main` deixou de aplicar clipping vertical para não interferir com sticky;
- contraste do Hero e Movimento reforçado para preservar legibilidade sobre fotos reais;
- CI executa audit de dependências, QA do contrato criativo, typecheck, lint e build;
- assets serão adicionados manualmente pelo usuário usando os arquivos originais, sem conversão obrigatória para AVIF.

Assets esperados agora:
`logo.jpg`, `facade.png`, `interior-main.png`, `interior-alt.png`, `weights.jpg`, `weights-detail.png`, `functional.png`, `climb.png`, `entrance.png`, `bathroom.png`, `shop.png`.

Mapeamento exato: `docs/ASSET-INSTALL-MANUAL.md`.
Validação depois de copiar: `npm run check:assets`.

A pasta `public/assets/area51` ainda pode estar ausente da branch, de propósito: não gastar mais tempo transportando binários pelo conector do GitHub. O usuário já aceitou copiar os assets localmente ao puxar para o VS Code.


## 1. Regra de ouro

A implementação deve seguir, nesta ordem de autoridade:

1. `docs/IMPLEMENTATION_CONTRACT.md`
2. `docs/DECISOES-FINAIS.md`
3. storyboard/briefing aprovado na conversa
4. este arquivo de handoff

Nunca simplificar a direção artística por conveniência. Quando performance ou compatibilidade exigirem adaptação, simplificar a **técnica**, preservando a experiência, a narrativa e os assets reais.

## 2. Branch de trabalho

- Repositório: `Victor-gon-code/academia_area_51`
- Branch ativa: `feat/area51-v1`
- Não alterar `main` até a versão estar revisada.
- CI do GitHub Actions está configurado para a branch e já passou com sucesso após as correções de TypeScript/GSAP.

Último ponto estável conhecido antes deste handoff:
- contrato de implementação salvo em `docs/IMPLEMENTATION_CONTRACT.md`;
- typecheck, lint e build verdes;
- correções posteriores de acessibilidade, reduced motion, menu mobile e prevenção de flash também foram aplicadas na branch.

## 3. Direção criativa aprovada — NÃO REINTERPRETAR

Identidade visual:
- preto + verde neon/lima da própria academia;
- industrial, forte, físico, metálico;
- teto/estrutura/iluminação geométrica como parte da linguagem;
- alien/logo como identidade de marca, mas **não** como protagonista 3D.

Narrativa obrigatória:

`A CIDADE AINDA DORME.`
→ `A ÁREA 51 JÁ ESTÁ EM MOVIMENTO.`
→ `04:00`
→ entrada
→ estrutura
→ movimento
→ rotina
→ planos
→ contato
→ `04:00 DE AMANHÃ, A GENTE ESTÁ AQUI.`

Não inventar:
- pessoas;
- alunos;
- professores;
- comunidade;
- depoimentos;
- modalidades não confirmadas;
- serviços não confirmados;
- produtos/catálogo;
- endereço completo;
- mapa;
- CNPJ;
- qualquer dado comercial não confirmado.

## 4. Stack aprovada

- Next.js 15 / App Router
- React
- TypeScript
- CSS Modules
- GSAP
- ScrollTrigger
- Three.js **somente no halo abstrato do Hero**
- `next/image`
- `next/font`
- scroll nativo

Não usar nesta primeira versão:
- Lenis
- scroll-snap
- biblioteca de UI genérica
- biblioteca de animação extra sem necessidade
- cards/template/glassmorphism/grids previsíveis

## 5. Estrutura existente no repositório

### Global
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `lib/site.ts`
- `next.config.ts`

### Componentes
- `components/Header`
- `components/Intro`
- `components/HaloScene`

### Seções
- `sections/HeroSection`
- `sections/HoursSection`
- `sections/TransitionSection`
- `sections/StructureSection`
- `sections/MovementSection`
- `sections/RoutineSection`
- `sections/PlansSection`
- `sections/SupplementsSection`
- `sections/ContactSection`
- `sections/FinalCTASection`

A lógica de motion está distribuída por seção; não concentrar toda a lógica de scroll em um único arquivo.

## 6. Estado funcional já implementado

### Header
- responsivo;
- menu mobile;
- body scroll lock ao abrir;
- Escape fecha o menu;
- `aria-label` alterna entre abrir/fechar.

### Intro
- entrada de marca;
- usa logo real como asset previsto.

### Hero
- composição editorial, não background ultrawide esticado;
- headline progressiva;
- segunda frase começa visualmente escondida para evitar flash;
- metadados/horário também iniciam escondidos antes do GSAP;
- halo isolado em `HaloScene`;
- mobile usa fallback/simplificação em vez de WebGL pesado;
- reduced motion remove pin/sticky prolongado e exibe conteúdo estático.

### Hours
- entrada progressiva;
- estados iniciais em CSS para impedir flash antes do JS.

### Transition
- fachada → interior;
- copy com estado inicial consistente;
- reduced motion remove experiência prolongada/pin.

### Structure
Quatro capítulos, exatamente:
1. visão geral
2. musculação/força
3. funcional/movimento
4. escalada/verticalidade

Não recriar capítulo separado repetitivo de “pesos livres” + “musculação”.

### Movement
Direção:
`PUXAR → SUBIR → VOLTAR`

`RESPIRAR` não está sendo usado nesta primeira versão.

### Routine
- usa ambientes reais;
- sem inventar pessoas/comunidade.

### Plans
- estrutura implementada a partir dos dados disponíveis no projeto.

### Supplements / loja
- a seção mostra a existência real do espaço/loja;
- não transformar em catálogo nem inventar itens/preços.

### Contact
- WhatsApp real previsto;
- sem mapa/endereço completo.

### Final CTA
- frase obrigatória preservada:
  `04:00 DE AMANHÃ, A GENTE ESTÁ AQUI.`
- estados iniciais de animação estabilizados;
- reduced motion tem versão estática.

## 7. Segurança já implementada

`next.config.ts` contém:
- CSP;
- `X-Frame-Options: DENY`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- HSTS em produção;
- `poweredByHeader: false`.

Não adicionar `dangerouslySetInnerHTML` sem necessidade.

## 8. CI

Workflow:
`.github/workflows/ci.yml`

Roda:
- `npm install --no-audit --no-fund`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

Houve falhas iniciais de tipagem GSAP/`matchMedia`, já corrigidas. Runs posteriores ficaram verdes.

## 9. Assets reais — estado atual

A estratégia final abandonou a conversão/transferência de binários pelo conector do GitHub. O usuário aceitou adicionar os arquivos reais manualmente ao puxar o projeto.

O código espera **11 arquivos** em `public/assets/area51/`:

- `logo.jpg`
- `facade.png`
- `interior-main.png`
- `interior-alt.png`
- `weights.jpg`
- `weights-detail.png`
- `functional.png`
- `climb.png`
- `entrance.png`
- `bathroom.png`
- `shop.png`

O mapeamento dos nomes originais fornecidos pelo usuário está em `docs/ASSET-INSTALL-MANUAL.md`.

Depois de copiar, executar `npm run check:assets`. O `next/image` fará a otimização de entrega, então não é necessário converter os originais para AVIF antes de rodar.

## 10. Assets e semântica visual

- `facade.png`: fachada/letreiro — Hero, transição e encerramento
- `interior-main.png`: visão geral interna — transição/estrutura
- `interior-alt.png`: segundo ângulo real — detalhe editorial da força
- `weights.jpg`: musculação/força
- `weights-detail.png`: segundo recorte real da área de pesos — Movimento
- `functional.png`: funcional/movimento
- `climb.png`: escalada/verticalidade
- `entrance.png`: recepção/entrada/rotina
- `bathroom.png`: detalhe de ambiente/rotina
- `shop.png`: loja real
- `logo.jpg`: identidade original

As fotos são prova do espaço real, não decoração. Não trocar por banco de imagens nem por geração sintética.

## 11. Scroll / motion — princípios

- scroll nativo;
- GSAP + ScrollTrigger apenas onde agrega narrativa;
- nenhum `scroll-snap`;
- nenhuma seção deve puxar o usuário quando ele para entre dois pontos;
- alturas em `vh/svh` são referência, nunca dogma;
- reduzir extensão se o trecho parecer artificialmente longo;
- mobile deve ter menos pins;
- evitar horizontal scroll;
- destruir/recriar ScrollTrigger corretamente em mudanças relevantes;
- preservar navegação com wheel, trackpad, teclado e touch;
- `prefers-reduced-motion` deve produzir experiência legível e completa.

## 12. Mobile

Não é desktop reduzido.

Obrigatório:
- usar `svh/dvh` quando altura importa;
- menos sticky/pins;
- halo em fallback/simplificado;
- narrativa vertical;
- áreas tocáveis confortáveis;
- CTA nunca colado à borda;
- sem palavra cortada;
- sem `overflow-x`;
- sem sobreposição de copy;
- imagens com crops específicos quando necessário.

## 13. QA ainda obrigatório antes de concluir

Testar:

Desktop:
- 1366×768
- 1440×900
- 1920×1080
- ultrawide

Tablet:
- portrait
- landscape

Mobile:
- 360×800
- 375×812
- 390×844
- 412×915
- menor que 360 quando possível

Interação:
- mouse
- wheel
- trackpad
- setas
- PageDown
- touch

Checklist:
- transição entre seções;
- nenhum “puxão”;
- pins terminam no ponto certo;
- refresh no meio da página;
- voltar/avançar;
- resize;
- menu mobile;
- teclado;
- reduced motion;
- zero overflow horizontal;
- zero título/letra/CTA cortado;
- zero palavra sobreposta;
- zero flash de conteúdo animado;
- zero hydration warning;
- zero erro no console;
- fallback Three.js;
- imagens reais carregando;
- lazy loading abaixo da dobra;
- LCP/INP/CLS.

Metas:
- LCP ≤ 2,5 s
- INP ≤ 200 ms
- CLS ≤ 0,1

## 14. Próximos passos exatos ao retomar

1. Confirmar branch `feat/area51-v1`.
2. Confirmar CI do HEAD.
3. Copiar os **11 assets reais** em `public/assets/area51` conforme `docs/ASSET-INSTALL-MANUAL.md` e executar `npm run check:assets`.
4. Verificar visualmente cada seção com esses assets.
5. Fazer auditoria de composição desktop.
6. Fazer auditoria de mobile separadamente.
7. Testar todo o scroll de cima a baixo, inclusive parar entre seções.
8. Corrigir qualquer flash/overlap/corte.
9. Rodar typecheck/lint/build novamente.
10. Fazer revisão de segurança.
11. Só então preparar PR/merge para `main`.

## 15. O que NÃO fazer ao retomar

- não trocar a stack;
- não instalar Lenis;
- não colocar scroll-snap;
- não transformar tudo em cards;
- não inventar conteúdo para “encher” página;
- não inventar fotos;
- não gerar alunos fictícios;
- não usar alien 3D;
- não aumentar `vh` apenas para parecer mais cinematográfico;
- não repetir layout entre capítulos;
- não alterar frase final;
- não publicar endereço/mapa/CNPJ;
- não fazer merge em `main` antes do QA.

## 16. Critério real de pronto

O projeto não está pronto apenas porque compila.

Só concluir quando:
- narrativa estiver clara;
- fotos reais forem protagonistas;
- hero estiver cinematográfico e editorial;
- scroll parecer natural;
- desktop impressionar;
- mobile tiver identidade própria;
- não houver cortes/saltos/overlaps;
- não parecer template;
- não parecer site genérico de IA;
- estiver apresentável a um lead real.

