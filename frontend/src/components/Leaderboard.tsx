import { User } from "@/context/UserContext"
import { Card, CardContent } from "@mui/material"

function Leaderboard({leaders}: {leaders: User[]}) {
    return (
        <Card sx={{my: 2}}>
            <CardContent>
                {leaders.map(leader => (
                    <div key={leader.id}>{leader.userName}: {leader.highScore}</div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Leaderboard