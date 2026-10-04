"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import styles from "./Header.module.css";

const nav = [
  { index: "01", label: "Estrutura", href: "#estrutura" },
  { index: "02", label: "Planos", href: "#planos" },
  { index: "03", label: "Contato", href: "#contato" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const menu = menuRef.current;
    const menuLinks = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>('a[href]:not([tabindex="-1"])'))
      : [];
    const focusable = menuButtonRef.current
      ? [menuButtonRef.current, ...menuLinks]
      : menuLinks;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => menuLinks[0]?.focus());

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setOpen(false);
    };

    closeOnDesktop(desktop);
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>

      <header className={`${styles.header} ${open ? styles.headerOpen : ""}`}>
        <a
          className={styles.brand}
          href="#topo"
          aria-label="Academia Área 51 — início"
          onClick={() => setOpen(false)}
        >
          <span className={styles.brandMark} aria-hidden="true" />
          <span>ÁREA 51</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a
            className={styles.whatsapp}
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.menuText}>{open ? "Fechar" : "Menu"}</span>
          <span className={`${styles.menuGlyph} ${open ? styles.menuGlyphOpen : ""}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div
        ref={menuRef}
        id="menu-mobile"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.menuBackdrop} aria-hidden="true">
          <span>51</span>
        </div>

        <div className={styles.menuIntro}>
          <span>Navegação</span>
          <p>Camocim de São Félix</p>
        </div>

        <nav className={styles.mobileNav} aria-label="Navegação mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <small>{item.index}</small>
              <strong>{item.label}</strong>
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>

        <div className={styles.menuFooter}>
          <a
            className={styles.mobileWhatsapp}
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span>
              <small>WhatsApp</small>
              Falar com a Área 51
            </span>
            <strong aria-hidden="true">↗</strong>
          </a>

          <div className={styles.mobileMeta}>
            <span>{SITE.hours.weekdays}</span>
            <span>{SITE.hours.weekend}</span>
            <span>CREF {SITE.cref}</span>
          </div>
        </div>
      </div>
    </>
  );
}
