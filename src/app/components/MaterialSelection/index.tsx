"use client";

import Select from "react-select";
import React from "react";
import { conductiveMaterials } from "@/lib/materials/conductiveMaterials";

// Gera a lista de opções a partir do objeto de materiais
const options = Object.entries(conductiveMaterials).map(([key, mat]) => ({
  value: key,                             // Identificador único do material
  label: `${mat.name} (${mat.symbol})`,  // Texto exibido: nome e símbolo
}));

// Props esperadas pelo componente
interface MaterialSelectorProps {
  selectedKey: string | undefined;               // Material atualmente selecionado
  setSelectedKey: (value: string | undefined) => void; // Função para atualizar seleção
}

// Componente de dropdown para seleção de material
export default function MaterialSelector({
  setSelectedKey,
}: MaterialSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      {/* Título acima do seletor */}
      <h2 className="text-white text-lg">Selecione o Material:</h2>

      {/* Dropdown customizado com tema escuro */}
      <Select
        id="material-selector"                   // ID único do componente
        required                                  // Torna a seleção obrigatória
        styles={{                                 // Estilos inline para customização
          control: (base) => ({
            ...base,
            backgroundColor: "#101828",           // Fundo do controle
            borderColor: "#101828",               // Borda alinhada ao fundo
            color: "white",                       // Texto em branco
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1f2937",           // Fundo do menu de opções
            color: "white",                       // Texto em branco
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused       // Cor de destaque ao focar
              ? "#374151"
              : "#1f2937",
            color: "white",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",                       // Valor selecionado em branco
          }),
          input: (base) => ({
            ...base,
            color: "white",                       // Texto digitado em branco
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",                     // Placeholder em cinza claro
          }),
        }}
        className="w-full"                        // Largura total do container
        options={options}                         // Lista de opções gerada
        onChange={(option) =>                     // Ao mudar, atualiza o estado
          setSelectedKey(option?.value ?? undefined)
        }
        placeholder="Selecione o material..."     // Texto exibido antes da seleção
      />
    </div>
  );
}
