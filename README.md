# Academia Área 51

Landing page institucional e experiencial da Academia Área 51, em Camocim de São Félix.

A implementação foi pensada para usar as fotografias reais da academia como protagonista, com direção escura/industrial, verde da marca, tipografia de impacto e movimento guiado por scroll sem `scroll-snap`.

## Stack

- Next.js 15 + App Router
- React + TypeScript
- CSS Modules
- GSAP + ScrollTrigger
- Three.js somente no halo abstrato do Hero
- `next/image` + `next/font`
- scroll nativo

Não há Lenis nem biblioteca de UI.

## Assets reais

Antes de rodar o projeto, coloque os arquivos reais em:

`public/assets/area51/`

Nomes esperados pelo código:

```text
bathroom.png
climb.png
entrance.png
facade.png
functional.png
interior-main.png
interior-alt.png
logo.jpg
shop.png
weights.jpg
weights-detail.png
```

O mapeamento exato dos arquivos recebidos está em `docs/ASSET-INSTALL-MANUAL.md`. O `next/image` otimiza a entrega automaticamente; não é necessário converter manualmente para AVIF.

Mapeamento:

- `facade.png` — fachada / Hero / encerramento
- `interior-main.png` — entrada visual e visão geral interna
- `interior-alt.png` — segundo ângulo real da musculação / força
- `weights.jpg` — musculação / força
- `weights-detail.png` — segundo recorte real da área de pesos
- `functional.png` — funcional / movimento
- `climb.png` — escalada / verticalidade
- `entrance.png` — recepção / rotina
- `bathroom.png` — detalhe de ambiente
- `shop.png` — loja integrada
- `logo.jpg` — identidade original

## Desenvolvimento

Requer Node 22.

```bash
npm install
npm run dev
```

Validação obrigatória antes de publicar:

```bash
npm run check:assets
npm run qa:contract
npm run typecheck
npm run lint
npm run build
```

## Direção de conteúdo

O projeto não inventa pessoas, depoimentos, modalidades, serviços, catálogo, endereço completo, mapa ou CNPJ.

Dados usados:

- Camocim de São Félix
- Seg a Sex 4h–23h
- Sáb e Dom 8h–13h
- WhatsApp +55 81 99660-6027
- CREF 003721-PJ
- Mensal R$ 80
- Fidelidade R$ 70
- Semestral R$ 390
- Anual R$ 720

A frase final deve permanecer exatamente:

`04:00 DE AMANHÃ, A GENTE ESTÁ AQUI.`

## QA visual

Revisar pelo menos:

- 1366×768
- 1440×900
- 1920×1080
- ultrawide
- tablet portrait e landscape
- 360×800
- 375×812
- 390×844
- 412×915

Também conferir navegação por teclado, reduced motion, resize, wheel, trackpad, PageDown e touch.

A direção e as decisões completas estão em `docs/IMPLEMENTATION_CONTRACT.md` e `docs/HANDOFF-IMPLEMENTACAO.md`. O resultado da revisão final está em `docs/FINAL-QA.md`.
