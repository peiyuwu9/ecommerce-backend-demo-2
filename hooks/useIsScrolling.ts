import { useEffect, useState } from "react";

function useIsScrolling() {
  const [isScrolling, setISScrolling] = useState(false);

  function onScroll() {
    return setISScrolling(window.scrollY !== 0);
  }

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isScrolling;
}

export default useIsScrolling;
