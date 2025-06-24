"use client";

import dynamic from "next/dynamic"; // Importa dynamic para carregamento dinâmico de componentes sem SSR
import { useEffect, useState } from "react"; // Hooks do React para estado e efeitos colaterais
import Input from "./components/Input"; // Componente de campo numérico reutilizável
import { MaterialParameters } from "./components/MaterialParameters"; // Componente de parâmetros do material
import { MU_0, PARAMS_MIN_VALUE } from "@/lib/constants"; // Constantes físicas e de validação
import CalculedParameters from "./components/CalculedParameters"; // Componente para exibir resultados calculados
import { toast } from "react-toastify"; // Biblioteca para notificações toast
import { toastConfigs } from "@/lib/toastfy/toastfy"; // Configurações padrão de toast
import { formatScientific } from "@/lib/functions/formatScientific"; // Formatação científica de números

// Carrega o componente de seleção de material apenas no cliente (sem SSR)
const MaterialSelector = dynamic(
  () => import("./components/MaterialSelection"),
  { ssr: false }
);

export default function Home() {
  // Estados de entrada
  const [selectedMaterialKey, setSelectedMaterialKey] = useState<string>(); // Material selecionado
  const [frequency, setFrequency] = useState<number>(60); // Frequência (Hz)
  const [temperature, setTemperature] = useState<number>(30); // Temperatura para input
  const [temperatureUsedToCalculate, setTemperatureUsedToCalculate] =
    useState<number>(30); // Temperatura efetivamente usada no cálculo
  const [conductorRadius, setConductorRadius] = useState<number>(1); // Raio do condutor (m)
  const [conductorLength, setConductorLength] = useState<number>(1); // Comprimento do condutor (m)
  const [numberOfWires, setNumberOfWires] = useState<number>(7); // Número de fios no cabo

  // Estados de saída (resultados)
  const [skinEfect, setSkinEfect] = useState<number>(); // Profundidade de penetração (skin depth)
  const [resistivityNewTemperature, setResistivityNewTemperature] =
    useState<number>(); // Resistividade ajustada
  const [Rcc, setRcc] = useState<number>(); // Resistência em CC
  const [Rca, setRca] = useState<number>(); // Resistência em CA

  // Parâmetros do material
  const [relativePermeability, setRelativePermeability] = useState<number>(0); // μᵣ
  const [resistivity, setResistivity] = useState<number>(0); // ρ
  const [alpha, setAlpha] = useState<number>(0); // α₂₀

  // Função para executar o cálculo ao submeter o formulário
  function handleSubmit() {
    // Verifica se um material foi selecionado
    if (!selectedMaterialKey) {
      return;
    }

    // Validação mínima de parâmetros do material
    if (
      relativePermeability < PARAMS_MIN_VALUE ||
      resistivity < PARAMS_MIN_VALUE ||
      alpha < PARAMS_MIN_VALUE
    ) {
      toast.error(
        `Todos os parâmetros devem ser maiores que ${formatScientific(
          PARAMS_MIN_VALUE
        )}`,
        toastConfigs
      );
      return;
    }

    // Define a temperatura efetiva usada no cálculo
    setTemperatureUsedToCalculate(temperature);

    // Cálculo da área do condutor (círculo)
    const conductorArea = Math.PI * conductorRadius * conductorRadius;

    // Resistência à 20 °C
    const resistance20 = (resistivity * 1) / conductorArea;

    // Ajuste da resistência para a temperatura atual
    const resistanceNewTemperature =
      resistance20 * (1 + alpha * (temperature - 20));

    // Cálculo da resistividade ajustada à nova temperatura
    const resistivityNewTemperature =
      (resistanceNewTemperature * conductorArea) / conductorLength;

    // Cálculo da profundidade de penetração (skin depth)
    const skinDepth = Math.sqrt(
      resistivityNewTemperature /
        (Math.PI * frequency * MU_0 * relativePermeability)
    );

    // Fator de cordoamento baseado no número de fios
    let strandingFactor: number;
    if (numberOfWires < 3) {
      strandingFactor = 1.01;
    } else {
      strandingFactor = 1.02;
    }

    // Resistência em corrente alternada (Rca)
    const Rca =
      (resistivityNewTemperature * conductorLength * strandingFactor) /
      (2 * Math.PI * conductorRadius * skinDepth * numberOfWires);

    // Resistência em corrente contínua (Rcc)
    const Rcc =
      (resistivityNewTemperature * conductorLength * strandingFactor) /
      (conductorArea * numberOfWires);

    // Atualiza estados de resultado
    setSkinEfect(skinDepth);
    setResistivityNewTemperature(resistivityNewTemperature);
    setRcc(Rcc);
    setRca(Rca);

    // Notificação de sucesso
    toast.success("Parâmetros Calculados com Sucesso!", toastConfigs);
  }

  // Limpa resultados sempre que qualquer entrada relevante mudar
  useEffect(() => {
    setRca(undefined);
    setRcc(undefined);
  }, [
    selectedMaterialKey,
    frequency,
    temperature,
    conductorLength,
    conductorRadius,
    numberOfWires,
    relativePermeability,
    resistivity,
    alpha,
  ]);

  return (
    <main className="flex flex-col sm:flex-row gap-3 p-4 justify-center items-center w-full">
      {/* Formulário de entrada de parâmetros */}
      <form
        className="bg-gray-800 w-fit h-fit p-2 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-white text-3xl text-center mb-2 p-1">
          Parâmetros de Entrada
        </h1>

        <div className="flex flex-col gap-2">
          {/* Seleção de material condutor */}
          <MaterialSelector
            selectedKey={selectedMaterialKey}
            setSelectedKey={setSelectedMaterialKey}
          />

          {/* Frequência */}
          <Input
            title="Frequência (Hz):"
            placeholder="Digite a Frequência..."
            setValue={setFrequency}
            value={frequency}
            minimum={PARAMS_MIN_VALUE}
            step="any"
          />

          {/* Temperatura */}
          <Input
            title="Temperatura (°C):"
            placeholder="Digite a Temperatura..."
            setValue={setTemperature}
            value={temperature}
            step="any"
          />

          {/* Comprimento */}
          <Input
            title="Comprimento (m):"
            placeholder="Digite o Comprimento..."
            setValue={setConductorLength}
            value={conductorLength}
            minimum={PARAMS_MIN_VALUE}
            step="any"
          />

          {/* Raio */}
          <Input
            title="Raio (m):"
            placeholder="Digite o Raio..."
            setValue={setConductorRadius}
            value={conductorRadius}
            minimum={PARAMS_MIN_VALUE}
            step="any"
          />

          {/* Número de Fios */}
          <Input
            title="Número de Fios:"
            placeholder="Digite o Número de Fios..."
            setValue={setNumberOfWires}
            value={numberOfWires}
            step="1"
            minimum={1}
          />

          {/* Botão de submissão */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4
                       rounded-md shadow-md transition duration-200 ease-in-out cursor-pointer active:scale-95"
          >
            Calcular
          </button>
        </div>
      </form>

      {/* Painel de exibição de parâmetros do material e resultados */}
      <div className="flex flex-col gap-4 justify-between items-center">
        <MaterialParameters
          selectedMaterialKey={selectedMaterialKey}
          alpha={alpha}
          setAlpha={setAlpha}
          resistivity={resistivity}
          setResistivity={setResistivity}
          relativePermeability={relativePermeability}
          setRelativePermeability={setRelativePermeability}
        />
        <CalculedParameters
          skinEfect={skinEfect}
          resistivityNewTemperature={resistivityNewTemperature}
          Rca={Rca}
          Rcc={Rcc}
          temperature={temperatureUsedToCalculate}
        />
      </div>
    </main>
  );
}
