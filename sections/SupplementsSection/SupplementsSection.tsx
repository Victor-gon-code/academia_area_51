import Image from "next/image";
import styles from "./SupplementsSection.module.css";

export default function SupplementsSection() {
  return (
    <section className={styles.section} aria-labelledby="supplements-title">
      <div className={styles.image}>
        <Image
          src="/assets/area51/shop.avif"
          alt="Loja real integrada ao espaço da Academia Área 51"
          fill
          sizes="(max-width: 760px) 100vw, 46vw"
        />
      </div>
      <div className={styles.copy}>
        <span className="sectionLabel">No caminho de saída</span>
        <h2 id="supplements-title" data-display>O treino acaba. O cuidado com ele, não.</h2>
        <p>A loja faz parte da própria academia, com suplementos e itens fitness para quem prefere resolver tudo no mesmo lugar.</p>
      </div>
    </section>
  );
}
