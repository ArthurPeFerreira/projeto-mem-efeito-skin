export type MaterialProps = {
  name: string;
  symbol: string;
  relativePermeability: number;
  resistivity: number; // ρ (Ω·m)
  alpha: number; // α (°C⁻¹)
};

export const conductiveMaterials: Record<string, MaterialProps> = {
  silver: {
    name: "Prata",
    symbol: "Ag",
    relativePermeability: 0.99998,
    resistivity: 0.000000016,
    alpha: 0.0038,
  },
  copper: {
    name: "Cobre",
    symbol: "Cu",
    relativePermeability: 0.999994,
    resistivity: 0.000000017,
    alpha: 0.0039,
  },
  gold: {
    name: "Ouro",
    symbol: "Au",
    relativePermeability: 1.0,
    resistivity: 0.000000024,
    alpha: 0.0034,
  },
  aluminum: {
    name: "Alumínio",
    symbol: "Al",
    relativePermeability: 1.000022,
    resistivity: 0.000000028,
    alpha: 0.004,
  },
  tungsten: {
    name: "Tungstênio",
    symbol: "W",
    relativePermeability: 1.0,
    resistivity: 0.00000005,
    alpha: 0.0052,
  },
  nickel: {
    name: "Níquel",
    symbol: "Ni",
    relativePermeability: 600,
    resistivity: 0.000000078,
    alpha: 0.006,
  },
  iron: {
    name: "Ferro",
    symbol: "Fe",
    relativePermeability: 200,
    resistivity: 0.0000001,
    alpha: 0.0055,
  },
  constantan: {
    name: "Constantan",
    symbol: "CuNi",
    relativePermeability: 1.0,
    resistivity: 0.0000005,
    alpha: 0.000008,
  },
};
