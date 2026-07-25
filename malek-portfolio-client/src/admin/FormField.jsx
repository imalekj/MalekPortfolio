const inputClass =
  "w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent";

export function TextField({ label, as = "input", className = "", ...rest }) {
  const Tag = as;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-secondary">{label}</span>
      <Tag className={`${inputClass} ${className}`} {...rest} />
    </label>
  );
}

export function SelectField({ label, options, className = "", ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-secondary">{label}</span>
      <select className={`${inputClass} ${className}`} {...rest}>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({ label, ...rest }) {
  return (
    <label className="flex items-center gap-2 text-sm text-secondary">
      <input type="checkbox" className="h-4 w-4 accent-[#C5A059]" {...rest} />
      {label}
    </label>
  );
}
