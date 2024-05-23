import HomeSection from "@/components/HomeSection";
import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";
import { CountryWithFlag } from "@/types";

// get the given number of random countries from backend API
async function getRandomCountries(limit: number) {
    const res = await fetch(process.env.SERVER + "/api/countries/random/?limit=" + limit, { next: { revalidate: 24*3600 } });

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }

    const json = await res.json();
    const countries = json.data as CountryWithFlag[];
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
    // ]}
}

// display homepage content
export default async function HomePage() {

  const sections = [
      {
          title: "Discover your next destination",
          button1: { text: "Discover", link: "/discover" },
          highlightColour: 'info',
          description: (
              <>
                  <p>Browse and filter through hundreds of countries to find your next dream destination. 
                    Travel the world from your own home by discovering little-known and major countries.
                  </p>
                  <p>Build up your knowledge and find your new ultimate wishlist of travel locations.</p>
              </>
          ),
      },
      {
        title: "Be surprised by a random country",
        button1: { text: "Surprise", link: "/surprise" },
        highlightColour: 'primary',
        description: (
            <>
                <p>Can't decide where to travel, or not even sure what the possibilities are?</p>
                <p>Let our comprehensive list surprise you with a randomly chosen country. Learn all about
                  where it is and what's it's like, then add it to your list if you like what you see!
                </p>
            </>
        ),
      },     
      {
        title: "Share your travel experiences",
        button1: { text: "Connect", link: "/connect" },
        highlightColour: 'secondary',
        description: (
            <>
                <p>Have you travelled to some amazing countries, or maybe want to share experiences from your home country?</p>
                <p>Read stories and comments from around the world, or ask questions to find out what it's like to live
                  and travel in your favourite destinations.
                </p>
            </>
        ),
      },      
      {
        title: "Challenge your memory and knowledge",
        button1: { text: "Challenge", link: "/challenge" },
        highlightColour: 'extra',
        description: (
            <>
                <p>Think your geographical knowledge ranks well? Challenge yourself in our neverending quiz!</p>
                <p>Test your memory on flags, regions and capital cities of countries all around the globe and
                  compare your top streak against our top players.
                </p>
            </>
        ),
      },          
  ];
  const countries = await getRandomCountries(sections.length);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
          <Grid container columnSpacing={5} rowSpacing={5} sx={{alignItems: 'center'}}>
            {sections.map((section, index) => 
              <HomeSection key={section.title} {...section} country={countries[index]} flagSide={index % 2 == 0 ? 'right' : 'left'} />
            )}
          </Grid>
        </Container>
      </div>
    </main>
  );
}
