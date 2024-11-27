"use server";

import {CountryWithFlag} from "@/types";
import styles from "../page.module.css";
import CountryCard from "@/components/CountryCard";
import {Box, Container, Grid, Typography} from "@mui/material";
import RefreshButton from "@/components/RefreshButton";
import CookieHelper from "@/utils/CookieHelper";

// get the given number of random countries from backend API
async function getRandomCountries(limit: number) {

    const includeFavourites = CookieHelper.favouriteParam().replace('?','&');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/countries/random/?limit=${limit}${includeFavourites}`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch countries");
    }

    const json = await res.json();
    const countries = json.data as CountryWithFlag[];
    return countries.map((country) => ({...country, flagImg: country.flag.svgLink}));
}

export default async function Surprise() {
    const surpriseCountries = await getRandomCountries(3);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Container maxWidth="xl">
                    <Typography variant="h2" component="h2"> Surprise </Typography>
                    <p> Can&apos;t decide where to start your journey of destination discovery? Why not start right here? </p>

                    <Grid container columnSpacing={6} rowSpacing={4} sx={{my: 2}}>
                        {surpriseCountries.map((country) => (
                            <Grid item xs={12} sm={6} md={4} key={country.code}>
                                <CountryCard {...country} colour="info" single={false} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{textAlign: "center"}}>
                        <RefreshButton buttonText="Show me more!" buttonSize="large" />
                    </Box>
                </Container>
            </div>
        </main>
    );
}
