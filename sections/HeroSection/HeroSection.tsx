"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import styles from "./HeroSection.module.css";

const HaloScene = dynamic(() => import("@/components/HaloScene/HaloScene"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

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
        if (reduced) {
          gsap.set([secondRef.current, metaRef.current], { opacity: 1, y: 0 });
          return;
        }

        gsap.set(secondRef.current, { opacity: 0, y: 46 });
        gsap.set(metaRef.current, { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });

        tl.to(frameRef.current, { scale: 1.045, yPercent: -1.6, ease: "none", duration: 1 }, 0)
          .to(secondRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 }, 0.12)
          .to(metaRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.38 }, 0.34);
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="topo" ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.sticky}>
        <div className={styles.ambient} aria-hidden="true">
          <Image src="/assets/area51/facade.webp" alt="" fill priority sizes="100vw" />
        </div>

        <div className={styles.copy}>
          <span className="sectionLabel">Camocim de São Félix</span>
          <h1 id="hero-title" className={styles.title} data-display>
            <span>A cidade ainda dorme.</span>
            <span ref={secondRef} className={styles.secondLine}>A Área 51 já está em movimento.</span>
          </h1>

          <div ref={metaRef} className={styles.meta}>
            <p>Estrutura real, rotina longa e uma identidade que você reconhece antes mesmo de entrar.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#estrutura">Quero conhecer</a>
              <a className={styles.secondary} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div ref={frameRef} className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src="/assets/area51/facade.webp"
              alt="Fachada real da Academia Área 51 iluminada à noite"
              fill
              priority
              sizes="(max-width: 760px) 92vw, 52vw"
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
          <span>Role</span>
          <i />
        </div>
      </div>
    </section>
  );
}
