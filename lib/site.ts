export const SITE = {
  name: "Academia Área 51",
  city: "Camocim de São Félix",
  whatsappDisplay: "+55 81 99660-6027",
  whatsappHref: "https://wa.me/5581996606027",
  cref: "003721-PJ",
  hours: {
    weekdays: "Seg a Sex 4h–23h",
    weekend: "Sáb e Dom 8h–13h"
  }
} as const;

export const PLANS = [
  { name: "Mensal", price: "R$ 80", copy: "Pra começar." },
  { name: "Fidelidade", price: "R$ 70", copy: "Pra transformar treino em rotina." },
  { name: "Semestral", price: "R$ 390", copy: "Tempo suficiente para construir constância." },
  { name: "Anual", price: "R$ 720", copy: "Quando a decisão já foi tomada." }
] as const;

export const STRUCTURE_CHAPTERS = [
  {
    id: "visao-geral",
    label: "Visão geral",
    title: "Um espaço com identidade desde o primeiro passo.",
    image: "/assets/area51/interior-main.avif",
    alt: "Interior real da Academia Área 51 com equipamentos e iluminação geométrica no teto",
    position: "50% 48%"
  },
  {
    id: "forca",
    label: "Musculação / força",
    title: "Peso. Repetição. Constância.",
    image: "/assets/area51/weights.avif",
    alt: "Área real de musculação e pesos livres da Academia Área 51",
    position: "50% 52%"
  },
  {
    id: "movimento",
    label: "Funcional / movimento",
    title: "O treino também muda de direção.",
    image: "/assets/area51/functional.avif",
    alt: "Área funcional real com argolas, barras, cordas e estrutura da Academia Área 51",
    position: "50% 50%"
  },
  {
    id: "verticalidade",
    label: "Escalada / verticalidade",
    title: "Às vezes, literalmente.",
    image: "/assets/area51/climb.avif",
    alt: "Parede de escalada real da Academia Área 51",
    position: "50% 50%"
  }
] as const;
