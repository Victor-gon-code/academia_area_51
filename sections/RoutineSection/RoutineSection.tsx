import Image from "next/image";
import styles from "./RoutineSection.module.css";

export default function RoutineSection() {
  return (
    <section className={styles.section} aria-labelledby="routine-title">
      <div className={styles.copy}>
        <span className="sectionLabel">Rotina real</span>
        <h2 id="routine-title" data-display>O lugar para onde você volta.</h2>
        <p>
          Treino forte também precisa de um espaço que faça parte da rotina. A estrutura chama atenção; o ambiente é o que acompanha o dia a dia.
        </p>
      </div>

      <div className={styles.mainImage}>
        <Image
          src="/assets/area51/entrance.avif"
          alt="Entrada e recepção reais da Academia Área 51, com equipamentos ao redor"
          fill
          sizes="(max-width: 760px) 100vw, 58vw"
        />
      </div>

      <div className={styles.detailImage}>
        <Image
          src="/assets/area51/bathroom.avif"
          alt="Área de lavatório e espelho da Academia Área 51"
          fill
          sizes="(max-width: 760px) 44vw, 18vw"
        />
      </div>

      <p className={styles.pullQuote} data-display>
        Você entra pela estrutura.<br />O ambiente faz querer voltar.
      </p>
    </section>
  );
}
