const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "39695d87b59128bb19093c54c3685d3f";

export async function fetchWeatherData(lat, lon) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    // Check if responses are ok
    if (!weatherResponse.ok || !forecastResponse.ok) {
      const errorResponse = !weatherResponse.ok
        ? weatherResponse
        : forecastResponse;
      throw new Error(
        `API Error: ${errorResponse.status} - ${errorResponse.statusText}`
      );
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Check if the API returned an error message
    if (weatherData.cod && weatherData.cod !== 200) {
      throw new Error(weatherData.message || "Weather API error");
    }
    if (forecastData.cod && forecastData.cod !== "200") {
      throw new Error(forecastData.message || "Forecast API error");
    }

    return [weatherData, forecastData];
  } catch (error) {
    // Handle network errors
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    // Handle rate limiting
    if (error.message.includes("429")) {
      throw new Error("Too many requests - please try again later");
    }
    // Re-throw the error with a more specific message
    throw new Error(`Weather update failed: ${error.message}`);
  }
}
