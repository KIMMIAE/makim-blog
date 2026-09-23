import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "../site";

/**
 * 공유 카드(og:image / twitter:image) 생성. satori 는 CSS 변수·시스템 폰트를 못 쓰므로
 * 토큰(styles/tokens.css 라이트) 값을 그대로 옮겨 적고, 한글 폰트 파일을 직접 읽는다.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// styles/tokens.css 라이트 모드와 동일한 값
const COLOR = {
  canvas: "#ffffff",
  surface: "#f3f4ff",
  text: "#131735",
  muted: "#656d86",
  faint: "#666e8b",
  action: "#4053ff",
  border: "#e1e4f4",
  logoPurple: "#8b5cf6",
  logoOrange: "rgba(251, 146, 60, 0.75)",
} as const;

async function loadFonts() {
  const dir = join(process.cwd(), "assets", "fonts", "pretendard");
  const [bold, semiBold] = await Promise.all([
    readFile(join(dir, "Pretendard-Bold.woff")),
    readFile(join(dir, "Pretendard-SemiBold.woff")),
  ]);
  return [
    { name: "Pretendard", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Pretendard", data: semiBold, weight: 600 as const, style: "normal" as const },
  ];
}

/** 헤더 로고(원 두 개 겹침)를 확대한 것 */
function Logo({ scale = 1 }: { scale?: number }) {
  const circle = 23 * scale;
  return (
    <div style={{ position: "relative", width: 35 * scale, height: 36 * scale, display: "flex" }}>
      <div
        style={{
          position: "absolute",
          top: 1 * scale,
          left: 9 * scale,
          width: circle,
          height: circle,
          borderRadius: "50%",
          background: COLOR.logoPurple,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 13 * scale,
          left: 0,
          width: circle,
          height: circle,
          borderRadius: "50%",
          background: COLOR.logoOrange,
        }}
      />
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: COLOR.canvas,
        color: COLOR.text,
        fontFamily: "Pretendard",
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </div>
  );
}

function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
      <Logo scale={1.4} />
      <span>{SITE_NAME}</span>
    </div>
  );
}

/** 제목 길이에 따라 글자 크기를 낮춘다. 3줄 안에 들어오게 */
function titleFontSize(title: string) {
  if (title.length <= 18) return 76;
  if (title.length <= 30) return 64;
  if (title.length <= 44) return 54;
  return 46;
}

export async function postOgImage(post: { title: string; date: string; tags?: string[] }) {
  const fonts = await loadFonts();
  const tags = (post.tags ?? []).slice(0, 4);
  return new ImageResponse(
    (
      <Frame>
        <Brand />
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(post.title),
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            // 3줄 넘으면 잘라낸다
            maxHeight: titleFontSize(post.title) * 1.25 * 3,
            overflow: "hidden",
            wordBreak: "keep-all",
          }}
        >
          {post.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, fontWeight: 600 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: COLOR.surface,
                  border: `2px solid ${COLOR.border}`,
                  color: COLOR.action,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <span style={{ color: COLOR.faint }}>{post.date.replace(/-/g, ".")}</span>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts }
  );
}

export async function siteOgImage(description: string) {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Logo scale={3.4} />
          <span style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em" }}>{SITE_NAME}</span>
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, lineHeight: 1.5, color: COLOR.muted, wordBreak: "keep-all" }}>
          {description}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts }
  );
}
