import type { Metadata } from "next"; // Tipo para metadados de página no Next.js
import "./globals.css"; // Importa estilos globais
import Navbar from "./components/Navbar"; // Componente da barra de navegação
import { ToastContainer } from "react-toastify"; // Container para notificações toast

// Define metadados da aplicação, como título exibido no navegador
export const metadata: Metadata = {
  title: "Calculadora Efeito Skin",
};

// Componente de layout raiz que envolve todas as páginas
export default function RootLayout({
  children, // Conteúdo específico de cada página
}: Readonly<{
  children: React.ReactNode; // Tipo React para elementos filhos
}>) {
  return (
    <html lang="pt-BR">
      {/* Define idioma do documento */}
      <body
        className="h-screen w-screen bg-gray-900" // Altura e largura totais + fundo escuro
      >
        <Navbar /> {/* Barra de navegação persistente */}
        {children} {/* Área onde o conteúdo da rota é renderizado */}
        <ToastContainer /> {/* Container para exibir toasts de notificação */}
      </body>
    </html>
  );
}
