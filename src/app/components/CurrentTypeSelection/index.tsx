"use client";

import Select from "react-select";
import React from "react";

interface CurrentTypeSelectorProps {
  currentType: "AC" | "DC";
  setCurrentType: (value: "AC" | "DC") => void;
}

const currentOptions = [
  { value: "AC", label: "Corrente Alternada (AC)" },
  { value: "DC", label: "Corrente Contínua (DC)" },
];

export default function CurrentTypeSelector({
  currentType,
  setCurrentType,
}: CurrentTypeSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      <h2 className="text-white text-lg">Tipo de Corrente:</h2>
      <Select
        id="current-type-selector"
        required
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#101828",
            borderColor: "#101828",
            color: "white",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1f2937",
            color: "white",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#374151" : "#1f2937",
            color: "white",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",
          }),
          input: (base) => ({
            ...base,
            color: "white",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af", // text-gray-400
          }),
        }}
        className="w-full"
        options={currentOptions}
        value={currentOptions.find((opt) => opt.value === currentType)}
        onChange={(option) => {
          if (option) setCurrentType(option.value as "AC" | "DC");
        }}
        placeholder="Escolha o tipo de corrente..."
      />
    </div>
  );
}
