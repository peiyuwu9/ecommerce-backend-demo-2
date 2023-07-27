"use client";

import { ReactNode, useEffect, useState } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [scrolling, setScrolling] = useState(false);

  function onScroll() {
    return setScrolling(window.scrollY !== 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolling
          ? "flex px-8 py-4 items-center justify-between sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-md z-10"
          : "flex px-8 py-4 items-center justify-between sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30"
      }`}
    >
      {/* NextJs Recommended Pattern: Passing Server Components to Client Components as Props */}
      {/* https://nextjs.org/docs/getting-started/react-essentials#recommended-pattern-passing-server-components-to-client-components-as-props */}
      {children}
    </nav>
  );
};

export default Navbar;
