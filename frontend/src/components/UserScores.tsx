'use client'

import { useUserContext } from "@/context/UserContext"
import { Card, CardContent } from "@mui/material";

function UserScores() {
    const { currentUser } = useUserContext();

    if (!currentUser) return null;

    return (
        <Card>
            <CardContent>
                Current Score: {currentUser.currentScore}<br/>
                High Score: {currentUser.highScore}<br/>
            </CardContent>
        </Card>
    )
}

export default UserScores