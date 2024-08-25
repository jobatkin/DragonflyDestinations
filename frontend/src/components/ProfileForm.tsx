'use client'

import { useUserContext } from "@/context/UserContext";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import FormFeedback from "./FormFeedback";
import UserDetailsForm from "./UserDetailsForm";
import Link from "@mui/material/Link";

// middleware makes sure the profile page is only accessed by authenticated users
export default function ProfileForm() {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState({message: '', isError: false});
    const authUser = currentUser && 'id' in currentUser;
    const [imagePreview, setImagePreview] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)

        if (e.target.files) {
            // URL from uploaded image for previewing
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)

        if (currentUser && 'id' in currentUser) {
            try {
                const response = await axios.put("/api/users/" + currentUser.id, data);
                console.log(response)
                setSubmitResult( {message: response.data.result, isError: false} );
                handleUpdateUser(response.data.data);

            } catch (err) {
                console.log(err);
                if (err instanceof AxiosError) setSubmitResult( {message: err.response?.data.result, isError: true} );
            }        
        } else {
            setSubmitResult( {message: "User not logged in", isError: true} );
        }
    }

    // this is a form to update a profile, not valid unless user is logged in
    if (!authUser) return <p>Please <Link href="/login" variant="body2">login</Link> to update your profile.</p>

    return (
        <Container maxWidth="md">
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    {imagePreview ? <Avatar alt={currentUser?.userName} src={imagePreview} /> : <Avatar alt={currentUser?.userName} src={currentUser?.profilePhoto} />}
                </Avatar>
                <Typography component="h5" variant="h5">Update Profile</Typography>

                <Box component="form" onSubmit={handleUpdateProfile} sx={{my: 2}}>
                    <UserDetailsForm onImgChange={handleFileChange} />
                </Box>
            </Box>
        </Container>
    )
}
