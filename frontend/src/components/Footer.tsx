'use client';
import { Container, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { pages } from "./NavBar";

function Footer() {

    const footerPages = [{label: 'About', link: '/about'}, ...pages];
    const links = footerPages.map(page => (
        <Link key={page.link} href={page.link}>{page.label}</Link>
    ))

    return (
        <Container maxWidth="xl">
            <Divider sx={{my: 1}}/>
            <Grid container justifyContent="space-between">
                <Grid item><Typography>&copy; Copyright {new Date().getFullYear()} Dragonfly Destinations. All rights reserved.</Typography></Grid>
                <Grid item><Stack direction="row" spacing={2}>{links}</Stack></Grid>
            </Grid>
        </Container>
    )
}

export default Footer;