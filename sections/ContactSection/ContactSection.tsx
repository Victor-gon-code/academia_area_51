import { SITE } from "@/lib/site";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.headline}>
        <span className="sectionLabel">Contato</span>
        <h2 id="contact-title" data-display>
          Camocim de São Félix.<br />A Área 51 é daqui.
        </h2>
      </div>

      <div className={styles.info}>
        <div>
          <span>Segunda a sexta</span>
          <strong>04h — 23h</strong>
        </div>
        <div>
          <span>Sábado e domingo</span>
          <strong>08h — 13h</strong>
        </div>
        <div>
          <span>CREF</span>
          <strong>{SITE.cref}</strong>
        </div>
      </div>

      <a className={styles.whatsapp} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
        <span>Falar com a Área 51</span>
        <strong aria-hidden="true">↗</strong>
      </a>

      <p className={styles.phone}>{SITE.whatsappDisplay}</p>
    </section>
  );
}
