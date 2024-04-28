import HomeSection from "@/components/HomeSection";
import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";

// Save as app/posts/page.jsx and copy layout.jsx from /about
async function getRandomCountries(limit: number) {
    const res = await fetch(process.env.SERVER + "/api/countries/random/?limit=" + limit);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }
    const json = await res.json();
    const countries = json.data;
    return countries.map(country => ({...country, flagImg: country.flag.svgLink}));

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
  const sections = [
      {
          title: "Discover your next destination",
          button1: { text: "Discover", link: "/discover" },
          description: (
              <>
                  <p>Browse and filter through hundreds of countries to find your next dream destination. 
                    Travel the world from your own home by searching and discovering
                    both little-known and major countries and learning interesting facts.
                  </p>
                  <p>Build up your knowledge and find your new ultimate wishlist of travel locations.</p>
              </>
          ),
      },
  ];
  const countries = await getRandomCountries(sections.length);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
          <Grid container columnSpacing={5} sx={{alignItems: 'center'}}>
            {sections.map((section, index) => 
              <HomeSection key={section.title} title={section.title} country={countries[index]} description={section.description} />
            )}
          </Grid>
        </Container>
      </div>
    </main>
  );
}
