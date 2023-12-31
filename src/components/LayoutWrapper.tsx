import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <Header />
      <article>
        {children}
      </article>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
