import styles from "../../page.module.css";
import { CountryDetails } from "@/types";
import { Container, Grid } from "@mui/material";
import GoogleMap from "@/components/GoogleMap";
import FlagDetails from "@/components/FlagDetails";
import CountryDetailedInfo from "@/components/CountryDetailedInfo";
import CityWeather from "@/components/CityWeather";
import CapitalCity from "@/components/CapitalCity";

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

export default async function CountryDetailsPage({ params }: { params: { code: string } }) {

  const country = await getCountryDetails(params.code);
  console.log(country);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" columnSpacing={6}>
                <Grid item xs={12} md={6} lg={5}>
                    <GoogleMap countryName={country.name} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <CountryDetailedInfo {...country} />
                    <CapitalCity city={country.capital} timezone={country.capital_tz} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FlagDetails {...country.flag} name={country.name}/>
                </Grid>
            </Grid>
        </Container>
      </div>
    </main>
  );
}
