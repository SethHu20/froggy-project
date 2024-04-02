"use client";

export default function SettingsCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div className="flex flex-row items-center p-3 even:bg-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 h-6 w-6 accent-sky-300"
        title={label}
      />
      <label className="w-max">{label}</label>
    </div>
  );
}
