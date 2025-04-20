interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  isTextArea?: boolean;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  isTextArea = false,
}: FormFieldProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      {isTextArea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
