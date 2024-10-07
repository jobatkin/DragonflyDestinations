import { UserScores } from "@/types";
import { gluten } from "../fonts";
import styles from "../page.module.css";
import { Button, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import ScoreChart from "@/components/ScoreChart";
import FavouriteCountries from "@/components/FavouriteCountries";
import NewListButton from "@/components/NewListButton";

// get the score results for the current user
async function getUserScores(userid: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/users/${userid}/scores`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch scores for user " + userid);
    }

    const json = await res.json();
    const scores = json.data as UserScores[];
    return scores;
}

export default async function DashboardPage() {

    // extract the user from the cookie
    const cookieUserString = cookies().get('user')?.value
    const currentUserId = cookieUserString && JSON.parse(cookieUserString).id;

    if (!currentUserId) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const scores = await getUserScores(currentUserId);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <h2 className={gluten.className}>Dashboard</h2>
                <Divider sx={{my: 2}}/>

                <Grid container justifyContent="space-between" sx={{my: 2}}>
                    <Grid item><Typography variant="h3" component="h3" className={gluten.className}>Challenge Progress</Typography></Grid>    
                    <Grid item><Button color="extra" href="/challenge">Challenge Me</Button></Grid> 
                </Grid>
                <Stack direction={{xs: 'column', sm: 'row'}} gap={5}>
                    {scores.map(score => <ScoreChart key={score.question_type} scoreResult={score}/>)}
                </Stack>

                <Divider sx={{my: 6}}/>
                <Grid container justifyContent="space-between" sx={{my: 2}}>
                    <Grid item><Typography variant="h3" component="h3" className={gluten.className}>My Countries</Typography></Grid>    
                    <Grid item><NewListButton />{" "}<Button color="extra" href="/discover">Discover Countries</Button></Grid> 
                </Grid>
                <Typography>Any newly favourited countries will show in your first default list below. Add new lists and drag your countries around to organise them as you like!</Typography>
                <FavouriteCountries />           
            </div>
        </main>
    );
}
