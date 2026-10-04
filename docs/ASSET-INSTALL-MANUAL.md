# Instalação manual dos assets reais

O projeto foi ajustado para usar os arquivos originais em PNG/JPG e deixar o `next/image` fazer a otimização de entrega em runtime. Isso evita qualquer conversão manual para AVIF e reduz o risco de usar a foto errada.

Crie a pasta:

`public/assets/area51/`

Depois copie e renomeie os arquivos originais exatamente assim:

| Arquivo recebido | Nome dentro do projeto |
| --- | --- |
| `logo_area_51(1).jpg` | `logo.jpg` |
| `imagem_fachada(1).png` | `facade.png` |
| `interior_academia(1).png` | `interior-main.png` |
| `interio_academia_2(1).png` | `interior-alt.png` |
| `pesos_academia(1).jpg` | `weights.jpg` |
| `pesos_academia(1).png` | `weights-detail.png` |
| `cross_academia(1).png` | `functional.png` |
| `escalada_academia(1).png` | `climb.png` |
| `entrada_academia(1).png` | `entrance.png` |
| `banheiros_academia(1).png` | `bathroom.png` |
| `loja_academia(1).png` | `shop.png` |

## Uso no site

- `facade.png`: Hero, transição e encerramento.
- `interior-main.png`: entrada para o interior e capítulo de visão geral.
- `interior-alt.png`: detalhe editorial complementar no capítulo de força.
- `weights.jpg`: capítulo principal de musculação/força.
- `weights-detail.png`: recorte complementar em Movimento.
- `functional.png`: capítulo funcional e momento PUXAR.
- `climb.png`: capítulo de verticalidade e momento SUBIR.
- `entrance.png`: seção de rotina/ambiente.
- `bathroom.png`: detalhe real de ambiente.
- `shop.png`: seção da loja integrada.
- `logo.jpg`: Intro.

Não substituir nenhum desses arquivos por imagens de banco, imagens geradas ou fotos genéricas de academia.

Depois de copiar os 11 arquivos, rode:

`npm run check:assets`

e então:

`npm run typecheck && npm run lint && npm run build`
