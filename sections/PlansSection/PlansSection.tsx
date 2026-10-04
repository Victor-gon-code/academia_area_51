"use client";

import { useEffect, useRef } from "react";
import { PLANS, SITE } from "@/lib/site";
import styles from "./PlansSection.module.css";

export default function PlansSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

        media.add("(min-width: 761px)", () => {
          if (reduced) return;
          const plans = gsap.utils.toArray<HTMLElement>("[data-plan]");
          const nav = gsap.utils.toArray<HTMLElement>("[data-plan-nav]");

          plans.forEach((plan, index) => gsap.set(plan, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 36 }));
          nav.forEach((item, index) => gsap.set(item, { opacity: index === 0 ? 1 : 0.28 }));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.62,
              invalidateOnRefresh: true
            }
          });

          for (let i = 1; i < plans.length; i += 1) {
            const at = i;
            tl.to(plans[i - 1], { autoAlpha: 0, y: -34, duration: 0.28, ease: "none" }, at - 0.2)
              .to(plans[i], { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, at - 0.1)
              .to(nav[i - 1], { opacity: 0.28, duration: 0.18 }, at - 0.1)
              .to(nav[i], { opacity: 1, duration: 0.18 }, at - 0.1);
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
    <section id="planos" ref={sectionRef} className={styles.section} aria-labelledby="plans-title">
      <div className={styles.sticky}>
        <header className={styles.header}>
          <span className="sectionLabel">Planos</span>
          <h2 id="plans-title" data-display>Escolha seu ritmo.</h2>
        </header>

        <div className={styles.planStage}>
          {PLANS.map((plan) => (
            <article key={plan.name} data-plan className={styles.plan}>
              <span>{plan.name}</span>
              <strong data-display>{plan.price}</strong>
              <p>{plan.copy}</p>
            </article>
          ))}
        </div>

        <div className={styles.planNav} aria-hidden="true">
          {PLANS.map((plan) => (
            <span key={plan.name} data-plan-nav>{plan.name}</span>
          ))}
        </div>

        <a className={styles.cta} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
          Quero falar sobre meu plano <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className={styles.mobilePlans}>
        <header>
          <span className="sectionLabel">Planos</span>
          <h2 data-display>Escolha seu ritmo.</h2>
        </header>
        {PLANS.map((plan) => (
          <article key={plan.name}>
            <span>{plan.name}</span>
            <strong data-display>{plan.price}</strong>
            <p>{plan.copy}</p>
          </article>
        ))}
        <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
          Quero falar sobre meu plano <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
