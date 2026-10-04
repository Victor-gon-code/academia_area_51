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
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        const buildTimeline = (mobile: boolean) => {
          if (reduced) return;

          gsap.set(facadeRef.current, { autoAlpha: 1, scale: 1 });
          gsap.set(interiorRef.current, {
            autoAlpha: 0,
            clipPath: mobile ? "inset(12% 7% 12% 7%)" : "inset(8% 48% 8% 48%)",
            scale: mobile ? 1.025 : 1.035
          });
          gsap.set(copyRef.current, { opacity: 0, y: mobile ? 24 : 34 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: mobile ? 0.62 : 0.72,
              invalidateOnRefresh: true
            }
          });

          tl.to(facadeRef.current, { scale: 1, autoAlpha: 1, duration: 0.42, ease: "none" }, 0)
            .to(facadeRef.current, { scale: 1.03, autoAlpha: 0.12, duration: 0.54, ease: "none" }, 0.42)
            .to(
              interiorRef.current,
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 0.54,
                ease: "power2.inOut"
              },
              0.46
            )
            .to(copyRef.current, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.88)
            .to(copyRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "none" }, ">");
        };

        media.add("(min-width: 901px)", () => buildTimeline(false));
        media.add("(max-width: 900px)", () => buildTimeline(true));
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
        <div ref={facadeRef} className={styles.facade}>
          <div className={styles.stageLabel} aria-hidden="true">
            <span>Por fora</span>
            <i />
          </div>
          <div className={styles.facadeFrame}>
            <Image
              src="/assets/area51/facade.png"
              alt="Fachada real da Academia Área 51 com o letreiro da marca"
              fill
              quality={90}
              sizes="(max-width: 900px) 92vw, 38vw"
            />
          </div>
        </div>

        <div ref={interiorRef} className={styles.interior}>
          <div className={styles.interiorFrame}>
            <Image
              src="/assets/area51/interior-main.png"
              alt="Interior real da Academia Área 51 visto a partir do corredor de equipamentos"
              fill
              quality={88}
              sizes="(max-width: 900px) 92vw, 48vw"
              loading="eager"
              fetchPriority="low"
            />
          </div>
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
