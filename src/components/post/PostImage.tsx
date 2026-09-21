import type { ImgHTMLAttributes } from "react";

/**
 * 본문 이미지. figure/figcaption 변환은 rehypeImageFigures 가 하고, 여기서는 로딩 속성만 더한다.
 * 글은 정적 경로(/YYYY/MM/images/…)나 외부 URL 을 쓰므로 next/image 최적화 없이 일반 img 를 유지한다.
 */
export function PostImage({ alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element -- 마크다운 본문 이미지(크기 미상, 정적/외부 파일)
  return <img alt={alt ?? ""} loading="lazy" decoding="async" {...rest} />;
}
