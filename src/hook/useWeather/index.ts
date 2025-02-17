import { getWeatherByCity } from "@/api/weather";
import { WeatherResponse } from "@/interfaces/weather";
import { useState } from "react";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | undefined>();
  const [city, setCity] = useState("");

  const handleWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(city.trim());

      if (data.cod === 404) {
        setError("Ciudad no encontrada");
        setWeather(undefined);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.log(err);
      setError("Ha ocurrido un error al obtener el clima");
      setWeather(undefined);
    } finally {
      setLoading(false);
    }
  };

  const onResetCity = () => {
    setCity("");
    setWeather(undefined);
    setError("");
  };

  return {
    loading,
    error,
    weather,
    city,
    setCity,
    handleWeather,
    onResetCity
  };
};
