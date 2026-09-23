import "../../styles/globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { Metadata } from "next";
import { Providers } from "../components/Provider";
import { Analytics } from "@vercel/analytics/next";
import { AUTHOR, SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_OG_IMAGE, SITE_URL, alternatesFor } from "../lib/site";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  referrer: "origin-when-cross-origin",
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  // 모든 상대 URL(canonical, og:url, og:image 등)이 이 기준으로 절대 URL 이 된다
  metadataBase: new URL(SITE_URL),
  // 각 페이지가 자기 canonical 로 덮어쓴다. 여기 값은 페이지가 alternates 를 주지 않았을 때의 안전장치
  alternates: alternatesFor("/"),
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 파비콘·애플 아이콘은 src/app/icon.svg, src/app/apple-icon.png 파일 규약으로 자동 생성된다.
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [SITE_OG_IMAGE],
  },
  // 제목·설명·이미지는 각 페이지의 title/description/openGraph.images 에서 자동으로 채워진다
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased bg-canvas text-ink">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        {/* Vercel Web Analytics: 배포 환경에서만 수집. 대시보드 Analytics 탭에서 Enable 필요 */}
        <Analytics debug={false} />
      </body>
    </html>
  );
}
