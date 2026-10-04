import Image from "next/image";
import styles from "./RoutineSection.module.css";

export default function RoutineSection() {
  return (
    <section className={styles.section} aria-labelledby="routine-title">
      <div className={styles.copy}>
        <span className="sectionLabel">Rotina real</span>
        <h2 id="routine-title" data-display>
          Você chega, treina, volta. Quando percebe, já faz parte do dia.
        </h2>
        <p>
          No primeiro treino, tudo chama atenção. Depois de alguns dias, você já reconhece o espaço, o ritmo e o caminho que faz quando chega. A Área 51 deixa de ser novidade e começa a fazer parte da rotina.
        </p>
        <span className={styles.note}>Sem cena montada. É o espaço real.</span>
      </div>

      <div className={styles.visual}>
        <div className={styles.mainImage}>
          <Image
            src="/assets/area51/entrance.png"
            alt="Entrada e recepção reais da Academia Área 51, com equipamentos ao redor"
            fill
            quality={88}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <div className={styles.caption} aria-hidden="true">
          <span>Camocim de São Félix</span>
          <span>Área 51 · rotina real</span>
        </div>
      </div>
    </section>
  );
}
