import { useEffect } from "react";
import { conductiveMaterials } from "@/lib/materials/conductiveMaterials";
import Input from "../Input";
import { PARAMS_MIN_VALUE } from "@/lib/constants";

interface MaterialParametersProps {
  selectedMaterialKey: string | undefined;
  relativePermeability: number | undefined;
  setRelativePermeability: (value: number) => void;
  resistivity: number | undefined;
  setResistivity: (value: number) => void;
  alpha: number | undefined;
  setAlpha: (value: number) => void;
}

export function MaterialParameters({
  selectedMaterialKey,
  relativePermeability,
  setRelativePermeability,
  resistivity,
  setResistivity,
  alpha,
  setAlpha,
}: MaterialParametersProps) {
  const material = selectedMaterialKey
    ? conductiveMaterials[selectedMaterialKey]
    : null;

  useEffect(() => {
    if (material) {
      setRelativePermeability(material.relativePermeability);
      setResistivity(material.resistivity);
      setAlpha(material.alpha);
    }
  }, [material]);

  return (
    <div className="bg-gray-800 w-fit h-fit p-2 rounded-md">
      <h1 className="text-white text-3xl text-center mb-2 p-1">
        Parâmetros do Condutor
      </h1>
      <div className="flex flex-col gap-2 text-white text-md px-2">
        {material ? (
          <>
            <h2 className="text-white text-lg">{`Condutor: ${material.name} (${material.symbol})`}</h2>

            <Input
              title="Permeabilidade Relativa (μᵣ - Admensional):"
              placeholder="Digite a Permeabilidade Relativa..."
              setValue={setRelativePermeability}
              value={relativePermeability ?? 0.0}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />
            <Input
              title="Resistividade do Material (ρ - Ω·m):"
              placeholder="Digite a Resistividade..."
              setValue={setResistivity}
              value={resistivity ?? 0.0}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />
            <Input
              title="Coeficiente de Temperatura a 20 °C (α₂₀ - °C⁻¹):"
              placeholder="Digite o Coeficiente de Temperatura..."
              setValue={setAlpha}
              value={alpha ?? 0.0}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />
          </>
        ) : (
          <span className="text-gray-400">Selecione um material</span>
        )}
      </div>
    </div>
  );
}
