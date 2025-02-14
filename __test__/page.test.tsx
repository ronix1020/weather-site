import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { getWeatherByCity } from "@/api/weather";

import App from "@/app/page";

jest.mock("@/api/weather");

const mockWeatherData = {
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

describe("Componente App", () => {
  beforeEach(() => {
    (getWeatherByCity as jest.Mock).mockClear();
  });

  it("debería renderizar el campo de entrada, botón de búsqueda e imagen inicial", () => {
    render(<App />);

    expect(
      screen.getByPlaceholderText("Ingresa el nombre de una ciudad")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();

    const cloudyIcon = screen.getByAltText("cloudy-icon");
    expect(cloudyIcon).toBeInTheDocument();
    expect(cloudyIcon.tagName).toBe("IMG");
    expect(cloudyIcon).toHaveAttribute("width", "128");
    expect(cloudyIcon).toHaveAttribute("height", "128");
  });

  it("debería manejar la entrada de ciudad y el envío del formulario", async () => {
    (getWeatherByCity as jest.Mock).mockResolvedValueOnce(mockWeatherData);

    render(<App />);

    const input = screen.getByPlaceholderText(
      "Ingresa el nombre de una ciudad"
    );
    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    expect(button).toHaveTextContent("Cargando...");

    await waitFor(() => {
      expect(getWeatherByCity).toHaveBeenCalledWith("London");
      expect(screen.getByText("London, GB")).toBeInTheDocument();
      expect(screen.getByText(/\d+°C/)).toBeInTheDocument();
      expect(button).toHaveTextContent("Buscar");

      // Verify temperature icon
      const tempIcon = screen.getByAltText(
        /Weather icon showing warm temperature/
      );
      expect(tempIcon).toBeInTheDocument();
      expect(tempIcon).toHaveAttribute("width", "32");
      expect(tempIcon).toHaveAttribute("height", "32");
      expect(tempIcon).toHaveAttribute("src");

      // Verify weather condition icon
      const weatherIcon = screen.getByAltText("weather-icon");
      expect(weatherIcon).toBeInTheDocument();
      expect(weatherIcon).toHaveAttribute("width", "64");
      expect(weatherIcon).toHaveAttribute("height", "64");
      expect(weatherIcon).toHaveAttribute("src");

      // Verify humidity icon
      const humidityIcon = screen.getByAltText("humidity-icon");
      expect(humidityIcon).toBeInTheDocument();
      expect(humidityIcon).toHaveAttribute("width", "32");
      expect(humidityIcon).toHaveAttribute("height", "32");

      // Verify wind icon
      const windIcon = screen.getByAltText("windy-icon");
      expect(windIcon).toBeInTheDocument();
      expect(windIcon).toHaveAttribute("width", "32");
      expect(windIcon).toHaveAttribute("height", "32");
    });
  });

  it("debería manejar entrada de ciudad vacía", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: "Buscar" });
    fireEvent.click(button);

    expect(getWeatherByCity).not.toHaveBeenCalled();
  });

  it("debería manejar error de API", async () => {
    (getWeatherByCity as jest.Mock).mockRejectedValueOnce(
      new Error("API Error")
    );

    render(<App />);

    const input = screen.getByPlaceholderText(
      "Ingresa el nombre de una ciudad"
    );
    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.change(input, { target: { value: "InvalidCity" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Ha ocurrido un error al obtener el clima")
      ).toBeInTheDocument();
      expect(button).toHaveTextContent("Buscar");
    });
  });

  it("debería manejar error de ciudad no encontrada", async () => {
    (getWeatherByCity as jest.Mock).mockResolvedValueOnce({ cod: 404 });

    render(<App />);

    const input = screen.getByPlaceholderText(
      "Ingresa el nombre de una ciudad"
    );
    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.change(input, { target: { value: "NonExistentCity" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Ciudad no encontrada")).toBeInTheDocument();
      expect(button).toHaveTextContent("Buscar");
    });
  });

  it("debería manejar eventos del teclado", async () => {
    (getWeatherByCity as jest.Mock).mockResolvedValueOnce(mockWeatherData);

    render(<App />);

    const input = screen.getByPlaceholderText(
      "Ingresa el nombre de una ciudad"
    );

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(getWeatherByCity).toHaveBeenCalledWith("London");
    });

    fireEvent.keyDown(input, { key: "Escape" });

    expect(input).toHaveValue("");
  });

  it('debería reiniciar el formulario al hacer clic en "Buscar otra ciudad"', async () => {
    (getWeatherByCity as jest.Mock).mockResolvedValueOnce(mockWeatherData);

    render(<App />);

    const input = screen.getByPlaceholderText(
      "Ingresa el nombre de una ciudad"
    );
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await waitFor(() => {
      expect(screen.getByText("London, GB")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Buscar otra ciudad"));

    expect(input).toHaveValue("");
    expect(screen.queryByText("London, GB")).not.toBeInTheDocument();
  });
});
