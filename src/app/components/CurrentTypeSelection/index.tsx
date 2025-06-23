"use client";

import Select from "react-select";
import React from "react";

// Props que o componente espera: o tipo de corrente atual e a função para alterar esse tipo
interface CurrentTypeSelectorProps {
  currentType: "AC" | "DC"; // Estado atual: AC ou DC
  setCurrentType: (value: "AC" | "DC") => void; // Callback para atualizar o estado externo
}

// Opções disponíveis no seletor, com valor e label amigável
const currentOptions = [
  { value: "AC", label: "Corrente Alternada (AC)" },
  { value: "DC", label: "Corrente Contínua (DC)" },
];

// Componente principal: dropdown estilizado para escolher o tipo de corrente
export default function CurrentTypeSelector({
  currentType,
  setCurrentType,
}: CurrentTypeSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      {/* Título explicativo */}
      <h2 className="text-white text-lg">Tipo de Corrente:</h2>

      {/* React-Select customizado com tema escuro */}
      <Select
        id="current-type-selector"
        required // Campo obrigatório
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#101828", // Fundo do select
            borderColor: "#101828", // Borda invisível em tom escuro
            color: "white", // Texto branco para contraste
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1f2937", // Fundo do dropdown
            color: "white", // Texto branco
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#374151" : "#1f2937", // Destaque ao passar o mouse
            color: "white",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white", // Valor selecionado em branco
          }),
          input: (base) => ({
            ...base,
            color: "white", // Entrada digitada em branco
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af", // placeholder em tom cinza claro
          }),
        }}
        className="w-full" // Largura total do container
        options={currentOptions} // As opções definidas acima
        value={currentOptions.find((opt) => opt.value === currentType)} // Sincroniza seleção com estado externo
        onChange={(option) => {
          // Quando o usuário escolher, atualizamos o estado lá fora
          if (option) setCurrentType(option.value as "AC" | "DC");
        }}
        placeholder="Escolha o tipo de corrente..." // Texto inicial
      />
    </div>
  );
}
