import Image from "next/image";

import hot from "@/assets/images/hot.png";
import warm from "@/assets/images/warm.png";
import cold from "@/assets/images/cold.png";
import windy from "@/assets/images/windy.png";
import humidity from "@/assets/images/humidity.png";
import { WeatherResponse } from "@/interfaces/weather";

interface WeatherProps {
    weather: WeatherResponse
    onResetCity: () => void
}

export const Weather = ({
    weather,
    onResetCity,
}: WeatherProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="flex flex-row items-center my-2 justify-center gap-2">
                <Image
                  src={
                    weather.main.temp > 25
                      ? hot.src
                      : weather.main.temp > 15
                      ? warm.src
                      : cold.src
                  }
                  alt={`Weather icon showing ${
                    weather.main.temp > 25
                      ? "hot"
                      : weather.main.temp > 15
                      ? "warm"
                      : "cold"
                  } temperature`}
                  width={32}
                  height={32}
                />
                <p className="text-4xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  width={64}
                  height={64}
                />
                <p className="text-lg capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Image
                  src={humidity.src}
                  width={32}
                  height={32}
                  className="py-2"
                  alt="windy-icon"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Humedad
                </p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Image
                  src={windy.src}
                  width={32}
                  height={32}
                  className="py-2"
                  alt="humidity-icon"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Velocidad del viento
                </p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
            <button onClick={onResetCity} className="bg-blue-500 rounded-md">
              <p className="text-white font-bold p-4">Buscar otra ciudad</p>
            </button>
          </div>
    )
}