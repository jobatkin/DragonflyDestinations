import { Button, Card, CardContent, CardMedia, Grid } from "@mui/material";

export interface GoogleMapProps {
    countryName: string,
    lat?: number,
    lng?: number,
    mapLink?: string,
    width?: string,
    height?: string
}

function GoogleMap({countryName, lat, lng, mapLink, width, height}: GoogleMapProps) {
    const iframeWidth = width ? width : "100%";
    const iframeHeight = height ? height : "auto";

    return (
        <Card sx={{mb: 2}}>
            <CardMedia component="iframe"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_KEY}&maptype=satellite&q=${countryName}`} 
                width={iframeWidth} height={iframeHeight} 
                sx={{ border: 0, minWidth: 300, minHeight: {xs: 300, lg:600} }} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </CardMedia>
            <CardContent sx={{'&:last-child': { pb: 1 }}}>
                <Grid container justifyContent="space-between">
                    {lat && lng ? 
                        <Grid item xs={6}>
                            Latitude: {lat} <br/>Longitude: {lng}
                        </Grid> : null
                    }
                    {mapLink && 
                        <Grid item xs={6} sx={{textAlign: 'right'}}>
                            <Button href={mapLink} target="_blank">Show Google Map</Button>
                        </Grid>
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default GoogleMap;