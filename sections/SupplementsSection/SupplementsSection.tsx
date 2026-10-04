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
          sizes="(max-width: 900px) 100vw, 46vw"
        />
      </div>
      <div className={styles.copy}>
        <span className="sectionLabel">No caminho de saída</span>
        <h2 id="supplements-title" data-display>Terminou o treino. O resto está logo ali.</h2>
        <p>A loja fica dentro da própria academia. Dá para sair do treino e resolver ali mesmo o que você já usa na rotina, sem transformar isso em outra parada no caminho.</p>
      </div>
    </section>
  );
}
