import { AxiosInstance } from "@/config/AxiosConfig";
import { WeatherResponse } from "@/interfaces/weather";

export const getWeatherByCity = async (city: string) => {
    const { data } = await AxiosInstance.get<WeatherResponse>("/weather", {
        params: {
            q: city,
        }
    });
    return data;
}