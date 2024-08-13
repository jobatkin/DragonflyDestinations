import { User } from "@/context/UserContext"
import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HighScore from "./HighScore"

// Displays a LeaderBoard card listing the users with the top 10 scores in the Challenge
function Leaderboard({leaders}: {leaders: User[]}) {
    
    return (
        <Card sx={{my: 2}} color="info">
            <CardHeader title="Leaderboard" avatar={<LeaderboardIcon/>} titleTypographyProps={{variant: "h3"}}>Leaderboard</CardHeader>
            <CardContent sx={{p: 0, py: '0.5em', '&:last-child': { pb: 0 }}}>
                <Grid container justifyContent="space-between" sx={{px: '1em', fontSize: '0.9em', color: 'secondary'}}> 
                    <Grid item xs={6}>User</Grid>
                    <Grid item xs={6} sx={{textAlign: 'center'}}>High Score</Grid>
                </Grid>                
                {leaders.map((leader, i) => (
                    <HighScore key={leader.id} leader={leader} position={i + 1}/>
                ))}
            </CardContent>
        </Card>
    )
}

export default Leaderboard