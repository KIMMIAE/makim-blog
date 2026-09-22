import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

/** 본문 폭(46rem=736px) 기준. 모바일은 화면 폭, 그 이상은 736px 로 리사이즈 */
const SIZES = "(max-width: 767px) 100vw, 736px";

/**
 * 본문 이미지. rehypeImageSize 가 크기를 넣어 준 로컬 이미지는 next/image 로 리사이즈·WebP 변환하고,
 * 크기를 모르는 외부 이미지는 일반 <img> 로 둔다. figure/figcaption 은 rehypeImageFigures 가 담당.
 */
export function PostImage({ src, alt, width, height, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const w = Number(width), h = Number(height);
  if (typeof src === "string" && src.startsWith("/") && w > 0 && h > 0) {
    return <Image src={src} alt={alt ?? ""} width={w} height={h} sizes={SIZES} style={{ width: "100%", height: "auto" }} />;
  }
  // eslint-disable-next-line @next/next/no-img-element -- 크기 미상 외부 이미지
  return <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" {...rest} />;
}
