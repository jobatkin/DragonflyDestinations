import Image from "next/image";
import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";
import { CountryWithFlag } from "@/types";

// get the given number of random countries from backend API
async function getRandomCountries(limit: number) {
    const res = await fetch(process.env.SERVER + "/api/countries/random/?limit=" + limit);

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
    // ]
}

// display homepage content
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
      {
        title: "Be surprised by a random country",
        button1: { text: "Surprise", link: "/surprise" },
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
        description: (
            <>
                <p>Have you travelled to some amazing countries, or maybe want to share experiences from your home country?</p>
                <p>Read stories and comments from around the world, or ask questions to find more about what it's like to live
                  and travel in your favourite destinations.
                </p>
            </>
        ),
      },      
      {
        title: "Challenge your memory and knowledge",
        button1: { text: "Challenge", link: "/challenge" },
        description: (
            <>
                <p>Think your geographical knowledge is pretty good? Challenge yourself in our neverending quiz!</p>
                <p>Test your memory on flags, regions and capital cities of countries all around the globe and
                  try to beat your streak and challenge yourself against our top players.
                </p>
            </>
        ),
      },          
  ];
  const countries = await getRandomCountries(sections.length);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
