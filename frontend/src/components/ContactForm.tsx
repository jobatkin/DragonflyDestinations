'use client'
import { Box, Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import FormFeedback from "./FormFeedback";

function ContactForm() {

    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @todo - build backend support for saving and emailing feedback
        setSubmitResult( {message: 'Thanks for your message!', isError: false} );
    }

    return (
        <Box component="form" sx={{my: 2}} onSubmit={handleSubmit}>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>

            <Grid container columnSpacing={4} rowSpacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="name" name="name"
                        required fullWidth autoFocus
                        id="name" label="Your Name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="email" name="email"
                        required fullWidth autoFocus type="email"
                        id="email" label="Your Email"
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