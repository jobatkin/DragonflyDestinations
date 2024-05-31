import {CountryAnswer, questionTypes} from "@/types";
import {gluten} from "../fonts";
import styles from "../page.module.css";
import ChallengeQuestion from "@/components/ChallengeQuestion";
import {Container, Grid} from "@mui/material";
import UserScores from "@/components/UserScores";
import { User } from "@/context/UserContext";
import Leaderboard from "@/components/Leaderboard";

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

// get top scoring users from the backend API
async function getLeaderboard() {
    const res = await fetch(process.env.SERVER + "/api/users/leaderboard");

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch leaderboard");
    }

    const json = await res.json();
    return json.data as User[];
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
    const leaders = await getLeaderboard();

    const randomQuestionIndex = Math.floor(Math.random() * questionTypes.length);
    const randomQuestionType = questionTypes[randomQuestionIndex] as (typeof questionTypes)[number];

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Container maxWidth="xl">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={9}>
                            <h2 className={gluten.className}>Challenge</h2>
                            <ChallengeQuestion
                                answers={answers}
                                regions={regions}
                                questionType={randomQuestionType}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <UserScores />
                            <Leaderboard leaders={leaders}/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </main>
    );
}
