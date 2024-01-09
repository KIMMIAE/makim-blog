import "../../styles/globals.css";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "../components/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased text-black bg-white dark:bg-zinc-900 dark:text-white">
        <ThemeProvider attribute="class">
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
