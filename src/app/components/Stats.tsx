"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 30;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number text-2xl sm:text-3xl font-sans font-bold">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();

  const stats = [
    { value: 7, suffix: "+", label: t.stats_section.years },
    { value: 8, suffix: "", label: t.stats_section.apps },
    { value: 200, suffix: "+", label: t.stats_section.routes },
    { value: 100, suffix: "+", label: t.stats_section.migrations },
    { value: 50, suffix: "+", label: t.stats_section.templates },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <Counter target={stat.value} suffix={stat.suffix} />
          <p className="text-[10px] sm:text-xs font-mono text-muted mt-1 uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
