import { Box, Typography } from "@mui/material";
import LocalTemperatures from "./LocalTemperatures";

interface WeatherType {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface WeatherData {
    coord: { lon: number, lat: number },
    weather: WeatherType[],
    base: string,
    main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number },
    visibility: number,
    wind: { speed: number, deg: number },
    clouds: { all: number },
    dt: number,
    sys: { type: number, id: number, country: string, sunrise: number, sunset: number },
    timezone: number,
    id: number,
    name: string,
    cod: number    
}

async function getCityWeather(city: string) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.OPEN_WEATHER_KEY}&q=${city}&units=metric`,
        { next: { revalidate: 3600 } } // weather data expires every 60 mins
    );

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }

    const weather = await res.json();
    return weather as WeatherData;
}

async function CityWeather({city}: {city: string}) {
    const weather = await getCityWeather(city);
    console.log(weather);
    const forecast = weather.weather[0];
    const temps = weather.main;

    return (
        <Box>
            <div><img src={`http://openweathermap.org/img/w/${forecast.icon}.png`} style={{verticalAlign: 'middle'}} alt={forecast.main}/> {forecast.main}</div>
            <p>{forecast.description} ({weather.clouds.all}% clouds, {weather.wind.speed} km/h winds)</p>

            <LocalTemperatures main={temps.temp} min={temps.temp_min} max={temps.temp_max} />

            <div>Humidity: {temps.humidity}%</div>
        </Box>
    )
}
export default CityWeather;