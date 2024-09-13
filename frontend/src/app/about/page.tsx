import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import styles from "../page.module.css";
import React from "react";
import ContactForm from "@/components/ContactForm";

const dataSources = [
    {
        name: 'REST Countries',
        link: 'https://restcountries.com/',
        description: 'Free, open source API providing comprehensive data on all the countries in the world, ' +
            'including information on languages, currencies, population, capital, region, area, timezones, continents, flag, latitude and longitude. ' +
            'The original inspiration for this project, since expanded on by several other services.',
    },
    {
        name: 'Factbook.json',
        link: 'https://github.com/factbook/factbook.json',
        description: 'The World Factbook published by the Central Intelligence Agency (CIA) offers free country profiles in the public domain, updated weekly. ' +
            'They contain extensive data, of which we use a small subset including background, geography, climate, terrain, natural resources, other languages, population, industries.'
    },
    {
        name: 'Travel Advisory API',
        link: 'https://www.travel-advisory.info/',
        description: 'Free REST API providing regularly updated assessments of each country\'s safety, based on an aggregated list of official travel advisories issued by governments across the globe.'
    },
    {
        name: 'GeoApify',
        link: 'https://www.geoapify.com/',
        description: 'Offers essential tools to develop maps, optimize routes, and build intelligent location-based applications and services, for very reasonable pricing. ' +
            'We use the free tier to determine a client location based on their IP, to work out how far away each country is from your location.'
    },
    {
        name: 'Open Weather Map',
        link: 'https://openweathermap.org/api',
        description: 'Provides accurate and precise global weather data with very reasonable free tiers for educational purposes. We use their OneCall API to provide current weather for capital cities.'
    },
    {
        name: 'Frankfurter',
        link: 'https://www.frankfurter.app/',
        description: 'Frankfurter is an open-source API for current and historical foreign exchange rates published by the European Central Bank. We use it to povide the currency exchange rates for each country.'
    },
    {
        name: 'Google APIs',
        link: 'https://console.cloud.google.com/apis/library',
        description: 'Provides a huge range of APIs for personal and commercial use. We use the Places API to source random photos for each country and display satellite maps.'
    },    
    {
        name: 'ChatGPT',
        link: 'https://chatgpt.com/',
        description: 'The leading AI language model developed by OpenAI. Used to generate supplemental information for countries, including tourism data, some flag descriptions, ' +
            'and mapping country codes between the other services.'
    }       
]

export default async function AboutPage() {

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Container maxWidth="xl">
                    <Typography variant="h2" component="h2">About</Typography>
                    <Divider sx={{my: 3}} />

                    <Typography component="p">Dragonfly Destinations is the creation of Jo Batkin, a software engineer from Queensland, Australia.</Typography>
                    <Typography component="p">It began as a learning exercise for Next.js and Typescript in 2024 and quickly expanded with many additional features and plans for even more.
                        The <a href="https://github.com/jobatkin/DragonflyDestinations" target="_blank">GitHub repository</a> is still a work in progress and 
                        welcomes your suggestions and contributions.
                    </Typography>

                    <Box component="section" sx={{my: 4}}>
                        <Typography variant="h3" component="h3">Credits</Typography>
                        <Typography component="p">Data for the project has been sourced from several public APIs, with thanks!</Typography>

                        <Grid container rowSpacing={4} columnSpacing={2} sx={{my: 2}}>
                            {dataSources.map(source => (
                                <React.Fragment key={source.name}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h4" component="h4" color="extra.light">{source.name}</Typography>
                                        <div><a href={source.link} target="_blank" style={{wordWrap: 'break-word'}}>{source.link}</a></div>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="body1" component="p">{source.description}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Box>

                    <Box component="section" sx={{my: 4}}>
                        <Typography variant="h3" component="h3">Contact</Typography>
                        <Typography component="p">Have a suggestion, some feedback or want to get in touch?</Typography>
                        <ContactForm />
                    </Box>
                </Container>
            </div>
        </main>
    )
}