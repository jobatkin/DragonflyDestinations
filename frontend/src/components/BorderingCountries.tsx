import { Grid } from "@mui/material"
import CountryCard, { CountryCardProps } from "./CountryCard"

function BorderingCountries({borders}: {borders: CountryCardProps[]}) {
    return (
        <Grid container flexDirection="column">
            { borders.map(country => (
                <Grid item xs={12}>
                    <CountryCard {...country}/>
                </Grid>
            )) }
        </Grid>
    )
}

export default BorderingCountries