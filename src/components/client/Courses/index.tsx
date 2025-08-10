"use client";

import { useEffect, useState } from "react";

import "./Courses.scss";

const coursesData = {
  tecnologia: [
    { id: 1, title: "Big Data Ecosystem", tags: ["REMOTO", "LIVE"] },
    { id: 2, title: "Creating Dashboards for BI", tags: ["REMOTO", "LIVE"] },
    {
      id: 3,
      title: "Big Data Science - Machine Learning & Data Mining",
      tags: ["REMOTO", "LIVE", "MULTIMÍDIA"],
    },
    { id: 4, title: "Storytelling", tags: ["REMOTO", "LIVE"] },
  ],
  inovacao: [
    { id: 5, title: "UX", tags: ["DIGITAL"] },
    { id: 6, title: "UX Writing", tags: ["LIVE"] },
    { id: 7, title: "Storytelling para Negócios", tags: ["LIVE"] },
    { id: 8, title: "Chatbots", tags: ["LIVE"] },
  ],
  negocios: [
    { id: 9, title: "Agile Culture", tags: ["DIGITAL"] },
    { id: 10, title: "DPO Data Protection Officer", tags: ["LIVE"] },
    { id: 11, title: "IT Business Partner", tags: ["LIVE"] },
    { id: 12, title: "Perícia Forense Computacional", tags: ["LIVE"] },
  ],
};

type Category = keyof typeof coursesData;

const getCategoryName = (category: Category) => {
  switch (category) {
    case "tecnologia":
      return "Tecnologia";
    case "inovacao":
      return "Inovação";
    case "negocios":
      return "Negócios";
  }
};

export const Courses = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("tecnologia");
  const [animationState, setAnimationState] = useState<
    "entering" | "exiting" | "idle"
  >("idle");
  const [nextCategory, setNextCategory] = useState<Category | null>(null);
  const [openAccordionCategory, setOpenAccordionCategory] =
    useState<Category | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (!isMobile) {
      if (activeCategory !== category && animationState === "idle") {
        setNextCategory(category);
        setAnimationState("exiting");
      }
    } else {
      if (openAccordionCategory === category) {
        setOpenAccordionCategory(null);
      } else {
        setOpenAccordionCategory(category);
      }
    }
  };

  const handleAnimationEnd = () => {
    if (animationState === "exiting" && nextCategory) {
      setActiveCategory(nextCategory);
      setNextCategory(null);
      setAnimationState("entering");
    } else if (animationState === "entering") {
      setAnimationState("idle");
    }
  };

  const getCategoryClassName = (category: Category) => {
    if (!isMobile) {
      const isActive = activeCategory === category;
      if (!isActive) return "courses-section__category";

      if (animationState === "exiting") {
        return "courses-section__category active exiting";
      }
      if (animationState === "entering") {
        return "courses-section__category active entering";
      }
      return "courses-section__category active";
    } else {
      const isOpen = openAccordionCategory === category;
      return `courses-section__category${isOpen ? " active" : ""}`;
    }
  };

  return (
    <section className="courses-section">
      <div className="container">
        <div className="courses-section__header">
          <div>
            <h2 className="courses-section__title">Cursos</h2>
            <p className="courses-section__subtitle">Cursos de Curta Duração</p>
          </div>
          <div className="courses-section__tabs">
            {Object.keys(coursesData).map((category) => (
              <button
                key={category}
                className={`courses-section__tab-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryClick(category as Category)}
              >
                {getCategoryName(category as Category)}
              </button>
            ))}
          </div>
        </div>

        <div className="courses-section__content">
          {Object.keys(coursesData).map((category) => {
            const cat = category as Category;
            return (
              <div
                key={cat}
                className={getCategoryClassName(cat)}
                onAnimationEnd={handleAnimationEnd}
              >
                <button
                  className="courses-section__accordion-header"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <h3 className="courses-section__category-title">
                    {getCategoryName(cat)}
                  </h3>
                  <span className="courses-section__accordion-icon" />
                </button>

                <div className="courses-section__category-content">
                  <h3 className="courses-section__desktop-title">
                    {getCategoryName(cat)}
                  </h3>
                  <ul className="courses-section__list">
                    {coursesData[cat].map((course) => (
                      <li
                        key={course.id}
                        className="courses-section__list-item"
                      >
                        <span className="courses-section__course-title">
                          {course.title}
                        </span>
                        <span className="courses-section__course-tags">
                          {course.tags.join(" • ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
