import { CountryAnswer, questionTypes } from "@/types";
import { gluten } from "../fonts";
import styles from "../page.module.css";
import ChallengeQuestion from "@/components/ChallengeQuestion";
import { Container } from "@mui/material";

// get a new question with possible answers from the backend API
async function getQuestionAnswers() {
  const res = await fetch(process.env.SERVER + "/api/countries/question");

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
     throw new Error("Failed to fetch answers");
  }

  const json = await res.json();
  return json.data as CountryAnswer[];
}

// get all unique regions from the backend api
async function getAllRegions() {
  const res = await fetch(process.env.SERVER + "/api/countries/regions");

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
     throw new Error("Failed to fetch regions");
  }

  const json = await res.json(); 
  return json.data as string[];
}

export default async function ChallengePage() {
  const answers = await getQuestionAnswers();
  const regions = await getAllRegions();

  const randomQuestionIndex = Math.floor(Math.random() * questionTypes.length);
  const randomQuestionType = questionTypes[randomQuestionIndex] as typeof questionTypes[number];

  console.log(regions)

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={gluten.className}>Challenge</h2>
          <Container maxWidth="lg">
            <ChallengeQuestion answers={answers} regions={regions} questionType={randomQuestionType}/>
          </Container>
      </div>
    </main>
  );
}
