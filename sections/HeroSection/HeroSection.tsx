"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import styles from "./HeroSection.module.css";

const HaloScene = dynamic(() => import("@/components/HaloScene/HaloScene"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reveal = () => setReady(true);
    window.addEventListener("area51:intro-complete", reveal, { once: true });

    const fallback = window.setTimeout(reveal, 1800);

    return () => {
      window.removeEventListener("area51:intro-complete", reveal);
      window.clearTimeout(fallback);
    };
  }, []);

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

        gsap.to(frameRef.current, {
          scale: 1.035,
          yPercent: -1.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="topo"
      ref={sectionRef}
      className={`${styles.hero} ${ready ? styles.ready : ""}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.sticky}>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.facadeEcho} aria-hidden="true">
          <Image
            src="/assets/area51/facade.png"
            alt=""
            fill
            quality={72}
            sizes="62vw"
            loading="lazy"
          />
        </div>

        <div className={styles.copy}>
          <span className={`sectionLabel ${styles.heroLabel}`}>Camocim de São Félix</span>

          <h1 id="hero-title" className={styles.title} data-display>
            <span className={styles.firstLine}>A cidade ainda dorme.</span>
            <span className={styles.secondLine}>A Área 51 já está em movimento.</span>
          </h1>

          <div className={styles.meta}>
            <p>Quando a cidade ainda está no escuro, aqui a primeira série já começou. A Área 51 abre cedo, fecha tarde e deixa o treino caber no seu dia — não o contrário.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#estrutura">Ver a Área 51 por dentro</a>
              <a className={styles.secondary} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div ref={frameRef} className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src="/assets/area51/facade.png"
              alt="Fachada real da Academia Área 51 com o letreiro da marca"
              fill
              priority
              quality={90}
              sizes="(max-width: 900px) 92vw, 52vw"
            />
            <div className={styles.imageShade} aria-hidden="true" />
          </div>
          <HaloScene />
          <div className={styles.caption}>
            <span>Seg a Sex</span>
            <strong>04h — 23h</strong>
          </div>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span>Continue</span>
          <i />
        </div>
      </div>
    </section>
  );
}
