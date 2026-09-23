import { siteOgImage } from "../../../lib/og";
import { SITE_DESCRIPTION } from "../../../lib/site";

/**
 * 사이트 공통 공유 카드(홈·목록·태그 등 글 이외 페이지): /og/site.png
 * app/opengraph-image.tsx 파일 규약은 페이지가 openGraph 를 직접 정의하면(목록·태그) 주입되지 않아
 * 명시적으로 참조할 수 있는 Route Handler 로 둔다. SITE_OG_IMAGE(site.ts) 가 이 경로를 가리킨다.
 */
export const dynamic = "force-static";

export function GET() {
  return siteOgImage(SITE_DESCRIPTION);
}
