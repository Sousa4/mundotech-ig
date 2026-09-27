import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MundoTech.ig | Tecnologia, inovação e muito mais",
  description: "Celulares, informática, eletrônicos, acessórios e muito mais."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}