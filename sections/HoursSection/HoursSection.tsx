"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./HoursSection.module.css";

export default function HoursSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const morningRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        gsap.set(nightRef.current, { opacity: 0, y: 52 });
        gsap.set(scheduleRef.current, { opacity: 0, y: 28 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true
          }
        });

        tl.to(axisRef.current, { width: "100%", duration: 1, ease: "none" }, 0)
          .to(morningRef.current, { opacity: 0, y: -46, duration: 0.32, ease: "none" }, 0.2)
          .to(nightRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.35)
          .to(nightRef.current, { opacity: 0, y: -34, duration: 0.22, ease: "none" }, 0.68)
          .to(scheduleRef.current, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, 0.73)
          .to(scheduleRef.current, { opacity: 1, y: 0, duration: 0.36, ease: "none" }, 1);
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Horários da Academia Área 51">
      <div className={styles.sticky}>
        <div className={styles.visualField} aria-hidden="true">
          <Image src="/assets/area51/facade.png" alt="" fill sizes="52vw" />
          <span />
        </div>
        <div className={styles.sideNote} aria-hidden="true">
          <span>Camocim de São Félix</span>
          <span>Seg — Sex · 04h</span>
        </div>
        <div className={styles.axis} aria-hidden="true"><i ref={axisRef} /></div>

        <div ref={morningRef} className={styles.moment}>
          <strong data-display>04:00</strong>
          <p>De segunda a sexta, a academia abre.</p>
        </div>

        <div ref={nightRef} className={`${styles.moment} ${styles.night}`}>
          <strong data-display>23:00</strong>
          <p>Só então o dia termina.</p>
        </div>

        <div ref={scheduleRef} className={styles.schedule}>
          <span className="sectionLabel">Tem treino antes do resto do dia começar</span>
          <p data-display>Seg a Sex 4h–23h</p>
          <p data-display>Sáb e Dom 8h–13h</p>
        </div>
      </div>
    </section>
  );
}
