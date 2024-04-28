import { CardContent, Card, CardMedia, Typography, Grid } from "@mui/material";

interface CountryCardProps {
    name: string,
    capital: string,
    region: string,
    subregion: string,
    flagImg: string,
    population: number,
    area: number
}

function CountryCard(props: CountryCardProps) {
    return (
        <Card className="CountryCard">
            <CardMedia
                sx={{ height: 140 }}
                image={props.flagImg}
                title={props.name}
            />            
            <CardContent>
                <Typography gutterBottom variant="h3">
                    {props.name}
                </Typography>
                <Typography gutterBottom variant="h5" color="text.secondary">
                    {props.subregion}, {props.region}
                </Typography>      
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body2">Population: {props.population.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">Area: {props.area.toLocaleString()}km<sup>2</sup></Typography>
                    </Grid>                    
                </Grid>          
            </CardContent>
        </Card>
    )
}

export default CountryCard