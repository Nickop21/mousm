import { useState } from "react";

interface WeatherState {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

type WeatherData = WeatherState | undefined;

function useFetch() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = "https://www.weatherunion.com/gw/weather/external/v0/";

  async function fetchWeatherData(locality_id: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${baseUrl}get_locality_weather_data?locality_id=${locality_id}`,
        {
          headers: {
            "X-Zomato-Api-Key": process.env.NEXT_PUBLIC_X_ZOMATO_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setWeatherData(data.locality_weather_data);
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return { weatherData, loading, error, fetchWeatherData };
}

export default useFetch;
