import {CountryDetails} from "@/types";
import {Box, Typography} from "@mui/material";
import {gluten, montserrat} from "@/app/fonts";
import CountryLanguages from "./CountryLanguages";
import CountryCurrencies from "./CountryCurrencies";
import Link from "next/link";

function CountryDetailedInfo(country: CountryDetails) {
    return (
        <Box>
            <Typography component="h2" variant="h2">{country.name}</Typography>
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
            <CountryLanguages languages={country.languages} />
            <CountryCurrencies currencies={country.currencies} />
        </Box>
    );
}
export default CountryDetailedInfo;
