"use client";

import { useWeather } from "@/hook/useWeather";

import { Header } from "@/components/Header";
import { Weather } from "@/components/Weather";
import { SearchCity } from "@/components/SearchCity";

export default function App() {
  const { 
    onResetCity, 
    handleWeather, 
    weather, 
    city, 
    setCity, 
    loading, 
    error 
  } = useWeather();

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-md mx-auto space-y-8">
        <Header />

        <SearchCity
          city={city}
          setCity={setCity}
          onResetCity={onResetCity}
          getWeather={handleWeather}
          loading={loading}
        />

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {weather !== undefined && (
          <Weather weather={weather} onResetCity={onResetCity} />
        )}
      </main>
    </div>
  );
}
