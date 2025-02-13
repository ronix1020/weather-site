import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5";

export const AxiosInstance = axios.create({
    baseURL,
    params: {
        appid: API_KEY,
        units: "metric",
        lang: "es",
    }
})