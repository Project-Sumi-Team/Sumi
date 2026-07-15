interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="w-full md:w-80">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
      />
    </div>
  );
}