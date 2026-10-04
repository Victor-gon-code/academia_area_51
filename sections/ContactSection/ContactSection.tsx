import { SITE } from "@/lib/site";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.layout}>
        <div className={styles.headline}>
          <span className="sectionLabel">Contato</span>

          <h2 id="contact-title" data-display>
            Camocim de São Félix.<br />
            <em>A Área 51 é daqui.</em>
          </h2>

          <p>
            Quer saber qual plano faz mais sentido, conferir um horário ou só tirar uma dúvida? Chama a Área 51 no WhatsApp.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelTop}>
            <span>Quando a porta está aberta</span>
            <span>Área 51</span>
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
            <span>
              <small>WhatsApp</small>
              Falar com a Área 51
            </span>
            <strong aria-hidden="true">↗</strong>
          </a>

          <div className={styles.phone}>
            <span>Telefone</span>
            <p>{SITE.whatsappDisplay}</p>
          </div>
        </div>
      </div>

      <div className={styles.localMark} aria-hidden="true">
        <span>DAQUI.</span>
      </div>
    </section>
  );
}
