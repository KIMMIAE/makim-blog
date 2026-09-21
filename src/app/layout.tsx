import "../../styles/globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { Metadata } from "next";
import { Providers } from "../components/Provider";
import { Analytics } from "@vercel/analytics/next";

const SITE_NAME = "Still Making";
const SITE_DESCRIPTION =
  "개발하며 마주한 문제와 선택, 책과 컨퍼런스에서 얻은 생각, 직접 만든 도구와 에이전트 이야기를 기록합니다.";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "makim" }],
  referrer: "origin-when-cross-origin",
  creator: "makim",
  publisher: "makim",
  metadataBase: new URL("https://applejam.monster"),
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 파비콘·애플 아이콘은 src/app/icon.svg, src/app/apple-icon.png 파일 규약으로 자동 생성된다.
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased bg-canvas text-ink">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        {/* Vercel Web Analytics: 배포 환경에서만 수집. 대시보드 Analytics 탭에서 Enable 필요 */}
        <Analytics />
      </body>
    </html>
  );
}
