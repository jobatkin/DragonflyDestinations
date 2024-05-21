import {CountryDetails} from "@/types";
import {Box, Typography} from "@mui/material";
import {gluten, montserrat} from "@/app/fonts";

function CountryDetailedInfo(country: CountryDetails) {
    return (
        <Box>
            <h2 className={gluten.className}>{country.name}</h2>
            <Typography
                bgcolor={"rgba(255,255,255,0.1)"}
                color="info.contrastText"
                component="span"
                sx={{display: "inline-block", padding: "5px", borderRadius: "4px", marginRight: '10px'}}
            >
                {country.code}
            </Typography>
            <Typography
                className={montserrat.className}
                color="info.contrastText"
                component="span"
                variant="h5"
                sx={{fontFamily: "inherit"}}
            >
                Officially known as: {country.officialName}
            </Typography>
        </Box>
    );
}
export default CountryDetailedInfo;
