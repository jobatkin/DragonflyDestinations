'use client'

import { useUserContext } from "@/context/UserContext"
import { Card, CardContent, CardHeader } from "@mui/material";
import ProfilePhoto from "./ProfilePhoto";

function UserScores() {
    const { currentUser } = useUserContext();
    if (!currentUser) return null;

    return (
        <Card color="primary">
            <CardHeader title="My Scores" avatar={<ProfilePhoto size={24}/>} titleTypographyProps={{variant: "h3"}}>My Scores</CardHeader>
            <CardContent>
                Current Score: {currentUser.currentScore}<br/>
                High Score: {currentUser.highScore}<br/>
            </CardContent>
        </Card>
    )
}

export default UserScores