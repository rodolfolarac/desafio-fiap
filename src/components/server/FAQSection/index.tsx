import { FAQ } from "@/components/client/FAQ";

interface FAQSectionProps {
  id?: string;
  className?: string;
}

const faqData = [
  {
    id: "1",
    question: "QUANDO POSSO ME MATRICULAR?",
    answer:
      "Você pode se matricular em qualquer dia e hora, basta acessar a página do curso e se inscrever.",
  },
  {
    id: "2",
    question: "POSSO FAZER DOIS OU MAIS CURSOS AO MESMO TEMPO?",
    answer:
      "Sim. Apenas atente-se às datas, elas devem ser diferentes, porque cada curso tem sua dinâmica.",
  },
  {
    id: "3",
    question: "QUAIS OS PRÉ-REQUISITOS?",
    answer:
      "Cada curso tem seus pré-requisitos descritos na própria página. Identifique-os, para que você obtenha um melhor aproveitamento do seu SHIFT.",
  },
  {
    id: "4",
    question: "QUAL A DURAÇÃO DOS CURSOS?",
    answer: "De 6 a 42 horas.",
  },
  {
    id: "5",
    question: "PRECISO LEVAR ALGUM MATERIAL PARA AS AULAS?",
    answer:
      "Não. Os materiais utilizados em sala de aula são fornecidos pela FIAP e as aulas mais técnicas são realizadas em nossos próprios laboratórios. Sugerimos somente que traga o que preferir para suas anotações.",
  },
  {
    id: "6",
    question: "VOU RECEBER CERTIFICADO DE CONCLUSÃO DE CURSO?",
    answer:
      "Sim. Ao cumprir pelo menos 75% da carga horária do curso, você receberá um Certificado Digital, que poderá ser acessado na plataforma.",
  },
];

export const FAQSection = ({ id, className }: FAQSectionProps) => {
  return (
    <section id={id} className={`faq-section ${className || ""}`}>
      <div className="container">
        <div className="faq-section__header">
          <h2 className="faq-section__title">FAQ</h2>
          <p className="faq-section__subtitle">Dúvidas Frequentes</p>
        </div>

        <div className="faq-section__content">
          <FAQ items={faqData} />
        </div>
      </div>
    </section>
  );
};