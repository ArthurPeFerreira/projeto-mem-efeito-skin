"use client";

// Propriedades esperadas pelo componente Input:
interface InputProps {
  placeholder: string; // Texto a ser exibido quando o campo está vazio
  value: number; // Valor atual do input numérico
  setValue: (value: number) => void; // Função para atualizar o valor no componente pai
  title: string; // Título/label que será exibido acima do input
  minimum?: number; // Valor mínimo permitido (opcional)
  maximum?: number; // Valor máximo permitido (opcional)
  step: string; // Incremento/decremento para cada alteração (ex: "0.1")
}

// Componente Input: entrada numérica estilizada e configurável
export default function Input({
  placeholder,
  value,
  setValue,
  title,
  maximum,
  minimum,
  step,
}: InputProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      {/* Label/título do campo */}
      <h2 className="text-white text-lg">{title}</h2>

      {/* Input numérico com estilos dark mode */}
      <input
        required // Campo obrigatório
        className="bg-gray-900 rounded border border-gray-900 text-white p-1 w-full"
        placeholder={placeholder}
        value={value}
        type="number" // Tipo numérico para validação automática
        step={step} // Precisão de incremento
        min={minimum} // Valor mínimo (se definido)
        max={maximum} // Valor máximo (se definido)
        onChange={(e) => {
          // Converte string para number e atualiza o estado
          setValue(Number(e.target.value));
        }}
      />
    </div>
  );
}
