import { Grid } from "@mui/material"
import { CountryCardProps } from "./CountryCard"
import SmallCountryCard from "./SmallCountryCard"

function BorderingCountries({borders}: {borders: CountryCardProps[]}) {
    return (
        <Grid container flexDirection="row" flexWrap="wrap" rowSpacing={2}>
            { borders.map(country => (
                <Grid item xs={6} key={country.code}>
                    <SmallCountryCard {...country} colour="extra"/>
                </Grid>
            )) }
        </Grid>
    )
}

export default BorderingCountries