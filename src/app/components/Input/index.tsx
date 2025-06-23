"use client";

interface InputProps {
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
  title: string;
  minimum?: number;
  maximum?: number;
  step:string;
}

export default function Input({
  placeholder,
  value,
  setValue,
  title,
  maximum,
  minimum,
  step
}: InputProps) {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      <h2 className="text-white text-lg">{title}</h2>
      <input
        required
        className="bg-gray-900 rounded border border-gray-900 text-white p-1 w-full"
        placeholder={placeholder}
        value={value}
        type="number"
        step={step}
        min={minimum}
        max={maximum}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
    </div>
  );
}
