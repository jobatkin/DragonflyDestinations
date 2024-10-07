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
    const res = await fetch(process.env.NEXT_PUBLIC_API_SERVER + "/api/countries/question");

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch answers");
    }

    const json = await res.json();
    return json.data as CountryAnswer[];
}

// get top scoring users from the backend API, refreshed every 60 seconds
async function getLeaderboard() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_SERVER + "/api/users/leaderboard", { next: { tags: ['scores'] } });

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
  const res = await fetch(process.env.NEXT_PUBLIC_API_SERVER + "/api/countries/regions");

  if (!res.ok) {
      // Recommendation: handle errors
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch regions");
  }

  const json = await res.json();
  return json.data as string[];
}

const addWrongRegions = (answers: CountryAnswer[], regions: string[]) => {
    // if this is the right answer, the display region is unchanged
    // if not, the display region needs to be unique across all possible answers, so we keep track and maybe swap some out
    const displayedRegions: string[] = [answers.find(answer => answer.correct)?.region || ""];
    return answers.map(answer => {
        answer.displayWrongRegion = answer.correct
            ? answer.region 
            : displayedRegions.includes(answer.region) 
                    ? regions.find(region => !displayedRegions.includes(region)) || "" // unique region or empty string
                    : answer.region

        displayedRegions.push(answer.displayWrongRegion); 

        return answer;
    })
}

export default async function ChallengePage() {
    const answers = await getQuestionAnswers();
    const regions = await getAllRegions();
    const leaders = await getLeaderboard();

    const randomQuestionIndex = Math.floor(Math.random() * questionTypes.length);
    const randomQuestionType = questionTypes[randomQuestionIndex] as (typeof questionTypes)[number];

    const fullAnswers = addWrongRegions(answers, regions);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Container maxWidth="xl">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={9}>
                            <h2 className={gluten.className}>Challenge</h2>
                            <ChallengeQuestion
                                answers={fullAnswers}
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
