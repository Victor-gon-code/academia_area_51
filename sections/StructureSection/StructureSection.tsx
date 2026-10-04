"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { STRUCTURE_CHAPTERS } from "@/lib/site";
import styles from "./StructureSection.module.css";

export default function StructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);

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

        media.add("(min-width: 901px)", () => {
          if (reduced) return;
          const slides = gsap.utils.toArray<HTMLElement>("[data-structure-slide]");
          const navItems = gsap.utils.toArray<HTMLElement>("[data-structure-nav]");
          const detail = desktopStageRef.current?.querySelector<HTMLElement>("[data-force-detail]");

          slides.forEach((slide, index) => {
            gsap.set(slide, { autoAlpha: index === 0 ? 1 : 0 });
          });
          navItems.forEach((item, index) => {
            gsap.set(item, { opacity: index === 0 ? 1 : 0.35 });
          });
          if (detail) gsap.set(detail, { opacity: 0, x: 40 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.65,
              invalidateOnRefresh: true
            }
          });

          for (let i = 1; i < slides.length; i += 1) {
            const at = i;
            tl.to(slides[i - 1], { autoAlpha: 0, duration: 0.35, ease: "none" }, at - 0.22)
              .to(slides[i], { autoAlpha: 1, duration: 0.42, ease: "power1.inOut" }, at - 0.12)
              .to(navItems[i - 1], { opacity: 0.35, duration: 0.2 }, at - 0.12)
              .to(navItems[i], { opacity: 1, duration: 0.2 }, at - 0.12);
          }

          if (detail) {
            tl.to(detail, { opacity: 1, x: 0, duration: 0.32, ease: "power2.out" }, 0.95)
              .to(detail, { opacity: 0, x: -24, duration: 0.24, ease: "none" }, 1.7);
          }
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
    <section id="estrutura" ref={sectionRef} className={styles.section} aria-label="Estrutura da Academia Área 51">
      <div ref={desktopStageRef} className={styles.desktopStage}>
        <div className={styles.introLine}>
          <span className="sectionLabel">Estrutura real</span>
          <p>O espaço fala por si.</p>
        </div>

        <div className={styles.slides}>
          {STRUCTURE_CHAPTERS.map((chapter, index) => (
            <article key={chapter.id} data-structure-slide className={styles.slide}>
              <div className={styles.media}>
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  style={{ objectPosition: chapter.position }}
                />
                <div className={styles.overlay} aria-hidden="true" />
              </div>
              <div className={styles.copy}>
                <span>{chapter.label}</span>
                {index === 0 ? (
                  <h2 data-display>{chapter.title}</h2>
                ) : (
                  <h3 data-display>{chapter.title}</h3>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.forceDetail} data-force-detail aria-hidden="true">
          <Image src="/assets/area51/interior-alt.png" alt="" fill sizes="18vw" />
        </div>

        <div className={styles.nav} aria-hidden="true">
          {STRUCTURE_CHAPTERS.map((chapter) => (
            <span key={chapter.id} data-structure-nav>{chapter.label}</span>
          ))}
        </div>
      </div>

      <div className={styles.mobileChapters}>
        <header className={styles.mobileIntro}>
          <span className="sectionLabel">Estrutura real</span>
          <h2 data-display>Tem lugar que você esquece. Este aqui, não.</h2>
        </header>
        {STRUCTURE_CHAPTERS.map((chapter, index) => (
          <article key={chapter.id} className={styles.mobileChapter}>
            <div className={styles.mobileImage}>
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="100vw"
                style={{ objectPosition: chapter.position }}
              />
            </div>
            <div className={styles.mobileCopy}>
              <span>{chapter.label}</span>
              <h3 data-display>{chapter.title}</h3>
            </div>
            {index === 1 ? (
              <div className={styles.mobileDetail}>
                <Image
                  src="/assets/area51/interior-alt.png"
                  alt="Outro ângulo real da área de musculação da Academia Área 51"
                  fill
                  sizes="42vw"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
