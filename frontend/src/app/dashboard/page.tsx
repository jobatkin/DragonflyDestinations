import { UserFavourites, UserScores } from "@/types";
import { gluten } from "../fonts";
import styles from "../page.module.css";
import { Divider, Link, Stack } from "@mui/material";
import { cookies } from "next/headers";
import ScoreChart from "@/components/ScoreChart";
import FavouriteCountries from "@/components/FavouriteCountries";

// get the score results for the current user
async function getUserScores(userid: number) {
    const res = await fetch(`${process.env.SERVER}/api/users/${userid}/scores`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch scores for user " + userid);
    }

    const json = await res.json();
    const scores = json.data as UserScores[];
    return scores;
}

// get the favourite countries for the current user
async function getUserFavourites(userid: number) {
    const res = await fetch(`${process.env.SERVER}/api/favourites/${userid}`);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch favourites for user " + userid);
    }

    const json = await res.json();
    const favourites = json.data as UserFavourites[];
    return favourites;
}

export default async function DashboardPage() {

    // extract the user from the cookie
    const cookieUserString = cookies().get('user')?.value
    const currentUserId = cookieUserString && JSON.parse(cookieUserString).id;

    if (!currentUserId) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const scores = await getUserScores(currentUserId);
    const favourites = await getUserFavourites(currentUserId);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <h2 className={gluten.className}>Dashboard</h2>
                <Divider sx={{my: 2}}/>

                <h3 className={gluten.className}>Challenge Progress</h3>
                <Stack direction={{xs: 'column', sm: 'row'}} gap={5}>
                    {scores.map(score => <ScoreChart key={score.question_type} scoreResult={score}/>)}
                </Stack>

                <Divider sx={{my: 2}}/>
                <h3 className={gluten.className}>My Countries</h3>     
                <FavouriteCountries favourites={favourites}/>           
            </div>
        </main>
    );
}
