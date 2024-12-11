"use client";

export default function SettingsDropdown({
  label,
  options,
  onChange,
  defaultValue,
}: {
  label: string;
  options: [string, string][];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}): JSX.Element {
  return (
    <div className="flex flex-col items-start p-3 even:bg-slate-600">
      <label className="w-max">{label}</label>
      <select
        title={label}
        onChange={onChange}
        className="bg-slate-800 p-3 rounded-md"
        value={defaultValue}
      >
        {options.map(([label, value], i) => (
          <option
            key={i}
            value={value}
            className="bg-slate-800"
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
