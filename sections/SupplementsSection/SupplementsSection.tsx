import Image from "next/image";
import styles from "./SupplementsSection.module.css";

export default function SupplementsSection() {
  return (
    <section className={styles.section} aria-labelledby="supplements-title">
      <div className={styles.image}>
        <Image
          src="/assets/area51/shop.png"
          alt="Loja real integrada ao espaço da Academia Área 51"
          fill
          sizes="(max-width: 900px) 100vw, 46vw"
        />
      </div>
      <div className={styles.copy}>
        <span className="sectionLabel">Dentro da Área 51</span>
        <h2 id="supplements-title" data-display>Terminou o treino. O resto está logo ali.</h2>
        <p>Treinou? A loja está no mesmo espaço. Suplementos e itens fitness para quem prefere resolver ali antes de ir embora.</p>
      </div>
    </section>
  );
}
