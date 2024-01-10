import "../../styles/globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { Metadata } from "next";
import { Providers } from "../components/Provider";

export const metadata: Metadata = {
  title: 'applejam',
  description: 'https://applejam.monster',
  authors: [{ name: 'makim' }],
  referrer: 'origin-when-cross-origin',
  creator: 'makim',
  publisher: 'makim',
  metadataBase: new URL('https://applejam.monster'),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon/apple-icon.png',
    shortcut: '/favicon/apple-icon.png',
    apple: '/favicon/apple-icon.png',
    other: {
      rel: '/favicon/apple-icon-precomposed',
      url: '/favicon/apple-icon-precomposed.png',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased text-black bg-white dark:bg-zinc-900 dark:text-white">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
