import "./HeroSection.scss";

interface HeroSectionProps {
  id?: string;
  className?: string;
}

export const HeroSection = ({ id, className }: HeroSectionProps) => {
  return (
    <section id={id} className={`home__hero ${className || ""}`}>
      <div className="home__hero-content">
        <h1 className="home__hero-title">
          <span className="home__hero-title--subtitle-primary">A Melhor Faculdade</span>
          <span className="home__hero-title--subtitle-secondary">de Tecnologia</span>
          <span className="home__hero-title--main-title">SOBRE</span>
        </h1>
      </div>
    </section>
  );
};