"use client";

import React from "react";

interface CalculedParametersProps {
  skinEfect: number | undefined;
  resistivityNewTemperature: number | undefined;
  Rcc: number | undefined;
  Rca: number | undefined;
  temperature: number;
}

import { formatScientific } from "@/lib/functions/formatScientific";

export default function CalculedParameters({
  skinEfect,
  resistivityNewTemperature,
  Rcc,
  Rca,
  temperature,
}: CalculedParametersProps) {
  return (
    <div className="bg-gray-800 w-fit h-fit p-2 rounded-md text-nowrap">
      <h1 className="text-white text-3xl text-center mb-2 p-1">
        Parâmetros Calculados
      </h1>
      {skinEfect && resistivityNewTemperature && Rcc && Rca ? (
        <div className="flex flex-col gap-2 text-white text-xl p-2 items-center">
          <div>
            <strong>Resistividade a {temperature} °C (ρ):</strong>{" "}
            {formatScientific(resistivityNewTemperature)} Ω·m
          </div>
          <div>
            <strong>Efeito Pelicular a {temperature} °C (𝜹):</strong>{" "}
            {formatScientific(skinEfect)} Ω·m
          </div>
          <div>
            <strong>
              Resistência em Corrente Contínua a {temperature} °C (R
              <sub>cc</sub>):
            </strong>{" "}
            {formatScientific(Rcc, 4)} Ω
          </div>
          <div>
            <strong>
              Resistência em Corrente Alternada a {temperature} °C (R
              <sub>ca</sub>):
            </strong>{" "}
            {formatScientific(Rca, 4)} Ω
          </div>
        </div>
      ) : (
        <span className="text-gray-400">Calcule os Parâmetros</span>
      )}
    </div>
  );
}
