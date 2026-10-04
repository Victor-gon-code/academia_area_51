import Image from "next/image";
import styles from "./SupplementsSection.module.css";

export default function SupplementsSection() {
  return (
    <section className={styles.section} aria-labelledby="supplements-title">
      <div className={styles.imageWrap}>
        <div className={styles.image}>
          <Image
            src="/assets/area51/shop.png"
            alt="Loja real integrada ao espaço da Academia Área 51"
            fill
            quality={88}
            sizes="(max-width: 900px) 92vw, 58vw"
          />
        </div>

        <div className={styles.imageCaption}>
          <span>Dentro da própria academia</span>
          <span>Suplementos + itens fitness</span>
        </div>
      </div>

      <div className={styles.copy}>
        <span className="sectionLabel">Dentro da Área 51</span>

        <p className={styles.kicker}>Saiu do treino? Não precisa ir longe.</p>

        <h2 id="supplements-title" data-display>
          Treinou.<br />
          Precisou.<br />
          <em>Tá ali.</em>
        </h2>

        <p className={styles.text}>
          Terminou o treino e lembrou do suplemento? A loja fica no mesmo espaço da Área 51, com suplementos e itens fitness para resolver ali mesmo.
        </p>

        <div className={styles.note}>
          <span>LOJA INTEGRADA AO ESPAÇO</span>
          <span aria-hidden="true">↘</span>
        </div>
      </div>

      <span className={styles.backWord} aria-hidden="true">ALI</span>
    </section>
  );
}
