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
    const hold = reduced ? 80 : seen ? 220 : 900;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => setLeaving(true), hold);
    const removeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      sessionStorage.setItem("area51-intro-seen", "1");
      window.dispatchEvent(new Event("area51:intro-complete"));
      setVisible(false);
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
      <div className={styles.logo}>
        <Image
          src="/assets/area51/logo.jpg"
          alt=""
          width={320}
          height={320}
          priority
          sizes="(max-width: 760px) 42vw, 260px"
        />
      </div>
    </div>
  );
}
