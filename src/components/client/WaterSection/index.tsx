"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef, useState } from "react";

import "./WaterSection.scss";

gsap.registerPlugin(ScrollTrigger);

interface WaterSectionProps {
  id?: string;
  className?: string;
}

export const WaterSection = ({ id, className }: WaterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const totalFrames = 192;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    let loadedImages = 0;

    const preloadImages = () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = document.createElement("img");
        img.src = `/images/components/WaterSection/water_${i.toString().padStart(3, "0")}.jpg`;

        img.onload = () => {
          loadedImages++;
          if (loadedImages === 1) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };

        img.onerror = () => {
          console.warn(`Failed to load frame: ${i}`);
        };

        images[i] = img;
      }
    };

    const updateFrame = (frameIndex: number) => {
      const frame = Math.min(
        Math.max(Math.floor(frameIndex), 0),
        totalFrames - 1,
      );

      if (images[frame] && images[frame].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
        setCurrentFrame(frame);
      }
    };

    preloadImages();

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "50% top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = progress * (totalFrames - 1);
        updateFrame(frameIndex);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [totalFrames]);

  return (
    <section
      id={id}
      className={`water-section ${className || ""}`}
      ref={sectionRef}
    >
      <div className="water-section__container">
        <canvas ref={canvasRef} className="water-section__canvas" />
      </div>
    </section>
  );
};
