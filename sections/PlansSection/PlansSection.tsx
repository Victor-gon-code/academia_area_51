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
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        media = gsap.matchMedia();

        media.add("(min-width: 901px)", () => {
          if (reduced) return;

          const plans = gsap.utils.toArray<HTMLElement>("[data-plan]");
          const nav = gsap.utils.toArray<HTMLElement>("[data-plan-nav]");
          const progress = sectionRef.current?.querySelector<HTMLElement>("[data-plan-progress]");

          plans.forEach((plan, index) => {
            gsap.set(plan, {
              autoAlpha: index === 0 ? 1 : 0,
              y: index === 0 ? 0 : 30
            });
          });

          nav.forEach((item, index) => {
            gsap.set(item, {
              opacity: index === 0 ? 1 : 0.27,
              x: index === 0 ? 0 : 10
            });
          });

          if (progress) {
            gsap.set(progress, { scaleY: 1 / plans.length, transformOrigin: "top" });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.58,
              invalidateOnRefresh: true
            }
          });

          const step = 1.2;

          for (let i = 1; i < plans.length; i += 1) {
            const at = i * step;

            tl.to(
              plans[i - 1],
              { autoAlpha: 0, y: -26, duration: 0.26, ease: "none" },
              at - 0.2
            )
              .to(
                plans[i],
                { autoAlpha: 1, y: 0, duration: 0.36, ease: "power2.out" },
                at - 0.08
              )
              .to(
                nav[i - 1],
                { opacity: 0.27, x: 10, duration: 0.22, ease: "none" },
                at - 0.14
              )
              .to(
                nav[i],
                { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" },
                at - 0.08
              );

            if (progress) {
              tl.to(
                progress,
                { scaleY: (i + 1) / plans.length, duration: 0.28, ease: "none" },
                at - 0.08
              );
            }
          }

          const finalPlan = plans[plans.length - 1];
          if (finalPlan) {
            tl.to(
              finalPlan,
              { autoAlpha: 1, y: 0, duration: 1.05, ease: "none" },
              plans.length * step
            );
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
    <section id="planos" ref={sectionRef} className={styles.section} aria-label="Planos da Academia Área 51">
      <div className={styles.sticky}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <span className="sectionLabel">Planos</span>
            <h2 data-display>Escolha seu tempo.</h2>
          </div>

          <p className={styles.headerCopy}>
            Quatro jeitos de colocar a Área 51 na rotina. Veja os valores, compare com calma e escolha o tempo que faz sentido para você.
          </p>
        </header>

        <div className={styles.planLayout}>
          <div className={styles.planStage}>
            <span className={styles.stageRule} aria-hidden="true" />

            {PLANS.map((plan, index) => (
              <article key={plan.name} data-plan className={styles.plan}>
                <div className={styles.planIdentity}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{plan.name}</h3>
                </div>

                <strong data-display>{plan.price}</strong>
                <p>{plan.copy}</p>
              </article>
            ))}
          </div>

          <aside className={styles.planRail} aria-label="Todos os planos e valores">
            <div className={styles.railHeading}>
              <span>Todos os planos</span>
              <span>04 opções</span>
            </div>

            <div className={styles.railList}>
              {PLANS.map((plan, index) => (
                <div key={plan.name} data-plan-nav className={styles.railRow}>
                  <span className={styles.railIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.railName}>{plan.name}</span>
                  <strong>{plan.price}</strong>
                </div>
              ))}
            </div>

            <div className={styles.progress} aria-hidden="true">
              <span data-plan-progress />
            </div>
          </aside>
        </div>

        <div className={styles.planFooter}>
          <p>
            Não precisa decidir olhando uma tabela. Se quiser, chama a gente e conversa sobre o plano que encaixa melhor na sua rotina.
          </p>
          <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            Falar sobre os planos <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className={styles.mobilePlans}>
        <header>
          <span className="sectionLabel">Planos</span>
          <h2 data-display>Escolha seu tempo.</h2>
          <p>Quatro opções, com os valores na tela e sem enrolação.</p>
        </header>

        {PLANS.map((plan, index) => (
          <article key={plan.name}>
            <div className={styles.mobilePlanTop}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{plan.name}</h3>
            </div>
            <strong data-display>{plan.price}</strong>
            <p>{plan.copy}</p>
          </article>
        ))}

        <div className={styles.mobileFooter}>
          <p>Ficou em dúvida entre dois planos? Chama a Área 51 e resolve direto com a gente.</p>
          <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            Falar sobre os planos <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
