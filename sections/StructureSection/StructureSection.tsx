"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { STRUCTURE_CHAPTERS } from "@/lib/site";
import styles from "./StructureSection.module.css";

export default function StructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

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
      if (cancelled || !sectionRef.current || !stageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        const buildTimeline = (mobile: boolean) => {
          if (reduced) return;

          const slides = gsap.utils.toArray<HTMLElement>("[data-structure-slide]");
          const navItems = gsap.utils.toArray<HTMLElement>("[data-structure-nav]");

          slides.forEach((slide, index) => {
            gsap.set(slide, {
              autoAlpha: index === 0 ? 1 : 0,
              y: 0,
              zIndex: slides.length - index
            });
          });

          navItems.forEach((item, index) => {
            gsap.set(item, { opacity: index === 0 ? 1 : 0.28 });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: mobile ? 0.55 : 0.62,
              invalidateOnRefresh: true
            }
          });

          const hold = mobile ? 0.72 : 0.95;
          const outDuration = mobile ? 0.16 : 0.18;
          const inDuration = mobile ? 0.22 : 0.24;

          tl.to(slides[0], { autoAlpha: 1, duration: hold, ease: "none" });

          for (let i = 1; i < slides.length; i += 1) {
            const previous = slides[i - 1];
            const current = slides[i];
            const previousNav = navItems[i - 1];
            const currentNav = navItems[i];

            tl.to(previous, {
              autoAlpha: 0,
              duration: outDuration,
              ease: "none"
            })
              .to(previousNav, {
                opacity: 0.28,
                duration: 0.12,
                ease: "none"
              }, "<")
              .to(current, {
                autoAlpha: 1,
                duration: inDuration,
                ease: "power2.out"
              })
              .to(currentNav, {
                opacity: 1,
                duration: 0.14,
                ease: "power2.out"
              }, "<")
              .to(current, {
                autoAlpha: 1,
                duration: hold,
                ease: "none"
              });
          }

          const finalSlide = slides[slides.length - 1];
          if (finalSlide) {
            tl.to(finalSlide, {
              autoAlpha: 1,
              duration: mobile ? 0.78 : 1.05,
              ease: "none"
            });
          }
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
    <section
      id="estrutura"
      ref={sectionRef}
      className={styles.section}
      aria-label="Estrutura da Academia Área 51"
    >
      <div ref={stageRef} className={styles.desktopStage}>
        <div className={styles.introLine}>
          <span className="sectionLabel">Estrutura real</span>
          <p>Três áreas. Cada uma com um jeito de treinar.</p>
        </div>

        <div className={styles.slides}>
          {STRUCTURE_CHAPTERS.map((chapter, index) => (
            <article
              key={chapter.id}
              data-structure-slide
              className={styles.slide}
              aria-label={chapter.label}
            >
              <div className={styles.media}>
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  quality={88}
                  sizes="(max-width: 900px) 92vw, 42vw"
                  loading="eager"
                  fetchPriority="low"
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

        <div className={styles.nav} aria-hidden="true">
          {STRUCTURE_CHAPTERS.map((chapter) => (
            <span key={chapter.id} data-structure-nav>
              {chapter.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.mobileChapters}>
        {STRUCTURE_CHAPTERS.map((chapter) => (
          <article key={chapter.id} className={styles.mobileChapter}>
            <div className={styles.mobileImage}>
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                quality={86}
                sizes="92vw"
                style={{ objectPosition: chapter.position }}
              />
            </div>
            <div className={styles.mobileCopy}>
              <span>{chapter.label}</span>
              <h3 data-display>{chapter.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
