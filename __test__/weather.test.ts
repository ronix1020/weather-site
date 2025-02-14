import MockAdapter from "axios-mock-adapter";
import { getWeatherByCity } from "@/api/weather";
import { WeatherResponse } from "@/interfaces/weather";
import { AxiosInstance } from "@/config/AxiosConfig";

describe("Clima API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(AxiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  it("debe de realizar una peticion valida con el clima de una ciudad", async () => {
    const mockWeatherData: WeatherResponse = {
      coord: { lon: -0.1257, lat: 51.5085 },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      base: "stations",
      main: {
        temp: 15.5,
        feels_like: 14.8,
        temp_min: 14.2,
        temp_max: 16.7,
        pressure: 1024,
        humidity: 76,
      },
      visibility: 10000,
      wind: {
        speed: 3.6,
        deg: 250,
      },
      clouds: {
        all: 0,
      },
      dt: 1647356400,
      sys: {
        country: "GB",
        sunrise: 1647324903,
        sunset: 1647367732,
      },
      timezone: 0,
      id: 2643743,
      name: "London",
      cod: 200,
    };

    mock.onAny("/weather").reply((config) => {
      const params = config.params;
      if (
        params.q === "London" &&
        params.appid === process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY &&
        params.units === "metric"
      ) {
        return [200, mockWeatherData];
      }
      return [404, { message: "City not found" }];
    });

    const result = await getWeatherByCity("London");
    expect(result).toEqual(mockWeatherData);
  });

  it("debe manejar el error cuando no se encuentra una ciudad", async () => {
    const errorResponse = {
      cod: 404,
      message: "ciudad no encontrada",
    };

    mock
      .onGet("/weather", { params: { q: "NonExistentCity" } })
      .reply(404, errorResponse);

    await expect(getWeatherByCity("NonExistentCity")).rejects.toThrow();
  });

  it("debe manejar errores de red", async () => {
    mock.onGet("/weather").networkError();

    await expect(getWeatherByCity("London")).rejects.toThrow();
  });
});
