"use client";

import { Children, isValidElement, useRef, useState, type ComponentProps, type ReactElement } from "react";
import styles from "./CodeBlock.module.css";

const LANG_LABEL: Record<string, string> = { js: "javascript", ts: "typescript", sh: "bash", shell: "bash", yml: "yaml", objectivec: "objective-c" };

function detectLanguage(pre: ComponentProps<"pre">): string {
  const fromPre = /language-([\w-]+)/.exec(String(pre.className ?? ""))?.[1];
  const child = Children.toArray(pre.children).find(isValidElement) as ReactElement<{ className?: string }> | undefined;
  const fromCode = /language-([\w-]+)/.exec(String(child?.props.className ?? ""))?.[1];
  const lang = (fromPre ?? fromCode ?? "").toLowerCase();
  return LANG_LABEL[lang] ?? lang;
}

/**
 * 코드 블록 프레임. MDX `pre` 를 대체해 상단 바(언어 라벨 · 복사 버튼)를 붙인다.
 * 하이라이트된 내용(children)은 서버에서 렌더링된 그대로 받는다.
 */
export function CodeBlock(props: ComponentProps<"pre">) {
  const { children, className, ...rest } = props;
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = detectLanguage(props);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 권한이 없거나 비보안 컨텍스트: 조용히 무시 */
    }
  }

  return (
    <div className={styles.block}>
      <div className={styles.bar}>
        <span className={styles.lang}>{language || "code"}</span>
        <button type="button" className={`${styles.copy} ${copied ? styles.done : ""}`} onClick={copy} aria-label="코드 복사">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {copied ? <path d="M5 12l5 5L20 7" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>}
          </svg>
          <span>{copied ? "복사됨" : "복사"}</span>
        </button>
      </div>
      <pre ref={preRef} className={`${styles.pre} ${className ?? ""}`} {...rest}>{children}</pre>
    </div>
  );
}
