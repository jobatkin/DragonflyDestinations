"use client"; // Error boundaries must be Client Components
import LoggingHelper from "@/utils/LoggingHelper";
import styles from "./page.module.css";

import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        LoggingHelper.error(error);
    }, [error]);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Container maxWidth="xl">
                    <Typography variant="h3" component="h3" gutterBottom>Oops, that's our bad. Something went wrong.</Typography>
                    <Typography color="textDisabled" variant="body2" sx={{wordBreak: "break-all"}} gutterBottom>{error.message}</Typography>
                    <Typography gutterBottom>You can try again, go back to the last page, or start again from the homepage.</Typography>

                    <ButtonGroup variant="contained" aria-label="Error action button group" sx={{my: 4}}>
                        <Button onClick={ () => reset() }>Try Again</Button>
                        <Button onClick={ () => router.back() }>Go Back</Button>
                        <Button onClick={ () => router.push('/') }>Home</Button>
                    </ButtonGroup>      
                </Container>
            </div>
        </main>
    );
}
