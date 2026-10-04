import Image from "next/image";
import styles from "./SupplementsSection.module.css";

export default function SupplementsSection() {
  return (
    <section className={styles.section} aria-labelledby="supplements-title">
      <div className={styles.image}>
        <Image
          src="/assets/area51/shop.webp"
          alt="Loja real integrada ao espaço da Academia Área 51"
          fill
          sizes="(max-width: 760px) 100vw, 46vw"
        />
      </div>
      <div className={styles.copy}>
        <span className="sectionLabel">Além do treino</span>
        <h2 id="supplements-title" data-display>A rotina não termina no treino.</h2>
        <p>Suplementos e itens fitness também fazem parte do espaço.</p>
      </div>
    </section>
  );
}
