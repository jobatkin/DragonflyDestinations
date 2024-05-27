import {CountryDetails} from "@/types";
import TextHelper from "@/utils/TextHelper";
import { Card, CardContent, Typography } from "@mui/material";

function CountryStatistics(country: CountryDetails) {
    return (
        <Card sx={{ backgroundColor: `info.main`, color: `info.contrastText`, mb: 2 }}>
            <CardContent sx={{'&:last-child': { pb: 1 }}}>
                <Typography variant="h4">Population: {country.population.toLocaleString()}</Typography>
                <Typography sx={{mb: 1, borderBottom: '1px solid rgba(200,200,200,0.3)', pb: 1}}>{TextHelper.makeSentence(country.pop_distribution)}</Typography>

                <Typography variant="h4">Area: {country.area.toLocaleString()} km<sup>2</sup></Typography>
                <Typography variant="body2" color="secondary" sx={{fontStyle: 'italic'}}>{country.comparative_area}</Typography>
                <Typography gutterBottom>{TextHelper.makeSentence(country.geography_note)}</Typography>
            </CardContent>
        </Card>
    );
}
export default CountryStatistics;
