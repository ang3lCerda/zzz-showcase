import { useState, useEffect } from "react";

interface SearchBarProps<T> {
  data: T[];
  field: keyof T;
  onResults: (results: T[]) => void;
  placeholder?: string;
}

export default function SearchBar<T>({
  data,
  field,
  onResults,
  placeholder = "Search..."
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      onResults(data);
      return;
    }

    const filtered = data.filter((item) => {
      const value = item[field];

      if (typeof value !== "string") return false;

      return value.toLowerCase().includes(query.toLowerCase());
    });

    onResults(filtered);
  }, [query, data, field, onResults]);

return (
  <div className="relative w-full ">
    <img
      src="https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF"
      alt="search"
      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
    />

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 p-2 rounded-md bg-indigo-950 text-white border border-indigo-700 focus:outline-none"
    />
  </div>
);

}
