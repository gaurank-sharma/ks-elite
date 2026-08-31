import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../lib/SmoothScroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useLayoutEffect(() => {
    lenisRef?.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
