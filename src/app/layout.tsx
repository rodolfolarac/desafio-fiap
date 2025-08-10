import type { Metadata } from "next";
import "@/styles/main.scss";
import "@/fonts/fonts.css";

export const metadata: Metadata = {
  title: "FIAP - Transformando Ideias em Tecnologia",
  description:
    "Descubra os melhores cursos de tecnologia da FIAP. Graduação, pós-graduação e cursos livres.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
