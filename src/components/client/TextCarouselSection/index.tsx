"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";

import Image from "next/image";

import "./TextCarouselSection.scss";

gsap.registerPlugin(ScrollTrigger);

interface TextCarouselSectionProps {
  id?: string;
  className?: string;
}

export const TextCarouselSection = ({
  id,
  className,
}: TextCarouselSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineARef = useRef<HTMLDivElement>(null);
  const lineBRef = useRef<HTMLDivElement>(null);
  const lineBottomARef = useRef<HTMLDivElement>(null);
  const lineBottomBRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lineA = lineARef.current;
    const lineB = lineBRef.current;
    const lineBottomA = lineBottomARef.current;
    const lineBottomB = lineBottomBRef.current;
    const image = imageRef.current;

    if (!section || !lineA || !lineB || !lineBottomA || !lineBottomB || !image)
      return;

    function setupInfiniteText() {
      const lines = [
        {
          element: lineA,
          content: "CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.",
        },
        {
          element: lineB,
          content: "TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.",
        },
        { element: lineBottomA, content: " SKILLS • CONHECIMENTO •" },
        {
          element: lineBottomB,
          content: "MUITO. MUITO ALÉM DOS TUTORIAIS.",
        },
      ];

      lines.forEach(({ element, content }) => {
        if (!element) return;
        element.innerHTML = "";
        const copies = 5;

        for (let i = 0; i < copies; i++) {
          const span = document.createElement("span");
          span.textContent = content;
          span.className = i === 0 ? "text-original" : "text-clone";
          span.style.marginRight = "0.5em";
          if (i > 0) span.setAttribute("aria-hidden", "true");
          element.appendChild(span);
        }
      });
    }

    setupInfiniteText();

    let lastScrollY = window.scrollY;
    let accumulatedA = 0,
      accumulatedB = 0;
    let contentWidthA = 0,
      contentWidthB = 0;

    function measureWidths() {
      if (!lineA) return;
      const testSpan = document.createElement("span");
      testSpan.style.cssText =
        "visibility:hidden;position:absolute;white-space:nowrap";
      testSpan.style.font = window.getComputedStyle(lineA).font;
      document.body.appendChild(testSpan);

      const texts = [
        "CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.",
        "TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.",
        "SKILLS CONHECIMENTO ",
        "MUITO. MUITO ALÉM DOS TUTORIAIS",
      ];

      texts.forEach((text, i) => {
        testSpan.textContent = text;
        const width = testSpan.getBoundingClientRect().width;
        if (i === 0) contentWidthA = width;
        if (i === 1) contentWidthB = width;
      });

      document.body.removeChild(testSpan);
    }

    const normalizePosition = (pos: number, contentWidth: number) =>
      ((pos % contentWidth) + contentWidth) % contentWidth;

    measureWidths();

    gsap.set(image, {
      clipPath: "inset(0 0 100% 0)",
    });

    ScrollTrigger.create({
      trigger: image,
      start: "top-=500px center",
      onEnter: () => {
        gsap.to(image, {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.0,
          ease: "none",
        });
      },
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: () => {
        const deltaY = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        const moveAmount = deltaY * 0.5;

        accumulatedA -= moveAmount;
        accumulatedB += moveAmount;

        gsap.set([lineA, lineBottomA], {
          x: -normalizePosition(-accumulatedA, contentWidthA),
          ease: "none",
        });
        gsap.set([lineB, lineBottomB], {
          x: -normalizePosition(-accumulatedB, contentWidthB),
          ease: "none",
        });
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      setupInfiniteText();
      measureWidths();
    });

    resizeObserver.observe(section);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id={id}
      className={`text-carousel ${className || ""}`}
      ref={sectionRef}
    >
      <div className="text-carousel__top">
        <div className="text-carousel__line" ref={lineARef}></div>
        <div className="text-carousel__line" ref={lineBRef}></div>
      </div>

      <div className="text-carousel__image" ref={imageRef}>
        <Image
          src="/images/components/TextCarouselSection/intro.png"
          alt="Pessoa trabalhando com tecnologia"
          width={800}
          height={600}
          priority
        />
      </div>

      <div className="text-carousel__bottom">
        <div className="text-carousel__line" ref={lineBottomARef}></div>
        <div className="text-carousel__line" ref={lineBottomBRef}></div>
      </div>
    </section>
  );
};
