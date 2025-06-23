"use client";

// Importa o logotipo do IFC a partir da pasta de assets públicos
import ifcLogo from "./../../../../public/IFC.png";
// Componente de imagem otimizado do Next.js
import Image from "next/image";

// Componente Navbar: exibe a barra de navegação com logo e nomes
export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 p-2 flex justify-between items-center">
      {/* Exibe o logotipo do IFC com dimensões fixas */}
      <Image
        src={ifcLogo} // Fonte da imagem importada
        alt="logo" // Texto alternativo para acessibilidade
        height={80} // Altura em pixels
        width={240} // Largura em pixels
      />
      {/* Container de textos com nomes, alinhado à direita */}
      <div className="text-white text-lg font-semibold mr-2">
        <div>Arthur Pedro Ferreira</div>
        <div>André Dos Santos Ferreira</div>
      </div>
    </nav>
  );
}
