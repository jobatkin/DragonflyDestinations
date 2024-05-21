import { Card, CardMedia } from "@mui/material";

export interface GoogleMapProps {
    countryName: string,
    width?: string,
    height?: string
}

function GoogleMap({countryName, width, height}: GoogleMapProps) {
    const iframeWidth = width ? width : "100%";
    const iframeHeight = height ? height : "auto";

    return (
        <Card>
            <CardMedia component="iframe"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_KEY}&maptype=satellite&q=${countryName}`} 
                width={iframeWidth} height={iframeHeight} 
                sx={{ border: 0, minWidth: 300, minHeight: {xs: 300, lg:600} }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></CardMedia>
        </Card>
    )
}

export default GoogleMap;