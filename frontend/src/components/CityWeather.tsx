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

async function getWeather(params: string) {

    let weather = {} as WeatherData;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_KEY}${params}&units=metric`;
    try {
         // weather data expires every 60 mins
        let res = await fetch( weatherUrl, { next: { revalidate: 3600 } });
        if (res.ok) weather = await res.json();
    }
    catch (err) {
        console.log(weatherUrl)
        console.log(err)
    }    
    return weather;
}

async function getCityWeather(city: string, coords: number[]) {
    
    let weather = await getWeather(`q=${city}`);
    
    // if city not found, find weather for country coords
    if (!weather.weather) weather = await getWeather(`&lat=${coords[0]}&lon=${coords[1]}`);

    return weather;
}

async function CityWeather({city, coords}: {city: string, coords: number[]}) {
    const weather = await getCityWeather(city, coords);
    console.log(weather);

    if (!weather.weather) return <Typography fontStyle="italic">Weather data unavailable.</Typography>;

    const forecast = weather.weather[0];
    const temps = weather.main;

    return (
        <Box sx={{mb:1}}>
            <Typography variant="h6" component="h6" color="info">
                <img src={`http://openweathermap.org/img/w/${forecast.icon}.png`} style={{verticalAlign: 'middle'}} alt={forecast.main}/>{" "}
                {forecast.main}
            </Typography>
            <Typography color="info" sx={{
                pb:1, borderBottom: '1px solid rgba(20,20,50,0.3)', mb: 1
            }}>{forecast.description} ({weather.clouds.all}% clouds, {weather.wind.speed} km/h winds)</Typography>

            <LocalTemperatures main={temps.temp} min={temps.temp_min} max={temps.temp_max} />

            <div><strong>Humidity:</strong> {temps.humidity}%</div>
        </Box>
    )
}
export default CityWeather;