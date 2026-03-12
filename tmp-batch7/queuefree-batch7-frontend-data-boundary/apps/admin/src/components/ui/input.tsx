type InputProps = {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

export function Input({ label, placeholder, type = 'text' }: InputProps): React.ReactElement {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand"
      />
    </label>
  );
}
