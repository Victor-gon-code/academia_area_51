"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import styles from "./FinalCTASection.module.css";

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        gsap.set(lineTwoRef.current, { opacity: 0, y: 42 });
        gsap.set(ctaRef.current, { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.72,
            invalidateOnRefresh: true
          }
        });

        tl.fromTo(imageRef.current, { scale: 1.08, opacity: 0.78 }, { scale: 1, opacity: 1, duration: 1, ease: "none" }, 0)
          .to(lineOneRef.current, { y: -4, duration: 0.35, ease: "none" }, 0.2)
          .to(lineTwoRef.current, { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" }, 0.42)
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.65);
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="final-title">
      <div ref={imageRef} className={styles.image}>
        <Image src="/assets/area51/facade.png" alt="Fachada real da Academia Área 51 com o letreiro da marca" fill sizes="100vw" />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>
        <h2 id="final-title" data-display>
          <span ref={lineOneRef}>04:00 DE AMANHÃ,</span>
          <span ref={lineTwoRef}>A GENTE ESTÁ AQUI.</span>
        </h2>
        <a ref={ctaRef} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
          Quero conhecer a Área 51 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <footer className={styles.footer}>
        <span>Academia Área 51</span>
        <span>{SITE.city}</span>
        <span>{SITE.hours.weekdays} · {SITE.hours.weekend}</span>
        <span>CREF {SITE.cref}</span>
      </footer>
    </section>
  );
}
