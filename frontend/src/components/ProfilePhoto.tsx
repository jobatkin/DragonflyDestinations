'use client';

import { useUserContext } from "@/context/UserContext";
import { Avatar } from "@mui/material";

export default function ProfilePhoto({size = 40}:{size?: number}) {
    const {currentUser} = useUserContext();
    const userName = currentUser && 'userName' in currentUser ? currentUser.userName : "No user";
    const path = process.env.NEXT_PUBLIC_API_SERVER + "";
    const photo = currentUser && 'profilePhoto' in currentUser ? path + currentUser.profilePhoto : "/nouser.png";

    return (
        <Avatar alt={userName} src={photo} sx={{ width: size, height: size }}/>     
    )
}