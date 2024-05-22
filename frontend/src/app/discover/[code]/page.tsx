import styles from "../../page.module.css";
import { CountryDetails } from "@/types";
import { Container, Grid, Typography, boxClasses } from "@mui/material";
import GoogleMap from "@/components/GoogleMap";
import FlagDetails from "@/components/FlagDetails";
import CountryDetailedInfo from "@/components/CountryDetailedInfo";
import CityWeather from "@/components/CityWeather";
import CapitalCity from "@/components/CapitalCity";
import BorderingCountries from "@/components/BorderingCountries";
import CountryDistance from "@/components/CountryDistance";

// get the complete details for the country with the given code from the API
async function getCountryDetails(code: string) {
  const res = await fetch(process.env.SERVER + "/api/countries/" + code,
    { next: { revalidate: 1800 } } // country data expires every 30 mins during testing
  );

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
     throw new Error("Failed to fetch country " + code);
  }

  const json = await res.json();
  return json.data as CountryDetails;
}

async function getLocalCoords() {

    const res = await fetch(`${process.env.GEOAPIFY_URL}ipinfo?apiKey=${process.env.GEOAPIFY_KEY}`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to determine user location");
    }
    const json = await res.json();
    return {lat: json.location.latitude, lon: json.location.longitude, homeCountry: json.country.name};
}

export default async function CountryDetailsPage({ params }: { params: { code: string } }) {

  const country = await getCountryDetails(params.code);
  const localCoords = await getLocalCoords();
  const borderingCountries = country.borders?.map(bc => ({...bc, flagImg: bc.flag.svgLink})) 
  console.log(country);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" columnSpacing={6}>
                <Grid item xs={12} md={6} lg={5}>
                    <GoogleMap countryName={country.name} lat={country.latitude} lng={country.longitude} mapLink={country.googleMap}/>
                    <CountryDistance {...localCoords} destCountry={country.name} destLat={country.latitude} destLon={country.longitude}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <CountryDetailedInfo {...country} />
                    <CapitalCity city={country.capital} timezone={country.capital_tz} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FlagDetails {...country.flag} name={country.name}/>
                    <Typography variant="h4" component="h4">Bordering Countries</Typography>
                    {borderingCountries && borderingCountries.length > 0 ? 
                      <BorderingCountries borders={borderingCountries} /> :
                      <p>{country.name} has no bordering countries.</p>
                    }
                </Grid>
            </Grid>
        </Container>
      </div>
    </main>
  );
}
