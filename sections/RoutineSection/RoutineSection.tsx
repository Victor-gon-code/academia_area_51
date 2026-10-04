import Image from "next/image";
import styles from "./RoutineSection.module.css";

export default function RoutineSection() {
  return (
    <section className={styles.section} aria-labelledby="routine-title">
      <div className={styles.copy}>
        <span className="sectionLabel">Rotina real</span>
        <h2 id="routine-title" data-display>O lugar para onde você volta.</h2>
        <p>
          No começo, você repara em tudo. Depois de alguns dias, já sabe onde fica cada coisa, onde recuperar o fôlego e por onde passa quando chega. A academia deixa de ser novidade. Entra na rotina.
        </p>
      </div>

      <div className={styles.mainImage}>
        <Image
          src="/assets/area51/entrance.png"
          alt="Entrada e recepção reais da Academia Área 51, com equipamentos ao redor"
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
        />
      </div>

      <div className={styles.detailImage}>
        <Image
          src="/assets/area51/bathroom.png"
          alt="Área de lavatório e espelho da Academia Área 51"
          fill
          sizes="(max-width: 900px) 44vw, 18vw"
        />
      </div>

      <p className={styles.pullQuote} data-display>
        Primeiro chama atenção.<br />Depois vira parte do dia.
      </p>
    </section>
  );
}
