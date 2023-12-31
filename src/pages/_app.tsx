import "../../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "../components/LayoutWrapper";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
