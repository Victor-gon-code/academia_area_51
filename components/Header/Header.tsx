"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import styles from "./Header.module.css";

const nav = [
  { label: "Estrutura", href: "#estrutura" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
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
      <header className={styles.header}>
        <a className={styles.brand} href="#topo" aria-label="Academia Área 51 — início" onClick={() => setOpen(false)}>
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

      <div id="menu-mobile" className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`} aria-hidden={!open}>
        <nav aria-label="Navegação mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className={styles.mobileWhatsapp}
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Falar no WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <div className={styles.mobileMeta}>
          <span>{SITE.city}</span>
          <span>{SITE.hours.weekdays} · {SITE.hours.weekend}</span>
        </div>
      </div>
    </>
  );
}
