interface AdminFormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  type?: "text" | "textarea" | "number" | "email" | "url";
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
}

export default function AdminFormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  rows = 4,
  required,
  disabled,
  helpText,
}: AdminFormFieldProps) {
  const baseClasses =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]/10 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) =>
            onChange(
              name,
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseClasses}
        />
      )}
      {helpText && (
        <p className="mt-1.5 text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
}
