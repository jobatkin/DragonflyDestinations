"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import { Container, Input } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FormFeedback from "./FormFeedback";
import UserDetailsForm from "./UserDetailsForm";
import LoggingHelper from "@/utils/LoggingHelper";

interface RegisterFormProps {
    handleClose?: () => void, 
}

// based on https://github.com/mui/material-ui/blob/v5.14.10/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
export default function RegisterForm({handleClose}: RegisterFormProps) {

    const [imagePreview, setImagePreview] = React.useState('')
    const [submitResult, setSubmitResult] = React.useState( {message: '', isError: false});
    const {currentUser, handleUpdateUser} = useUserContext();
    const authUser = currentUser && 'id' in currentUser;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        LoggingHelper.log(e.target.files)

        if (e.target.files) {
            // URL from uploaded image for previewing
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        LoggingHelper.log({
            email: data.get("email"),
            password: data.get("password"),
            file: data.get("file"),
        });

        // if this user has some quiz scores, save them to their profile when they register
        if (currentUser && 'currentScore' in currentUser) {
            data.set('currentScore', String(currentUser.currentScore));
            data.set('highScore', String(currentUser.highScore));
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/api/users/register`, data);
            LoggingHelper.log(response)
            setSubmitResult( {message: response.data.result, isError: false} );
            handleUpdateUser(response.data.data);

            if (handleClose) handleClose();
        } catch (err) {
            LoggingHelper.error(err as Error);
            if (err instanceof AxiosError) setSubmitResult( {message: err.response?.data.result, isError: true} );
        }
    };

    // this is a form to register a new user, not valid if user is logged in
    if (authUser) return <p>You&apos;re already registered and logged in! <Link href="/profile">Update your profile here</Link>.</p>

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
                    {imagePreview ? <Avatar alt="New User" src={imagePreview} /> : <LockOutlinedIcon />}
                </Avatar>
                <Typography component="h5" variant="h5">Register</Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{my: 2}}>
                    <UserDetailsForm onImgChange={handleFileChange} />

                    <Grid item xs={12} md={6}>
                        <Link href="/login" variant="body2">Already have an account? Sign in</Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
