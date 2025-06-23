const superscript: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};

export function formatScientific(value: number, precision = 2): string {
  if (value === 0) return "0";

  // Converte pra notação “1.00e-12”
  const [mantissaStr, expoStr] = value.toExponential(precision).split("e");

  // Limpa zeros desnecessários (opcional)
  const mantissa = parseFloat(mantissaStr).toString();

  // Monta o superscrito
  const sup = expoStr
    .split("")
    .map((c) => superscript[c] || "")
    .join("");

  return `${mantissa}×10${sup}`;
}
