'use client';

import { useState } from 'react';
import "./FAQ.scss";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`} onClick={onClick}>
    <div className="faq__question-wrapper">
      <h3 className="faq__question">{question}</h3>
    </div>
    <p className="faq__answer">{answer}</p>
  </div>
);

interface FAQProps {
  items?: { id: string; question: string; answer: string }[];
  className?: string;
}

export const FAQ = ({ items = [], className }: FAQProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setOpenId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={`faq ${className || ''}`}>
      {items.map(item => (
        <FAQItem
          key={item.id}
          {...item}
          isOpen={openId === item.id}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </div>
  );
};