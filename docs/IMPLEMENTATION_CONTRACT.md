O planejamento está aprovado.

Agora implemente o projeto completo da Academia Área 51 seguindo rigorosamente o briefing mestre, o storyboard aprovado e todas as decisões finais confirmadas.

A partir deste momento, não altere a direção criativa por conveniência técnica e não substitua nenhuma parte da experiência por componentes genéricos.

Quero a implementação completa, funcional e refinada.

**Regras não negociáveis durante o desenvolvimento:**

1. Use os assets reais fornecidos como base visual do projeto.
2. Não invente pessoas, depoimentos, serviços, modalidades, produtos, endereço ou informações comerciais.
3. Preserve a narrativa:\
   **A CIDADE AINDA DORME. → A ÁREA 51 JÁ ESTÁ EM MOVIMENTO. → 04:00 → entrada → estrutura → movimento → rotina → planos → contato → 04:00 DE AMANHÃ, A GENTE ESTÁ AQUI.**
4. O Hero deve ter composição editorial e cinematográfica. Não transforme a foto vertical da fachada em um background ultrawide esticado.
5. Three.js deve existir apenas no halo/anel abstrato do Hero. Se comprometer performance, use fallback CSS/SVG sem prejudicar a composição.
6. Use scroll nativo com GSAP + ScrollTrigger. Não instale Lenis nesta primeira implementação.
7. Não use `scroll-snap` para puxar o usuário entre telas.
8. Pins e sticky sections devem ser suaves e nunca fazer a tela “puxar” para outra seção quando o usuário para entre dois pontos.
9. Os valores em `vh` do storyboard são referências. Ajuste-os conforme o ritmo real da implementação.
10. Não use cards genéricos, glassmorphism, grids previsíveis, badges, números decorativos de seção, gradientes gratuitos ou elementos típicos de templates gerados por IA.
11. Nenhuma seção deve repetir visualmente a anterior.
12. Texto deve ter espaço, hierarquia e presença. Nunca sobreponha palavras entre si ou sobre áreas da imagem que comprometam legibilidade.
13. Não permita títulos, letras ou CTAs cortados em nenhuma resolução.
14. Não permita `overflow-x` acidental.
15. Não use `100vh` cegamente no mobile. Prefira `svh`, `dvh` ou soluções responsivas apropriadas.
16. Mobile não é desktop encolhido. Implemente a direção mobile aprovada: menos pins, narrativa vertical, sem horizontal scroll problemático e WebGL simplificado/fallback.
17. As áreas tocáveis no mobile devem ser confortáveis e nenhum CTA deve ficar encostado nas bordas.
18. Respeite `prefers-reduced-motion`.
19. Imagens abaixo da primeira dobra devem usar carregamento otimizado/lazy quando apropriado.
20. Não introduza nenhuma biblioteca sem necessidade real.

**Direção técnica:**

- Next.js 15
- App Router
- React
- TypeScript
- CSS Modules ou SCSS Modules
- GSAP
- ScrollTrigger
- Three.js somente no Hero
- `next/image`
- `next/font`
- componentes separados por seção
- motion isolado nos componentes que realmente precisam
- assets em `public/assets/area51`

Antes de escrever animações complexas, construa primeiro a base visual e responsiva das seções. Depois implemente o motion progressivamente. Não misture toda a lógica de scroll em um único arquivo.

**Ordem de implementação:**

1. Estrutura global, tipografia, tokens e header.
2. Intro.
3. Hero estático e responsivo.
4. Halo 3D/fallback.
5. Narrativa Hero → horários.
6. Transição fachada → interior.
7. Sticky da estrutura com os quatro capítulos aprovados.
8. Movimento `PUXAR → SUBIR → VOLTAR`.
9. Seção humana/rotina.
10. Planos.
11. Produtos.
12. Contato.
13. Encerramento.
14. Mobile.
15. Acessibilidade, performance e segurança.

**Muito importante:** ao terminar cada experiência baseada em ScrollTrigger, valide a anterior antes de continuar. Não permita que uma nova animação quebre posições, pins ou alturas já estabilizadas.

---

## QA OBRIGATÓRIO APÓS A IMPLEMENTAÇÃO

Depois que o site estiver visualmente pronto, faça uma segunda passagem completa exclusivamente de QA e corrija tudo que encontrar.

Teste pelo menos:

**Desktop**

- 1366×768
- 1440×900
- 1920×1080
- tela ultrawide

**Tablet**

- portrait
- landscape

**Mobile**

- 360×800
- 375×812
- 390×844
- 412×915
- telas menores

Teste com:

- mouse
- wheel
- trackpad
- setas/PageDown
- touch

Verifique especificamente:

- scroll entre seções;
- pins terminando corretamente;
- nenhuma seção puxando outra;
- nenhum flash ao carregar;
- nenhum layout shift evidente;
- nenhuma palavra sobreposta;
- nenhuma letra cortada;
- nenhum elemento saindo da viewport;
- nenhuma barra horizontal;
- header sem cobrir conteúdo;
- menu mobile;
- CTAs;
- WhatsApp;
- imagens;
- resize da janela;
- navegação por teclado;
- reduced motion;
- console sem erros;
- hydration sem warnings;
- Three.js descarregado/fallback funcionando;
- ScrollTrigger destruído corretamente quando necessário;
- refresh em posições diferentes da página;
- voltar/avançar do navegador.

Rode também uma auditoria de performance e procure manter:

- LCP ≤ 2,5 s
- INP ≤ 200 ms
- CLS ≤ 0,1

Se uma animação estiver prejudicando seriamente performance ou usabilidade, simplifique **a técnica**, não a direção artística.

---

## SEGURANÇA

Revise também:

- headers de segurança;
- CSP compatível com o projeto;
- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- proteção contra framing quando apropriado;
- nenhuma credencial ou segredo no client;
- nenhuma dependência obscura;
- nenhum `dangerouslySetInnerHTML` sem necessidade;
- links externos seguros;
- versão final sem dados fictícios.

---

## CRITÉRIO FINAL

Não considere o projeto concluído só porque “funciona”.

O projeto só está pronto quando:

- a narrativa estiver clara;
- o site parecer autoral;
- as fotografias reais estiverem valorizadas;
- o movimento parecer intencional;
- o desktop impressionar;
- o mobile transmitir a mesma identidade;
- não houver cortes, sobreposições ou scroll estranho;
- não parecer template;
- não parecer produzido por IA;
- o resultado estiver apresentável amanhã para um lead real.

Faça a implementação completa agora.

Ao terminar, me entregue:

1. resumo do que foi implementado;
2. estrutura dos arquivos principais;
3. dependências adicionadas;
4. decisões ou adaptações técnicas feitas;
5. resultado da revisão de responsividade;
6. problemas encontrados no QA e como foram corrigidos;
7. qualquer informação que ainda precise ser confirmada pelo cliente.

Não pare para pedir aprovação a cada seção. Execute o projeto inteiro e refine antes de me devolver.