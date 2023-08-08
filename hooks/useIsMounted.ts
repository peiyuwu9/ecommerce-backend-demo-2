import { useCallback, useEffect, useRef } from "react";

function useIsMounted() {
  const isMounted = useRef(false); // Set to unmounted by default

  useEffect(() => {
    isMounted.current = true; // Component is mounted

    return () => {
      isMounted.current = false; // Component is unmounted
    };
  }, []); // Run once on mount

  return useCallback(() => isMounted.current, []); // Return function that checks component mounted status
}

export default useIsMounted;
