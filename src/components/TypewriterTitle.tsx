"use client";

import React, { useEffect, useRef, useState } from "react";

interface TypewriterTitleProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  speedMs?: number;
  delayMs?: number;
  cursorClassName?: string;
}

export function TypewriterTitle({
  text,
  as = "h2",
  className = "",
  speedMs = 24,
  delayMs = 0,
  cursorClassName = "bg-[#126B3A]",
}: TypewriterTitleProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(text.length);
      setStarted(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started) return;
    setCount(0);

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((prev) => {
          if (prev >= text.length) {
            if (intervalId) clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [started, text, speedMs, delayMs]);

  const done = count >= text.length;
  const Tag = as;

  return (
    <Tag ref={ref} className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span className="invisible select-none block" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 block" aria-hidden="true">
        {text.slice(0, count)}
        {!done && (
          <span
            className={`inline-block w-[3px] h-[0.85em] align-middle ml-1 animate-pulse ${cursorClassName}`}
          />
        )}
      </span>
    </Tag>
  );
}

