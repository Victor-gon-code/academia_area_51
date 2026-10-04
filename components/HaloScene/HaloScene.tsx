"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HaloScene.module.css";

export default function HaloScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches;
    if (reduced || compact) return;

    let cancelled = false;
    let frame = 0;
    let cleanup = () => {};

    async function mount() {
      try {
        const THREE = await import("three");
        if (cancelled || !host) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const major = new THREE.Mesh(
          new THREE.TorusGeometry(1.62, 0.055, 16, 128),
          new THREE.MeshStandardMaterial({
            color: 0x111611,
            metalness: 0.92,
            roughness: 0.3,
            emissive: 0x2b8518,
            emissiveIntensity: 0.55
          })
        );
        group.add(major);

        const minor = new THREE.Mesh(
          new THREE.TorusGeometry(1.35, 0.018, 8, 112),
          new THREE.MeshBasicMaterial({ color: 0x78ff3a, transparent: true, opacity: 0.58 })
        );
        minor.rotation.x = Math.PI * 0.08;
        group.add(minor);

        const light = new THREE.PointLight(0x83ff49, 28, 12, 2);
        light.position.set(1.8, 1.2, 3.2);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.62));

        let pointerX = 0;
        let pointerY = 0;
        const onPointer = (event: PointerEvent) => {
          if (reduced) return;
          pointerX = (event.clientX / window.innerWidth - 0.5) * 0.3;
          pointerY = (event.clientY / window.innerHeight - 0.5) * 0.22;
        };

        const resize = () => {
          const width = Math.max(host.clientWidth, 1);
          const height = Math.max(host.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        const animate = () => {
          group.rotation.x += (pointerY - group.rotation.x) * 0.035;
          group.rotation.y += (pointerX - group.rotation.y) * 0.035;
          group.rotation.z += 0.00105;
          renderer.render(scene, camera);
          frame = window.requestAnimationFrame(animate);
        };

        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("resize", resize, { passive: true });
        resize();
        animate();
        setReady(true);

        cleanup = () => {
          window.cancelAnimationFrame(frame);
          window.removeEventListener("pointermove", onPointer);
          window.removeEventListener("resize", resize);
          major.geometry.dispose();
          minor.geometry.dispose();
          major.material.dispose();
          minor.material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        };
      } catch {
        setReady(false);
      }
    }

    mount();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={hostRef} className={`${styles.scene} ${ready ? styles.ready : ""}`} aria-hidden="true">
      <div className={styles.fallback} />
    </div>
  );
}
