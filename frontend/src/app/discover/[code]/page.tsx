import styles from "../../page.module.css";
import { CountryDetails } from "@/types";
import { Container, Grid } from "@mui/material";
import GoogleMap from "@/components/GoogleMap";
import FlagDetails from "@/components/FlagDetails";
import CountryDetailedInfo from "@/components/CountryDetailedInfo";
import CityWeather from "@/components/CityWeather";

// get the complete details for the country with the given code from the API
async function getCountryDetails(code: string) {
  const res = await fetch(process.env.SERVER + "/api/countries/" + code);

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
     throw new Error("Failed to fetch country " + code);
  }

  const json = await res.json();
  return json.data as CountryDetails;
}

export default async function CountryDetailsPage({ params }: { params: { code: string } }) {

  const country = await getCountryDetails(params.code);
  console.log(country);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" columnSpacing={10}>
                <Grid item xs={12} md={5}>
                    <GoogleMap countryName={country.name} />
                    <FlagDetails {...country.flag} name={country.name}/>
                </Grid>
                <Grid item xs={12} md={7}>
                    <CountryDetailedInfo {...country} />
                    <CityWeather city={country.capital} country={country.name}/>
                </Grid>
            </Grid>
        </Container>
      </div>
    </main>
  );
}
