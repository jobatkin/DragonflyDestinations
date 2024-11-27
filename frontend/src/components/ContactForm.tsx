'use client'
import { Box, Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import FormFeedback from "./FormFeedback";
import EmailHelper from "@/utils/EmailHelper";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import LoggingHelper from "@/utils/LoggingHelper";

function ContactForm() {

    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});
    const { currentUser } = useUserContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const emailResponse = await EmailHelper.sendFormEmail(event.currentTarget);

            const submission = {
                form: 'contact',
                name: formData.get('from_name'),
                email: formData.get('from_email'),
                message: formData.get('message'),
                userId: (currentUser && 'id' in currentUser) ? currentUser.id : null
            }
            const dbResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/api/submissions`, submission);

            LoggingHelper.log(emailResponse);
            LoggingHelper.log(dbResponse);
            setSubmitResult( {message: 'Thanks for your message!', isError: false} );
        } catch (err) {
            LoggingHelper.error(err as Error);
            setSubmitResult( {message: 'Failed to send email', isError: true} );
        }        
    }

    return (
        <Box component="form" sx={{my: 2}} onSubmit={handleSubmit}>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>

            <Grid container columnSpacing={4} rowSpacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="name" name="from_name"
                        required fullWidth autoFocus
                        id="from_name" label="Your Name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="email" name="from_email"
                        required fullWidth autoFocus type="email"
                        id="from_email" label="Your Email"
                    />
                </Grid>     
                <Grid item xs={12}>
                    <TextField
                        autoComplete="message" name="message"
                        required fullWidth autoFocus multiline rows={2}
                        id="message" label="Your Message"
                    />
                </Grid>           
                <Grid item>
                    <Button type="submit" fullWidth variant="contained">Submit</Button>
                </Grid>                                 
            </Grid>
        </Box>
    )
}

export default ContactForm