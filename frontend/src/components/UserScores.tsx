'use client'

import { useUserContext } from "@/context/UserContext"
import { Avatar, Card, CardContent, CardHeader } from "@mui/material";

function UserScores() {
    const { currentUser } = useUserContext();
    const avatarSize = { width: 24, height: 24 };

    const avatar = (currentUser && 'userName' in currentUser) ? <Avatar alt={currentUser.userName} src={currentUser.profilePhoto} sx={avatarSize} /> : 
        <Avatar alt="No User" src="/nouser.png" sx={avatarSize} />;

    if (!currentUser) return null;

    return (
        <Card color="primary">
            <CardHeader title="My Scores" avatar={avatar} titleTypographyProps={{variant: "h3"}}>My Scores</CardHeader>
            <CardContent>
                Current Score: {currentUser.currentScore}<br/>
                High Score: {currentUser.highScore}<br/>
            </CardContent>
        </Card>
    )
}

export default UserScores