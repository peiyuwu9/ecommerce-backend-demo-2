"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useIsScrolling from "@/hooks/useIsScrolling";

const Navbar = ({ children }: { children: ReactNode }) => {
  const isScrolling = useIsScrolling();

  return (
    <nav
      className={cn(
        "flex px-12 py-3 items-center justify-between sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30",
        isScrolling && "shadow-md z-10"
      )}
    >
      {/* NextJs Recommended Pattern: Passing Server Components to Client Components as Props */}
      {/* https://nextjs.org/docs/getting-started/react-essentials#recommended-pattern-passing-server-components-to-client-components-as-props */}
      {children}
    </nav>
  );
};

export default Navbar;
