"use client";

import { useEffect } from "react";
import { conductiveMaterials } from "@/lib/materials/conductiveMaterials";
import Input from "../Input";
import { PARAMS_MIN_VALUE } from "@/lib/constants";

// Definição das propriedades esperadas pelo componente
interface MaterialParametersProps {
  selectedMaterialKey: string | undefined; // Chave do material selecionado ou undefined se nenhum for selecionado
  relativePermeability: number | undefined; // Valor de permeabilidade relativa atual
  setRelativePermeability: (value: number) => void; // Função para atualizar a permeabilidade relativa
  resistivity: number | undefined; // Valor de resistividade atual
  setResistivity: (value: number) => void; // Função para atualizar a resistividade
  alpha: number | undefined; // Coeficiente de temperatura atual
  setAlpha: (value: number) => void; // Função para atualizar o coeficiente de temperatura
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
  // Obtém o objeto do material a partir da chave selecionada
  const material = selectedMaterialKey
    ? conductiveMaterials[selectedMaterialKey]
    : null;

  // Ao mudar o material, inicializa os valores nos campos de input
  useEffect(() => {
    if (material) {
      setRelativePermeability(material.relativePermeability);
      setResistivity(material.resistivity);
      setAlpha(material.alpha);
    }
  }, [material]); // Executa sempre que 'material' for atualizado

  return (
    <div className="bg-gray-800 w-fit h-fit p-2 rounded-md">
      {/* Título do painel de parâmetros do condutor */}
      <h1 className="text-white text-3xl text-center mb-2 p-1">
        Parâmetros do Condutor
      </h1>

      <div className="flex flex-col gap-2 text-white text-md px-2">
        {material ? (
          // Se houver material selecionado, exibe os inputs com valores iniciais
          <>
            {/* Exibe nome e símbolo do material */}
            <h2 className="text-white text-lg">{`Condutor: ${material.name} (${material.symbol})`}</h2>

            {/* Entrada para permeabilidade relativa */}
            <Input
              title="Permeabilidade Relativa (μᵣ - Adimensional):"
              placeholder="Digite a Permeabilidade Relativa..."
              setValue={setRelativePermeability}
              value={relativePermeability ?? 0.0}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />

            {/* Entrada para resistividade do material */}
            <Input
              title="Resistividade do Material (ρ - Ω·m):"
              placeholder="Digite a Resistividade..."
              setValue={setResistivity}
              value={resistivity ?? 0.0}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />

            {/* Entrada para coeficiente de temperatura */}
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
          // Se nenhum material estiver selecionado, exibe mensagem de instrução
          <span className="text-gray-400">Selecione um material</span>
        )}
      </div>
    </div>
  );
}
