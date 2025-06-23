"use client";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import Input from "./components/Input";
import { MaterialParameters } from "./components/MaterialParameters";
import { MU_0, PARAMS_MIN_VALUE } from "@/lib/constants";
import CalculedParameters from "./components/CalculedParameters";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastfy/toastfy";
import { formatScientific } from "@/lib/functions/formatScientific";

const MaterialSelector = dynamic(
  () => import("./components/MaterialSelection"),
  {
    ssr: false,
  }
);

const CurrentTypeSelector = dynamic(
  () => import("./components/CurrentTypeSelection"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [selectedMaterialKey, setSelectedMaterialKey] = useState<string>();
  const [frequency, setFrequency] = useState<number>(60);
  const [temperature, setTemperature] = useState<number>(30);
  const [temperatureUsedToCalculate, setTemperatureUsedToCalculate] =
    useState<number>(30);
  const [conductorRadius, setConductorRadius] = useState<number>(1);
  const [conductorLength, setConductorLength] = useState<number>(1);
  const [numberOfWires, setNumberOfWires] = useState<number>(7);
  const [currentType, setCurrentType] = useState<"AC" | "DC">("AC");

  const [skinEfect, setSkinEfect] = useState<number>();
  const [resistivityNewTemperature, setResistivityNewTemperature] =
    useState<number>();
  const [Rcc, setRcc] = useState<number>();
  const [Rca, setRca] = useState<number>();
  const [currentTypeSelected, setCurrentTypeSelected] = useState<"AC" | "DC">();

  const [relativePermeability, setRelativePermeability] = useState<number>(0);
  const [resistivity, setResistivity] = useState<number>(0);
  const [alpha, setAlpha] = useState<number>(0);

  function handleSubmit() {
    if (!selectedMaterialKey) {
      return;
    }

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

    setTemperatureUsedToCalculate(temperature);

    const conductorArea = Math.PI * conductorRadius * conductorRadius;

    const resistance20 = (resistivity * 1) / conductorArea;
    const resistanceNewTemperature =
      resistance20 * (1 + alpha * (temperatureUsedToCalculate - 20));

    const resistivityNewTemperature =
      (resistanceNewTemperature * conductorArea) / conductorLength;

    const skinDepth = Math.sqrt(
      resistivityNewTemperature /
        (Math.PI * frequency * MU_0 * relativePermeability)
    );

    let strandingFactor: number;

    if (numberOfWires < 3) {
      strandingFactor = 1.01;
    } else {
      strandingFactor = 1.02;
    }

    const Rca =
      (resistivityNewTemperature * conductorLength * strandingFactor) /
      (2 * Math.PI * conductorRadius * skinDepth * numberOfWires);

    const Rcc =
      (resistivityNewTemperature * conductorLength * strandingFactor) /
      (conductorArea * numberOfWires);

    setCurrentTypeSelected(currentType);
    setSkinEfect(skinDepth);
    setResistivityNewTemperature(resistivityNewTemperature);
    setRcc(Rcc);
    setRca(Rca);

    toast.success("Parâmetros Calculados com Sucesso!", toastConfigs);
  }

  useEffect(() => {
    setRca(undefined);
    setRcc(undefined);
  }, [
    currentType,
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
    <main className="flex flex-col sm:flex-row gap-3 p-4 justify-center items-center w-full ">
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
          <CurrentTypeSelector
            currentType={currentType}
            setCurrentType={setCurrentType}
          />
          <MaterialSelector
            selectedKey={selectedMaterialKey}
            setSelectedKey={setSelectedMaterialKey}
          />
          {currentType === "AC" && (
            <Input
              title="Frequência (Hz):"
              placeholder="Digite a Frequência..."
              setValue={setFrequency}
              value={frequency}
              minimum={PARAMS_MIN_VALUE}
              step="any"
            />
          )}

          <Input
            title="Temperatura (°C):"
            placeholder="Digite a Temperatura..."
            setValue={setTemperature}
            value={temperature}
            step="any"
          />
          <Input
            title="Comprimento (m):"
            placeholder="Digite o Comprimento..."
            setValue={setConductorLength}
            value={conductorLength}
            minimum={PARAMS_MIN_VALUE}
            step="any"
          />

          <Input
            title="Raio (m):"
            placeholder="Digite o Raio..."
            setValue={setConductorRadius}
            value={conductorRadius}
            minimum={PARAMS_MIN_VALUE}
            step="any"
          />
          <Input
            title="Número de Fios:"
            placeholder="Digite o Número de Fios..."
            setValue={setNumberOfWires}
            value={numberOfWires}
            step="1"
            minimum={1}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 
            rounded-md shadow-md transition duration-200 ease-in-out cursor-pointer active:scale-95"
          >
            Calcular
          </button>
        </div>
      </form>
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
          currentType={currentTypeSelected}
          Rca={Rca}
          Rcc={Rcc}
          temperature={temperatureUsedToCalculate}
        />
      </div>
    </main>
  );
}
