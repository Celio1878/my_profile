import { type JSX, type ReactNode, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export type RevealProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  /** ms delay for the transition */
  delay?: number;
  /** direction for the initial offset */
  direction?: "up" | "down" | "left" | "right" | "none";
};

/**
 * Reveal component: fades and slides content into view when it enters the viewport.
 * Respects prefers-reduced-motion by allowing CSS to disable transitions/animations.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-40px 0px",
  });

  const initialTransform = useMemo(() => {
    switch (direction) {
      case "up":
        return "translateY(12px)";
      case "down":
        return "translateY(-12px)";
      case "left":
        return "translateX(12px)";
      case "right":
        return "translateX(-12px)";
      default:
        return "none";
    }
  }, [direction]);

  const Comp: any = as;

  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        transition: "opacity 700ms ease, transform 700ms ease",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : initialTransform,
      }}
    >
      {children}
    </Comp>
  );
}
