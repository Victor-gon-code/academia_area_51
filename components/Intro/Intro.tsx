"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("area51-intro-seen") === "1";
    const hold = reduced ? 80 : seen ? 180 : 820;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => setLeaving(true), hold);
    const removeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setVisible(false);
      sessionStorage.setItem("area51-intro-seen", "1");
    }, hold + (reduced ? 20 : 340));

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.intro} ${leaving ? styles.leaving : ""}`} aria-hidden="true">
      <div className={styles.light} />
      <div className={styles.wordmark}>
        <span className={styles.signal}><i /></span>
        <strong>ÁREA 51</strong>
        <span className={styles.city}>Camocim de São Félix</span>
      </div>
    </div>
  );
}
