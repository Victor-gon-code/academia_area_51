"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./MovementSection.module.css";

const moments = [
  {
    word: "PUXAR",
    image: "/assets/area51/functional.png",
    alt: "Argolas e estrutura funcional reais da Academia Área 51",
    position: "48% 35%"
  },
  {
    word: "SUBIR",
    image: "/assets/area51/climb.png",
    alt: "Parede de escalada real da Academia Área 51",
    position: "50% 48%"
  },
  {
    word: "VOLTAR",
    image: "/assets/area51/weights-detail.png",
    alt: "Outro recorte real da área de pesos e equipamentos da Academia Área 51",
    position: "48% 47%"
  }
] as const;

export default function MovementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let media: {
    add: (query: string, callback: () => void | (() => void)) => unknown;
    revert: () => void;
  } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        media.add("(min-width: 901px)", () => {
          if (reduced) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.72,
              invalidateOnRefresh: true
            }
          });

          tl.to(trackRef.current, { xPercent: -66.666, duration: 1, ease: "none" })
            .to(trackRef.current, { xPercent: -66.666, duration: 0.3, ease: "none" });
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
          <h2 id="movement-title">O espaço muda. O corpo acompanha.</h2>
        </div>
        <div ref={trackRef} className={styles.track}>
          {moments.map((moment) => (
            <article key={moment.word} className={styles.panel}>
              <div className={styles.imageWrap}>
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 84vw"
                  style={{ objectPosition: moment.position }}
                />
                <div className={styles.shade} aria-hidden="true" />
              </div>
              <p className={styles.word} data-display>{moment.word}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
