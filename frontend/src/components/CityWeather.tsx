import { Box, Typography } from "@mui/material";
import CityLocalTime from "./CityLocalTime";

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
        { next: { revalidate: 600 } } // weather data (including local time) expires every 10 mins
    );

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }

    const weather = await res.json();
    return weather as WeatherData;
}

async function CityWeather({city, timezone}: {city: string, timezone: string}) {
    const weather = await getCityWeather(city);

    return (
        <Box>
            <Typography component="h3">Weather for {city}</Typography>
            <CityLocalTime timezone={timezone} timestamp={weather.dt} tz_offset_hours={weather.timezone} />

        </Box>
    )
}
export default CityWeather;