export const SITE = {
  name: "Academia Área 51",
  city: "Camocim de São Félix",
  whatsappDisplay: "+55 81 99660-6027",
  whatsappHref: "https://wa.me/5581996606027?text=Oi%21%20Vim%20pelo%20site%20da%20%C3%81rea%2051%20e%20queria%20saber%20mais.",
  cref: "003721-PJ",
  hours: {
    weekdays: "Seg a Sex 4h–23h",
    weekend: "Sáb e Dom 8h–13h"
  }
} as const;

export const PLANS = [
  { name: "Mensal", price: "R$ 80", copy: "Pra entrar, sentir o espaço e começar no seu tempo." },
  { name: "Fidelidade", price: "R$ 70", copy: "Pra quem já decidiu que treino não vai ser só fase." },
  { name: "Semestral", price: "R$ 390", copy: "Seis meses para deixar de depender da empolgação do primeiro dia." },
  { name: "Anual", price: "R$ 720", copy: "Um ano inteiro com a decisão já tomada." }
] as const;

export const STRUCTURE_CHAPTERS = [
  {
    id: "visao-geral",
    label: "Visão geral",
    title: "Não parece só mais uma academia. E não foi feita pra parecer.",
    image: "/assets/area51/interior-main.png",
    alt: "Interior real da Academia Área 51 com equipamentos e iluminação geométrica no teto",
    position: "50% 48%"
  },
  {
    id: "forca",
    label: "Musculação / força",
    title: "Peso no lugar. Espaço para trabalhar.",
    image: "/assets/area51/weights.jpg",
    alt: "Área real de musculação e pesos livres da Academia Área 51",
    position: "50% 52%"
  },
  {
    id: "movimento",
    label: "Funcional / movimento",
    title: "O treino muda de direção.",
    image: "/assets/area51/functional.png",
    alt: "Área funcional real com argolas, barras, cordas e estrutura da Academia Área 51",
    position: "50% 50%"
  },
  {
    id: "verticalidade",
    label: "Escalada / verticalidade",
    title: "E, às vezes, vai pra cima.",
    image: "/assets/area51/climb.png",
    alt: "Parede de escalada real da Academia Área 51",
    position: "50% 50%"
  }
] as const;
