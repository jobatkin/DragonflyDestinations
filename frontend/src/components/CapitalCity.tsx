import { Box, Card, CardContent, Typography } from "@mui/material";
import CityLocalTime from "./CityLocalTime";
import CityWeather from "./CityWeather";

function CapitalCity({city, timezone}: {city: string, timezone: string}) {
    return (
        <Card sx={{mb: 2, backgroundColor: `secondary.main`, color: `secondary.contrastText`}} variant="outlined">
            <CardContent sx={{'&:last-child': { pb: 1 }}}>
                <Typography component="h3" variant="h3">Capital City: {city}</Typography>
                <CityLocalTime timezone={timezone} />       
                <CityWeather city={city} />    
            </CardContent> 
        </Card>
    )    
}

export default CapitalCity;