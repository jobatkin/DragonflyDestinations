"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import { Container, Input } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FormFeedback from "./FormFeedback";

// based on https://github.com/mui/material-ui/blob/v5.14.10/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
export default function RegisterForm({handleClose}: {handleClose?: () => void}) {

    const [imagePreview, setImagePreview] = React.useState('')
    const [submitResult, setSubmitResult] = React.useState({message: '', isError: false});
    const {currentUser, handleUpdateUser} = useUserContext();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)

        if (e.target.files) {
            // URL from uploaded image for previewing
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
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
            const response = await axios.post("/api/users/register", data);
            console.log(response)
            setSubmitResult( {message: response.data.result, isError: false} );
            handleUpdateUser(response.data.data);

            if (handleClose) handleClose();
        } catch (err) {
            console.log(err);
            if (err instanceof AxiosError) setSubmitResult( {message: err.response?.data.result, isError: true} );
        }
    };

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
            <Typography component="h5" variant="h5">
                Register
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{my: 2}}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            autoComplete="user-name"
                            name="userName"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Input type="file" name="file" onChange={handleFileChange}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>

                    <Grid xs={0} md={3}>&nbsp;</Grid>

                    <Grid item xs={12} md={6}>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Sign Up
                        </Button>
                    </Grid>

                    <Grid xs={0} md={3}>&nbsp;</Grid>

                    <Grid item xs={12} md={6}>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </Container>
    );
}
