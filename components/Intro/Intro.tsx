"use client";

import Image from "next/image";
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
      <div className={styles.halo} />
      <div className={styles.wordmark}>
        <Image className={styles.logo} src="/assets/area51/logo.jpg" alt="" width={86} height={86} priority />
        <strong>ÁREA 51</strong>
        <span>Camocim de São Félix</span>
      </div>
    </div>
  );
}
