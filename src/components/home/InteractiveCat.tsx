"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./HomeHero.module.css";

type Pose = "awake" | "tilt" | "sleep" | "lifted";

export function InteractiveCat() {
  const [pose, setPose] = useState<Pose>("awake");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; pointer: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moved = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reduced.current = query.matches; };
    update();
    query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); if (timer.current) clearTimeout(timer.current); };
  }, []);

  function clearTimer() { if (timer.current) clearTimeout(timer.current); }
  function reset(sleep = false) {
    clearTimer();
    drag.current = null;
    setOffset({ x: 0, y: 0 });
    setPose(sleep ? "sleep" : "awake");
    if (sleep) timer.current = setTimeout(() => setPose("awake"), 1800);
  }

  return (
    <button
      type="button"
      className={styles.cat}
      aria-label="고양이 들어 올리기"
      aria-describedby="cat-help"
      aria-pressed={pose === "lifted"}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerEnter={() => { if (!drag.current && pose !== "lifted" && !reduced.current) { clearTimer(); setPose("tilt"); } }}
      onPointerLeave={() => { if (!drag.current && pose === "tilt") reset(); }}
      onPointerDown={(event) => {
        if (event.button !== 0 || drag.current) return;
        clearTimer(); moved.current = false;
        drag.current = { x: event.clientX, y: event.clientY, pointer: event.pointerId };
        event.currentTarget.setPointerCapture(event.pointerId);
        setPose("lifted");
      }}
      onPointerMove={(event) => {
        const origin = drag.current;
        if (!origin || origin.pointer !== event.pointerId) return;
        const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
        moved.current ||= Math.abs(dx) + Math.abs(dy) > 4;
        setOffset({ x: Math.max(-130, Math.min(40, dx)), y: Math.max(-50, Math.min(130, dy)) });
      }}
      onPointerUp={(event) => { if (drag.current?.pointer === event.pointerId) reset(!reduced.current); }}
      onPointerCancel={() => reset()}
      onLostPointerCapture={() => { if (drag.current) reset(); }}
      onClick={(event) => {
        // Native keyboard/assistive-tech activation has no pointer click count.
        if (event.detail !== 0 || moved.current) { moved.current = false; return; }
        clearTimer();
        if (pose === "lifted") reset();
        else { setPose("lifted"); setOffset({ x: 0, y: reduced.current ? 0 : -20 }); }
      }}
      onKeyDown={(event) => { if (event.key === "Escape") reset(); }}
      onBlur={() => reset()}
    >
      <Image src={`/cat/c-${pose}.svg`} alt="" width={128} height={128} draggable={false} unoptimized />
    </button>
  );
}
