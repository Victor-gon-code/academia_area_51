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

Antes de rodar o projeto, coloque os arquivos otimizados em:

`public/assets/area51/`

Nomes esperados pelo código:

```text
bathroom.avif
climb.avif
entrance.avif
facade.avif
functional.avif
interior-main.avif
interior-alt.avif
logo.avif
shop.avif
weights.avif
weights-detail.avif
```

O pacote preparado durante a implementação contém exatamente essa estrutura. Não renomeie os arquivos sem atualizar as referências no código.

Mapeamento:

- `facade.avif` — fachada / Hero / encerramento
- `interior-main.avif` — entrada visual e visão geral interna
- `interior-alt.avif` — segundo ângulo real da musculação / força
- `weights.avif` — musculação / força
- `weights-detail.avif` — segundo recorte real da área de pesos
- `functional.avif` — funcional / movimento
- `climb.avif` — escalada / verticalidade
- `entrance.avif` — recepção / rotina
- `bathroom.avif` — detalhe de ambiente
- `shop.avif` — loja integrada
- `logo.avif` — identidade original

## Desenvolvimento

Requer Node 22.

```bash
npm install
npm run dev
```

Validação obrigatória antes de publicar:

```bash
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

A direção e as decisões completas estão em `docs/IMPLEMENTATION_CONTRACT.md` e `docs/HANDOFF-IMPLEMENTACAO.md`.
