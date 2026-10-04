"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./TransitionSection.module.css";

export default function TransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const facadeRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLHeadingElement>(null);

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
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        media.add("(min-width: 901px)", () => {
          if (reduced) return;

          gsap.set(interiorRef.current, { clipPath: "inset(12% 43% 12% 43%)", scale: 1.08 });
          gsap.set(copyRef.current, { opacity: 0, y: 38 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.78,
              invalidateOnRefresh: true
            }
          });

          tl.to(facadeRef.current, { scale: 1.1, opacity: 0.25, duration: 1, ease: "none" }, 0)
            .to(interiorRef.current, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.72, ease: "power2.inOut" }, 0.05)
            .to(copyRef.current, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0.54);
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
    <section ref={sectionRef} className={styles.section} aria-labelledby="transition-title">
      <div className={styles.sticky}>
        <div ref={facadeRef} className={styles.facade} aria-hidden="true">
          <Image src="/assets/area51/facade.avif" alt="" fill sizes="100vw" />
        </div>
        <div ref={interiorRef} className={styles.interior}>
          <Image
            src="/assets/area51/interior-main.avif"
            alt="Interior real da Academia Área 51 visto a partir do corredor de equipamentos"
            fill
            sizes="100vw"
          />
          <div className={styles.shade} aria-hidden="true" />
        </div>
        <h2 ref={copyRef} id="transition-title" className={styles.copy} data-display>
          <span>Por fora, presença.</span>
          <span>Por dentro, outro ritmo.</span>
        </h2>
      </div>
    </section>
  );
}
