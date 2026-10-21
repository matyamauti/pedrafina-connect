"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// O ScrollTrigger mede as posições na criação. Se fontes ou imagens ainda
// estiverem carregando, as medidas saem erradas e ele só recalcula num
// resize — a seção fica presa no estado errado. Um refresh no load resolve.
if (typeof window !== "undefined" && document.readyState !== "complete") {
  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
}

// useLayoutEffect avisa durante o SSR; no servidor cai para useEffect.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Mesmas curvas dos tokens CSS, para que CSS e GSAP não divirjam.
export const easePf = "cubic-bezier(0.23, 1, 0.32, 1)";

export { gsap, ScrollTrigger };
