type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  required?: boolean;
};

export default function TextInput({ label, value, setValue, type = "text", required = false }: Props) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border rounded-md p-3 peer w-full ${!value && "focus:hover:bg-white hover:bg-slate-50"} transition-all`}
        required={required}
      />
      <span
        className={`absolute left-2 text-gray-400 transition-all ${
          !value.length ? "top-3" : "p-1 text-xs -top-3 bg-white"
        } peer-focus:p-1 peer-focus:text-blue-500 peer-focus:text-xs peer-focus:-top-3 peer-focus:bg-white`}
      >
        {label}
      </span>
    </div>
  );
}
