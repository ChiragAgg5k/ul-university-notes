/**
 * @file GSAP entrance animation for the children of a container.
 */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP);

const reducedMotion = '(prefers-reduced-motion: no-preference)';

/**
 * Fades and lifts each direct child in turn. Does nothing when the visitor asks for reduced motion.
 */
export function useReveal<Element extends HTMLElement>(
  dependency?: unknown,
): RefObject<Element | null> {
  const container = useRef<Element>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(reducedMotion, () => {
        gsap.from(container.current!.children, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
        });
      });
    },
    { scope: container, dependencies: [dependency] },
  );
  return container;
}
