import styles from "../../page.module.css";
import { CountryDetails } from "@/types";
import { Button, Container, Grid, Typography, boxClasses } from "@mui/material";
import GoogleMap from "@/components/GoogleMap";
import FlagDetails from "@/components/FlagDetails";
import CountryStatistics from "@/components/CountryStatistics";
import CapitalCity from "@/components/CapitalCity";
import BorderingCountries from "@/components/BorderingCountries";
import CountryDistance from "@/components/CountryDistance";
import { montserrat } from "@/app/fonts";
import ReadMore from "@/components/ReadMore";
import CountryLanguages from "@/components/CountryLanguages";
import CountryCurrencies from "@/components/CountryCurrencies";
import GeographicInfo from "@/components/GeographicInfo";
import UNCountry from "@/components/UNCountry";
import TextHelper from "@/utils/TextHelper";

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
            <Grid container justifyContent="space-between" columnSpacing={{xs: 2, md: 6 }}>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Typography component="h2" variant="h2">{country.name}{" "}
                    <Button href={`/discover/?region=${country.region}`} color="secondary" size="large" sx={{fontWeight: 'bold'}}>{country.region}</Button>
                  </Typography>
                  <Typography
                      bgcolor={"rgba(255,255,255,0.1)"} color="info.contrastText" component="span"
                      sx={{display: "inline-block", padding: "5px", borderRadius: "4px", marginRight: '10px'}}
                  >
                      {country.code}
                  </Typography>
                  <Typography
                      className={montserrat.className} color="info.contrastText" component="span" variant="h5"
                      sx={{fontFamily: "inherit"}}
                  >
                      Officially known as: {country.officialName}
                  </Typography>    
                  <ReadMore text={TextHelper.makeSentence(country.geography)} /> <ReadMore text={TextHelper.makeSentence(country.background)} />                  
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <GoogleMap countryName={country.name} lat={country.latitude} lng={country.longitude} mapLink={country.googleMap}/>
                    <CountryDistance {...localCoords} destCountry={country.name} destLat={country.latitude} destLon={country.longitude}/>
                    <GeographicInfo terrain={country.terrain} naturalResources={country.natural_resources} industries={country.industries}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <CountryStatistics {...country} />
                    <CountryLanguages languages={country.languages} other_languages={country.other_languages}/>
                    <CountryCurrencies currencies={country.currencies} />                    
                    <CapitalCity city={country.capital} timezone={country.capital_tz} coords={[country.latitude, country.longitude]}/>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FlagDetails {...country.flag} name={country.name}/>
                    <Typography variant="h4" component="h4">Bordering Countries</Typography>
                    {borderingCountries && borderingCountries.length > 0 ? 
                      <BorderingCountries borders={borderingCountries} /> :
                      <p>{country.name} has no bordering countries.</p>
                    }
                    <UNCountry unMember={country.unMember} countryName={country.name}/>
                </Grid>
            </Grid>
        </Container>
      </div>
    </main>
  );
}
