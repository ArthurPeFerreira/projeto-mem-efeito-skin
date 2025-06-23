"use client";

import Select from "react-select";
import React from "react";
import { conductiveMaterials } from "@/lib/materials/conductiveMaterials";

const options = Object.entries(conductiveMaterials).map(([key, mat]) => ({
  value: key,
  label: `${mat.name} (${mat.symbol})`,
}));

interface MaterialSelectorProps {
  selectedKey: string | undefined;
  setSelectedKey: (value: string | undefined) => void;
}

export default function MaterialSelector({
  setSelectedKey,
}: MaterialSelectorProps) {

  return (
    <div className="flex flex-col items-start w-full gap-1">
      <h2 className="text-white text-lg">Selecione o Material:</h2>
      <Select
        id="material-selector"
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
        options={options}
        onChange={(option) => setSelectedKey(option?.value ?? undefined)}
        placeholder="Selecione o material..."
      />
    </div>
  );
}
