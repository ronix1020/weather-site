interface SearchCityProps {
  getWeather: (value: React.FormEvent) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  onResetCity: () => void;
  loading: boolean;
}

export const SearchCity = ({
  getWeather,
  city,
  setCity,
  onResetCity,
  loading,
}: SearchCityProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        getWeather(e);
        break;
      case "Escape":
        onResetCity();
        break;
    }
  };

  return (
    <form onSubmit={getWeather} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingresa el nombre de una ciudad"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Cargando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
};
