import { Box, Typography } from "@mui/material";

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
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=0c2e3284fcc8a15f0f039eba6a9703c1&q=${city}&units=metric`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }

    const weather = await res.json();
    return weather as WeatherData;
}

async function CityWeather({city, country}: {city: string, country: string}) {
    const weather = await getCityWeather(city);
    const localTime = new Date(weather.dt*1000 + (weather.timezone*1000));
    const formattedHr = localTime.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const formattedMin = localTime.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const tzHours = weather.timezone/3600;
    const tzOffset = (tzHours >= 0 ? '+' : '') + tzHours.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const options = {
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        timeZone: city + '/' + country
      };
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
      
      const parts = dateTimeFormat.formatToParts(localTime);
      console.log(parts)

    return (
        <Box>
            <Typography component="h3">Weather for {city}</Typography>
            Local time: {formattedHr}:{formattedMin} UTC{weather.timezone/3600} 
            {new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(localTime)}

        </Box>
    )
}
export default CityWeather;