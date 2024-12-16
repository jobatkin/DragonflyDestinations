'use client';

import { Button, Container, Grid, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation"
import FormFeedback from "./FormFeedback";
import { useState } from "react";
import LoggingHelper from "@/utils/LoggingHelper";
import MessageHelper from "@/utils/MessageHelper";
import EmailHelper from "@/utils/EmailHelper";
import { useUserContext } from "@/context/UserContext";
import APIHelper from "@/utils/APIHelper";

export default function ForgotPassword() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState(searchParams.get('email'))
    const [message, setMessage] = useState<string>('');
    const [resetCode, setResetCode] = useState('');
    const {currentUser, handleUpdateUser} = useUserContext();

    const passwordErrMsg = "Passwords do not match, try again";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (resetCode) {
                const formData = new FormData(event.currentTarget);
                const npw1 = formData.get('newPassword1');
                const npw2 = formData.get('newPassword2');

                if ( npw1 == npw2) {
                    const response = await APIHelper.postData(`/api/users/resetpw`, 
                        { email, resetCode: formData.get('resetCode'), newPassword: npw2 });
                    if (response.data) {
                        setMessage(response.result);
                        handleUpdateUser({...currentUser, ...response.data});
                    }
                }
                else setMessage(passwordErrMsg);
            }
            else {
                const response = await APIHelper.postData(`/api/users/forgotpw`, { email });
                EmailHelper.sendPasswordResetEmail(response.data.resetCode, response.data.email);
                setMessage(response.result);
                setResetCode(response.data.resetCode);
            }

        } catch (err) {
            LoggingHelper.error(err as Error);
            setMessage(MessageHelper.getErrorMessage(err as Error));
        }     
    }

    return (
        <Container maxWidth="md">
            <FormFeedback message={message} isError={message.length > 0} onClose={() => setMessage('')}/>

            <Grid container component="form" onSubmit={handleSubmit} rowSpacing={4} columnSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required fullWidth
                        id="email" label="Email Address"
                        name="email" autoComplete="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        helperText="A reset code will be emailed to this email address if it matches a valid user"
                    />
                </Grid>
                {resetCode &&
                    <>
                    <Grid item xs={12}>
                        <TextField
                            required fullWidth
                            id="resetCode" label="Reset Code"
                            name="resetCode" defaultValue=""
                            helperText="Enter the reset code that was emailed to you"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required fullWidth
                            error={message == passwordErrMsg}
                            id="newPassword1" label="New Password"
                            name="newPassword1" type="password" defaultValue=""
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required fullWidth
                            error={message == passwordErrMsg}
                            id="newPassword2" label="Confirm Password"
                            name="newPassword2" type="password" defaultValue=""
                        />
                    </Grid>                    
                    </>
                }
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Submit</Button>
            </Grid>
        </Container>        
    )
}