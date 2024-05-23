import styles from "../page.module.css";
import { CountryWithFlag } from "@/types";
import FilterableCountries from "@/components/FilterableCountries";
import { gluten } from "../fonts";

// get all countries from the backend API
async function getAllCountries() {
  const res = await fetch(process.env.SERVER + "/api/countries/");

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
     throw new Error("Failed to fetch countries");
  }

  const json = await res.json();
  const countries = json.data as CountryWithFlag[];
  return countries.map(country => ({...country, flagImg: country.flag.svgLink}));
}

export default async function DiscoverPage() {

  const allCountries = await getAllCountries();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={gluten.className}>Discover</h2>

        <FilterableCountries countries={allCountries} />
      </div>
    </main>
  );
}
