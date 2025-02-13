'use client';

import { useState } from 'react';

import Image from 'next/image';

import { getWeatherByCity } from '@/api/weather';

import warm from '@/assets/images/warm.png'
import hot from '@/assets/images/hot.png'
import cold from '@/assets/images/cold.png'
import windy from '@/assets/images/windy.png'
import humidity from '@/assets/images/humidity.png'

import { WeatherResponse } from '@/interfaces/weather';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      const data = await getWeatherByCity(city);

      console.log('data', data)

      if (data.cod === 404) {
        setError('City not found');
        setWeather(undefined);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.log(err)
      setError('Failed to fetch weather data');
      setWeather(undefined);
    } finally {
      setLoading(false);
    }
  };

  const onResetCity = () => {
    setCity('');
    setWeather(undefined);
    setError('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          getWeather(e);
          break;
        case 'Escape':
          onResetCity();
          break;
      }
  }

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Simple Clima</h1>
        
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
              {loading ? 'Cargando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {weather !== undefined && (
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
              <div className="flex flex-row items-center my-2 justify-center gap-2">
                <Image 
                  src={weather.main.temp > 25 ? hot.src : weather.main.temp > 15 ? warm.src : cold.src} 
                  alt={`Weather icon showing ${weather.main.temp > 25 ? 'hot' : weather.main.temp > 15 ? 'warm' : 'cold'} temperature`}
                  width={32}
                />
                <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" />
                <p className="text-lg capitalize">{weather.weather[0].description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Image src={windy.src} width={32} className='py-2' alt="windy-icon" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Humedad</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Image src={humidity.src} width={32} className='py-2' alt="humidity-icon" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Velocidad del viento</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
            <button 
            onClick={onResetCity}
            className="bg-blue-500 rounded-md">
              <p className='text-white font-bold p-4'>
                Buscar otra ciudad
              </p>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
