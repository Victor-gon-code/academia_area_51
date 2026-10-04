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

## Auditoria adicional — 04/10/2026

Foi feita uma nova revisão após o primeiro fechamento, procurando especificamente coisas visualmente estranhas, informação que não deveria estar publicada, conflitos de responsividade, vazamento entre seções, acessibilidade e custos desnecessários de animação.

Correções encontradas e aplicadas:
- header passou a ser totalmente opaco para impedir que conteúdo grande de seções em transição apareça “fantasma” por trás da navegação;
- corrigido um offset da pull quote de Rotina que, depois do ajuste desktop, ainda podia herdar `top: 58%` no mobile;
- fechamento deixou de animar `filter: brightness()` em imagem full-screen; brilho ficou estático e o motion passou a usar propriedades mais baratas;
- Three.js agora é desativado também em dispositivos com ponteiro coarse e com Data Saver, mantendo o fallback visual;
- `ScrollTrigger.config({ ignoreMobileResize: true })` foi aplicado nas experiências de scroll para reduzir saltos causados pela barra do navegador em dispositivos touch;
- header, skip link, palavras do Movimento, linha de progresso de Horários e copy da transição passaram a respeitar safe areas/notches/home indicators;
- menu mobile agora inclui o botão visível de fechar dentro do ciclo de foco;
- planos ganharam headings semânticos por opção;
- landmark de Estrutura e Planos permanece nomeado corretamente tanto no desktop quanto no layout alternativo mobile;
- seção da loja foi reordenada semanticamente para o heading vir antes da imagem sem alterar a composição visual;
- fachada repetida no encerramento foi marcada como decorativa para leitores de tela;
- removida a expressão “No caminho de saída”, que poderia sugerir uma localização física da loja não confirmada;
- alt texts da fachada foram deixados estritamente factuais;
- horário de 04h passou a deixar explícito que se refere a segunda a sexta;
- copy de Rotina foi ajustada para soar mais natural;
- favicon passa a reutilizar o logo real e foi desativada a estilização automática de telefone no mobile;
- HSTS foi mantido, mas sem `includeSubDomains/preload` porque o domínio final do cliente e todos os seus subdomínios ainda não foram confirmados.

Resultado:
- nenhuma dessas correções exigiu mudar a direção criativa;
- nenhuma nova biblioteca foi adicionada;
- a narrativa aprovada permanece intacta;
- a última pipeline `quality` continuou verde após as correções.

HEAD auditado: `5001293f7e2a8e7cdfdb743d017cdc574f75a493`.

