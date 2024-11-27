'use client'

import { useUserContext } from "@/context/UserContext";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import FormFeedback from "./FormFeedback";
import UserDetailsForm from "./UserDetailsForm";
import Link from "@mui/material/Link";
import LoggingHelper from "@/utils/LoggingHelper";

// middleware makes sure the profile page is only accessed by authenticated users
export default function ProfileForm() {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState({message: '', isError: false});
    const authUser = currentUser && 'id' in currentUser;
    const [imagePreview, setImagePreview] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        LoggingHelper.log(e.target.files)

        if (e.target.files) {
            // URL from uploaded image for previewing
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        // filter out any empty string fields, we don't want to update those
        const filteredFormData = Array.from(formData)
          .reduce((acc, [fieldName, fieldValue]) => {
            if ((typeof fieldValue === 'string' && fieldValue.trim().length > 0) || typeof fieldValue !== 'string') {
              acc.append(fieldName, fieldValue);
            }
            return acc;
          }, new FormData());
        
        if (currentUser && 'id' in currentUser) {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_SERVER}/api/users/${currentUser.id}`, filteredFormData);
                LoggingHelper.log(response)
                setSubmitResult( {message: response.data.result, isError: false} );
                // new user details merged with existing ones including token to stay logged in
                handleUpdateUser({...currentUser, ...response.data.data});

            } catch (err) {
                LoggingHelper.error(err as Error);
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
