"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./MovementSection.module.css";

const moments = [
  {
    word: "PUXAR",
    image: "/assets/area51/functional.avif",
    alt: "Argolas e estrutura funcional reais da Academia Área 51",
    position: "48% 35%"
  },
  {
    word: "SUBIR",
    image: "/assets/area51/climb.avif",
    alt: "Parede de escalada real da Academia Área 51",
    position: "50% 48%"
  },
  {
    word: "VOLTAR",
    image: "/assets/area51/weights.avif",
    alt: "Área real de pesos e equipamentos da Academia Área 51",
    position: "48% 47%"
  }
] as const;

export default function MovementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let media: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        media.add("(min-width: 761px)", () => {
          if (reduced) return;
          gsap.to(trackRef.current, {
            xPercent: -66.666,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.72,
              invalidateOnRefresh: true
            }
          });
        });

      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      media?.revert();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="movement-title">
      <div className={styles.sticky}>
        <div className={styles.kicker}>
          <span className="sectionLabel">Movimento</span>
          <p id="movement-title">O espaço muda. A rotina continua.</p>
        </div>
        <div ref={trackRef} className={styles.track}>
          {moments.map((moment) => (
            <article key={moment.word} className={styles.panel}>
              <div className={styles.imageWrap}>
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 84vw"
                  style={{ objectPosition: moment.position }}
                />
                <div className={styles.shade} aria-hidden="true" />
              </div>
              <h2 data-display>{moment.word}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
