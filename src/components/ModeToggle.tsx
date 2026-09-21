"use client";

import { useTheme } from "next-themes";
import styles from "./ModeToggle.module.css";

const MoonIcon = () => {
  return (
    <svg
      className={`${styles.icon} ${styles.moon}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
};

const SunIcon = () => {
  return (
    <svg
      className={`${styles.icon} ${styles.sun}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
};

const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  // 서버에서는 테마를 알 수 없어 아이콘을 JS 로 고르면 하이드레이션 불일치가 난다.
  // 두 아이콘을 모두 렌더링하고 표시는 CSS(.dark)로 전환한다.
  return (
    <button
      type="button"
      aria-label="테마 전환"
      className={styles.toggle}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
};

export default ModeToggle;
