'use client';

import { Card, CardContent, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DistanceHelper from "@/utils/DistanceHelper";

interface CountryDistanceProps {
    lat: number, 
    lon: number, 
    homeCountry: string, 
    destLat: number,
    destLon: number,
    destCountry: string,
    units?: string
}

// based on the user location (from GeoApify) and country location, find the distance between them
function CountryDistance({lat, lon, homeCountry, destLat, destLon, destCountry, units}: CountryDistanceProps) {
    const distance = DistanceHelper.calculateDistance(lat, lon, destLat, destLon);
    const [useMetric, setUseMetric] = useState(units != 'imperial');

    const displayDistance = useMetric ? distance : distance * 0.621371;
    const distanceFormat = new Intl.NumberFormat('en-US', { style: 'unit', unit: useMetric ? 'kilometer' : 'mile' });

    return (
        <Card sx={{mb: 2}}><CardContent>
            <Grid container justifyContent="space-between">

                <Grid item xs={6}>
                    <Typography variant="h3" component="h3">Your Location</Typography>
                    {lat !== null && lon !== null ? (
                        <p>Latitude: {lat} <br/>Longitude: {lon} <br/>Home country: {homeCountry}</p>
                    ) : (
                        <p>Unable to determine user location</p>
                    )}
                </Grid>

                <Grid xs={6} sx={{textAlign: 'right'}}>
                    <FormControlLabel
                        sx={{justifyContent: 'flex-end'}}
                        control={<Switch defaultChecked onChange={() => setUseMetric(!useMetric)}/>} 
                        label="Metric" />                     
                    <br/>Distance to {destCountry}:
                    <br/>{distanceFormat.format(displayDistance)}
                </Grid>

            </Grid>
        </CardContent></Card>
    )
}

export default CountryDistance;