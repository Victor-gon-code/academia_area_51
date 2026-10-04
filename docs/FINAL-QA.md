# QA final — Academia Área 51

Data do checkpoint: 04/10/2026

Este documento registra a revisão feita antes da entrega da branch `feat/area51-v1`.

## Escopo validado

A direção aprovada foi mantida:
- fotografias reais como protagonistas;
- narrativa `A CIDADE AINDA DORME → ... → 04:00 DE AMANHÃ, A GENTE ESTÁ AQUI.`;
- scroll nativo;
- GSAP + ScrollTrigger somente nos momentos narrativos;
- Three.js restrito ao halo abstrato do Hero;
- sem Lenis;
- sem scroll-snap;
- sem UI genérica, glassmorphism ou cards de template;
- sem pessoas, serviços, modalidades, depoimentos, endereço, mapa, CNPJ ou catálogo inventados.

## Validação automatizada de código

O workflow `quality` executa:
1. instalação de dependências;
2. `npm audit --omit=dev --audit-level=high`;
3. `npm run qa:contract`;
4. `npm run typecheck`;
5. `npm run lint`;
6. `npm run build`.

O `qa:contract` bloqueia regressões importantes, incluindo:
- `scroll-snap`;
- Lenis;
- `dangerouslySetInnerHTML`;
- CNPJ não confirmado;
- `100vh` rígido;
- `backdrop-filter`/glassmorphism;
- Three.js fora do Hero;
- remoção das frases obrigatórias.

## QA visual

Foi usada uma exportação compilada do projeto com os assets reais, somada às últimas correções visuais/copy da branch para inspeção responsiva.

Viewports verificadas:
- 1366×768
- 1440×900
- 1920×1080
- 2560×1080 (ultrawide)
- 1024×768
- 768×1024
- 360×800
- 375×812
- 390×844
- 412×915
- 320×568

Resultado da varredura:
- zero overflow horizontal detectado;
- zero texto visível ultrapassando lateralmente a viewport;
- zero page errors;
- zero console errors nas amostras;
- imagens reais carregaram sem arquivo quebrado nas amostras desktop/mobile;
- reduced motion verificado em 1440×900 e 390×844 sem clipping/overflow.

## Scroll e navegação

Com o comportamento suave de âncoras neutralizado apenas durante o teste de medição:
- uma posição arbitrária de scroll permaneceu imóvel após pausa: delta 0;
- PageDown avançou naturalmente;
- ArrowDown avançou naturalmente;
- wheel avançou naturalmente no desktop;
- não foi detectado comportamento de snap/puxada automática para outra seção.

A lógica do menu mobile também foi revisada no código:
- body lock enquanto aberto;
- Escape fecha;
- focus trap;
- foco retorna ao controle ao fechar;
- links fechados ficam fora da ordem de tab;
- fecha ao migrar para viewport desktop.

## Correções feitas durante o QA

- largura do visual do Hero mobile: corrigido um caso real em que o container absoluto podia calcular 0px;
- horário do Hero movido para zona segura;
- contraste do Hero reforçado para a copy não depender da fotografia;
- palavras PUXAR/SUBIR/VOLTAR afastadas das bordas;
- preços dos planos protegidos em telas estreitas;
- CTA de contato protegido para permanecer em uma linha;
- quote da seção Rotina reposicionada para não disputar espaço com a foto de detalhe;
- detalhe da Estrutura mobile retirado da área de conflito com copy;
- frase final preservada com wrapping responsivo, sem forçar linha que pudesse cortar em telas menores;
- linguagem visual de órbita/halo reforçada em marcadores e menu, sem virar sci-fi decorativo;
- copies revisadas para reduzir frases genéricas e manter voz direta/local.

## Assets

A branch não carrega os binários originais por decisão operacional. Depois do pull, copiar os 11 arquivos conforme:
`docs/ASSET-INSTALL-MANUAL.md`

Em seguida:
```bash
npm install
npm run check:assets
npm run qa:contract
npm run typecheck
npm run lint
npm run build
npm run dev
```

## Última conferência local recomendada

Com os arquivos reais presentes, abrir o site no navegador e fazer uma última passagem visual de crops (`object-position`) porque esse ajuste depende dos bytes finais que estiverem no diretório local.

Não alterar a direção artística para resolver crop: ajustar somente `object-position`, altura do frame ou sombra/contraste quando necessário.

## Critério de entrega

A branch está estruturalmente concluída quando o CI do HEAD estiver verde. A única etapa externa ao GitHub é copiar os assets reais e fazer a conferência visual final já com esses arquivos locais.
