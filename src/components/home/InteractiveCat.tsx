"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./HomeHero.module.css";

type Pose = "awake" | "tilt" | "sleep" | "lifted";

type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
type Drag = { x: number; y: number; pointer: number; bounds: Bounds };

/** 위쪽으로는 아트 영역보다 이만큼 더 들어 올릴 수 있다. */
const LIFT_MARGIN = 24;
/** 부모(.art) 박스를 찾지 못했을 때의 예비 이동 범위. */
const FALLBACK_BOUNDS: Bounds = { minX: -130, maxX: 40, minY: -50, maxY: 130 };

/**
 * 고양이가 부모(.art) 박스 안에서만 움직이도록 이동 한계를 계산한다.
 * 현재 transform(offset)을 제거한 기준 위치로 계산하므로, 키보드로 들어 올린 상태에서
 * 드래그를 시작해도 한계가 어긋나지 않는다.
 */
function computeBounds(el: HTMLElement, offset: { x: number; y: number }): Bounds {
  const art = el.parentElement?.getBoundingClientRect();
  if (!art) return FALLBACK_BOUNDS;
  const self = el.getBoundingClientRect();
  const base = { left: self.left - offset.x, right: self.right - offset.x, top: self.top - offset.y, bottom: self.bottom - offset.y };
  return {
    minX: art.left - base.left,
    maxX: art.right - base.right,
    minY: art.top - base.top - LIFT_MARGIN,
    maxY: art.bottom - base.bottom,
  };
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function InteractiveCat() {
  const [pose, setPose] = useState<Pose>("awake");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<Drag | null>(null);
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
        drag.current = {
          x: event.clientX,
          y: event.clientY,
          pointer: event.pointerId,
          bounds: computeBounds(event.currentTarget, offset),
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setPose("lifted");
      }}
      onPointerMove={(event) => {
        const origin = drag.current;
        if (!origin) {
          // 잠든 채로 포인터가 위에 머물러 있으면(enter 없이) 시안처럼 바로 갸웃한다.
          if (pose === "sleep" && !reduced.current) { clearTimer(); setPose("tilt"); }
          return;
        }
        if (origin.pointer !== event.pointerId) return;
        const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
        moved.current ||= Math.abs(dx) + Math.abs(dy) > 4;
        const { minX, maxX, minY, maxY } = origin.bounds;
        setOffset({ x: clamp(dx, minX, maxX), y: clamp(dy, minY, maxY) });
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
