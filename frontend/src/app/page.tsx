import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";
import CalloutModule from "@/components/CalloutModule";
import CountryCard from "@/components/CountryCard";

// Save as app/posts/page.jsx and copy layout.jsx from /about
async function getRandomCountries(limit: number) {
    const res = await fetch(process.env.SERVER + "/api/countries/random/?limit=" + limit);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }
    return res.json();

    //temp data hardcoded for testing

    // return [
    //   {
    //     name: 'Australia',
    //     capital: 'Canberra',
    //     region: 'Oceania',
    //     subregion: 'Australia and New Zealand',
    //     flagImg: 'https://flagcdn.com/au.svg',
    //     population: 25687041,
    //     area: 7692024
    //   }
    // ]
}

export default async function Home() {
  const countries = await getRandomCountries(1);
  const country = countries.data[0];

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
          <Grid container columnSpacing={5}>
            <Grid item md={6} xs={12}>
                <CalloutModule title="Discover your next destination" button1={{text: "Discover", link:'/discover'}}>
                  <p>Browse and filter through hundreds of countries to find your next dream destination.
                    Travel the world from your own home by searching and discovering both little-known and major
                    countries and learning interesting facts. Build up your knowledge and find your new ultimate
                    wishlist of travel locations.
                  </p>
                </CalloutModule>
            </Grid>
            <Grid item md={1} sx={{display: {xs: "none", md: "flex"}}}></Grid>
            <Grid item md={5} xs={12}>
              <CountryCard 
                name={country.name} capital={country.capital} 
                region={country.region} subregion={country.subregion} 
                flagImg={country.flag.svgLink}
                population={country.population} area={country.area}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
}
