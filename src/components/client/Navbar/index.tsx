"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.scss";

export const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link href="/">
            <Image
              src="/images/components/Navbar/logo-fiap.svg"
              alt="FIAP"
              width={144}
              height={39}
              priority
            />
          </Link>
        </div>
      </div>

      <div
        className="navbar__progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};