import { Box, Typography } from "@mui/material";
import CityLocalTime from "./CityLocalTime";
import CityWeather from "./CityWeather";

function CapitalCity({city, timezone}: {city: string, timezone: string}) {
    return (
        <Box>
            <Typography component="h3" variant="h3">Capital City: {city}</Typography>
            <CityLocalTime timezone={timezone} />       
            <CityWeather city={city} />     
        </Box>
    )    
}

export default CapitalCity;